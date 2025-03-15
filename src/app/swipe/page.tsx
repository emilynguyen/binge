'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';


import BusinessCard from '@/components/ui/BusinessCard';
import Button from '@/components/ui/Button';
import Error from '@/components/ui/Error';
import SwipeHeader from '@/components/ui/SwipeHeader';
import NoMatch from '@/components/ui/NoMatch';
import YesMatch from '@/components/ui/YesMatch';
import NoMoreCards from '@/components/ui/NoMoreCards';


import { listenToBusinessMatch, listenToEliminationCount, listenToMembers, readData } from '@/utils/firebaseUtils';
import { setMatch, resetMatches } from '@/utils/matchUtils';


const xIcon = "/icon/x_40x40.svg";
const smileyIcon = "/icon/smiley_40x40.svg";



const Swipe = () => {
  const router = useRouter();

  // Session data
  const [partyID, setPartyID] = useState('');
  const [sessionID, setSessionID] = useState('');
  const [location, setLocation] = useState('');
  const [memberCount, setMemberCount] = useState('?');


  // Business data
  const [currBusiness, setCurrBusiness] = useState({});
  const [businessMatch, setBusinessMatch] = useState(null);
  const [eliminationCount, setEliminationCount] = useState(0);
  const [numCards, setNumCards] = useState(0);
  const [viewCount, setViewCount] = useState(0);

  // Messages
  const [error, setError] = useState(false);

  const fetchData = async (partyIDParam, sessionIDParam) => {
    
    try {
      //console.log('FETCHING DATA');
      const partyRef = await readData(`/${partyIDParam}`);
      setLocation(partyRef.location);
      setBusinessMatch(partyRef.businessMatch);
      setEliminationCount(partyRef.eliminationCount);
      setNumCards(partyRef.businesses.length);
      setMemberCount(Object.keys(partyRef.members).length);
      setViewCount(Object.keys(partyRef.members[sessionIDParam].viewed).length);
      setCurrBusiness(await getNextBusiness(partyIDParam, sessionIDParam));
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data');
    }
  };

  useEffect(() => {
    // URL data
    const urlParams = new URLSearchParams(window.location.search);
    const partyIDParam = urlParams.get('party');
    const sessionIDParam = urlParams.get('member');

    setPartyID(partyIDParam);
    setSessionID(sessionIDParam);

    fetchData(partyIDParam, sessionIDParam);


    // Match listener
    const updateBusinessMatch = (businessMatchData) => {
      setBusinessMatch(businessMatchData || null);
      if (businessMatchData === null) {
         fetchData(partyIDParam, sessionIDParam); // refresh data when businessMatch is reset to null
      }
    };

    const unsubscribeBusinessMatch = listenToBusinessMatch(partyIDParam, updateBusinessMatch);

    // Elimination count listener
    const updateEliminationCount = (eliminationCountData) => {
      setEliminationCount(eliminationCountData || 0);
    };

    const unsubscribeEliminationCount = listenToEliminationCount(partyIDParam, updateEliminationCount);

    // Member count listener
    const updateMemberCount = (membersData) => {
      setMemberCount(Object.keys(membersData).length || 0);
    };

    const unsubscribeMemberCount = listenToMembers(partyIDParam, updateMemberCount);

    // Cleanup listeners on component unmount
    return () => {
      unsubscribeBusinessMatch();
      unsubscribeEliminationCount();
      unsubscribeMemberCount();
    };

    
  }, []);


/**
 * Returns a random business
 * @param partyID 
 * @param sessionID 
 * @returns business obj
 */
async function getFirstBusiness(partyID, sessionID) {
   const party = await readData(`/${partyID}`);
   const businesses = party.businesses; 
   
  const randomIndex = Math.floor(Math.random() * businesses.length);
  return businesses[randomIndex];

 }


/**
 * Returns a random business that is not eliminated or viewed yet by the given member
 * @param partyID 
 * @param sessionID 
 * @returns business obj
 */
async function getNextBusiness(partyID, sessionID) {
 // console.log('Getting next business...');
  const party = await readData(`/${partyID}`);
  const businesses = party.businesses;
  const viewedBusinesses = party.members[sessionID].viewed;
  // Note: don't use view count since it might not be initialized on first load
  const updatedViewCount = Object.keys(viewedBusinesses).length;
  setViewCount(updatedViewCount);

  //console.log("Viewed " + updatedViewCount + "/" + numCards);


  // Return if no cards left
  if (updatedViewCount == businesses.length || party.eliminationCount == businesses.length) {
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
     // Rerender for everyone is triggered when db data is reset
     await resetMatches(partyID);
      
     setBusinessMatch(null);
     setEliminationCount(0);

     // TODO Need listener to reset view count for everyone
     setViewCount(0);
 
     setCurrBusiness(await getNextBusiness(partyID, sessionID));
     // console.log('RESTARTING');
      
    } catch (err) {
      console.error(err);
      setError('Failed to reset cards, try again');
    }
  }


 if (businessMatch) {
  return (
    <>
     <SwipeHeader cardsLeft={`${numCards - eliminationCount}`} memberCount={memberCount} handleLeaveParty={handleLeaveParty}/>
     <YesMatch business={businessMatch} handleTryAgain={handleTryAgain} />
    </>
  );
 }

 if (numCards && eliminationCount >= numCards) {
  return (
    <>
     <SwipeHeader cardsLeft={`${numCards - eliminationCount}`} memberCount={memberCount} handleLeaveParty={handleLeaveParty}/>
    <NoMatch handleTryAgain={handleTryAgain}/>
   </>
  );
 }

 if (numCards && viewCount == numCards) {
  return (
    <>
    <SwipeHeader cardsLeft={`${numCards - eliminationCount}`} memberCount={memberCount} handleLeaveParty={handleLeaveParty}/>
    <NoMoreCards />
    </>
  );
 }

  return (
    <div className="w-full">
       <SwipeHeader cardsLeft={`${numCards - eliminationCount}`} memberCount={memberCount} handleLeaveParty={handleLeaveParty}/>
     
      <div className="w-full h-full">
            {/* Card */}
            <BusinessCard business={currBusiness} location={location} />
            {/* Buttons */}
            <div className="flex w-full gap-4 mt-4">
              <Button className="secondary" alt="No" icon={xIcon} onClick={handleNoClick} />
              <Button className="primary" alt="Yes" icon={smileyIcon} onClick={handleYesClick} />
            </div>
          <Error error={error} mb="0"/>
      </div>
    </div>
  );
};

export default Swipe;