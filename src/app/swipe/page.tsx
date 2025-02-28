'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import getClosingTimeToday from "@/utils/getClosingTimeToday";
import BusinessCard from '@/components/ui/BusinessCard';
import Button from '@/components/ui/Button';

const noIcon = "/icons/x_40x40.svg";
const yesIcon = "/icons/smiley_40x40.svg";


const Swipe = () => {
  const [businesses, setBusinesses] = useState([]);
  const [error, setError] = useState('');

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get('/api/get-businesses');
      setBusinesses(response.data.businesses);
    } catch (err) {
      setError('Failed to fetch businesses :(');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  function handleNoClick() {
    setBusinesses([...businesses.slice(0, randomIndex), ...businesses.slice(randomIndex + 1)]);
  }
  
  function handleYesClick(link) {
    window.open(link, '_blank');
  }
  

// Get random business
const randomIndex = businesses.length ? Math.floor(Math.random() * businesses.length) : 0;
const business = businesses[randomIndex];

console.log(businesses[randomIndex])

const businessCardProps = business
  ? {
      name: business.name,
      image: business.image_url,
      rating: business.rating,
      categories: business.categories,
      price: business.price,
      location: business.location.city,
      distance: business.distance,
      closing: getClosingTimeToday(business)
    }
  : null;

  return (
    <>
    <div className="mb-2">
      <h3 className="mb-4">Binge</h3>
      {business ? (
        <p>{businesses.length} restaurants left in Oakland</p>
      ) : (
        <p>&nbsp;</p>
      )}
      </div>
      <div className="w-full h-autoflex flex grow flex-col justify-center gap-4">
     
      {business ? (
        <>
        
         
            <BusinessCard {...businessCardProps} />
         
          <div className="flex w-full gap-4">
            <Button type="secondary" text="No" icon={noIcon} onClick={handleNoClick} />
            <Button type="primary" text="Yes" icon={yesIcon} onClick={() => handleYesClick(business.url)} />
          </div>
        </>
      ) : (
        <h3 className="mt-[-8rem] mb-6">Loading...</h3>
      )}
      {error && <div>{error}</div>}
      </div>
    </>
  );
};

export default Swipe;

//business.business_hours[0].open[new Date().getDay()].end