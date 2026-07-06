import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('exposes a search landmark with a search-type input', () => {
    render(<SearchBar value="" onChange={vi.fn()} onSubmit={vi.fn()} ariaLabel="Nome de usuário" />);

    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome de usuário')).toHaveAttribute('type', 'search');
  });

  it('calls onChange as the user types', () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} onSubmit={vi.fn()} ariaLabel="Nome de usuário" />);

    fireEvent.change(screen.getByLabelText('Nome de usuário'), { target: { value: 'octocat' } });

    expect(handleChange).toHaveBeenCalledWith('octocat');
  });

  it('calls onSubmit when the form is submitted, without a page reload', () => {
    const handleSubmit = vi.fn();
    render(<SearchBar value="octocat" onChange={vi.fn()} onSubmit={handleSubmit} ariaLabel="Nome de usuário" />);

    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('accepts a custom submit label', () => {
    render(
      <SearchBar
        value=""
        onChange={vi.fn()}
        onSubmit={vi.fn()}
        ariaLabel="Nome de usuário"
        submitLabel="Pesquisar"
      />
    );

    expect(screen.getByRole('button', { name: 'Pesquisar' })).toBeInTheDocument();
  });
});
