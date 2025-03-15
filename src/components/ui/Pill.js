import React from 'react';

const Pill = ({ text }) => {
  return (
   <div className="pill bg-cream pt-[.2rem] pr-[.7rem] pb-[.14rem] pl-[.7rem] rounded-2xl text-xs inline-block"><p>{text}</p></div>
  );
};

export default Pill;