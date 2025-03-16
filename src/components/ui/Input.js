import React from 'react';


const Input = ({ type, placeholder, className, loading=false }) => {
  return (
    <input className={`${className} ${loading ? "loading" : ""}`} type={type} placeholder={placeholder}>
    </input>
  );
};

export default Input;