'use client';

import { motion } from "framer-motion";

import Pill from '@/components/ui/Pill';
import StarRating from '@/components/ui/StarRating';
import Transportation from '@/components/ui/Transportation';
import getClosingTimeToday from "@/utils/getClosingTimeToday";


const BusinessCard = ({ business, location }) => {
    const name = business?.name || 'Loading...';
    const image = business?.image_url || '';
    const rating = business?.rating || 0;
    const categories = business?.categories || [];
    const price = business?.price || '';
    const city = business?.location?.city || 'Unknown';
    const origin = location;
    const destination = `${business?.coordinates?.latitude || 0}, ${business?.coordinates?.longitude || 0}`;
    const closing = getClosingTimeToday(business);
    
    const css = {
        background: `
          linear-gradient(8deg, rgba(0, 0, 0, 0.00) 70%, rgba(0, 0, 0, 0.6) 90%, rgba(0, 0, 0, 0.75) 100%),
          linear-gradient(180deg, rgba(0, 0, 0, 0.00) 25%, rgba(0, 0, 0, 0.55) 55%, rgba(0, 0, 0, 0.65) 100%),
          linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.7) 100%), 
          url(${image}) no-repeat center / cover`
      };

  return (
    <motion.div initial={{ opacity: 0, y: 0 }} 
    animate={{ opacity: 1, y: 0 }} className="min-h-[460px] max-h-[640px] w-full h-full pr-5 pl-5 pt-5 pb-7 rounded-2xl flex flex-col grow justify-between text-cream text-xs" style={css}>
        {/* Top */}
        <div className="">
            <div className="ml-auto flex flex-wrap justify-end gap-2 w-[75%]">
                {categories.map((item, index) => (
                    <Pill key={index} text={item.title}/>
                ))}
            </div>
        </div>
        {/* Bottom */}
        <div className="flex justify-between gap-[4rem] flex-grow">
            {/* Bottom left */}
            <div className="text-left self-end">
                <h2 className="mb-4 serif">{name}</h2>
                <div className="mb-4"><StarRating rating={rating}/></div>
                <p className="pb-14">{city} {price && `/ ${price}`}</p>
                <p>
                    {closing && (
                        <>
                            Closes at <span className="border rounded-[50%] pr-3 pl-3 pt-[.05rem] pb-[.05rem] tracking-wider">{closing}</span>
                        </>
                    )}
                </p>
            </div>
            {/* Bottom right */}
            <div className="flex flex-col self-end items-end h[11.5rem] gap-5">
                {['car', 'train', 'walk'].map(type => (
                    <Transportation key={type} type={type} origin={origin} destination={destination} />
                ))}
            </div>
        </div>
        
    </motion.div>
  );
};

export default BusinessCard;