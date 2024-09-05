import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardNav } from '@/components/dashboard-nav';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/hooks/useSideBar';
import { NavItem } from '@/types';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}));

jest.mock('@/hooks/useSideBar', () => ({
  useSidebar: jest.fn()
}));

describe('DashboardNav', () => {
  const items: NavItem[] = [
    { title: 'Dashboard', href: '/', icon: 'dashboard' },
    { title: 'Profile', href: '/profile', icon: 'user' }
  ];

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
    (useSidebar as unknown as jest.Mock).mockReturnValue({
      isMinimized: false
    });
  });

  it('renders DashboardNav component correctly', () => {
    render(<DashboardNav items={items} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('renders nothing when items array is empty', () => {
    render(<DashboardNav items={[]} />);
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
  });

  it('handles isMobileNav prop correctly', () => {
    render(<DashboardNav items={items} isMobileNav={true} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('handles setOpen prop correctly', () => {
    const setOpen = jest.fn();
    render(<DashboardNav items={items} setOpen={setOpen} />);
    fireEvent.click(screen.getByText('Dashboard'));
    expect(setOpen).toHaveBeenCalledWith(false);
  });

  it('handles isMinimized state correctly', () => {
    (useSidebar as unknown as jest.Mock).mockReturnValue({ isMinimized: true });
    render(<DashboardNav items={items} />);
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
  });
});
