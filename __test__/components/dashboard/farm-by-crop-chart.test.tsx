import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FarmByCropChart } from '@/components/dashboard/farm-by-crop-chart';

jest.mock('recharts', () => ({
  Pie: () => <div>Mocked Pie</div>,
  PieChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Cell: () => <div>Mocked Cell</div>,
}));

jest.mock('@/components/ui/card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardDescription: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardTitle: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/components/ui/chart', () => ({
  ChartConfig: () => <div>Mocked ChartConfig</div>,
  ChartContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ChartLegend: () => <div>Mocked ChartLegend</div>,
  ChartLegendContent: () => <div>Mocked ChartLegendContent</div>,
}));

describe('FarmByCropChart', () => {
  const mockData = [
    { name: 'Soja', _count: { farmers: 100 } },
    { name: 'Milho', _count: { farmers: 75 } },
    { name: 'Cafe', _count: { farmers: 50 } },
  ];

  it('renders without crashing', () => {
    render(<FarmByCropChart data={mockData} />);
    expect(screen.getByText('Fazendas por Cultura Plantada')).toBeInTheDocument();
  });

  it('displays the correct title and description', () => {
    render(<FarmByCropChart data={mockData} />);
    expect(screen.getByText('Fazendas por Cultura Plantada')).toBeInTheDocument();
    expect(screen.getByText('Quantidade de fazendas por cultura plantada')).toBeInTheDocument();
  });

  it('renders the PieChart component', () => {
    render(<FarmByCropChart data={mockData} />);
    expect(screen.getByText('Mocked Pie')).toBeInTheDocument();
  });

  it('renders the ChartLegend component', () => {
    render(<FarmByCropChart data={mockData} />);
    expect(screen.getByText('Mocked ChartLegend')).toBeInTheDocument();
  });

  it('handles empty data gracefully', () => {
    render(<FarmByCropChart data={[]} />);
    expect(screen.getByText('Fazendas por Cultura Plantada')).toBeInTheDocument();
    expect(screen.queryByText('Mocked Cell')).not.toBeInTheDocument();
  });
});