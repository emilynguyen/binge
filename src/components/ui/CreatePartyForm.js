import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Error from '@/components/ui/Error';
import createParty from '@/utils/createParty';
import { sendGAEvent } from '@next/third-parties/google'


const locationIcon = "/icon/location_32x32.svg";

const CreatePartyForm = () => {
  const [locationError, setLocationError] = useState(null);
  const [createButtonText, setCreateButtonText] = useState('Create party');
  const [createButtonDisabled, setCreateButtonDisabled] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [currentLocationCoords, setCurrentLocationCoords] = useState(null);

  const [loadingCurrLocation, setLoadingCurrLocation] = useState(false);
    
  const router = useRouter();

  function isCoordinates(str) {
    
    if (typeof str !== 'string') {
      return false;
    }
  
    const parts = str.split(',');
    if (parts.length !== 2) {
      return false;
    }
  
    const latitude = parseFloat(parts[0]);
    const longitude = parseFloat(parts[1]);
  
    if (isNaN(latitude) || isNaN(longitude)) {
      return false;
    }
  
    // Latitude should be between -90 and +90, longitude between -180 and +180
    return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
  }
    
  /*
   * Get user's location
   */
  const handleGetLocation = async (e) => {
    e.preventDefault();
    sendGAEvent('event', 'buttonClicked', { value: 'Get location' });

    setLocationError('');
    setLoadingCurrLocation(true);
    setLocationInput(' ');
    setCreateButtonDisabled(true);

    if (navigator.geolocation) {
     
      // Get current location
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Save coordinates
          const coords = `${position.coords.latitude}, ${position.coords.longitude}`;
          setCurrentLocationCoords(coords.replace(/\s/g, ''));

          let currentLocation = coords;
          
          // Reverse geocode to get address
          try {
            const address = await reverseGeocode(coords);

            if (address) currentLocation = address;
            
          } catch {
            console.error('Error reverse geocoding');
          }
          
         // Update input
          setLocationInput(currentLocation); 
          setLoadingCurrLocation(false);
          setCreateButtonDisabled(false);
        },
        (err) => {
          setLocationInput("");
          setLoadingCurrLocation(false);
          setCreateButtonDisabled(false);
          if (err.code == err.PERMISSION_DENIED) {
            setLocationError("Could not get current location — permission denied");
          } else {
            setLocationError("Could not get current location");
          }
          

        }
      );
    } else {
      setLocationError('Geolocation not supported');
      setLoadingCurrLocation(false);
      setLocationInput("");
      setCreateButtonDisabled(false);
    }
  };

  /*
   * On change of location input, update the state
   */
  const handleLocationInputChange = (e) => {
    setLocationInput(e.target.value);
    setCurrentLocationCoords('');
    setLocationError("");
  };

  const handleLocationInputClick = () => {
    sendGAEvent('event', 'inputClicked', { value: 'Input location' });
  }

  const reverseGeocode = async (coords) => {
    const res = await fetch(`/api/reverse-geocode?coords=${coords}`);
    const data = await res.json();

    if (res.ok) {
      return data; 
    } else {
      console.error('Error reverse geocoding');
      return null;
    }
  };


  const geocode = async (address) => {
    const res = await fetch(`/api/geocode?address=${address}`);
    const data = await res.json();

    if (res.ok) {
      return data; // returns coordinates as string
    } else {
      console.error('Error fetching geocode data for: ' + address, data.error);
      return null;
    }
  };


  /*
   * On submit, go to /join
   */
  const handleCreate = async (e) => {
    e.preventDefault();
    setCreateButtonText("Creating your party");
    setCreateButtonDisabled(true);
    setLocationError("");

    
    try {
      let locationCoords; 
      let locationName = locationInput; 

      if (currentLocationCoords) {
        locationCoords = currentLocationCoords;
      } else {
        // Geocode if needed
        locationCoords = isCoordinates(locationInput)
          ? locationInput
          : await geocode(locationInput);
      }
      

      // Create party (createParty also creates first member)
      const generatedPartyID = await createParty(locationName, locationCoords);
      if (generatedPartyID) {
        router.push(`/join?party=${generatedPartyID}`);
      } else {
        throw "Failed to create party";
      }
    } catch (err) {
      setCreateButtonDisabled(false);
      setCreateButtonText("Create party");
      setLocationError(err);
      //console.error(err);
    }
  };

  return (
    <form onSubmit={handleCreate} className="w-full">
      <div className="relative mb-4 items-center justify-center">
        <div className="relative">
          <input className="pr-8"
            name="location"
            value={locationInput}
            placeholder="Your current address"
            type="text"
            onChange={handleLocationInputChange}
            onClick={handleLocationInputClick}
            required 
            disabled={loadingCurrLocation}
          />
          { loadingCurrLocation ? <span className="loading opacity-50 absolute w-full mt-6 left-0">Getting your location</span> : null }   
        </div>
        <div className={`${!loadingCurrLocation && 'bg-white'} absolute right-2 top-[.55rem] pl-4`}>
          <button type="button" className="icon location" onClick={handleGetLocation}>
            <Image
              src={locationIcon}
              width={32} height={32} style={{ width: '2rem' }}
              alt="Get current location"
            />
          </button>
        </div>
      </div>
      <Button type="submit" className="primary" text={createButtonText} name="createParty" disabled={loadingCurrLocation || createButtonDisabled} loading={createButtonDisabled && !loadingCurrLocation}/>
      <Error error={locationError} mb="0"/>
    </form>
  );
};

export default CreatePartyForm;