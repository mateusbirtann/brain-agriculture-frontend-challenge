'use client'

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFarmer } from '@/context/FarmerProvider';
import { FarmerData, farmerSchema } from '@/schemas/farmerSchema';
import { createFarmer, updateFarmer } from '@/requests/farmer';
import { FormLayout } from './form-layout';
import { FormFields } from './fields';
import { useFormFarmer } from './useFormFarmer';

export function FarmersForm() {
  const router = useRouter();
  const params = useParams();
  const { farmer, resetFarmer } = useFarmer();

  const form = useForm<FarmerData>({
    resolver: zodResolver(farmerSchema),
    defaultValues: {
      cpfCnpj: '',
      name: '',
      farmName: '',
      city: '',
      state: '',
      totalArea: 0,
      arableArea: 0,
      vegetationArea: 0,
      crops: []
    }
  });

  const { isEditing, isSubmitting, setIsSubmitting } = useFormFarmer(params, farmer, resetFarmer, router, form);

  async function onSubmit(values: FarmerData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await handleUpdate(values);
      } else {
        await handleCreate(values);
      }
      router.push('/dashboard/farmers');
      router.refresh();
    } catch (error) {
      alert(`Erro ao ${isEditing ? 'atualizar' : 'criar'} produtor rural`);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleUpdate = async (values: FarmerData) => {
    const farmerId = params?.farmerId as string;
    const updatedValues = { ...values, id: farmerId };
    await updateFarmer(farmerId, updatedValues);
    alert("Produtor rural atualizado com sucesso!");
  };

  const handleCreate = async (values: FarmerData) => {
    await createFarmer(values);
    alert("Produtor rural criado com sucesso!");
  };

  return (
    <FormLayout
      form={form}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      isEditing={isEditing}
    >
      <FormFields form={form} />
    </FormLayout>
  );
}