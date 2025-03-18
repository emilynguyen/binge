import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const carIcon = "/icon/car_20x20.svg";
const trainIcon = "/icon/train_20x20.svg";
const walkIcon = "/icon/walk_20x20.svg";

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Transportation = ({ type, eta }) => {
  let src = '';
  switch (type) {
    case 'car':
      src = carIcon;
      break;
    case 'train':
      src = trainIcon;
      break;
    case 'walk':
      src = walkIcon;
      break;
    default:
      return null;
  }

  return (
   <>
        <div className="flex flex-col items-center gap-1 w-[3rem]">
          <Image src={src} alt={capitalize(type)} width={20} height={20} style={{ width: '1.25rem' }}/>
          <p>{eta}</p>
        </div>
      </>
  );
}

export default Transportation;