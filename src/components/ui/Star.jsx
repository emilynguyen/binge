import Image from 'next/image';

const fullStar = "/icons/star_full_20x20.svg";
const halfStar = "/icons/star_half_20x20.svg";
const emptyStar = "/icons/star_empty_20x20.svg";


const Star = ({ type }) => {
  let src = '';
  switch (type) {
    case 'full':
      src = fullStar;
      break;
    case 'half':
      src = halfStar;
      break;
    case 'empty':
      src = emptyStar;
      break;
    default:
      return null;
  }
  return <Image src={src} alt={`${type} star`} width={20} height={20} />;
};

export default Star;