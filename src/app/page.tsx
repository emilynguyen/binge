'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import reverseGeocode from "@/utils/reverseGeocode";


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
    // Only retrive current location once
    if (currLocationLoaded) return;
    
    setLoadingCurrLocation(true);
    setLocationInput('Loading location...');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const address = await reverseGeocode(position.coords.latitude, position.coords.longitude);
            setLocationInput(address);
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
        }
      );
    } else {
      setError('Geolocation not supported');
      setLoadingCurrLocation(false);
    }
  };

  /*
   * On change of location input, update the state
   */
  const handleInputChange = (e) => {
    setLocationInput(e.target.value);
  };

  /*
   * On submit, go to /swipe
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (router) {
      router.push(`/swipe?location=${encodeURIComponent(locationInput)}`);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full">
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
        <button className="primary" type="submit" disabled={loadingCurrLocation}>Start</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
}

export default Home;