import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/hooks/roles', () => {
  return {
    useRoles: vi.fn(),
  };
});

import { useRoles } from '@/hooks/roles';
import { UserRolesTable } from '../user-roles-table';

type MockRole = {
  id: string;
  name: string;
  type: string;
  dateCreated: string;
  status: string;
  users?: Array<{ id?: string; name?: string; avatar?: string }>;
  teamMembers?: Array<{ id?: string; name?: string; avatar?: string }>;
};

const makeUseRolesReturn = (roles: MockRole[] = []) => ({
  roles,
  total: roles.length,
  isLoading: false,
  isValidating: false,
  isError: false,
  error: null,
  refresh: vi.fn(),
});

const sampleRoles: MockRole[] = [
  {
    id: '1',
    name: 'Superadmin',
    type: 'DEFAULT',
    dateCreated: 'Jan 1, 2023',
    status: 'Active',
    users: [
      { id: 'u1', name: 'User One' },
      { id: 'u2', name: 'User Two' },
      { id: 'u3', name: 'User Three' },
      { id: 'u4', name: 'User Four' },
      { id: 'u5', name: 'User Five' },
    ],
  },
  {
    id: '2',
    name: 'Merchantadmin',
    type: 'CUSTOM',
    dateCreated: 'Feb 1, 2023',
    status: 'Active',
    users: [
      { id: 'u1', name: 'User One' },
      { id: 'u2', name: 'User Two' },
      { id: 'u3', name: 'User Three' },
      { id: 'u4', name: 'User Four' },
      { id: 'u5', name: 'User Five' },
    ],
  },
  {
    id: '3',
    name: 'Supportadmin',
    type: 'SYSTEM-CUSTOM',
    dateCreated: 'Feb 1, 2023',
    status: 'Pending',
    users: [
      { id: 'u1', name: 'User One' },
      { id: 'u2', name: 'User Two' },
      { id: 'u3', name: 'User Three' },
      { id: 'u4', name: 'User Four' },
    ],
  },
];

describe('UserRolesTable', () => {
  beforeEach(() => {
    (useRoles as unknown as ReturnType<typeof vi.fn>).mockReset?.();
  });

  it('renders the table title', () => {
    (useRoles as unknown as Mock).mockReturnValue(makeUseRolesReturn(sampleRoles));
    render(<UserRolesTable />);
    expect(screen.getByText('User Roles')).toBeInTheDocument();
  });

  it('renders download all button', () => {
    (useRoles as unknown as Mock).mockReturnValue(makeUseRolesReturn(sampleRoles));
    render(<UserRolesTable />);
    expect(screen.getByText('Download all')).toBeInTheDocument();
  });

  it('renders table headers', () => {
    (useRoles as unknown as Mock).mockReturnValue(makeUseRolesReturn(sampleRoles));
    render(<UserRolesTable />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Date Created')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
  });

  it('renders all role names', () => {
    (useRoles as unknown as Mock).mockReturnValue(makeUseRolesReturn(sampleRoles));
    render(<UserRolesTable />);
    sampleRoles.forEach((role) => {
      expect(screen.getByText(role.name)).toBeInTheDocument();
    });
  });

  it('displays role types as text', () => {
    (useRoles as unknown as Mock).mockReturnValue(makeUseRolesReturn(sampleRoles));
    render(<UserRolesTable />);
    expect(screen.getAllByText('DEFAULT').length).toBeGreaterThan(0);
    expect(screen.getAllByText('CUSTOM').length).toBeGreaterThan(0);
    expect(screen.getAllByText('SYSTEM-CUSTOM').length).toBeGreaterThan(0);
  });

  it('displays role statuses', () => {
    (useRoles as unknown as Mock).mockReturnValue(makeUseRolesReturn(sampleRoles));
    render(<UserRolesTable />);
    const activeStatuses = screen.getAllByText('Active');
    expect(activeStatuses.length).toBeGreaterThan(0);
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('displays date created for each role', () => {
    (useRoles as unknown as Mock).mockReturnValue(makeUseRolesReturn(sampleRoles));
    render(<UserRolesTable />);
    expect(screen.getByText('Jan 1, 2023')).toBeInTheDocument();
    expect(screen.getAllByText('Feb 1, 2023').length).toBeGreaterThan(0);
  });

  it('renders user avatars fallbacks and +N indicator', () => {
    (useRoles as unknown as Mock).mockReturnValue(makeUseRolesReturn(sampleRoles));
    render(<UserRolesTable />);
    // Initials like UO (User One), UT (User Two) etc. should exist
    expect(screen.getAllByText(/U[OT]/).length).toBeGreaterThan(0);
    // +N indicator for first role (5 users -> shows +1)
    expect(screen.getAllByText(/\+\d/).length).toBeGreaterThan(0);
  });

  it('renders with empty roles array', () => {
    (useRoles as unknown as Mock).mockReturnValue(makeUseRolesReturn([]));
    render(<UserRolesTable />);
    expect(screen.getByText('User Roles')).toBeInTheDocument();
    expect(screen.getByText('Download all')).toBeInTheDocument();
  });
});
