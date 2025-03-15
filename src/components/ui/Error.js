import React from 'react';
import Image from 'next/image';

const errorIcon = "/icon/error_20x20.svg";




const Error = ({ error, mb="6", mt="6" }) => {
  if (!error) return;
  return (
    <p className={`error mt-${mt} mb-${mb} text-xs`}><Image src={errorIcon} width={20} height={20} alt="!" className="inline-block mt-[-.14rem] mr-2" />{error && error}</p>
  );
};

export default Error;