'use client';

import { Farmer } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Farmer>[] = [
  {
    accessorKey: 'name',
    header: 'Nome'
  },
  {
    accessorKey: 'farmName',
    header: 'Nome da Fazenda'
  },
  {
    accessorKey: 'city',
    header: 'Cidade'
  },
  {
    accessorKey: 'state',
    header: 'Estado'
  },
  {
    accessorKey: 'totalArea',
    header: 'Área Total'
  },
  {
    accessorKey: 'arableArea',
    header: 'Área Cultivável'
  },
  {
    accessorKey: 'vegetationArea',
    header: 'Área de Vegetação'
  }
];
