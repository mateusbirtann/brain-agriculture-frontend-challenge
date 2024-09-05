import React from 'react';
import { render } from '@testing-library/react';
import PageContainer from '@/components/layout/page-container';

describe('PageContainer', () => {
  it('renders correctly with scrollable set to true', () => {
    const { container } = render(
      <PageContainer scrollable={true}>
        <div>Test Content</div>
      </PageContainer>
    );
    expect(
      container.querySelector('.relative.overflow-hidden')
    ).toBeInTheDocument();
  });

  it('renders correctly with scrollable set to false', () => {
    const { container } = render(
      <PageContainer scrollable={false}>
        <div>Test Content</div>
      </PageContainer>
    );
    expect(
      container.querySelector('.relative.overflow-hidden')
    ).not.toBeInTheDocument();
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <PageContainer scrollable={false}>
        <div>Test Content</div>
      </PageContainer>
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });
});
