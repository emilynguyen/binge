'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'

import BusinessCard from '@/components/ui/BusinessCard';
import Button from '@/components/ui/Button';
import { readData } from '@/utils/firebaseUtils';
import getBusinesses from '@/utils/getBusinesses';




const noIcon = "/icons/x_40x40.svg";
const yesIcon = "/icons/smiley_40x40.svg";


const Swipe = () => {
  const [businesses, setBusinesses] = useState([]);
  const [currBusiness, setCurrBusiness] = useState({});
  const [message, setMessage] = useState('...');
  const [error, setError] = useState(false);
  const [location, setLocation] = useState('');
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const partyID = urlParams.get('party');

        try {
          const location = await readData(`/${partyID}/location`);
          setLocation(location);
          // Update to get from db
          const fetchedBusinesses = await getBusinesses(partyID);
          setBusinesses(fetchedBusinesses);
          setCurrBusiness(fetchedBusinesses[0]);
        } catch (err) {
          console.log(err);
          setMessage('Failed to fetch businesses');
          setError(true);
        }
      
    };

    fetchData();
  }, []);


  /*
   * Click handler for no button / left swipe
   */
  const handleNoClick = () => {
    setBusinesses(prevBusinesses => {
      const updatedBusinesses = prevBusinesses.slice(1);
      if (updatedBusinesses.length > 0) {
        setCurrBusiness(updatedBusinesses[0]);
      } else {
        setCurrBusiness(null);
        setMessage('No more businesses to show');
      }
      return updatedBusinesses;
    });
  };
  /*
   * Click handler for yes button / right swipe
   */
  const handleYesClick = (link) => {
    // Temp
    window.open(link, '_blank');
  };



  return (
    <>
      <div className="">
        {currBusiness ? (
          <p>{businesses.length} cards left</p>
        ) : (
          <p>&nbsp;</p>
        )}
      </div>
      <div className="w-full flex flex-col grow justify-center gap-4">
        {currBusiness ? (
          <>
            {/* Card */}
            <BusinessCard business={currBusiness} location={location} />
            {/* Buttons */}
            <div className="flex w-full gap-4">
              <Button type="secondary" text="No" icon={noIcon} onClick={handleNoClick} />
              <Button type="primary" text="Yes" icon={yesIcon} onClick={() => handleYesClick(currBusiness.url)} />
            </div>
          </>
        ) : (
          
          <h2 className="mt-[-4rem] mb-6">{message}</h2>
        )}
        {error && <Button text="Try again" type="secondary" onClick={() => router.push('/')}/>}
      </div>
    </>
  );
};

export default Swipe;