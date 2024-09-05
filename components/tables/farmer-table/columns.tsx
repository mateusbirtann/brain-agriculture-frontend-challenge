'use client';

import { Farmer } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

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
    header: 'Área Total',
    cell: ({ row }) => `${row.original.totalArea} ha`
  },
  {
    accessorKey: 'arableArea',
    header: 'Área Cultivável',
    cell: ({ row }) => `${row.original.arableArea} ha`
  },
  {
    accessorKey: 'vegetationArea',
    header: 'Área de Vegetação',
    cell: ({ row }) => `${row.original.vegetationArea} ha`
  },
  {
    accessorKey: 'crops',
    header: 'Culturas',
    cell: ({ row }) => {
      const crops = row.original.crops;
      return crops.join(', ');
    }
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
