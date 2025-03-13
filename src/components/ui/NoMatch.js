import Image from "next/image";
const sadIcon = "/icons/sad_red_40x40.svg";
import Button from '@/components/ui/Button';


const NoMatch = ({ handleTryAgain, handleLeaveParty }) => {
 return (
     <>
     {/* 
     {numCards} && {eliminationCount} >= {numCards} */}
     <h1>
       No matches<br></br>made
     </h1>
     <Image src={sadIcon} className="mt-8 mb-8" width='80' height='80'alt="Sad face" />
     <div>
       <Button className="secondary" text="Try again" onClick={handleTryAgain}/>
       <a className="cursor-pointer text-sm mt-12 inline-block" onClick={handleLeaveParty}>Leave party</a>
     </div>  
   </>
   );
};

export default NoMatch;