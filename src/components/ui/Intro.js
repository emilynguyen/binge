import Image from "next/image";

const logo = "/brand/binge_logo.svg";
const credit = "/brand/binge_credit.svg";
const sticker1 = "/illustration/sticker_1.svg";
const sticker2 = "/illustration/sticker_2.svg";
const sticker3 = "/illustration/sticker_3.svg";
const sticker4 = "/illustration/sticker_4.svg";


const Intro = ({ handleCloseIntro=null, className="" }) => {
  return (
    <div className={`intro h-full bg-red text-cream flex flex-col justify-center text-center overflow-hidden ${className}`}>
      <div className="flex flex-col relative h-full justify-center items-center gap-6 pl-10 pr-10">
          {/* Text */}
          <Image src={logo} width={88} height={46} style={{ width: '5.5rem' }} alt="Binge"/>
          <h3 className="max-w-xs">Swipe through restaurants until there’s a match — no chit-chat, no negotiation.</h3>
          <a className="cursor-pointer underline lg:hidden" onClick={handleCloseIntro}>
          Start &#x2192;
          </a>
          <a className="mt-20 hover:opacity-70 transition duration-100" href="http://emilynguyen.co/" target="_blank">
            <Image src={credit} width={89} height={77} style={{ width: '5.5625rem' }} alt="Made with <3 by Emily"/>
          </a>
          {/* Illustrations */}
          <div className="absolute z-0 pointer-events-none h-screen w-screen lg:h-full lg:w-full">
            <Image 
              className="absolute mt-[-16rem] ml-[-1rem] mt-[1rem] sm:mt-[2rem] w-[10rem] sm:w-[14.125rem]" 
              src={sticker1} 
              width={226} 
              height={188} 
              alt=""
            />
            <Image 
              className="absolute right-0 mr-[-1rem] mt-[-10rem] mt-[4rem] w-[6.1rem] sm:w-[8.625rem]" 
              src={sticker2} 
              width={138} 
              height={129} 
              alt=""
            />
            <Image 
              className="absolute bottom-0 ml-[-1rem] mb-[-10rem] mb-[7rem] w-[5.7rem] sm:w-[8.0625rem]" 
              src={sticker3} 
              width={129} 
              height={127} 
              alt=""
            />
            <Image 
              className="absolute right-0 bottom-0 mr-[1rem] sm:mr-[3rem] mb-[-16rem] mb-[1rem] sm:mb-[2rem] w-[8rem] sm:w-[11.125rem]" 
              src={sticker4} 
              width={178} 
              height={132} 
              alt=""
            />
          </div>
      </div>
    </div>
  );
};

export default Intro;