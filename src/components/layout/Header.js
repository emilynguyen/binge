'use client'

import React from 'react';
import Image from "next/image";
const logo = "/brand/binge_logo.svg";
import { useHeaderVisibility } from '@/contexts/HeaderVisibilityContext';



const Header = ({}) => {
  const { isHeaderVisible } = useHeaderVisibility();

  const hidden = !isHeaderVisible ? "invisible" : "";
  
  return (
    <header className={`top-6 text-xs flex justify-between ${hidden}`}>
        <div>{left}</div>
        <Image src={logo} width="61" height="20" alt="Binge"/>
        <div>{right}</div>
    </header>
  ); 
};


export default Header;

