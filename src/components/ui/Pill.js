import React from 'react';

const Pill = ({ text }) => {
  return (
   <div className="pill border pt-[.15rem] pr-[.5rem] pb-[.10rem] pl-[.5rem] rounded-2xl text-xs inline-block"><p>{text}</p></div>
  );
};

export default Pill;