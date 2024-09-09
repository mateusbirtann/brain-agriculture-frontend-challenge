import { z } from 'zod';
import { CropType } from '@/types';
import { validateCNPJ, validateCPF } from '@/lib/utils';

export const farmerSchema = z.object({
  cpfCnpj: z.string()
    .min(11, "CPF/CNPJ deve ter no mínimo 11 caracteres")
    .max(18, "CPF/CNPJ deve ter no máximo 18 caracteres")
    .refine((value) => {
      const numbers = value.replace(/\D/g, '');
      if (numbers.length === 11) {
        return validateCPF(numbers);
      } else if (numbers.length === 14) {
        return validateCNPJ(numbers);
      }
      return false;
    }, {
      message: "CPF ou CNPJ inválido"
    }),
  name: z.string()
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  farmName: z.string()
    .min(2, "Nome da fazenda deve ter no mínimo 2 caracteres")
    .max(100, "Nome da fazenda deve ter no máximo 100 caracteres"),
  city: z.string()
    .min(2, "Cidade deve ter no mínimo 2 caracteres")
    .max(50, "Cidade deve ter no máximo 50 caracteres"),
  state: z.string()
    .length(2, "Estado deve ser representado por 2 caracteres"),
  totalArea: z.number()
    .positive("Área total deve ser um número positivo"),
  arableArea: z.number()
    .positive("Área agricultável deve ser um número positivo"),
  vegetationArea: z.number()
    .positive("Área de vegetação deve ser um número positivo"),
  crops: z.array(z.nativeEnum(CropType))
    .min(1, "Pelo menos uma cultura é necessária"),
}).refine(
  (data) => data.arableArea + data.vegetationArea <= data.totalArea,
  {
    message: 'A soma da área agricultável e da área de vegetação deve ser menor ou igual à área total',
    path: ['totalArea']
  }
);

export type FarmerData = z.infer<typeof farmerSchema>;