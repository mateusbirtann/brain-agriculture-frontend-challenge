import { render, screen } from '@testing-library/react';
import Header from '@/components/layout/header';

describe('Header Component', () => {
  it('renders without crashing', () => {
    render(<Header />);
  });

  it('has the correct class names', () => {
    render(<Header />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass('sticky inset-x-0 top-0 w-full');
  });

  it('renders MobileSidebar component', () => {
    render(<Header />);
    const mobileSidebarElement = screen.getByRole('navigation');
    expect(mobileSidebarElement).toBeInTheDocument();
  });
});
