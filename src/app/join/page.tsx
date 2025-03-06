"use client";

import axios from 'axios';
import Button from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { listenToMembers } from '@/utils/firebaseUtils';


export default function Join() {
    const [partyID, setPartyID] = useState("...");
    const [memberCount, setMemberCount] = useState("...");
    const [error, setError] = useState("");
    const router = useRouter();
    
    
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const partyID = urlParams.get('party');
    setPartyID(partyID);

    const updateMemberCount = (membersData) => {
      if (membersData) {
        setMemberCount(Object.keys(membersData).length);
      } else {
        setMemberCount(0);
      }
    };

    const unsubscribe = listenToMembers(partyID, updateMemberCount);

    // Cleanup listener on component unmount
    return () => {
      unsubscribe();
    };

  }, [partyID]);


  async function handleLeaveParty() {
      try {
        await axios.post('/api/delete-member', { partyID });
      } catch (err) {
        console.log(err);
        setError('Error: failed to leave party');

      }
     // Go back home
     router.push('/');
  }

  function handleStart() {
    console.log('STARTING NOW');
    router.push(`/swipe?party=${partyID}`);
  }


  return (
    <>
      <Header text={<i>Waiting for your whole party...</i>} />
      <div className="grow flex flex-col">
        <div>
          <span className="border rounded-[50%] mt-4 pr-6 pl-6 pt-[.2rem] pb-[.2rem] tracking-wider inline-block mb-auto self-auto">{partyID}</span>
         </div>
      
        <div className="w-full grow relative flex flex-col justify-center pt-20 mb-16">
            <div>
            <h1 className="mb-16">This is currently<br></br>a party of ({memberCount})</h1>
            <Button text="Everyone is here" type="primary" onClick={handleStart}/>
            <a className="cursor-pointer mt-16 inline-block" onClick={handleLeaveParty}>Leave party</a>
            <p className="mt-6 h-[1rem]">{error && error}</p>
            </div>
        </div>
      </div>
    </>
  );
}