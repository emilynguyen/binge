'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function Home() {
  const [error, setError] = useState(null);
  const [locationInput, setLocationInput] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /*
   * On focus of location input, get user's location
   */
  const handleOnFocus = () => {
    setLoading(true);
    setLocationInput('Loading location...');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
   
          setLocationInput(`${position.coords.latitude}, ${position.coords.longitude}`);
          setLoading(false);
        },
        (error) => {
          setError(error.message);
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation not supported');
      setLoading(false);
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
        <button className="primary" type="submit" disabled={loading}>Start</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
}

export default Home;