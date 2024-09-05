import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Breadcrumbs } from '@/components/breadcrumbs';

describe('Breadcrumbs', () => {
  const items = [
    { title: 'Home', link: '/' },
    { title: 'Category', link: '/category' },
    { title: 'Product', link: '/category/product' }
  ];

  it('renders Breadcrumbs component correctly', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
  });

  it('renders BreadcrumbLink and BreadcrumbPage correctly', () => {
    render(<Breadcrumbs items={items} />);
    const links = screen
      .getAllByRole('link')
      .filter((link) => link.hasAttribute('href'));
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/category');
    expect(screen.getByText('Product')).toBeInTheDocument();
  });
});
