import React from 'react';


const Button = ({ text , type }) => {
  return (
    <button type="button" className={type}>
        {text}
    </button>
  );
};

export default Button;