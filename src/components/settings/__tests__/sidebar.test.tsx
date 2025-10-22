import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Sidebar } from '../sidebar';

vi.mock('next/navigation', () => ({
  usePathname: () => '/settings',
}));

describe('Sidebar', () => {
  it('renders the sidebar with logo', () => {
    render(<Sidebar />);
    expect(screen.getByText('Untitled UI')).toBeInTheDocument();
  });

  it('renders all navigation items', () => {
    render(<Sidebar />);
    
    const navItems = [
      'Home',
      'Dashboard',
      'Projects',
      'Tasks',
      'Reporting',
      'Users',
      'Support',
      'Settings',
    ];

    navItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('highlights the active navigation item', () => {
    render(<Sidebar />);
    
    const settingsLink = screen.getByText('Settings').closest('a');
    expect(settingsLink).toHaveClass('bg-accent');
  });

  it('renders user profile information', () => {
    render(<Sidebar />);
    
    expect(screen.getByText('Olivia Rhye')).toBeInTheDocument();
    expect(screen.getByText('olivia@untitledui.com')).toBeInTheDocument();
  });

  it('renders new features notification', () => {
    render(<Sidebar />);
    
    expect(screen.getByText('New features available!')).toBeInTheDocument();
    expect(screen.getByText(/Check out the new dashboard view/)).toBeInTheDocument();
  });

  it('renders dismiss and what\'s new buttons', () => {
    render(<Sidebar />);
    
    expect(screen.getByText('Dismiss')).toBeInTheDocument();
    expect(screen.getByText("What's new?")).toBeInTheDocument();
  });
});
