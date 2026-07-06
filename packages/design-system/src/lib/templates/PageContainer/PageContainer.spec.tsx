import { render, screen } from '@testing-library/react';
import { PageContainer } from './PageContainer';

describe('PageContainer', () => {
  it('renders its children with the base class', () => {
    render(<PageContainer data-testid="container">conteúdo</PageContainer>);

    const container = screen.getByTestId('container');
    expect(container).toHaveClass('page-container');
    expect(container).toHaveTextContent('conteúdo');
  });

  it('merges a custom className', () => {
    render(<PageContainer data-testid="container" className="custom" />);
    expect(screen.getByTestId('container')).toHaveClass('page-container', 'custom');
  });
});
