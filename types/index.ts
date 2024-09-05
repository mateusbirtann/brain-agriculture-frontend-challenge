import { Icons } from '@/components/icons';

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}
export interface Farmer {
  id: string;
  cpfCnpj: string;
  name: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  crops: Crops[];
}

export enum Crops {
  Soja = 'Soja',
  Milho = 'Milho',
  Algodao = 'Algodão',
  Cafe = 'Café',
  CanaDeAcucar = 'Cana de Açúcar'
}
