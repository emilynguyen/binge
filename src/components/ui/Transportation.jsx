import Image from 'next/image';

const carIcon = "/icons/car_20x20.svg";
const trainIcon = "/icons/train_20x20.svg";
const walkIcon = "/icons/walk_20x20.svg";


function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


const Transportation = ({ type, time }) => {
  let src = '';
  switch (type) {
    case 'car':
      src = carIcon;
      break;
    case 'train':
      src = trainIcon;
      break;
    case 'walk':
      src = walkIcon;
      break;
    default:
      return null;
  }
  return (
  <div className="flex flex-col items-center gap-1 text-nowrap">
    <Image src={src} alt={capitalize(type)} width={20} height={20} />
    <p>{time} min</p>
  </div> )
};

export default Transportation;