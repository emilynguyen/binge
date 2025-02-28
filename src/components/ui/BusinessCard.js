import React from 'react';
import Pill from '@/components/ui/Pill';
import Stars from '@/components/ui/Stars';




const BusinessCard = ({ name, image, rating, price, categories, location, closing }) => {
    const css = {
        background: `
          linear-gradient(0deg, rgba(0, 0, 0, 0.00) 66.08%, rgba(2, 1, 1, 0.5) 82.66%, rgba(0, 0, 0, 0.60) 100%),
          linear-gradient(180deg, rgba(0, 0, 0, 0.00) 17.93%, rgba(0, 0, 0, 0.60) 58.97%, rgba(0, 0, 0, 0.85) 100%),
          linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(0, 0, 0, 0.65) 100%), 
          url(${image}) no-repeat center / cover`
      };
  return (
    <div className="min-h-[460px] w-full p-4 rounded-2xl flex grow flex-col justify-between" style={css}>
        {/* Top */}
        <div className="">
            <div className="ml-auto flex flex-wrap justify-end gap-2 w-[75%]">
                {categories.map((item, index) => (
                    <Pill key={index} text={item.title}/>
                ))}
            </div>
        </div>
        {/* Bottom */}
        <div className="text-left">
            <h2 className="pb-3">{name}</h2>
            <div className="mb-2"><Stars rating={rating} /></div>
            <p className="pb-14">{location} {price && `/ ${price}`}</p>
            <p>{closing && `Closes at ${closing}`}</p>
        </div>
    </div>
  );
};

export default BusinessCard;