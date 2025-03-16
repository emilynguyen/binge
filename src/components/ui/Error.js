import React from 'react';
import Image from 'next/image';

const errorIcon = "/icon/error_20x20.svg";




const Error = ({ error, mb="6", mt="6" }) => {
  if (!error) return;

  let errorMessage = error;
  
  if (typeof error != 'string') {
    errorMessage = error.message;
  }
  
  return (
    <p className={`error mt-${mt} mb-${mb} text-xs`}><Image src={errorIcon} width={20} height={20} style={{ width: '1.25rem' }} alt="" className="inline-block mt-[-.16rem] mr-2" />{errorMessage && errorMessage}</p>
  );
};

export default Error;