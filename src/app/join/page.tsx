"use client";

import axios from 'axios';
import Button from "@/components/ui/Button";
import Image from "next/image";

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { listenToMembers, listenToStart, writeData } from '@/utils/firebaseUtils';

const copyIcon = "/icon/copy_32x32.svg";
const copySuccessIcon = "/icon/copy_success_32x32.svg";




export default function Join() {
    const [partyID, setPartyID] = useState("...");
    const [memberCount, setMemberCount] = useState("...");
    const [isStarted, setIsStarted] = useState(false);
    const [error, setError] = useState("");
    const [currentCopyIcon, setCopyIcon] = useState(copyIcon);
    
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

  function handleCopyCode(partyID) {
    navigator.clipboard.writeText(partyID);
    if (currentCopyIcon !== copySuccessIcon) {
      setCopyIcon(copySuccessIcon);
    }
  }


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
      <div className="red-underline mb-10">
        <p className="text-xs mb-3">Party code</p>
        <div className="flex gap-2 items-center justify-center">
          <h2 className="mono">{partyID}</h2>
          <button className="icon mb-1 copy inline-block" onClick={() => handleCopyCode(partyID)}>
            <Image
              src={currentCopyIcon}
              width="32"
              height="32"
              alt="Copy code"
            />
          </button></div>
        </div>
        <div className="red-underline mb-20">
          <p className="text-xs mb-[-.5rem]">No. in party</p>
          <p className="display mb-[-.8rem]">({memberCount})</p>
        </div>
     
      <div className='w-full'>
          <Button className="secondary w-full" text="Everyone is here"  onClick={handleStart}/>
          <a className="cursor-pointer mt-10 text-sm inline-block" onClick={handleLeaveParty}>Leave party</a>
          <p className="mt-6 h-[1rem] error">{error && error}</p>
      </div>
    </>
  );
}