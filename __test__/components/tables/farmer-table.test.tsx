import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { FarmerTable } from '@/components/tables/farmer-table';
import { columns } from '@/components/tables/farmer-table/columns';
import { FarmerDataMock } from '@/__mock__/farmerDataMock';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));


jest.mock('@/context/FarmerProvider', () => ({
  useFarmer: () => ({
    setFarmer: jest.fn(),
  }),
}));

describe('FarmerTable', () => {
  it('renders the table with correct headers', () => {
    render(<FarmerTable columns={columns} data={FarmerDataMock} />);

    expect(screen.getByRole('columnheader', { name: 'Nome' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Nome da Fazenda' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Cidade' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Estado' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Área Total' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Área Cultivável' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Área de Vegetação' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Culturas' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Ações' })).toBeInTheDocument();
  });

  it('renders the correct number of rows for the first page', () => {
    render(<FarmerTable columns={columns} data={FarmerDataMock} />);

    const rows = screen.getAllByRole('row');
    const dataRows = rows.length - 1;

    expect(dataRows).toBe(10);
  });

  it('displays correct data in cells for the first row', () => {
    render(<FarmerTable columns={columns} data={FarmerDataMock} />);

    const firstRow = screen.getAllByRole('row')[1];

    expect(within(firstRow).getByText('João Silva')).toBeInTheDocument();
    expect(within(firstRow).getByText('Fazenda Boa Vista')).toBeInTheDocument();
    expect(within(firstRow).getByText('Sorriso')).toBeInTheDocument();
    expect(within(firstRow).getByText('MT')).toBeInTheDocument();
    expect(within(firstRow).getByText('2000 ha')).toBeInTheDocument();
    expect(within(firstRow).getByText('1400 ha')).toBeInTheDocument();
    expect(within(firstRow).getByText('600 ha')).toBeInTheDocument();
    expect(within(firstRow).getByText('Soja, Milho')).toBeInTheDocument();
  });

  it('handles pagination correctly', async () => {
    render(<FarmerTable columns={columns} data={FarmerDataMock} />);

    const nextButton = screen.getByRole('button', { name: 'Próximo' });
    const previousButton = screen.getByRole('button', { name: 'Anterior' });

    expect(previousButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);

    expect(previousButton).not.toBeDisabled();

    const secondPageFirstRow = screen.getAllByRole('row')[1];
    expect(within(secondPageFirstRow).getByText('Juliana Mendes')).toBeInTheDocument();


    fireEvent.click(previousButton);

    expect(previousButton).toBeDisabled();

    const firstPageFirstRow = screen.getAllByRole('row')[1];
    expect(within(firstPageFirstRow).getByText('João Silva')).toBeInTheDocument();
  });

  it('displays "Sem resultados" when there is no data', () => {
    render(<FarmerTable columns={columns} data={[]} />);

    expect(screen.getByText('Sem resultados')).toBeInTheDocument();
  });
});