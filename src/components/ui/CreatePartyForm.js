import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Error from '@/components/ui/Error';
import createParty from '@/utils/createParty';

const locationIcon = "/icon/location_32x32.svg";

const CreatePartyForm = () => {
  const [locationError, setLocationError] = useState(null);
  const [createButtonText, setCreateButtonText] = useState('Create party');
  const [createButtonDisabled, setCreateButtonDisabled] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [loadingCurrLocation, setLoadingCurrLocation] = useState(false);
    
  const router = useRouter();
    
  /*
   * Get user's location
   */
  const handleGetLocation = async (e) => {
    e.preventDefault();
    
    setLoadingCurrLocation(true);
    setLocationInput(' ');
    setCreateButtonDisabled(true);

    if (navigator.geolocation) {
     
      // Get current location
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Reverse geocode to get address
          try {
            const response = await axios.get(`/api/reverse-geocode`, {
              params: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
            });
            const data = response.data;
            
            if (!data.address) {
              console.error('Could not get current location');
              throw "Could not get current location";
            }

            // Set address as input value            
            setLocationInput(data.address);
          } catch {
            setLocationError('Could not get current location');
            setLoadingCurrLocation(false);
            setLocationInput("");
          } finally {
            setCreateButtonDisabled(false);
          }
        },
        (err) => {
          setLocationError("Could not get current location");
          setLoadingCurrLocation(false);
          setLocationInput("");
          setCreateButtonDisabled(false);
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
    setLocationError("");
  };

  /*
   * On submit, go to /join
   */
  const handleCreate = async (e) => {
    e.preventDefault();
    setCreateButtonText("Creating your party");
    setCreateButtonDisabled(true);
    
    const location = locationInput;

    try {
      // Create party (createParty also creates first member)
      const generatedPartyID = await createParty(location);
      if (generatedPartyID) {
        router.push(`/join?party=${generatedPartyID}`);
      } else {
        throw new Error("Failed to create party");
      }
    } catch (err) {
      setCreateButtonDisabled(false);
      setCreateButtonText("Create party");
      setLocationError(err.message);
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleCreate} className="w-full">
      <div className="relative mb-4 items-center justify-center">
        <div className="relative">
          <input className="pr-8"
            name="location"
            value={locationInput}
            placeholder="Your location"
            type="text"
            onChange={handleLocationInputChange}
            required 
            disabled={loadingCurrLocation}
          />
          { loadingCurrLocation ? <span className="loading opacity-50 absolute w-full mt-6 left-0">Getting your location</span> : null }   
        </div>
        <div className="bg-white absolute right-2 top-[.55rem] pl-4">
          <button className="icon location" onClick={handleGetLocation}>
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