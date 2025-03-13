import Image from "next/image";
import Button from '@/components/ui/Button';
const logo = "/brand/binge_logo.svg";
const credit = "/brand/binge_credit.svg";

const Intro = ({ handleCloseIntro }) => {
  return (
    <>
           <div className="bg-cream h-16 w-full absolute top-0">&nbsp;</div>
           <div className="bg-cream h-16 w-full absolute bottom-0">&nbsp;</div>
           <Image className="mb-6" src={logo} width="196" height="64" alt="Binge"/>
           <p className="max-w-xs">Swipe through restaurants until there’s a match — no chit-chat, no negotiation.</p>
           <Button className="secondary mb-16 mt-16" arrow={true} onClick={handleCloseIntro}/>
           <a href="http://emilynguyen.co/" target="_blank">
             <Image src={credit} width="89" height="77" alt="Made with <3 by Emily"/>
           </a>
       
         </>
  );
};

export default Intro;