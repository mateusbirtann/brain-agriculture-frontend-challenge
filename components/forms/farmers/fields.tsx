import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { CropType } from '@/types';
import { UseFormReturn } from 'react-hook-form';
import { FarmerData } from '@/schemas/farmerSchema';

const CROP_OPTIONS = Object.values(CropType);

const CropMapping = {
  [CropType.Soja]: 'Soja',
  [CropType.CanaDeAcucar]: 'Cana de Açúcar',
  [CropType.Cafe]: 'Café',
  [CropType.Algodao]: 'Algodão',
  [CropType.Milho]: 'Milho'
};

interface FormFieldsProps {
  form: UseFormReturn<FarmerData>;
}

function maskCpfCnpj(value: string): string {
  const numbers = value.replace(/\D/g, '');
  
  if (numbers.length <= 11) {
    // CPF mask
    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    // CNPJ mask
    return numbers
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 18);
  }
}

export function FormFields({ form }: FormFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="cpfCnpj"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CPF ou CNPJ</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={maskCpfCnpj(field.value)}
                onChange={(e) => {
                  const maskedValue = maskCpfCnpj(e.target.value);
                  field.onChange(maskedValue);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="name"
        data-testid="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome do produtor</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="farmName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome da fazenda</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className='flex flex-col sm:flex-row gap-4'>
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input
                  className='w-full'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input
                  className='w-full'
                  maxLength={2}
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="totalArea"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Área total da fazenda (hectares)</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="arableArea"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Área agricultável (hectares)</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="vegetationArea"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Área de vegetação (hectares)</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="crops"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Culturas plantadas</FormLabel>
            <div className="space-y-2">
              {CROP_OPTIONS.map((crop) => (
                <FormItem
                  key={crop}
                  className="flex flex-row items-start space-x-3 space-y-0"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value.includes(crop)}
                      onCheckedChange={(checked) => {
                        const updatedValue = checked
                          ? [...field.value, crop]
                          : field.value.filter((value) => value !== crop);
                        field.onChange(updatedValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{CropMapping[crop]}</FormLabel>
                </FormItem>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}