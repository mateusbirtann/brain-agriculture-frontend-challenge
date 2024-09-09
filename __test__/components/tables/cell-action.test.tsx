import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useFarmer } from '@/context/FarmerProvider';
import { useRouter } from 'next/navigation';
import { deleteFarmer } from '@/requests/farmer';
import { CellAction } from '@/components/tables/farmer-table/cell-action';
import { FarmerDataMock } from '@/__mock__/farmerDataMock';

const farmer = FarmerDataMock[0];

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

jest.mock('@/context/FarmerProvider', () => ({
  useFarmer: jest.fn()
}));

jest.mock('@/requests/farmer', () => ({
  deleteFarmer: jest.fn()
}));

jest.mock('@/components/modal/alert-modal', () => ({
  AlertModal: ({ isOpen, onClose, onConfirm }: { isOpen: boolean, onClose: () => void, onConfirm: () => void }) => 
    isOpen ? (
      <div data-testid="alert-modal">
        <button onClick={onClose}>Cancelar</button>
        <button onClick={onConfirm}>Confirmar</button>
      </div>
    ) : null
}));

describe('CellAction', () => {
  const mockRouter = {
    push: jest.fn(),
    refresh: jest.fn()
  };
  const mockSetFarmer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useFarmer as jest.Mock).mockReturnValue({ setFarmer: mockSetFarmer });
  });

  it('renders the dropdown menu trigger', () => {
    render(<CellAction data={farmer} />);
    expect(screen.getByRole('button', { name: /abrir menu/i })).toBeInTheDocument();
  });

  it('calls handleEdit when Edit option is clicked', async () => {
    render(<CellAction data={farmer} />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /abrir menu/i }));
    
    await waitFor(() => {
      expect(document.body).toHaveTextContent('Editar');
    });

    await user.click(screen.getByText('Editar'));

    expect(mockSetFarmer).toHaveBeenCalledWith(farmer);
    expect(mockRouter.push).toHaveBeenCalledWith(`/dashboard/farmers/${farmer.id}`);
  });

  it('opens the delete confirmation modal when Delete is clicked', async () => {
    render(<CellAction data={farmer} />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /abrir menu/i }));
    
    await waitFor(() => {
      expect(document.body).toHaveTextContent('Excluir');
    });

    await user.click(screen.getByText('Excluir'));

    expect(screen.getByTestId('alert-modal')).toBeInTheDocument();
  });

  it('calls deleteFarmer and refreshes the page on delete confirmation', async () => {
    (deleteFarmer as jest.Mock).mockResolvedValue(undefined);

    render(<CellAction data={farmer} />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /abrir menu/i }));
    
    await waitFor(() => {
      expect(document.body).toHaveTextContent('Excluir');
    });

    await user.click(screen.getByText('Excluir'));
    
    await waitFor(() => {
      expect(screen.getByTestId('alert-modal')).toBeInTheDocument();
    });
    
    await user.click(screen.getByText('Confirmar'));

    await waitFor(() => {
      expect(deleteFarmer).toHaveBeenCalledWith(farmer.id);
      expect(mockRouter.refresh).toHaveBeenCalled();
    });
  });

  it('shows an alert on delete error', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (deleteFarmer as jest.Mock).mockRejectedValue(new Error('Delete failed'));
    
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<CellAction data={farmer} />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /abrir menu/i }));
    
    await waitFor(() => {
      expect(document.body).toHaveTextContent('Excluir');
    });

    await user.click(screen.getByText('Excluir'));
    
    await waitFor(() => {
      expect(screen.getByTestId('alert-modal')).toBeInTheDocument();
    });
    
    await user.click(screen.getByText('Confirmar'));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Erro ao excluir o agricultor, Error: Delete failed');
    });

    consoleErrorSpy.mockRestore();
    alertMock.mockRestore();
  });
});