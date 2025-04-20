'use client';

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";

import Pill from '@/components/ui/Pill';
import StarRating from '@/components/ui/StarRating';
import Transportation from '@/components/ui/Transportation';
import getClosingTimeToday from "@/utils/getClosingTimeToday";

const imageHeight = 600;


const BusinessCard = ({ business, location }) => {
    const name = business?.name || 'Loading...';

    const photo = business?.details?.photos?.[0] || {};
    const imageSize = photo.width && photo.height
        ? `${(imageHeight / photo.height) * photo.width}x${imageHeight}`
        : '';
    const image = photo.prefix && photo.suffix
        ? `${photo.prefix}${imageSize}${photo.suffix}`
        : '';

    const rating = business?.details?.rating/2 || 0;
    const categories = business?.categories || [];
    
    const price = '$'.repeat(business?.details?.price) || '';
    const city = business?.location?.locality || 'Unknown';
    const origin = location;

    const destinationCoords = business?.geocodes?.main || {};
    const destination = `${destinationCoords.latitude || 0}, ${destinationCoords.longitude || 0}`;
    
    const closing = getClosingTimeToday(business?.details?.hours || {});
    const [estimates, setEstimates] = useState(null);

    
    const fetchEstimates = async () => {  
        if (!parseFloat(origin) || !parseFloat(destination)) {
          setEstimates(null);
          return;
        }

        const res = await fetch(`/api/eta?origin=${origin}&destination=${destination}`);
            
        if (res.ok) {
          const data = await res.json();
          setEstimates(data);
        } else {
          console.error("Error fetching distance matrix");
        }
      }

        useEffect(() => {
          fetchEstimates();
        }, [origin, destination]);

  return (
    <motion.div initial={{ opacity: 0, y: 0 }} 
    animate={{ opacity: 1, y: 0 }} className="relative bg-black min-h-[29rem] max-h-[45rem] w-full h-[60vh] sm:h-[70vh] p-2 sm:p-4 rounded-2xl text-xs flex items-end overflow-hidden">
        
        <div className="w-full z-10">
            {/* Top */}
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-2 sm:mb-4">
                {categories.map((item, index) => (
                    <Pill key={index} text={item.short_name}/>
                ))}
            </div>
            {/* Bottom */}
            <div className=" items-end flex bg-cream justify-between gap-10 flex-grow p-4 sm:p-6 rounded-xl">
                {/* Bottom left */}
                <div className="text-left">
                    <h2 className="mb-4 serif text-balance">{name}</h2>
                    <div className="mb-4"><StarRating rating={rating}/></div>
                    <p className="pb-11">{city} {price && `/ ${price}`}</p>
                    <p>
                        {closing && (
                            <>
                                Closes at <span className="border-black border rounded-[50%] border-[0.0625rem] ml-1 pr-[.8rem] pl-[.8rem] pt-[.22rem] pb-[.15rem] tracking-wider">{closing}</span>
                            </>
                        )}
                    </p>
                </div>
                {/* Bottom right */}
                <div className="flex flex-col self-end items-end h[11.5rem] gap-5">
                    {['car', 'walk'].map(type => (
                        <Transportation key={type} type={type} eta={estimates && estimates[type]} />
                    ))}
                </div>
            </div> 
        </div>
        <div className="absolute z-0 bg-black w-full h-[80%] top-0 left-0 bg-top bg-cover" style={{ 
            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 51.54%, rgba(0, 0, 0, 0.60) 85.96%, #000 100%), url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "top"
        }}>
</div>
        
    </motion.div>
  );
};

export default BusinessCard;


