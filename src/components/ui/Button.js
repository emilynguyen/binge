import React from 'react';

const Button = ({ text, icon, type, onClick }) => {
  return (
    <button type="button" className={`${type} text-center`} onClick={onClick ? onClick : undefined}>
      {!icon && text} {icon && <img src={icon} alt={text} className="inline-block
" />}
    </button>
  )
};

export default Button;