import React from 'react';


const Header = ({ text={} }) => {
  return (
    <header className="absolute top-6">
        <h5>{text}</h5>
    </header>
  );
};

export default Header;