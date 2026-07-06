import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';

describe('Select', () => {
  it('renders its options and reports the selected value', () => {
    const handleChange = vi.fn();
    render(
      <Select aria-label="Ordenar" value="stars" onChange={handleChange}>
        <option value="stars">Estrelas</option>
        <option value="name">Nome</option>
      </Select>
    );

    const select = screen.getByLabelText('Ordenar');
    fireEvent.change(select, { target: { value: 'name' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('applies the base class alongside a custom className', () => {
    render(
      <Select aria-label="Ordenar" className="custom">
        <option value="a">A</option>
      </Select>
    );

    expect(screen.getByLabelText('Ordenar')).toHaveClass('select', 'custom');
  });
});
