'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';


import BusinessCard from '@/components/ui/BusinessCard';
import Button from '@/components/ui/Button';

import { listenToBusinessMatch, listenToEliminationCount, readData } from '@/utils/firebaseUtils';
//import shuffleArray from "@/utils/shuffleArray";
import { setMatch, resetMatches } from '@/utils/matchUtils';


const xIcon = "/icons/x_40x40.svg";
const smileyIcon = "/icons/smiley_40x40.svg";

async function getNextBusiness(partyID) {
  const businesses = await readData(`/${partyID}/businesses`);
  
  while (true) {
    const randomIndex = Math.floor(Math.random() * businesses.length);
  
    // Return next business index if eliminated = false
    if (!businesses[randomIndex].eliminated) {
      return businesses[randomIndex];
    }
  }
}


const Swipe = () => {
  const router = useRouter();

  // Session data
  const [partyID, setPartyID] = useState('');
  const [sessionID, setSessionID] = useState('');
  const [location, setLocation] = useState('');

  // Business data
  const [currBusiness, setCurrBusiness] = useState({});
  const [businessMatch, setBusinessMatch] = useState(null);
  const [eliminationCount, setEliminationCount] = useState(0);
  const [numCards, setNumCards] = useState(0);


  // Messages
  const [message, setMessage] = useState('...');
  const [error, setError] = useState(false);

  useEffect(() => {
    // URL data
    const urlParams = new URLSearchParams(window.location.search);
    const partyIDParam = urlParams.get('party');
    const sessionIDParam = urlParams.get('member');

    setPartyID(partyIDParam);
    setSessionID(sessionIDParam);

    const fetchData = async () => {

        try {
          const partyRef = await readData(`/${partyIDParam}`);
          setLocation(partyRef.location);
          setBusinessMatch(partyRef.businessMatch);
          setEliminationCount(partyRef.eliminationCount);
          setNumCards(partyRef.businesses.length);
          setCurrBusiness(await getNextBusiness(partyIDParam));

        } catch (err) {
          console.error(err);
          setMessage('Failed to fetch data');
          setError(true);
        }
    };

    fetchData();

    // Match listener
    const updateBusinessMatch = (businessMatchData) => {
      setBusinessMatch(businessMatchData || null);
    };

    const unsubscribeBusinessMatch = listenToBusinessMatch(partyIDParam, updateBusinessMatch);

    // Elimination count listener
    const updateEliminationCount = (eliminationCountData) => {
      setEliminationCount(eliminationCountData || 0);
    };

    const unsubscribeEliminationCount = listenToEliminationCount(partyIDParam, updateEliminationCount);

    // Cleanup listeners on component unmount
    return () => {
      unsubscribeBusinessMatch();
      unsubscribeEliminationCount();
    };

    
  }, []);




  /*
   * Click handler for no button / left swipe
   */
  async function handleNoClick() {
    try {
      setMatch(partyID, sessionID, currBusiness, false);
      setCurrBusiness(await getNextBusiness(partyID));
    } catch (err) {
      console.log(err);
    }
  }
  /*
   * Click handler for yes button / right swipe
   */
  const handleYesClick = () => {
    setMatch(partyID, sessionID, currBusiness, true);
  };



  const handleYelpClick = () => {
    window.open(businessMatch.url, '_blank');
  };

  const handleGoogleMapsClick = () => {
    const encodedAddress = encodeURIComponent(businessMatch.name);
    const url = `http://maps.google.com/?q=${encodedAddress}`;
    window.open(url, '_blank');
  };


  async function handleStartOver() {
    try {
      await axios.post('/api/delete-member', { partyID });
    } catch (err) {
      console.error(err);
      setError('Failed to leave party, try again');
    }
   // Go back home
   router.push('/');
  }

  async function handleTryAgain() {
    try {
     // Reset matches
     resetMatches(partyID);

    } catch (err) {
      console.error(err);
      setError('Failed to reset cards, try again');
    }
  }


 if (businessMatch) {
  return (
    <>
      <h1>
        <span className="italic">{businessMatch.name}</span> is a match!
      </h1>
      
      <div>
        <Button className="mb-4 tertiary" text="View on Yelp" onClick={handleYelpClick}/>
        <Button className="tertiary" text="Open in Google Maps"  onClick={handleGoogleMapsClick}/>
        <a className="cursor-pointer mt-16 inline-block" onClick={handleStartOver}>Start over</a>
      </div>
    </>
  );
 }

 if (eliminationCount >= numCards) {
  return (
    <>
    <h1>
      No match found :(
    </h1>
    
    <div>
      <Button className="secondary" text="Try again" onClick={handleTryAgain}/>
      <a className="cursor-pointer mt-16 inline-block" onClick={handleStartOver}>End party</a>
    </div>  
    <p className="mt-6 h-[1rem] error">{error && error}</p>
  </>
  );
 }

  return (
    <>
      <div className="">
        {currBusiness ? (
          <p>{eliminationCount} / {numCards} cards eliminated</p>
        ) : (
          <p>&nbsp;</p>
        )}
      </div>
      <div className="w-full flex flex-col grow justify-center gap-4">
        {currBusiness ? (
          <>
            {/* Card */}
            <BusinessCard business={currBusiness} location={location} />
            {/* Buttons */}
            <div className="flex w-full gap-4">
              <Button className="secondary" text="No" icon={xIcon} onClick={handleNoClick} />
              <Button className="primary" text="Yes" icon={smileyIcon} onClick={handleYesClick} />
            </div>
          </>
        ) : (
          
          <h2 className="mt-[-4rem] mb-6">{message}</h2>
        )}
         <p className="mt-6 h-[1rem] error">{error && error}</p>
      </div>
    </>
  );
};

export default Swipe;