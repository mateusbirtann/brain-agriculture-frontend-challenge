'use client';

import { FormValues } from '@/components/forms/farmers/register-farmer-form';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface FarmerContextType {
  farmer: FormValues | null;
  setFarmer: (farmer: FormValues | null) => void;
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
  const [farmer, setFarmerState] = useState<FormValues | null>(() => {
    if (typeof window !== 'undefined') {
      const savedFarmer = localStorage.getItem('farmerData');
      return savedFarmer ? JSON.parse(savedFarmer) : null;
    }
    return null;
  });

  useEffect(() => {
    if (farmer) {
      localStorage.setItem('farmerData', JSON.stringify(farmer));
    } else {
      localStorage.removeItem('farmerData');
    }
  }, [farmer]);

  const setFarmer = (newFarmer: FormValues | null) => {
    setFarmerState(newFarmer);
  };

  const resetFarmer = () => {
    setFarmerState(null);
    localStorage.removeItem('farmerData');
  };

  return (
    <FarmerContext.Provider value={{ farmer, setFarmer, resetFarmer }}>
      {children}
    </FarmerContext.Provider>
  );
};
