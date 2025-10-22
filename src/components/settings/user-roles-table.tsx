'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CloudDownload, ArrowDown, Check } from 'lucide-react';
import { useRoles } from '@/hooks/roles'; 
import React from 'react';
import type { Role, TeamMember } from '@/types/roles';

function initials(name?: string) {
  if (!name) return '';
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function renderStatus(status?: string) {
  const raw = String(status ?? '').trim();
  const s = raw.toLowerCase();

  if (s === 'active') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-600 px-2.5 py-1 text-xs font-bold">
        <Check className="h-3.5 w-3.5 font-bold" />
        Active
      </span>
    );
  }

  if (s === 'inactive' || s === 'Inactive') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-[#F2994A] text-white px-2.5 py-1 text-xs font-medium">
        In Active
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#F2994A] text-white px-2.5 py-1 text-xs font-medium">
      {raw || 'Pending'}
    </span>
  );
}

export function UserRolesTable() {
  const { roles, isLoading, isError, refresh } = useRoles();
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const selectAllRef = React.useRef<HTMLInputElement>(null);
  const ids = React.useMemo(() => roles.map((r: Role) => String(r.id)), [roles]);
  const allSelected = ids.length > 0 && ids.every((id) => selected.has(id));
  const someSelected = !allSelected && ids.some((id) => selected.has(id));

  React.useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someSelected;
    }
  }, [someSelected]);

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(ids));
    }
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (isLoading) {
    return <div className="py-6 text-sm text-muted-foreground">Loading roles...</div>;
  }
  if (isError) {
    return (
      <div className="py-6 text-sm text-red-500">
        Failed to load roles.
        <button onClick={() => refresh()} className="ml-2 underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex lg:items-center lg:justify-between flex-col lg:flex-row gap-3 ">
        <h3 className="text-lg font-semibold">User Roles</h3>
        <Button variant="outline" size="sm" onClick={() => downloadAllCsv(roles)} className="bg-white w-fit">
          <CloudDownload className="w-4 h-4 mr-2" />
          Download all
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-gray-300 text-black focus:ring-0"
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="h-auto p-0 font-medium text-[#667085]">
                    Name
                    <ArrowDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="h-auto p-0 font-medium text-[#667085]">
                    Type
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="h-auto p-0 font-medium text-[#667085]">
                    Date Created
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="h-auto p-0 font-medium text-[#667085]">
                    Status
                  </Button>
                </TableHead>
                <TableHead className="text-[#667085]">Users</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {roles.map((role: Role) => {
                const users: TeamMember[] = (role.users ?? role.teamMembers ?? []) as TeamMember[];

                return (
                  <TableRow key={role.id}>
                    <TableCell className="w-8">
                      <input
                        type="checkbox"
                        checked={selected.has(String(role.id))}
                        onChange={() => toggleOne(String(role.id))}
                        className="h-4 w-4 rounded text-black focus:ring-0 border-2 border-[#D0D5DD]"
                        aria-label={`Select ${role.name}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                        {role.type}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{role.dateCreated}</TableCell>
                    <TableCell>
                      {renderStatus(role.status)}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center -space-x-2 ">
                        {users.slice(0, 4).map((user, idx) => (
                          <Avatar
                            key={user?.id ?? idx}
                            className="w-8 h-8"
                          >
                            {user?.avatar ? (
                              <AvatarImage src={user.avatar} alt={user.name ?? 'User'} className='rounded-full' />
                            ) : (
                              <AvatarFallback className="text-xs bg-muted-foreground">
                                {initials(user?.name)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                        ))}

                        {users.length > 4 && (
                          <Avatar className="w-8 h-8 border-2 border-white shadow-sm rounded-full">
                            <AvatarFallback className="text-xs bg-white rounded-full">
                              +{users.length - 4}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <CloudDownload className="h-4 w-4 text-[#667085]" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

function downloadAllCsv(roles: Role[]) {
  if (!roles || roles.length === 0) return;
  const rows = [
    ['id', 'name', 'type', 'dateCreated', 'status', 'teamMemberCount'],
    ...roles.map((r) => [r.id, r.name, r.type, r.dateCreated, r.status, ((r.teamMembers ?? r.users) || []).length]),
  ];
  const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'roles.csv';
  a.click();
  URL.revokeObjectURL(url);
}
