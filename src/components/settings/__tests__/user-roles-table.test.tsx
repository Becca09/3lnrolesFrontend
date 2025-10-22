import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserRolesTable } from '../user-roles-table';
import { mockUserRoles } from '@/lib/mock-data';

describe('UserRolesTable', () => {
  it('renders the table title', () => {
    render(<UserRolesTable roles={mockUserRoles} />);
    
    expect(screen.getByText('User Roles')).toBeInTheDocument();
  });

  it('renders download all button', () => {
    render(<UserRolesTable roles={mockUserRoles} />);
    
    expect(screen.getByText('Download all')).toBeInTheDocument();
  });

  it('renders table headers', () => {
    render(<UserRolesTable roles={mockUserRoles} />);
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Date Created')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
  });

  it('renders all role names', () => {
    render(<UserRolesTable roles={mockUserRoles} />);
    
    mockUserRoles.forEach((role) => {
      expect(screen.getByText(role.name)).toBeInTheDocument();
    });
  });

  it('displays role types as badges', () => {
    render(<UserRolesTable roles={mockUserRoles} />);
    
    expect(screen.getAllByText('DEFAULT').length).toBeGreaterThan(0);
    expect(screen.getAllByText('CUSTOM').length).toBeGreaterThan(0);
    expect(screen.getAllByText('SYSTEM-CUSTOM').length).toBeGreaterThan(0);
  });

  it('displays role statuses', () => {
    render(<UserRolesTable roles={mockUserRoles} />);
    
    const activeStatuses = screen.getAllByText('Active');
    expect(activeStatuses.length).toBeGreaterThan(0);
    
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('displays date created for each role', () => {
    render(<UserRolesTable roles={mockUserRoles} />);
    
    expect(screen.getByText('Jan 1, 2023')).toBeInTheDocument();
    expect(screen.getAllByText('Feb 1, 2023').length).toBeGreaterThan(0);
  });

  it('renders user avatars', () => {
    render(<UserRolesTable roles={mockUserRoles} />);
    
    // Check that avatar fallbacks are rendered
    const avatars = screen.getAllByText(/US|ER/);
    expect(avatars.length).toBeGreaterThan(0);
  });

  it('shows +N indicator for roles with more than 4 users', () => {
    render(<UserRolesTable roles={mockUserRoles} />);
    
    const plusIndicators = screen.getAllByText(/\+\d/);
    expect(plusIndicators.length).toBeGreaterThan(0);
  });

  it('renders with empty roles array', () => {
    render(<UserRolesTable roles={[]} />);
    
    expect(screen.getByText('User Roles')).toBeInTheDocument();
    expect(screen.getByText('Download all')).toBeInTheDocument();
  });
});
