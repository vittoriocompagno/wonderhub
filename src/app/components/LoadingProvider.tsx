"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { SiteLoader } from './SiteLoader';
import { Toaster } from "sonner";

interface LoadingContextType {
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ setIsLoading }}>
      {isLoading && <SiteLoader scenario="properties" />}
      <Toaster />
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
} 