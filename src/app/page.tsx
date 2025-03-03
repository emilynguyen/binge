'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Form from 'next/form'
import CleanupExpiredItems from '@/components/CleanupExpiredItems';
import { readData } from '@/utils/firebaseUtils';



function Home() {
  const [locationError, setLocationError] = useState(null);
  const [joinError, setJoinError] = useState(null);
  const [locationInput, setLocationInput] = useState('');
  const [loadingCurrLocation, setLoadingCurrLocation] = useState(false);
  const [currLocationLoaded, setcurrLocationLoaded] = useState(false);
 // const [partyIDInput, setPartyIDInput] = useState('');
  const router = useRouter();

   /*
   * On focus of location input, get user's location
   */
   const handleLocationOnFocus = async () => {
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
            setLocationError(error.message);
          } finally {
            setLoadingCurrLocation(false);
          }
        },
        (error) => {
          setLocationError(error.message);
          setLoadingCurrLocation(false);
          setLocationInput("");
        }
      );
    } else {
      setLocationError('Geolocation not supported');
      setLoadingCurrLocation(false);
      setLocationInput("");
    }
    setcurrLocationLoaded(true);
  };

  /*
   * On change of location input, update the state
   */
  const handleLocationInputChange = (e) => {
    setLocationInput(e.target.value);
    setLocationError("");
  };

  /*
   * On submit, go to /create
   */
  const handleCreate = (e) => {
    e.preventDefault();
    // createParty or partyOfOne
    //const submitter = e.nativeEvent.submitter.name;

    if (router) {
      router.push(`/swipe?location=${encodeURIComponent(locationInput)}`);
    }
  };

    /*
   * Handle joining a party
   */
    async function handleJoin(e) {
      e.preventDefault();
      const partyID = e.target.partyID.value;
      
      setJoinError(null);
  
      try {
    
        const party = await readData(`/${partyID}`);
        if (!party) {
          setJoinError('Party not found');
          return;
        }
        if (router) {
          // Create member
          await axios.post('/api/create-member', { partyID: partyID });

          // Go to waiting room
          router.push(`/join?party=${partyID}`);
        }
 
      } catch {
        setJoinError('Error joining: please try again');
      } 
    };


  return (
    <div>
      <CleanupExpiredItems />
      <Form onSubmit={handleCreate} className="w-full">
        <input
          name="location"
          value={locationInput}
          className="mb-4"
          placeholder="Your location"
          type="text"
          onFocus={handleLocationOnFocus}
          onChange={handleLocationInputChange}
          required
        />
        <button className="primary mb-4" type="submit" name="createParty" disabled={loadingCurrLocation}>Create a party</button>
        <button className="secondary" type="submit" name="partyOfOne" disabled={loadingCurrLocation}>Dine alone</button>
      </Form>
      <p className="mt-6 h-[1rem]">{locationError && locationError}</p>
      <h3 className="italic mb-10">or</h3>
      <Form onSubmit={handleJoin} className="w-full">
        <input
          name="partyID"
          className="mb-4"
          placeholder="Party code"
          type="text"
          required
        />
        <button className="primary mb-4" type="submit" name="createParty">Join a party</button>
      </Form>
      <p className="mt-6 h-[1rem]">{joinError && joinError}</p>
    </div>
    
  );
}

export default Home;