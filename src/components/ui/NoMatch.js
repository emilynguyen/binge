import Image from "next/image";
const sadIcon = "/icon/sad_80x80.svg";
import Button from '@/components/ui/Button';


const NoMatch = ({ handleTryAgain }) => {
 return (
     <>
     {/* 
     {numCards} && {eliminationCount} >= {numCards} */}
     <h1 className="mono">
       No matches<br></br>made
     </h1>
     <Image src={sadIcon} className="mt-10 mb-10" width='80' height='80'alt="Sad face" />
     <div className="w-full">
       <Button className="secondary" text="Try again" onClick={handleTryAgain}/>
     </div>  
   </>
   );
};

export default NoMatch;