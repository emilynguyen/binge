'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Form from 'next/form'
import CleanupExpiredItems from '@/components/CleanupExpiredItems';
import Error from '@/components/ui/Error';
import Button from '@/components/ui/Button';
import { useHeaderVisibility } from '@/contexts/HeaderVisibilityContext';

// import { motion } from "framer-motion";


import Image from "next/image";

import { readData } from '@/utils/firebaseUtils';
import createParty from '@/utils/createParty';

const logo = "/brand/binge_logo.svg";
const credit = "/brand/binge_credit.svg";




function Home() {
  const [locationError, setLocationError] = useState(null);
  const [joinError, setJoinError] = useState(null);
  const [showIntro, setShowIntro] = useState(false);
  const [createButtonText, setCreateButtonText] = useState('Create a party');
  const [createButtonDisabled, setCreateButtonDisabled] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [loadingCurrLocation, setLoadingCurrLocation] = useState(false);
  const [currLocationLoaded, setcurrLocationLoaded] = useState(false);
 // const [partyIDInput, setPartyIDInput] = useState('');
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const { setHeaderHidden, setHeaderVisible } = useHeaderVisibility();


  useEffect(() => {
    if (!sessionStorage.getItem("seenIntro")) {
      setShowIntro(true);
      setHeaderHidden();
    }

    setLoading(false)
    
  }, []);

   /*
   * On focus of location input, get user's location
   */
   const handleLocationOnFocus = async () => {
    // Only retrive current location once so user can overwrite
    if (currLocationLoaded) return;
    
    setLoadingCurrLocation(true);
    setLocationInput('Loading location...');
    setCreateButtonDisabled(true);

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
            setCreateButtonDisabled(false);
          }
        },
        (error) => {
          setLocationError(error.message);
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
  const handleCreate = async (e) => {
    e.preventDefault();
    setCreateButtonText("Creating your party...");
    setCreateButtonDisabled(true)
    // createParty or partyOfOne
    //const submitter = e.nativeEvent.submitter.name;

    // Retrieve location parameter
    //const location = encodeURIComponent(locationInput);
    
    const location = locationInput;

      try {
        // Create party (createParty also creates first member)
        const generatedPartyID = await createParty(location);
        router.push(`/join?party=${generatedPartyID}`);

      } catch (err) {
        setCreateButtonDisabled(false)
        setLocationError('Error creating party, please try again');
        console.log(err);
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
        // Check that party exists
        const partyRef = await readData(`/${partyID}`);
        if (!partyRef) {
          setJoinError('Party not found');
          return;
        }
        // Check that party is still open
        if (partyRef.isStarted) {
          setJoinError('This party is closed');
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

    function handleCloseIntro() {
      setShowIntro(false);
      sessionStorage.setItem("seenIntro", true);
      setHeaderVisible();
    }

    if (loading) {
      return(
        <>
        
        </>
      );
    }

  if (showIntro) {
    return(
  
      <>
        <div className="bg-cream h-16 w-full absolute top-0">&nbsp;</div>
        <div className="bg-cream h-16 w-full absolute bottom-0">&nbsp;</div>
        <Image className="mb-6" src={logo} width="196" height="64" alt="Binge"/>
        <p className="max-w-xs">Swipe through restaurants until there’s a match — no chit-chat, no negotiation.</p>
        <Button className="secondary mb-16 mt-16" arrow={true} onClick={handleCloseIntro}/>
        <a href="http://emilynguyen.co/" target="_blank">
          <Image src={credit} width="89" height="77" alt="Made with <3 by Emily"/>
        </a>
    
      </>
      
    );
  }

  return (
    <>
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
        <button className="primary mb-4" type="submit" name="createParty" disabled={loadingCurrLocation || createButtonDisabled}>{createButtonText}</button>
        {/*
        <button className="secondary hidden" type="submit" name="partyOfOne" disabled={loadingCurrLocation}>Dine alone</button> */}
      </Form>
      <Error error={locationError} />
      <p className="text-sm mb-14">or</p>
      <Form onSubmit={handleJoin} onChange={() => {setJoinError(null)}} className="w-full">
        <input
          name="partyID"
          className="mb-4"
          placeholder="Party code"
          type="text"
          required
        />
        <button className="secondary mb-4" type="submit" name="joinParty">Join a party</button>
      </Form>
      <Error error={joinError} />
    </>
    
  );
}

export default Home;