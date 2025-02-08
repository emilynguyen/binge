"use client";

//import Button from "@/components/ui/Button";
//import Input from "@/components/ui/Input";
import Header from "@/components/layout/Header";

import Image from "next/image";
import Form from "next/form";

import { useRouter } from "next/navigation";
import { faker } from "@faker-js/faker";

function getCode() {
  const code = faker.food.adjective();
  return code.replace(/\s+/g, "-");
}

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

  return (
    <>
      <Header text={<i>Creating a party...</i>} />

      <h1 className="mb-4">Share this code with your party: </h1>
      <div className="w-full relative">
        <input
          id="code"
          name="code"
          className="mb-4"
          value={getCode()}
          type="text"
          readOnly
        />
        <button className="icon absolute right-4">
          <Image
            src="/icons/copy_40x40.svg"
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
