import Image from 'next/image';

const fullStar = "/icon/star_full_20x20.svg";
const halfStar = "/icon/star_half_20x20.svg";
const emptyStar = "/icon/star_empty_20x20.svg";


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