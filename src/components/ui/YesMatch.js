import Image from "next/image";
const smileyRedIcon = "/icon/smiley_80x80.svg";
const yelpIcon = "/icon/yelp_40x40.svg";
const mapsIcon = "/icon/google-maps_40x40.svg";
import Button from '@/components/ui/Button';



const YesMatch = ({ business, origin, handleTryAgain }) => {
  const handleYelpClick = (business) => {
    window.open(business.url, '_blank');
  };

  const handleGoogleMapsClick = (business) => {
    const destinationAddress = business.location.formatted_address;
    const destination = business.name + ", " + destinationAddress;
   // const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&origin=${encodeURIComponent(origin)}`

   const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)},${encodeURIComponent(destinationAddress)}`;

    window.open(url, '_blank');
  };
  
  return (
     <>
     <div>
       <h1 className="inline italic text-balance">{business.name}</h1>
       <h1 className="inline mono"> is a match!</h1>
     </div>
     <Image src={smileyRedIcon} className="mt-10 mb-10" width={80} height={80} style={{ width: '5rem' }} alt="Smiley face" />
       <div className="w-full">
        {/* 
         <Button className="mb-4 primary" text="View on Yelp" icon={yelpIcon} onClick={() => {handleYelpClick(business)}}/>
         */}
         <Button className="mb-4 primary" text="Open in Google Maps" icon={mapsIcon} onClick={() => {handleGoogleMapsClick(business)}}/>
         <div className="mt-10 text-sm">
           <a className="cursor-pointer" onClick={handleTryAgain}>Try again</a>
         </div>
       </div>
     </>
   );
};

export default YesMatch;