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
      <div className="flex flex-col relative justify-center items-center gap-6 pl-10 pr-10">
          {/* Text */}
          <Image src={logo} width={126} height={66} style={{ width: '7.875rem' }} alt="Binge"/>
          <h3 className="max-w-xs">Swipe through restaurants until there’s a match — no chit-chat, no negotiation.</h3>
          <a className="cursor-pointer underline lg:hidden" onClick={handleCloseIntro}>
          Start &#x2192;
          </a>
          <a className="mt-24 hover:opacity-70 transition duration-100" href="http://emilynguyen.co/" target="_blank">
            <Image src={credit} width={89} height={77} style={{ width: '5.5625rem' }} alt="Made with <3 by Emily"/>
          </a>
          {/* Illustrations */}
          <div className="absolute z-0 h-full w-full pointer-events-none">
              <Image 
                className="absolute mt-[-16rem] ml-[-1rem]" src={sticker1} 
                width={226} 
                height={188} 
                alt=""
                style={{ width: '14.125rem' }}
              />
              <Image 
                className="absolute right-0 mr-[-1rem] mt-[-10rem]" 
                src={sticker2} 
                width={138} 
                height={129} 
                alt=""
                style={{ width: '8.625rem' }}
              />
              <Image 
                className="absolute bottom-0 ml-[-1rem] mb-[-10rem]" 
                src={sticker3} 
                width={129} 
                height={127} 
                alt=""
                style={{ width: '8.0625rem' }}
              />
              <Image 
                className="absolute right-0 bottom-0 mr-[3rem] mb-[-16rem]" 
                src={sticker4} 
                width={178} 
                height={132} 
                alt=""
                style={{ width: '11.125rem' }}
              />
          </div>
      </div>
    </div>
  );
};

export default Intro;