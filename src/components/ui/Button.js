import React from 'react';
import Image from 'next/image';


const Button = ({ text, icon, onClick, className }) => {
  return (
    <button type="button" className={`${className} text-center `} onClick={onClick ? onClick : undefined}>
      {!icon && text} {icon && <Image src={icon} alt={text} className="inline-block" width="40" height="40" />}
    </button>
  )
};

export default Button;