import { render, screen } from '@testing-library/react';
import { StatItem } from './StatItem';

describe('StatItem', () => {
  it('renders the value emphasized alongside its label', () => {
    render(<StatItem value={23135} label="seguidores" />);

    expect(screen.getByText('23135').tagName).toBe('STRONG');
    expect(screen.getByText(/seguidores/)).toBeInTheDocument();
  });
});
