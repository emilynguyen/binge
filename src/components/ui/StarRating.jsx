import React from 'react';
import Star from "@/components/ui/Star";


// Return array of 5 stars
const StarRating = ({ rating }) => {
   function generateStarArr() {
    // Create star array and default all as empty
    const starArr = new Array(5).fill("empty");

    let ratingCounter = Math.round(rating * 2) / 2;
   
    for (let i = 0; i < 5; i++) {
      // Return if counter is done
      if (ratingCounter <= 0) {
        return starArr;
      }
      
      // Check remainders when -1 to determine star
      if (ratingCounter - 1 >= 0) {
        starArr[i] = "full";
      } else if (ratingCounter - 1 < 0) {
        starArr[i] = "half";
      } else {
        starArr[i] = "empty";
        //return starArr;
      }
      
      ratingCounter--;
    }
    return starArr;
  }

  return (
   <div className={`flex items-center`}>
    {rating !== undefined && generateStarArr(rating).map((starType, index) => (
        <Star key={index} type={starType} />
      ))}
      {/* <p className="ml-2 mt-1">{rating}</p> */}
   </div>
  );
};

export default StarRating;