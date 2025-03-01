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
  //const [card, setCard] = useState({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const fetchBusinesses = async (location) => {
    try {
      const response = await axios.get('/api/get-businesses', {
        params: { location }
      });
      setBusinesses(response.data.businesses);
    } catch (err) {
      setError('Failed to fetch businesses :(');
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


  const handleNoClick = () => {
    const randomIndex = Math.floor(Math.random() * businesses.length);
    setBusinesses([...businesses.slice(0, randomIndex), ...businesses.slice(randomIndex + 1)]);
  };

  const handleYesClick = (link) => {
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
      <div className="mb2">
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
          <div className="mt-[-4rem] mb-6">Loading...</div>
        )}
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default Swipe;