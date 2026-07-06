import { render, screen } from '@testing-library/react';
import { CenteredLayout } from './CenteredLayout';

describe('CenteredLayout', () => {
  it('renders its children with the base class', () => {
    render(<CenteredLayout data-testid="layout">conteúdo</CenteredLayout>);

    const layout = screen.getByTestId('layout');
    expect(layout).toHaveClass('centered-layout');
    expect(layout).toHaveTextContent('conteúdo');
  });

  it('merges a custom className', () => {
    render(<CenteredLayout data-testid="layout" className="custom" />);
    expect(screen.getByTestId('layout')).toHaveClass('centered-layout', 'custom');
  });
});
