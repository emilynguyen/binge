"use client";

import axios from 'axios';
import Button from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { listenToMembers, listenToStart, writeData } from '@/utils/firebaseUtils';


export default function Join() {
    const [partyID, setPartyID] = useState("...");
    const [memberCount, setMemberCount] = useState("...");
    const [isStarted, setIsStarted] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    
    
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const partyIDParam = urlParams.get('party');
    setPartyID(partyIDParam);

    // Member count listener
    const updateMemberCount = (membersData) => {
        setMemberCount(Object.keys(membersData).length || 0);
    };

    const unsubscribeMemberCount = listenToMembers(partyIDParam, updateMemberCount);

    // Start listener
    const updateIsStarted = (startedData) => {
      setIsStarted(startedData || false);
    };

    const unsubscribeStart = listenToStart(partyIDParam, updateIsStarted);

    // Cleanup listener on component unmount
    return () => {
      unsubscribeMemberCount();
      unsubscribeStart();
    };
  }, []);


  useEffect(() => {
    if (isStarted) {
        router.push(`/swipe?party=${partyID}`);
    }
  }, [isStarted]);


  async function handleLeaveParty() {
      try {
        console.log('handleLeaveParty');
        await axios.post('/api/delete-member', { partyID });
      } catch (err) {
        console.error(err);
        setError('Failed to leave party, try again');
      }
     // Go back home
     router.push('/');
  }

  // TODO watch for isStarted and automatically redirect everyone in party when it's true
  async function handleStart() {
    try {
      await writeData(`/${partyID}/isStarted`, true);
    } catch (err) {
      console.error(err);
      setError('Failed to start session, try again');
    }
    router.push(`/swipe?party=${partyID}`);
  }


  return (
    <>
      <Header text={<i>Waiting for your whole party...</i>} />
      <div className="grow flex flex-col w-full">
        <div>
          <span className="border rounded-[50%] mt-4 pr-6 pl-6 pt-[.2rem] pb-[.2rem] tracking-wider inline-block mb-auto self-auto">{partyID}</span>
         </div>
      
        <div className="w-full grow relative flex flex-col justify-center pt-20 mb-16">
            <div>
            <h1 className="mb-16">This is currently<br></br>a party of ({memberCount})</h1>
            <Button className="primary w-full" text="Everyone is here"  onClick={handleStart}/>
            <a className="cursor-pointer mt-16 inline-block" onClick={handleLeaveParty}>Leave party</a>
            <p className="mt-6 h-[1rem] error">{error && error}</p>
            </div>
        </div>
      </div>
    </>
  );
}