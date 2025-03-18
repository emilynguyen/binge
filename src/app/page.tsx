'use client'

import React, { useState, useEffect } from 'react';

import CleanupExpiredItems from '@/components/CleanupExpiredItems';
import Intro from '@/components/ui/Intro';
import CreatePartyForm from '@/components/ui/CreatePartyForm';
import JoinPartyForm from '@/components/ui/JoinPartyForm';
// import { motion } from "framer-motion";

function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem("seenIntro")) {
      setShowIntro(true);
    }
    setLoading(false)
  }, []);


  function handleCloseIntro() {
    setShowIntro(false);
    sessionStorage.setItem("seenIntro", true);
  }

  if (loading) {
    return(
      <></>
    );
  }

  return (
    <>
      <CleanupExpiredItems />

      <Intro className={`fixed w-full z-10 h-screen bottom-0 lg:hidden ${showIntro ? "" : "hide"}`} handleCloseIntro={handleCloseIntro} /> 

      <CreatePartyForm />

      <p className="text-sm mb-14 mt-12">or</p>

      <JoinPartyForm />
    </>
  );
}

export default Home;