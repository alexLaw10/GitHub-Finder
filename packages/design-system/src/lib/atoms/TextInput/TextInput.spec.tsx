import { render, screen, fireEvent } from '@testing-library/react';
import { TextInput } from './TextInput';

describe('TextInput', () => {
  it('renders as a text input by default', () => {
    render(<TextInput aria-label="username" />);
    expect(screen.getByLabelText('username')).toHaveAttribute('type', 'text');
  });

  it('allows overriding the type', () => {
    render(<TextInput type="search" aria-label="username" />);
    expect(screen.getByLabelText('username')).toHaveAttribute('type', 'search');
  });

  it('fires onChange with the typed value', () => {
    const handleChange = vi.fn();
    render(<TextInput aria-label="username" value="" onChange={handleChange} />);

    fireEvent.change(screen.getByLabelText('username'), { target: { value: 'octocat' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('merges a custom className with the base class', () => {
    render(<TextInput aria-label="username" className="custom" />);
    expect(screen.getByLabelText('username')).toHaveClass('input', 'custom');
  });
});
