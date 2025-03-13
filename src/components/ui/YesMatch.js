import Image from "next/image";
const smileyRedIcon = "/icons/smiley_red_40x40.svg";
const yelpIcon = "/icons/yelp_red_40x40.svg";
const mapsIcon = "/icons/google-maps_red_40x40.svg";
import Button from '@/components/ui/Button';

  const handleYelpClick = (business) => {
    window.open(business.url, '_blank');
  };

  const handleGoogleMapsClick = (business) => {
    const encodedAddress = encodeURIComponent(business.name);
    const url = `http://maps.google.com/?q=${encodedAddress}`;
    window.open(url, '_blank');
  };

const YesMatch = ({ business, handleTryAgain, handleLeaveParty }) => {
  return (
     <>
     <div>
       <h1 className="serif inline">{business.name}</h1>
       <h1 className="inline"> is a match!</h1>
     </div>
     <Image src={smileyRedIcon} className="mt-8 mb-8" width='80' height='80'alt="Smiley face" />
       <div>
         <Button className="mb-4 tertiary" text="View on Yelp" icon={yelpIcon} onClick={() => {handleYelpClick(business)}}/>
         <Button className="mb-4 tertiary" text="Open in Google Maps" icon={mapsIcon} onClick={() => {handleGoogleMapsClick(business)}}/>
         <div className="mt-12 text-sm">
           <a className="cursor-pointer" onClick={handleTryAgain}>Try again</a> /&nbsp;
           <a className="cursor-pointer" onClick={handleLeaveParty}>Leave party</a>
         </div>
       </div>
     </>
   );
};

export default YesMatch;