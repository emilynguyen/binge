"use client";

//import Button from "@/components/ui/Button";
//import Input from "@/components/ui/Input";
import Header from "@/components/layout/Header";

import Image from "next/image";
import Form from "next/form";

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { faker } from "@faker-js/faker";


function generateCode() {
  return faker.food.adjective().replace(/\s+/g, "-");
}

let code = generateCode();



const copyIcon = "/icons/copy_40x40.svg";
const copySuccessIcon = "/icons/copy_success_40x40.svg";

import { neon } from '@neondatabase/serverless';
const size = 69;

const currentParties = [];



/********* firebase **********/





// get parties

const validateCode = async () => {
  const response = await fetch('/api/get-party');
  const data = await response.json();
  
  // Get array of existing parties
  data.data.forEach(e => {
   currentParties.push(e.code);
  });

  // Check that this party code doesn't already exist
  //console.log(currentParties.includes(code));
  let uniquePartyCode = false;
  while (!uniquePartyCode) {
    code = generateCode();
    uniquePartyCode = !currentParties.includes(code);
    console.log(uniquePartyCode);
  } 
};

//validateCode();


/*
function copyCode() {
   const code = document.getElementById("code");

   // Select the text field
   code.select();
   code.setSelectionRange(0, 99999); // For mobile devices
 
   // Copy the text inside the text field
   navigator.clipboard.writeText(code.value);
   
   // Alert the copied text
   alert("Copied the text: " + code.value);
} */

export default function Create() {

  // End party if user hits back
  const router = useRouter();
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

  // Copy code button copies code and updates icon
  const [currentCopyIcon, setCopyIcon] = useState(copyIcon);
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
          value={code}
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
