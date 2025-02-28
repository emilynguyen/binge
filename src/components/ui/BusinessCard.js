import React from 'react';
import { motion } from "framer-motion";

import Pill from '@/components/ui/Pill';
import StarRating from '@/components/ui/StarRating';
import Transportation from '@/components/ui/Transportation';



const BusinessCard = ({ name, image, rating, price, categories, location, closing }) => {
    const css = {
        background: `
          linear-gradient(0deg, rgba(0, 0, 0, 0.00) 66.08%, rgba(2, 1, 1, 0.5) 82.66%, rgba(0, 0, 0, 0.60) 100%),
          linear-gradient(180deg, rgba(0, 0, 0, 0.00) 17.93%, rgba(0, 0, 0, 0.60) 58.97%, rgba(0, 0, 0, 0.85) 100%),
          linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(0, 0, 0, 0.65) 100%), 
          url(${image}) no-repeat center / cover`
      };

  return (
    <motion.div initial={{ opacity: 0, y: 0 }} 
    animate={{ opacity: 1, y: 0 }} className="min-h-[460px] w-full pr-4 pl-4 pt-6 pb-6 rounded-2xl flex grow flex-col justify-between" style={css}>
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