import React from 'react';

const Error = ({ error, mb="6", mt="6" }) => {
  return (
    <p className={`error mt-${mt} mb-${mb}`}>{error && error}</p>
  );
};

export default Error;