'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Download, ArrowUpDown } from 'lucide-react';
import { UserRole } from '@/types/settings';

interface UserRolesTableProps {
  roles: UserRole[];
}

export function UserRolesTable({ roles }: UserRolesTableProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Pending':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between ">
        <h3 className="text-lg font-semibold">User Roles</h3>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Download all
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                    Type
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                    Date Created
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                    Status
                  </Button>
                </TableHead>
                <TableHead>Users</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {role.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {role.dateCreated}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(role.status)}>
                      {role.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex -space-x-2">
                      {role.users.slice(0, 4).map((user, idx) => (
                        <Avatar key={idx} className="w-8 h-8 border-2 border-background">
                          <AvatarFallback className="text-xs bg-muted">
                            {user.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {role.users.length > 4 && (
                        <Avatar className="w-8 h-8 border-2 border-background">
                          <AvatarFallback className="text-xs bg-muted">
                            +{role.users.length - 4}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
