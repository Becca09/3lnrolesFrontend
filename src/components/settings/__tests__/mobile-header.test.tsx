import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MobileHeader } from '../mobile-header';

describe('MobileHeader', () => {
  it('renders the mobile header with logo', () => {
    render(<MobileHeader />);
    expect(screen.getByText('Untitled UI')).toBeInTheDocument();
  });

  it('renders the menu button', () => {
    render(<MobileHeader />);
    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeInTheDocument();
  });

  it('displays the logo icon', () => {
    render(<MobileHeader />);
    const logoIcon = screen.getByText('U');
    expect(logoIcon).toBeInTheDocument();
  });
});
