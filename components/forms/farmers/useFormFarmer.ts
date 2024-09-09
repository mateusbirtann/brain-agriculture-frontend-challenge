import { useState, useEffect, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FarmerData } from '@/schemas/farmerSchema';
import { CropType } from '@/types';

interface Params {
  farmerId?: string;
}

export function useFormFarmer(
  params: Params,
  farmer: FarmerData | null,
  resetFarmer: () => void,
  router: any,
  form: UseFormReturn<FarmerData>
) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const populateForm = useCallback(() => {
    if (!farmer) return;
    Object.entries(farmer).forEach(([key, value]) => {
      if (key === 'crops') {
        const cropsEnum = (value as string[]).map(crop => crop as CropType);
        form.setValue('crops', cropsEnum);
      } else {
        form.setValue(key as keyof FarmerData, value as any, {
          shouldValidate: false
        });
      }
    });
  }, [farmer, form]);

  useEffect(() => {
    const farmerId = params?.farmerId;

    const handleNewFarmer = () => {
      setIsEditing(false);
      resetFarmer();
    };

    const handleExistingFarmer = () => {
      setIsEditing(true);
      populateForm();
    };

    if (!farmerId) {
      router.push('/dashboard/farmer');
      return;
    }

    if (farmerId === "new") {
      handleNewFarmer();
      return;
    }

    if (farmer) {
      handleExistingFarmer();
    } else {
      router.push('/dashboard/farmer');
    }
  }, [params, farmer, resetFarmer, router, populateForm]);

  return { isEditing, isSubmitting, setIsSubmitting, populateForm };
}