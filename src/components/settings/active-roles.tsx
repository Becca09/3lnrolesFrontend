'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Plus } from 'lucide-react';
import { ActiveRole } from '@/types/settings';

interface ActiveRolesProps {
  roles: ActiveRole[];
}

export function ActiveRoles({ roles }: ActiveRolesProps) {
  const defaultSelected = useMemo(
    () => roles.find((r) => r.isDefault)?.id ?? roles[0]?.id,
    [roles]
  );
  const [selectedId, setSelectedId] = useState<string | number | undefined>(defaultSelected);

  return (
  <div className='grid gap-6 lg:grid-cols-[240px_1fr] py-6 border-border border-b border-t'>
      <div>
        <p className="text-sm font-medium">Active Role</p>
        <p className="text-xs text-muted-foreground">Select active role available to the user.</p>
      </div>
      <div className="space-y-3">
        {roles.map((role) => {
          const selected = role.id === selectedId;
          return (
            <button
              type="button"
              key={role.id}
              onClick={() => setSelectedId(role.id)}
              className={[
                'w-full text-left flex items-center justify-between p-4 rounded-lg border transition-colors',
                selected
                  ? 'bg-[oklch(0.96_0.02_293.78)]/40 border-[oklch(0.5645_0.1916_293.78)]'
                  : 'bg-white border-border hover:bg-accent/40',
              ].join(' ')}
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-white border border-border">
                    <Users className="w-5 h-5 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{role.name}</p>
                  <p className={["text-xs text-muted-foreground", selected ? "text-purple-text" : ""].join(" ")}>Last active {role.lastActive}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs">
                    <span className={["text-muted-foreground", selected ? "text-purple-text" : ""].join(" ")}> Set as default</span>
                    <span className="text-[oklch(0.5645_0.1916_293.78)] hover:underline">Edit</span>
                  </div>
                </div>
              </div>
              <span
                className={[
                  'inline-flex h-5 w-5 items-center justify-center rounded-full border',
                  selected
                    ? 'border-[oklch(0.5645_0.1916_293.78)]'
                    : 'border-border',
                ].join(' ')}
                aria-hidden
              >
                <span
                  className={[
                    'block h-2.5 w-2.5 rounded-full',
                    selected ? 'bg-[oklch(0.5645_0.1916_293.78)]' : 'bg-transparent',
                  ].join(' ')}
                />
              </span>
            </button>
          );
        })}

        <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
          <Plus className="w-4 h-4 mr-2" />
          Add role to user
        </Button>
      </div>
    </div>
  


  );
}
