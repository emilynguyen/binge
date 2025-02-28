import React from 'react';
import Image from 'next/image';

const fullStar = "/icons/star_full_20x20.svg";
const halfStar = "/icons/star_half_20x20.svg";
const emptyStar = "/icons/star_empty_20x20.svg";

// Return array of 5 stars
const Stars = ({ rating }) => {
   function generateStarArr() {
    // Create star array and default all as empty
    const starArr = new Array(5).fill(emptyStar);

    let ratingCounter = Math.round(rating * 2) / 2;
   
    for (let i = 0; i < 5; i++) {
      // Return if counter is done
      if (ratingCounter <= 0) {
        return starArr;
      }
      
      // Check remainders when -1 to determine star
      if (ratingCounter - 1 >= 0) {
        starArr[i] = fullStar;
      } else if (ratingCounter - 1 < 0) {
        starArr[i] = halfStar;
      } else {
        starArr[i] = emptyStar;
        //return starArr;
      }
      
      ratingCounter--;
    }
    return starArr;
  }

  return (
   <div className="flex items-center">
    {rating !== undefined && generateStarArr(rating).map((star, index) => (
        <Image src={star} key={index} width="20" height="20" alt="" />
      ))}
      <p className="ml-2 mt-1">{rating}</p>
   </div>
  );
};

export default Stars;