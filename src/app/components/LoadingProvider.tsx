"use client";

import React from 'react';
import { SiteLoader } from './SiteLoader';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// Create context with React namespace
const LoadingContext = React.createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const contextValue = React.useMemo(
    () => ({
      isLoading,
      setIsLoading,
    }),
    [isLoading]
  );

  return (
    <LoadingContext.Provider value={contextValue}>
      {isLoading && <SiteLoader scenario="properties" />}
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook for using the loading context
export const useLoading = () => {
  const context = React.useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};