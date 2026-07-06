import { render, screen } from '@testing-library/react';
import { LanguageBadge } from './LanguageBadge';

describe('LanguageBadge', () => {
  it('renders the language using the light badge variant', () => {
    render(<LanguageBadge language="TypeScript" />);

    const badge = screen.getByText('TypeScript');
    expect(badge).toHaveClass('badge', 'badge--light');
  });
});
