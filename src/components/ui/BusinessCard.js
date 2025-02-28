import React from 'react';
import { motion } from "framer-motion";

import Pill from '@/components/ui/Pill';
import StarRating from '@/components/ui/StarRating';
import Transportation from '@/components/ui/Transportation';



const BusinessCard = ({ name, image, rating, price, categories, location, closing }) => {
    const css = {
        background: `
          linear-gradient(8deg, rgba(0, 0, 0, 0.00) 70%, rgba(0, 0, 0, 0.6) 90%, rgba(0, 0, 0, 0.75) 100%),
          linear-gradient(180deg, rgba(0, 0, 0, 0.00) 25%, rgba(0, 0, 0, 0.60) 70%, rgba(0, 0, 0, 0.60) 100%),
          linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.7) 100%), 
          url(${image}) no-repeat center / cover`
      };

  return (
    <motion.div initial={{ opacity: 0, y: 0 }} 
    animate={{ opacity: 1, y: 0 }} className="min-h-[460px] w-full pr-4 pl-4 pt-4 pb-4 rounded-2xl flex grow flex-col justify-between" style={css}>
        {/* Top */}
        <div className="">
            <div className="ml-auto flex flex-wrap justify-end gap-2 w-[75%]">
                {categories.map((item, index) => (
                    <Pill key={index} text={item.title}/>
                ))}
            </div>
        </div>
        {/* Bottom */}
        <div className="flex justify-between gap-[6rem]">
            {/* Bottom left */}
            <div className="text-left">
                <h2 className="mb-3">{name}</h2>
                <div className="mb-3"><StarRating rating={rating}/></div>
                <p className="pb-14">{location} {price && `/ ${price}`}</p>
                <p>
                    {closing && (
                        <>
                            Closes at <span className="border rounded-[50%] pr-3 pl-3 pt-[.05rem] pb-[.05rem] tracking-wider">{closing}</span>
                        </>
                    )}
                </p>
            </div>
            {/* Bottom right */}
            <div className="flex flex-col items-center justify-end gap-5">
                <Transportation type="car" time="10"/>
                <Transportation type="train" time="10"/>
                <Transportation type="walk" time="10"/>
            </div>
        </div>
        
    </motion.div>
  );
};

export default BusinessCard;