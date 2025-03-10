import Image from 'next/image';

const Button = ({ text, icon, alt, onClick, className }) => {
  return (
    <button
      type="button"
      className={`${className} text-center`}
      onClick={onClick ? onClick : undefined}
    >
      {icon && <Image src={icon} alt={alt || 'icon'} className="inline-block" width="40" height="40" />}
      {text && <span className="inline-block ml-2">{text}</span>}
    </button>
  );
};

export default Button;