import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders the base card wrapper', () => {
    render(<Card data-testid="card">conteúdo</Card>);
    expect(screen.getByTestId('card')).toHaveClass('card');
  });

  it('renders Card.Body, Card.Title and Card.Text with the right BEM classes', () => {
    render(
      <Card>
        <Card.Body data-testid="body">
          <Card.Title>Spoon-Knife</Card.Title>
          <Card.Text>This repo is for demonstration purposes only.</Card.Text>
        </Card.Body>
      </Card>
    );

    expect(screen.getByTestId('body')).toHaveClass('card__body');
    expect(screen.getByRole('heading', { name: 'Spoon-Knife' })).toHaveClass('card__title');
    expect(screen.getByText('This repo is for demonstration purposes only.')).toHaveClass('card__text');
  });

  it('defaults Card.Title to a level 3 heading', () => {
    render(<Card.Title>Título</Card.Title>);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });

  it('lets Card.Title render as a different heading level', () => {
    render(<Card.Title as="h2">Título</Card.Title>);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
});
