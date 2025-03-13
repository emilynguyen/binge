import React from 'react';

const Error = ({ error }) => {
  return (
    <p className="mt-6 mb-6 error">{error && error}</p>
  );
};

export default Error;