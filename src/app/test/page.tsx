"use client"
import { database } from "@/app/lib/firebase";
import { ref, set, get } from "firebase/database";
import { useState } from 'react';





function createParty(code, size, open) {
    set(ref(database, "/" + code), {
      size: size,
      open : open
    });
  }

function getPartySize(code) {
  const dbRef = ref(database, "/" + code + "/size");

  return get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      // Process the retrieved data
     console.log("Data exists");
      return data;
    } else {
      console.log("No data available");
      return null; // or you can return a default value
    }
  }).catch((error) => {
    console.error(error);
    console.log("Error");
    throw error; // Re-throwing or returning null depending on your needs
  });
}

function updatePartySize(code, delta) {
    
    const updates = {};
    // need / ??
    updates[code + "/size"] = getPartySize() + delta;
    
    const db = ref(database, "/" + code);

  
    console.log("incremented");
}

export default function Test() {

    console.log(getPartySize("nigiri"));
   //createParty("noodz", 1, true);



  return (
    <div>
      <h1>Firebase Realtime Data</h1>
     
    </div>
  );
}
