"use client";

import Button from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import createParty from "@/utils/createParty";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';

const copyIcon = "/icons/copy_40x40.svg";
const copySuccessIcon = "/icons/copy_success_40x40.svg";


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
      setError('Failed to leave party, try again');
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
      <Header text={<i>Creating a party...</i>} />

      <h1 className="mb-4">Share this code with your party: </h1>
      <div className="w-full relative">
        <input
          id="code"
          name="code"
          className="mb-4"
          defaultValue={partyID}
          placeholder="Generating..."
          type="text"
          readOnly
        />
        <button className="icon absolute right-4" onClick={() => handleCopyCode(partyID)}>
          <Image
            src={currentCopyIcon}
            width="40"
            height="40"
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