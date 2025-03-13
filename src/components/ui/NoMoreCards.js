import Image from "next/image";
const eyesIcon = "/icons/eyes_40x40.svg";


const NoMoreCards = ({  }) => {
 return (
   <div>
         {/* 
         {numCards} && {viewCount} == {numCards} ? */}
         <h1>You have no<br></br>more cards</h1>
         <Image src={eyesIcon} className="mt-8 mb-8 inline-block" width='80' height='80'alt="Eyes emoji" />
         <div className="mt-2 mb-6 text-sm">Waiting for a match...</div>
       </div>
   );
};

export default NoMoreCards;