'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BusinessCard from '@/components/ui/BusinessCard';
import Button from '@/components/ui/Button';

const noIcon = "/icons/x_40x40.svg";
const yesIcon = "/icons/smiley_40x40.svg";


/*
 * Converts military time to standard
 */
function convertMilitaryTimeToStandard(time: string): string {
  if (!/^\d{4}$/.test(time)) {
    throw new Error('Invalid time format. Please provide a 4-digit time string.');
  }

  let hours = parseInt(time.substring(0, 2), 10);
  const minutes = time.substring(2);

  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 to 12 for midnight and adjust hours for PM

  if (minutes === '00') {
    return `${hours}${period}`;
  }

  return `${hours}:${minutes}${period}`;
}

/*
 * Get closing time from a business
 */
function getClosingTimeToday(business) {
  const today = new Date().getDay();
  const hoursToday = business.business_hours[0].open.filter((hours) => hours.day === today);

  if (hoursToday.length === 0) {
    return null;
  }

  // Assuming the last entry for today is the closing time
  const closingTime = hoursToday[hoursToday.length - 1].end;
  return convertMilitaryTimeToStandard(closingTime);
}



const Swipe = () => {
  const [businesses, setBusinesses] = useState([]);
  const [error, setError] = useState('');

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get('/api/get-businesses');
      setBusinesses(response.data.businesses);
    } catch (err) {
      setError('Failed to fetch businesses');
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
      <h1 className="mb-4">Binge</h1>
      {business ? (
        <p>{businesses.length} restaurants left</p>
      ) : (
        <p>... restaurants left</p>
      )}
      </div>
      <div className="w-full h-autoflex flex grow flex-col justify-center gap-4">
      {error && <p>{error}</p>}
      {business ? (
        <>
        
          <BusinessCard {...businessCardProps} />
          <div className="flex w-full gap-4">
            <Button type="secondary" text="No" icon={noIcon} onClick={handleNoClick} />
            <Button type="primary" text="Yes" icon={yesIcon} onClick={() => handleYesClick(business.url)} />
          </div>
        </>
      ) : (
        <h3>Loading...</h3>
      )}
      </div>
    </>
  );
};

export default Swipe;

//business.business_hours[0].open[new Date().getDay()].end