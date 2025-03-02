"use client";

//import Button from "@/components/ui/Button";
//import Input from "@/components/ui/Input";
import axios from 'axios';
import Header from "@/components/layout/Header";
import createParty from "@/utils/createParty";
import Image from "next/image";
import Form from "next/form";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";


const copyIcon = "/icons/copy_40x40.svg";
const copySuccessIcon = "/icons/copy_success_40x40.svg";


export default function Create() {
  const [partyID, setPartyID] = useState(null);
  const [currentCopyIcon, setCopyIcon] = useState(copyIcon);
  const router = useRouter();


  useEffect(() => {
    const createData = async () => {
      try {
        // Create party
        const generatedPartyID = await createParty();
        setPartyID(generatedPartyID);

        // Create first party member
        const response = await axios.post('/api/create-member', { partyID: generatedPartyID });
        console.log(`Member added to ${generatedPartyID} with session ID: ${response.data.sessionID}`);
      } catch (err) {
        console.log(err);
      }
    };
    createData();
  }, []);

  // End party if user hits back
  const endParty = () => {
    router.push("/");
    /*
    const handleClick = async () => {
      // Perform your function logic here
      // await someAsyncFunction();
  
      // Redirect to a new page after the function completes
      router.push('/');
    };*/
  };

 
  function copyCode() {
    navigator.clipboard.writeText(code);
    setCopyIcon(currentCopyIcon === copyIcon ? copySuccessIcon : copyIcon);
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
        <button className="icon absolute right-4" onClick={copyCode}>
          <Image
            src={currentCopyIcon}
            width="40"
            height="40"
            alt="Copy code"
          />
        </button>
      </div>
      <Form action="/waiting" className="w-full">
        <button className="primary" type="submit">
          Continue
        </button>
      </Form>
      <a className="cursor-pointer" onClick={endParty}>
        Never mind
      </a>
    </>
  );
}