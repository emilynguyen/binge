'use client'

import React, { createContext, useState, useContext } from 'react';

const HeaderVisibilityContext = createContext(undefined);

export const HeaderVisibilityProvider = ({ children }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const setHeaderHidden = () => {
    setIsHeaderVisible(false);
  };

  const setHeaderVisible = () => {
    setIsHeaderVisible(true);
  };

  return (
    <HeaderVisibilityContext.Provider value={{ isHeaderVisible, setHeaderHidden, setHeaderVisible }}>
      {children}
    </HeaderVisibilityContext.Provider>
  );
};

export const useHeaderVisibility = () => {
  const context = useContext(HeaderVisibilityContext);
  if (!context) {
    throw new Error('useHeaderVisibility must be used within a HeaderVisibilityProvider');
  }
  return context;
};