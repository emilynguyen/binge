import Image from "next/image";
const restaurantIcon = "/icon/restaurant_20x20.svg";
const personIcon = "/icon/person_20x20.svg";


const SwipeHeader = ({cardsLeft, handleLeaveParty, memberCount="72" }) => {
    return (
    <div className="left-0 right-0 absolute top-0 pr-1 pl-1 text-xs mb-10">
        <div className="flex justify-between flex-row">
            <div className="text-red flex gap-6">
                <div className="flex items-center gap-1">
                    <Image src={restaurantIcon} width={20} height={20} style={{ width: '1.25rem' }}alt="Cards left: " />
                    <p>{cardsLeft} cards left</p>
                </div>
                <div className="flex items-center gap-1">
                    <Image src={personIcon} width={20} height={20} style={{ width: '1.25rem' }} alt="Cards left: " />
                    <p>{memberCount}</p>
                </div>
            </div>
        <p><a className="cursor-pointer inline-block" onClick={handleLeaveParty}>Leave party</a></p>
        </div>
    </div>
    );
};

export default SwipeHeader;
     
     
     
  