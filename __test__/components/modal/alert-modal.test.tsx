import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AlertModal } from '@/components/modal/alert-modal';

describe('AlertModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    loading: false
  };

  it('should render the modal when isOpen is true', () => {
    render(<AlertModal {...defaultProps} />);
    expect(
      screen.getByText('Tem certeza que deseja excluir?')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Essa ação não pode ser desfeita.')
    ).toBeInTheDocument();
  });

  it('should not render the modal when isOpen is false', () => {
    render(<AlertModal {...defaultProps} isOpen={false} />);
    expect(
      screen.queryByText('Tem certeza que deseja excluir?')
    ).not.toBeInTheDocument();
  });

  it('should call onClose when the Cancelar button is clicked', () => {
    render(<AlertModal {...defaultProps} />);
    fireEvent.click(screen.getByText('Cancelar'));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('should call onConfirm when the Continuar button is clicked', () => {
    render(<AlertModal {...defaultProps} />);
    fireEvent.click(screen.getByText('Continuar'));
    expect(defaultProps.onConfirm).toHaveBeenCalled();
  });

  it('should disable buttons when loading is true', () => {
    render(<AlertModal {...defaultProps} loading={true} />);
    expect(screen.getByText('Cancelar')).toBeDisabled();
    expect(screen.getByText('Continuar')).toBeDisabled();
  });

  it('should enable buttons when loading is false', () => {
    render(<AlertModal {...defaultProps} loading={false} />);
    expect(screen.getByText('Cancelar')).toBeEnabled();
    expect(screen.getByText('Continuar')).toBeEnabled();
  });
});
