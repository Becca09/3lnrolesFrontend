import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ActiveRoles } from '../active-roles';
import { mockActiveRoles } from '@/lib/mock-data';

describe('ActiveRoles', () => {
  it('renders the card title and description', () => {
    render(<ActiveRoles roles={mockActiveRoles} />);
    
    expect(screen.getByText('Active Role')).toBeInTheDocument();
    expect(screen.getByText('Select active role available to the user.')).toBeInTheDocument();
  });

  it('renders all active roles', () => {
    render(<ActiveRoles roles={mockActiveRoles} />);
    
    mockActiveRoles.forEach((role) => {
      expect(screen.getByText(role.name)).toBeInTheDocument();
    });
  });

  it('displays last active dates', () => {
    render(<ActiveRoles roles={mockActiveRoles} />);
    
    expect(screen.getByText('Last active 06/12/2023')).toBeInTheDocument();
    expect(screen.getByText('Last active 01/2023')).toBeInTheDocument();
    expect(screen.getByText('Last active 10/2023')).toBeInTheDocument();
  });

  it('shows default badge for default role', () => {
    render(<ActiveRoles roles={mockActiveRoles} />);
    
    expect(screen.getByText('Set as default')).toBeInTheDocument();
  });

  it('renders edit buttons for each role', () => {
    render(<ActiveRoles roles={mockActiveRoles} />);
    
    const editButtons = screen.getAllByText('Edit');
    expect(editButtons).toHaveLength(mockActiveRoles.length);
  });

  it('renders add role button', () => {
    render(<ActiveRoles roles={mockActiveRoles} />);
    
    expect(screen.getByText('Add role to user')).toBeInTheDocument();
  });

  it('renders with empty roles array', () => {
    render(<ActiveRoles roles={[]} />);
    
    expect(screen.getByText('Active Role')).toBeInTheDocument();
    expect(screen.getByText('Add role to user')).toBeInTheDocument();
  });
});
