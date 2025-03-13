import Image from 'next/image';
const arrowIcon = "/icons/arrow_right_40x40.svg";


const Button = ({ text, icon, alt, onClick, className, arrow }) => {
  if (arrow) {
    return (
      <button
      type="button"
      className={`${className} flex items-center justify-center w-[4.5rem] h-[4.5rem] p-0`}
      onClick={onClick ? onClick : undefined} 
    >
      <Image src={arrowIcon} alt="Arrow" width="40" height="40"/>
    </button>
    );
  }
  return (
    <button
      type="button"
      className={`${className} text-center`}
      onClick={onClick ? onClick : undefined}
    >
      {icon && <Image src={icon} alt={alt || 'icon'} className="inline-block" width="40" height="40" />}
      {text && <span className={`inline-block ${icon ? 'ml-2' : ''}`}>{text}</span>}
    </button>
  );
};

export default Button;