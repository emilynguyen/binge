'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';


import BusinessCard from '@/components/ui/BusinessCard';
import Button from '@/components/ui/Button';

import { listenToBusinessMatch, listenToEliminationCount, listenToViewCount, listenToTryAgainTrigger, writeData, readData } from '@/utils/firebaseUtils';
//import shuffleArray from "@/utils/shuffleArray";
import { setMatch, resetMatches } from '@/utils/matchUtils';


const xIcon = "/icons/x_40x40.svg";
const smileyIcon = "/icons/smiley_40x40.svg";
const yelpIcon = "/icons/yelp_40x40.svg";
const mapsIcon = "/icons/google-maps_40x40.svg";




const Swipe = () => {
  const router = useRouter();

  // Session data
  const [partyID, setPartyID] = useState('');
  const [sessionID, setSessionID] = useState('');
  const [location, setLocation] = useState('');
  const [tryAgain, setTryAgain] = useState(false);


  // Business data
  const [currBusiness, setCurrBusiness] = useState({});
  const [businessMatch, setBusinessMatch] = useState(null);
  const [eliminationCount, setEliminationCount] = useState(0);
  const [numCards, setNumCards] = useState(0);
  const [viewCount, setViewCount] = useState(0);


  // Messages
//  const [message, setMessage] = useState('...');
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
        console.log('FETCHING DATA');
        const partyRef = await readData(`/${partyIDParam}`);
        //console.log(partyRef.businesses);
        setLocation(partyRef.location);
        setBusinessMatch(partyRef.businessMatch);
        setEliminationCount(partyRef.eliminationCount);
        setNumCards(partyRef.businesses.length);
        setCurrBusiness(await getNextBusiness(partyIDParam, sessionIDParam));
  
      } catch (err) {
        console.error(err);
       // setError('Failed to fetch data');
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

    // Card view count listener
    const updateViewCount = (viewCountData) => {
      setViewCount(viewCountData || 0);
      console.log('view count listener: ' + viewCountData);
    };

    const unsubscribeViewCount = listenToViewCount(partyIDParam, sessionIDParam, updateViewCount);

     // Try again trigger listener
     const updateTryAgainTrigger = async () => {
     // fetchData(partyIDParam, sessionIDParam);
      await writeData(`/${partyID}/tryAgainTrigger`, false);
      setTryAgain(false);
    };

    const unsubscribeTryAgainTrigger = listenToTryAgainTrigger(partyIDParam, updateTryAgainTrigger);

    // Cleanup listeners on component unmount
    return () => {
      unsubscribeBusinessMatch();
      unsubscribeEliminationCount();
      unsubscribeViewCount();
      unsubscribeTryAgainTrigger();
    };

    
  }, [tryAgain]);



/**
 * Returns a random business that is not eliminated or viewed yet by the given member
 * @param partyID 
 * @param sessionID 
 * @returns business obj
 */
async function getNextBusiness(partyID, sessionID) {
  const party = await readData(`/${partyID}`);
  const businesses = party.businesses;
  const viewedBusinesses = party.members[sessionID].viewed;
  // Note: don't use view count since it might not be initialized on first load
  const updatedViewCount = Object.keys(viewedBusinesses).length;

  //console.log("Viewed " + updatedViewCount + "/" + numCards);


  // Return if no cards left
  if (updatedViewCount == numCards || eliminationCount == numCards) {
    console.log(updatedViewCount + "/" + businesses.length);
    console.log('No cards left');
   // setNoCardsLeft(true);
    return null;
  }
  
  let attempts = 0;
  while (attempts < 5000) {
   // console.log("Getting next business...");
    const randomIndex = Math.floor(Math.random() * businesses.length);
    const randomBusiness = businesses[randomIndex];
  
    // Return next business index if eliminated = false and unviewed
    if (!randomBusiness.eliminated && !viewedBusinesses[randomBusiness.id]) {
      return randomBusiness;
    }
    attempts++;
  }
}


  /*
   * Click handler for no button / left swipe
   */
  async function handleNoClick() {
    try {
      await setMatch(partyID, sessionID, currBusiness, false);

      if (eliminationCount < numCards) 
      setCurrBusiness(await getNextBusiness(partyID, sessionID));
    } catch (err) {
      console.log(err);
    }
  }
  /*
   * Click handler for yes button / right swipe
   */
  async function handleYesClick() {
    try {
      await setMatch(partyID, sessionID, currBusiness, true);
      const businessMatch = await readData(`/${partyID}/businessMatch`);
      if (!businessMatch) {
        if (eliminationCount < numCards) 
        setCurrBusiness(await getNextBusiness(partyID, sessionID));
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleYelpClick = () => {
    window.open(businessMatch.url, '_blank');
  };

  const handleGoogleMapsClick = () => {
    const encodedAddress = encodeURIComponent(businessMatch.name);
    const url = `http://maps.google.com/?q=${encodedAddress}`;
    window.open(url, '_blank');
  };


  async function handleLeaveParty() {
    try {
      await axios.post('/api/delete-member', { partyID });
    } catch (err) {
      console.error(err);
      setError('Failed to leave party, try again');
    }
   // Go back home
   router.push('/');
  }

  // DEBUG only resets for clicker
  async function handleTryAgain() {
    try {
     // Reset matches
     await resetMatches(partyID);

     // Trigger a data refresh for everyone
     await writeData(`/${partyID}/tryAgainTrigger`, true);
     //await fetchData(partyID, sessionID);
     setTryAgain(true);
      console.log('RESTARTING');
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
        <Button className="mb-4 secondary" text="View on Yelp" icon={yelpIcon} onClick={handleYelpClick}/>
        <Button className="mb-4 secondary" text="Open in Google Maps" icon={mapsIcon} onClick={handleGoogleMapsClick}/>
        <Button className="tertiary" text="Try again" onClick={handleTryAgain}/>
        <a className="cursor-pointer mt-16 inline-block" onClick={handleLeaveParty}>Leave party</a>
      </div>
    </>
  );
 }

 if (numCards && eliminationCount >= numCards) {
  return (
    <>
    <h1>
      No match found :(
    </h1>
    
    <div>
      <Button className="secondary" text="Try again" onClick={handleTryAgain}/>
      <a className="cursor-pointer mt-16 inline-block" onClick={handleLeaveParty}>Leave party</a>
    </div>  
    <p className="mt-6 h-[1rem] error">{error && error}</p>
  </>
  );
 }

  return (
    <>
      <div className="w-full">
          <div className="flex justify-between flex-row">
            <p>{numCards - eliminationCount} uneliminated cards left</p>
            <p>{viewCount}/{numCards} viewed</p>
            <p><a className="cursor-pointer inline-block" onClick={handleLeaveParty}>Leave party</a></p>
          </div>
      </div>
      <div className="w-full flex flex-col grow justify-center gap-4">
        {viewCount < numCards ? (
          <>
            {/* Card */}
            <BusinessCard business={currBusiness} location={location} />
            {/* Buttons */}
            <div className="flex w-full gap-4">
              <Button className="secondary" alt="No" icon={xIcon} onClick={handleNoClick} />
              <Button className="primary" alt="Yes" icon={smileyIcon} onClick={handleYesClick} />
            </div>
          </>
        ) : (
          <div>
            <h1>No cards left</h1>
            <div className="mt-8 mb-6">Waiting for a match...</div>
          </div>
        )}

         <p className="mt-2 h-[1rem] error">{error && error}</p>
      </div>
    </>
  );
};

export default Swipe;