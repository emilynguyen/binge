'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Form from 'next/form'
import CleanupExpiredItems from '@/components/CleanupExpiredItems';
import Error from '@/components/ui/Error';
import Button from '@/components/ui/Button';
import Intro from '@/components/ui/Intro';


// import { motion } from "framer-motion";


import Image from "next/image";

import { readData } from '@/utils/firebaseUtils';
import createParty from '@/utils/createParty';


const locationIcon = "/icon/location_32x32.svg";





function Home() {
  const [locationError, setLocationError] = useState(null);
  const [joinError, setJoinError] = useState(null);
  const [showIntro, setShowIntro] = useState(false);
  const [createButtonText, setCreateButtonText] = useState('Create party');
  const [createButtonDisabled, setCreateButtonDisabled] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [loadingCurrLocation, setLoadingCurrLocation] = useState(false);
  const [currLocationLoaded, setcurrLocationLoaded] = useState(false);
 // const [partyIDInput, setPartyIDInput] = useState('');
  const router = useRouter();

  const [loading, setLoading] = useState(true);



  useEffect(() => {
    if (!sessionStorage.getItem("seenIntro")) {
      setShowIntro(true);
    }

    setLoading(false)
    
  }, []);

   /*
   * On focus of location input, get user's location
   */
   const handleGetLocation = async (e) => {
    e.preventDefault();
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
        if (generatedPartyID) {
        router.push(`/join?party=${generatedPartyID}`);
        } else {
          throw (err);
        }

      } catch (err) {
        setCreateButtonDisabled(false)
        setCreateButtonText("Create party");
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
    }

    if (loading) {
      return(
        <>
        
        </>
      );
    }


  return (
    <>
      <CleanupExpiredItems />
      <Intro className={`fixed w-full z-10 h-screen bottom-0 lg:hidden ${showIntro ? "" : "hide"}`} handleCloseIntro={handleCloseIntro} /> 
      <Form onSubmit={handleCreate} className="w-full">
        <div className="relative mb-4 items-center justify-center">
        <input className="pr-8"
          name="location"
          value={locationInput}
          placeholder="Your location"
          type="text"
          onChange={handleLocationInputChange}
          required 
          disabled={loadingCurrLocation}
        />
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
        <Button type="submit" className="primary" text={createButtonText} name="createParty" disabled={loadingCurrLocation || createButtonDisabled}/>
        {/*
        <button className="secondary hidden" type="submit" name="partyOfOne" disabled={loadingCurrLocation}>Dine alone</button> */}
      </Form>
      <Error error={locationError} mb="0"/>
      <p className="text-sm mb-14 mt-12">or</p>
      <Form onSubmit={handleJoin} onChange={() => {setJoinError(null)}} className="w-full">
        <input
          name="partyID"
          className="mb-4"
          placeholder="Party code"
          type="text"
          required
        />
        <Button type="submit" className="secondary" text="Join party" name="joinParty"/>
      </Form>
      <Error error={joinError} />
    </>
    
  );
}

export default Home;