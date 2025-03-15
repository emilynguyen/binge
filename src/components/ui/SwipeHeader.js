import Image from "next/image";
const restaurantIcon = "/icon/restaurant_20x20.svg";
const personIcon = "/icon/person_20x20.svg";


const SwipeHeader = ({cardsLeft, handleLeaveParty, memberCount="72" }) => {
    return (
    <div className="mr-auto ml-auto left-0 right-0 absolute box-content top-6 pr-7 pl-7 max-w-md text-xs">
        <div className="flex justify-between flex-row">
            <div className="text-red flex gap-6">
                <div className="flex items-center gap-1">
                    <Image src={restaurantIcon} width='20' height='20'alt="Cards left: " />
                    <p>{cardsLeft}</p>
                </div>
                <div className="flex items-center gap-1">
                    <Image src={personIcon} width='20' height='20'alt="Cards left: " />
                    <p>{memberCount}</p>
                </div>
            </div>
        <p><a className="cursor-pointer inline-block" onClick={handleLeaveParty}>Leave party</a></p>
        </div>
    </div>
    );
};

export default SwipeHeader;
     
     
     
  