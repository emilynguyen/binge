import React from 'react';

const Pill = ({ text }) => {
  return (
   <div className="pill border pt-[.18rem] pr-[.7rem] pb-[.12rem] pl-[.7rem] rounded-2xl text-xs inline-block"><p>{text}</p></div>
  );
};

export default Pill;