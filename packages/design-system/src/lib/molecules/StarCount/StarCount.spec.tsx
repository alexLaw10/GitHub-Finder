import { render, screen } from '@testing-library/react';
import { StarCount } from './StarCount';

describe('StarCount', () => {
  it('exposes the count in an accessible name and hides the glyph from assistive tech', () => {
    render(<StarCount count={13871} />);

    expect(screen.getByLabelText('13871 estrelas')).toBeInTheDocument();
    expect(screen.getByText('★ 13871')).toHaveAttribute('aria-hidden', 'true');
  });

  it('uses the primary pill badge variant', () => {
    render(<StarCount count={5} />);
    expect(screen.getByLabelText('5 estrelas')).toHaveClass('badge--primary', 'badge--pill');
  });
});
