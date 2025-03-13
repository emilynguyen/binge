import Image from "next/image";
const restaurantIcon = "/icons/restaurant_20x20.svg";

const SwipeHeader = ({cardsLeft, handleLeaveParty }) => {
    return (
    <div className="mr-auto ml-auto left-0 right-0 absolute box-content top-6 pr-7 pl-7 max-w-md text-xs">
        <div className="flex justify-between flex-row">
        <div className="flex items-center gap-2">
            <Image src={restaurantIcon} width='20' height='20'alt="Cards left: " />
            <p>{cardsLeft}</p>
        </div>
        <p><a className="cursor-pointer inline-block" onClick={handleLeaveParty}>Leave party</a></p>
        </div>
    </div>
    );
};

export default SwipeHeader;
     
     
     
  