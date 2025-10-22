import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ActiveRoles } from '../active-roles';

vi.mock('@/hooks/roles', () => ({
  useRolesByStatus: vi.fn(),
}));

import { useRolesByStatus } from '@/hooks/roles';

type MockActiveRole = {
  id: string;
  name: string;
  lastActive: string;
  isDefault?: boolean;
};

const makeHookReturn = (roles: MockActiveRole[] = []) => ({
  roles,
  total: roles.length,
  isLoading: false,
  isValidating: false,
  isError: false,
  error: null,
  refresh: vi.fn(),
});

const sampleActive: MockActiveRole[] = [
  { id: '1', name: 'Superadmin', lastActive: '06/12/2023', isDefault: true },
  { id: '2', name: 'Developeradmin', lastActive: '01/2023' },
  { id: '3', name: 'Supportadmin', lastActive: '10/2023' },
];

describe('ActiveRoles', () => {
  beforeEach(() => {
    (useRolesByStatus as unknown as ReturnType<typeof vi.fn>).mockReset?.();
  });

  it('renders the card title and description', () => {
    (useRolesByStatus as unknown as Mock).mockReturnValue(makeHookReturn(sampleActive));
    render(<ActiveRoles roles={[]} />);
    expect(screen.getByText('Active Role')).toBeInTheDocument();
    expect(screen.getByText('Select active role available to the user.')).toBeInTheDocument();
  });

  it('renders all active roles', () => {
    (useRolesByStatus as unknown as Mock).mockReturnValue(makeHookReturn(sampleActive));
    render(<ActiveRoles roles={[]} />);
    sampleActive.forEach((role) => {
      expect(screen.getByText(role.name)).toBeInTheDocument();
    });
  });

  it('displays last active dates', () => {
    (useRolesByStatus as unknown as Mock).mockReturnValue(makeHookReturn(sampleActive));
    render(<ActiveRoles roles={[]} />);
    expect(screen.getByText('Last active 06/12/2023')).toBeInTheDocument();
    expect(screen.getByText('Last active 01/2023')).toBeInTheDocument();
    expect(screen.getByText('Last active 10/2023')).toBeInTheDocument();
  });
});
