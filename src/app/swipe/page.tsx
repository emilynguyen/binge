'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'


import axios from 'axios';

import getClosingTimeToday from "@/utils/getClosingTimeToday";
import BusinessCard from '@/components/ui/BusinessCard';
import Button from '@/components/ui/Button';

const noIcon = "/icons/x_40x40.svg";
const yesIcon = "/icons/smiley_40x40.svg";

const Swipe = () => {
  const [businesses, setBusinesses] = useState([]);
  //const [card, setCard] = useState({});
  const [message, setMessage] = useState('...');
  const [error, setError] = useState(false);
  const [location, setLocation] = useState('');
  const router = useRouter()


  const fetchBusinesses = async (location) => {
    try {
      const response = await axios.get('/api/get-businesses', {
        params: { location }
      });
      setBusinesses(response.data.businesses);
    } catch (err) {
      setMessage('Failed to fetch restaurants :(');
      setError(true);
      console.error(err);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const location = urlParams.get('location');

    if (location) {
      setLocation(location);
      fetchBusinesses(location);
    }
  }, []);


  /*
   * Click handler for no button / left swipe
   */
  const handleNoClick = () => {
    const randomIndex = Math.floor(Math.random() * businesses.length);
    setBusinesses([...businesses.slice(0, randomIndex), ...businesses.slice(randomIndex + 1)]);
  };

  /*
   * Click handler for yes button / right swipe
   */
  const handleYesClick = (link) => {
    // Temp
    window.open(link, '_blank');
  };


  const randomIndex = businesses.length ? Math.floor(Math.random() * businesses.length) : 0;
  const business = businesses[randomIndex];

  const businessCardProps = business
    ? {
        name: business.name,
        image: business.image_url,
        rating: business.rating,
        categories: business.categories,
        price: business.price,
        city: business.location.city,
        origin: location,
        destination: `${business.coordinates.latitude}, ${business.coordinates.longitude}`,
        distance: business.distance,
        closing: getClosingTimeToday(business)
      }
    : null;

  return (
    <>
      <div className="">
        {business ? (
          <p>{businesses.length} cards left</p>
        ) : (
          <p>&nbsp;</p>
        )}
      </div>
      <div className="w-full flex flex-col grow justify-center gap-4">
        {business ? (
          <>
            <BusinessCard {...businessCardProps} />
            <div className="flex w-full gap-4">
              <Button type="secondary" text="No" icon={noIcon} onClick={handleNoClick} />
              <Button type="primary" text="Yes" icon={yesIcon} onClick={() => handleYesClick(business.url)} />
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