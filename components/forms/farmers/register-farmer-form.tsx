'use client';

import React, { useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Crops } from '@/types';
import { useFarmer } from '@/context/FarmerProvider';

const formSchema = z
  .object({
    cpfCnpj: z.string().min(11).max(18),
    name: z.string().min(2).max(100),
    farmName: z.string().min(2).max(100),
    city: z.string().min(2).max(50),
    state: z.string().length(2),
    totalArea: z.number().positive(),
    arableArea: z.number().positive(),
    vegetationArea: z.number().positive(),
    crops: z.array(z.nativeEnum(Crops)).min(1)
  })
  .refine(
    (data) => {
      return data.arableArea + data.vegetationArea <= data.totalArea;
    },
    {
      message:
        'A soma da área agricultável e da área de vegetação deve ser menor ou igual à área total',
      path: ['totalArea']
    }
  );

export type FormValues = z.infer<typeof formSchema>;

export function RegisterFarmerForm() {
  const { farmer, setFarmer, resetFarmer } = useFarmer();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpfCnpj: '',
      name: '',
      farmName: '',
      city: '',
      state: '',
      totalArea: 0,
      arableArea: 0,
      vegetationArea: 0,
      crops: [] as Crops[]
    }
  });

  useEffect(() => {
    if (farmer) {
      Object.entries(farmer).forEach(([key, value]) => {
        form.setValue(key as keyof FormValues, value, {
          shouldValidate: false
        });
      });
    }
  }, [farmer, form]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      setFarmer(value as FormValues);
    });
    return () => subscription.unsubscribe();
  }, [form, setFarmer]);

  function onSubmit(values: FormValues) {
    console.log(values);
    resetFarmer();
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="cpfCnpj"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF or CNPJ</FormLabel>
              <FormControl>
                <Input
                  placeholder="000.000.000-00 ou 00.000.000/0000-00"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
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

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input maxLength={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                {Object.values(Crops).map((crop) => (
                  <FormField
                    key={crop}
                    control={form.control}
                    name="crops"
                    render={({ field: cropField }) => {
                      return (
                        <FormItem
                          key={crop}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={cropField.value.includes(crop)}
                              onCheckedChange={(checked) => {
                                const updatedValue = checked
                                  ? [...cropField.value, crop]
                                  : cropField.value.filter(
                                      (value: Crops) => value !== crop
                                    );
                                cropField.onChange(updatedValue);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{crop}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
