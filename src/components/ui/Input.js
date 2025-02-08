import React from 'react';


const Input = ({ text, type, placeholder, className }) => {
  return (
    <input className={className} type={type} placeholder={placeholder}>
        {text}
    </input>
  );
};

export default Input;