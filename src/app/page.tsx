'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from 'next/form'
import CleanupExpiredItems from '@/components/CleanupExpiredItems';



//import reverseGeocode from "@/utils/reverseGeocode";



function Home() {
  const [error, setError] = useState(null);
  const [locationInput, setLocationInput] = useState('');
  const [loadingCurrLocation, setLoadingCurrLocation] = useState(false);
  const [currLocationLoaded, setcurrLocationLoaded] = useState(false);
  const router = useRouter();

   /*
   * On focus of location input, get user's location
   */
   const handleOnFocus = async () => {
    // Only retrive current location once so user can overwrite
    if (currLocationLoaded) return;
    
    setLoadingCurrLocation(true);
    setLocationInput('Loading location...');

    if (navigator.geolocation) {
      // Get current location
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Reverse geocode to get address
          try {
            const response = await fetch(`/api/reverse-geocode?lat=${position.coords.latitude}&lng=${position.coords.longitude}`);
            const data = await response.json();
            // Set address as input value
            setLocationInput(data.address);
            setcurrLocationLoaded(true);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoadingCurrLocation(false);
          }
        },
        (error) => {
          setError(error.message);
          setLoadingCurrLocation(false);
          setLocationInput("");
        }
      );
    } else {
      setError('Geolocation not supported');
      setLoadingCurrLocation(false);
      setLocationInput("");
    }
    setcurrLocationLoaded(true);
  };

  /*
   * On change of location input, update the state
   */
  const handleInputChange = (e) => {
    setLocationInput(e.target.value);
    setError("");
  };

  /*
   * On submit, go to /swipe
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // createParty or partyOfOne
    //const submitter = e.nativeEvent.submitter.name;

    
    if (router) {
      router.push(`/swipe?location=${encodeURIComponent(locationInput)}`);
    }
  };



  if (error) {
    //return <div>Error: {error}</div>;
    
  }

  return (
    <div>
      <CleanupExpiredItems />
      <Form onSubmit={handleSubmit} className="w-full">
        <input
          name="location"
          value={locationInput}
          className="mb-4"
          placeholder="Your location"
          type="text"
          onFocus={handleOnFocus}
          onChange={handleInputChange}
          required
        />
        <button className="primary mb-4" type="submit" name="createParty" disabled={loadingCurrLocation}>Create a party</button>
        <button className="secondary" type="submit" name="partyOfOne" disabled={loadingCurrLocation}>Dine alone</button>
      </Form>
      <p className="mt-6 h-[1rem]">{error && error}</p>
      
    </div>
    
  );
}

export default Home;