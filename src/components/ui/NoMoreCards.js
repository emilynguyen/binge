import Image from "next/image";
const eyesIcon = "/icon/eyes_80x80.svg";


const NoMoreCards = ({  }) => {
 return (
   <div>
         {/* 
         {numCards} && {viewCount} == {numCards} ? */}
         <h1 className="mono">You have no<br></br>more cards</h1>
         <Image src={eyesIcon} className="mt-10 mb-10 inline-block" width={80} height={80} style={{ width: '5rem' }} alt="Eyes emoji" />
         <div className="mt-2 mb-6 text-sm loading">Waiting for a<br></br> match now</div>
       </div>
   );
};

export default NoMoreCards;