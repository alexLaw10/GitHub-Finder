import { render, screen, fireEvent } from '@testing-library/react';
import { SortDropdown } from './SortDropdown';

const OPTIONS = [
  { value: 'stars', label: 'Estrelas' },
  { value: 'name', label: 'Nome (A-Z)' },
];

describe('SortDropdown', () => {
  it('renders every option, prefixed when a prefix is given', () => {
    render(
      <SortDropdown options={OPTIONS} value="stars" onChange={vi.fn()} prefix="Ordenar por" ariaLabel="Ordenar" />
    );

    expect(screen.getByRole('option', { name: 'Ordenar por: Estrelas' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Ordenar por: Nome (A-Z)' })).toBeInTheDocument();
  });

  it('renders options without a prefix when none is given', () => {
    render(<SortDropdown options={OPTIONS} value="stars" onChange={vi.fn()} ariaLabel="Ordenar" />);
    expect(screen.getByRole('option', { name: 'Estrelas' })).toBeInTheDocument();
  });

  it('calls onChange with the selected value', () => {
    const handleChange = vi.fn();
    render(<SortDropdown options={OPTIONS} value="stars" onChange={handleChange} ariaLabel="Ordenar" />);

    fireEvent.change(screen.getByLabelText('Ordenar'), { target: { value: 'name' } });

    expect(handleChange).toHaveBeenCalledWith('name');
  });
});
