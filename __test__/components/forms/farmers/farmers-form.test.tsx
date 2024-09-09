import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter, useParams } from 'next/navigation';
import { useFarmer } from '@/context/FarmerProvider';
import { createFarmer } from '@/requests/farmer';
import { FarmersForm } from '@/components/forms/farmers/farmers-form';
import { CropType } from '@/types';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock('@/context/FarmerProvider', () => ({
  useFarmer: jest.fn(),
}));

jest.mock('@/requests/farmer', () => ({
  createFarmer: jest.fn(),
  updateFarmer: jest.fn(),
}));

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('FarmersForm', () => {
  const mockPush = jest.fn();
  const mockRefresh = jest.fn();
  window.alert = jest.fn();

  beforeAll(() => {
    global.ResizeObserver = ResizeObserver;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
    });
    (useParams as jest.Mock).mockReturnValue({ farmerId: 'new' });
    (useFarmer as jest.Mock).mockReturnValue({
      farmer: null,
      resetFarmer: jest.fn(),
    });
  });

  it('submits the form to create a farmer', async () => {
    render(<FarmersForm />);

    await userEvent.type(screen.getByLabelText(/CPF ou CNPJ/i), "00186736002");
    await userEvent.type(screen.getByLabelText(/Nome do produtor/i), "John Doe");
    await userEvent.type(screen.getByLabelText(/Nome da fazenda/i), "Fazenda Teste");
    await userEvent.type(screen.getByLabelText(/Cidade/i), "São Paulo");
    await userEvent.type(screen.getByLabelText(/Estado/i), "SP");
    await userEvent.type(screen.getByLabelText(/Área total da fazenda/i), "1000");
    await userEvent.type(screen.getByLabelText(/Área agricultável/i), "800");
    await userEvent.type(screen.getByLabelText(/Área de vegetação/i), "200");

    await userEvent.click(screen.getByLabelText('Soja'));
    await userEvent.click(screen.getByLabelText('Milho'));

    await userEvent.click(screen.getByRole('button', { name: /Adicionar/i }));

    await waitFor(() => {
      expect(createFarmer).toHaveBeenCalledWith({
        cpfCnpj: "001.867.360-02",
        name: "John Doe",
        farmName: "Fazenda Teste",
        city: "São Paulo",
        state: "SP",
        totalArea: 1000,
        arableArea: 800,
        vegetationArea: 200,
        crops: [CropType.Soja, CropType.Milho],
      });
      expect(mockPush).toHaveBeenCalledWith('/dashboard/farmers');
      expect(mockRefresh).toHaveBeenCalled();
    });
  });
});