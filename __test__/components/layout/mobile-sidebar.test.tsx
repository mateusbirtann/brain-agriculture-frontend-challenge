import { render, screen, fireEvent } from '@testing-library/react';
import { MobileSidebar } from '@/components/layout/mobile-sidebar';
import { MenuIcon } from 'lucide-react';
import { ReactNode } from 'react';

jest.mock('@/components/ui/sheet', () => ({
  Sheet: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  SheetTrigger: ({ children }: { children: ReactNode }) => (
    <button>{children}</button>
  ),
  SheetContent: ({ children }: { children: ReactNode }) => <div>{children}</div>
}));

describe('MobileSidebar', () => {
  it('renders without crashing', () => {
    render(<MobileSidebar />);

    const menuIconElement = screen.getByRole('button');
    const dashboardLinkEl = screen.queryByText('Dashboard');
    const farmersLinkEl = screen.queryByText('Produtores Rurais');

    expect(menuIconElement).toBeInTheDocument();
    expect(dashboardLinkEl).toBeInTheDocument();
    expect(farmersLinkEl).toBeInTheDocument();
  });
});
