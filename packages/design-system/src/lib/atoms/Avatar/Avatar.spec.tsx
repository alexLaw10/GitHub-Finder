import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders an image with the given src and alt text', () => {
    render(<Avatar src="https://avatars.githubusercontent.com/octocat" alt="Avatar de octocat" />);

    const img = screen.getByRole('img', { name: 'Avatar de octocat' });
    expect(img).toHaveAttribute('src', 'https://avatars.githubusercontent.com/octocat');
    expect(img).toHaveClass('avatar');
  });
});
