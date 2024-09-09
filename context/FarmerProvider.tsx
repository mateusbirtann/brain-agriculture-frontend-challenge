'use client';

import { FarmerData } from '@/schemas/farmerSchema';
import React, { createContext, useContext, useState } from 'react';

interface FarmerContextType {
  farmer: FarmerData | null;
  setFarmer: (farmer: FarmerData | null) => void;
  resetFarmer: () => void;
}

const FarmerContext = createContext<FarmerContextType | undefined>(undefined);

export const useFarmer = () => {
  const context = useContext(FarmerContext);
  if (!context) {
    throw new Error('useFarmer must be used within a FarmerProvider');
  }
  return context;
};

export const FarmerProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [farmer, setFarmerState] = useState<FarmerData | null>(null);

  const setFarmer = (newFarmer: FarmerData | null) => {
    setFarmerState(newFarmer);
  };

  const resetFarmer = () => {
    setFarmerState(null);
  };

  return (
    <FarmerContext.Provider value={{ farmer, setFarmer, resetFarmer }}>
      {children}
    </FarmerContext.Provider>
  );
};