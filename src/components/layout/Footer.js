import React from 'react';


const Footer = ({ text, className }) => {
  return (
    <footer className={className}>
        <p className="text-xs">Made with &hearts;&#xFE0E; by <a href="http://emilynguyen.co/" target="blank">Emily</a></p>
    </footer>
  );
};

export default Footer;