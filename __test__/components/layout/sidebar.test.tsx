import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '@/components/layout/sidebar';
import { useSidebar } from '@/hooks/useSideBar';

jest.mock('@/components/dashboard-nav', () => ({
  DashboardNav: jest.fn(() => <div>Mocked DashboardNav</div>)
}));
jest.mock('@/constants/data', () => ({
  navItems: []
}));
jest.mock('@/lib/utils', () => ({
  cn: jest.fn((...args) => args.join(' '))
}));
jest.mock('@/hooks/useSideBar', () => ({
  useSidebar: jest.fn()
}));

describe('Sidebar', () => {
  const mockToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSidebar as unknown as jest.Mock).mockReturnValue({
      isMinimized: false,
      toggle: mockToggle
    });
  });

  it('renders Sidebar component correctly', () => {
    render(<Sidebar className="custom-class" />);
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByAltText('Logo')).toHaveClass('h-16 w-16');
    expect(screen.getByText('Mocked DashboardNav')).toBeInTheDocument();
  });

  it('renders minimized Sidebar correctly', () => {
    (useSidebar as unknown as jest.Mock).mockReturnValue({
      isMinimized: true,
      toggle: mockToggle
    });
    render(<Sidebar className="custom-class" />);
    expect(screen.getByAltText('Logo')).toHaveClass('h-6 w-6');
    expect(screen.getByText('Mocked DashboardNav')).toBeInTheDocument();
  });
});
