import React, { ReactNode } from 'react';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { UseFormReturn } from 'react-hook-form';
import { FarmerData } from '@/schemas/farmerSchema';

type FormLayoutProps = {
  form: UseFormReturn<FarmerData>;
  onSubmit: (data: FarmerData) => Promise<void>;
  isSubmitting: boolean;
  isEditing: boolean;
  children: ReactNode;
};

export function FormLayout({ form, onSubmit, isSubmitting, isEditing, children }: FormLayoutProps) {

  const titleType = isEditing ? 'Editar' : 'Adicionar';
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-xl lg:mx-auto mr-auto border rounded shadow p-4 bg-white">
        <div className="flex lg:flex-row gap-4 flex-col items-start justify-between">
          <Heading
            title={`${titleType} produtor rural`}
            description={`Preencha os campos abaixo para ${titleType} um novo produtor rural.`}
          />
        </div>
        {children}
        <Button type="submit" className='w-full' disabled={isSubmitting}>
          {isSubmitting ? 'Atualizando...' : isEditing ? 'Editar' : 'Adicionar'}
        </Button>
      </form>
    </Form>
  );
}