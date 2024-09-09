import { Icons } from '@/components/icons';
import { CropType } from '@prisma/client';

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
  crops: CropType[];
}

export { CropType };

export enum Crops {
  Soja = "Soja",
  Milho = "Milho",
  Algodao = "Algodão",
  Cafe = "Café",
  CanaDeAcucar = "Cana de Açúcar"
}

export interface Crop {
  id: string;
  name: Crops;
}

export const CropsMapping: { [key in Crops]: CropType } = {
  [Crops.Soja]: CropType.Soja,
  [Crops.Milho]: CropType.Milho,
  [Crops.Algodao]: CropType.Algodao,
  [Crops.Cafe]: CropType.Cafe,
  [Crops.CanaDeAcucar]: CropType.CanaDeAcucar
};

export type GetRequestResponse<T> = { ok: boolean; data: T };
export type PostRequestResponse<T> = { ok: boolean; status: number; data: T };
export type PutRequestResponse<T> = { ok: boolean; status: number; data: T };
export type DeleteRequestResponse<T> = { ok: boolean; status: number; data: T };

export declare namespace FarmerRequest {

  namespace Get {
    type Response = Farmer[];
  }
  namespace Create {
    type Request = {
      cpfCnpj: string;
      name: string;
      farmName: string;
      city: string;
      state: string;
      totalArea: number;
      arableArea: number;
      vegetationArea: number;
      crops: CropType[];
    };
    type Response = Farmer;
  }

  namespace Update {
    type Request = {
      id: string;
      cpfCnpj: string;
      name: string;
      farmName: string;
      city: string;
      state: string;
      totalArea: number;
      arableArea: number;
      vegetationArea: number;
      crops: CropType[];
    };
    type Response = Farmer;
  }
  namespace Delete {
    type Request = {
      id: string;
    };
    type Response = Farmer;
  }
}

export interface FarmStateDashboardData {
  state: string;
  _count: {
    _all: number;
  };
}
export interface DashboardData {
  totalFarms: number;
  totalHectares: number;
  farmsByState: FarmsByState[];
  farmsByCrop: FarmsByCrop[];
  landUse: LandUse;
}

export interface FarmsByState {
  state: string;
  count: number;
}

export interface FarmsByCrop {
  name: string;
  count: number;
}

export interface LandUse {
  arableArea: number;
  vegetationArea: number;
}

