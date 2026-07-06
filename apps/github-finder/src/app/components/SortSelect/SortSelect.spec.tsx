import { render, screen, fireEvent } from '@testing-library/react';
import { SortSelect } from './SortSelect';

describe('SortSelect', () => {
  it('renders the four sort options', () => {
    render(<SortSelect value="stars" onChange={vi.fn()} />);

    expect(screen.getByRole('option', { name: 'Ordenar por: Estrelas' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Ordenar por: Forks' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Ordenar por: Atualização recente' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Ordenar por: Nome (A-Z)' })).toBeInTheDocument();
  });

  it('calls onChange with the selected SortOption', () => {
    const handleChange = vi.fn();
    render(<SortSelect value="stars" onChange={handleChange} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'name' } });

    expect(handleChange).toHaveBeenCalledWith('name');
  });
});
