import React from 'react';


const Button = ({ text, className }) => {
  return (
    <button className={className} type="button">
        {text}
    </button>
  );
};

export default Button;