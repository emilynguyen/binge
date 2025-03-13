"use client";

import Button from "@/components/ui/Button";
import createParty from "@/utils/createParty";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';

const copyIcon = "/icons/copy_32x32.svg";
const copySuccessIcon = "/icons/copy_success_32x32.svg";


export default function Create() {
  const [partyID, setPartyID] = useState(null);
  const [currentCopyIcon, setCopyIcon] = useState(copyIcon);
  const router = useRouter();


  useEffect(() => {
    // Retrieve location parameter
    const urlParams = new URLSearchParams(window.location.search);
    const location = urlParams.get('location');

    const createData = async () => {
      try {
        // Create party (createParty also creates first member)
        const generatedPartyID = await createParty(location);
        setPartyID(generatedPartyID);

      } catch (err) {
        console.log(err);
      }
    };
    createData();
  }, []);



  async function handleNeverMind() {
    try {
      await axios.post('/api/delete-member', { partyID });
    } catch (err) {
      console.error(err);
     // setError('Failed to leave party, try again');
    }
   // Go back home
   router.push('/');
  }

 
  function handleCopyCode(partyID) {
    navigator.clipboard.writeText(partyID);
    setCopyIcon(currentCopyIcon === copyIcon ? copySuccessIcon : copyIcon);
  }

  function handleContinue() {
    router.push(`/join?party=${partyID}`);
  }

  return (
    <>
      <h1 className="mb-4">Share this code with your party: </h1>
      <Image
            src={currentCopyIcon}
            width="32"
            height="32"
            alt="Copy code"
          />
      <div className="w-full relative">
        <button className="icon absolute right-4" onClick={() => handleCopyCode(partyID)}>
          <Image
            src={currentCopyIcon}
            width="32"
            height="32"
            alt="Copy code"
          />
        </button>
      </div>
      <Button text="Continue" className="primary" onClick={handleContinue}/>
      <a className="cursor-pointer" onClick={handleNeverMind}>
        Never mind
      </a>
    </>
  );
}