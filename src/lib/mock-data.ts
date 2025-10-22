import { UserRole, ActiveRole } from '@/types/settings';

export const mockUserRoles: UserRole[] = [
  {
    id: '1',
    name: 'Superadmin',
    type: 'DEFAULT',
    dateCreated: 'Jan 1, 2023',
    status: 'Active',
    users: ['user1', 'user2', 'user3', 'user4', 'user5'],
  },
  {
    id: '2',
    name: 'Merchantadmin',
    type: 'DEFAULT',
    dateCreated: 'Feb 1, 2023',
    status: 'Active',
    users: ['user1', 'user2', 'user3', 'user4', 'user5'],
  },
  {
    id: '3',
    name: 'Supportadmin',
    type: 'DEFAULT',
    dateCreated: 'Feb 1, 2023',
    status: 'Active',
    users: ['user1', 'user2', 'user3', 'user4', 'user5'],
  },
  {
    id: '4',
    name: 'Sales personnel',
    type: 'CUSTOM',
    dateCreated: 'Mar 1, 2023',
    status: 'Active',
    users: ['user1', 'user2', 'user3'],
  },
  {
    id: '5',
    name: 'Deputy sales personnel',
    type: 'CUSTOM',
    dateCreated: 'Apr 1, 2023',
    status: 'Pending',
    users: ['user1', 'user2', 'user3', 'user4', 'user5'],
  },
  {
    id: '6',
    name: 'Developeradmin',
    type: 'SYSTEM-CUSTOM',
    dateCreated: 'May 1, 2023',
    status: 'Active',
    users: ['user1', 'user2', 'user3'],
  },
  {
    id: '7',
    name: 'Developer-basic',
    type: 'SYSTEM-CUSTOM',
    dateCreated: 'Jun 1, 2023',
    status: 'Active',
    users: ['user1', 'user2', 'user3'],
  },
];

export const mockActiveRoles: ActiveRole[] = [
  {
    id: '1',
    name: 'Superadmin',
    lastActive: '06/12/2023',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Developeradmin',
    lastActive: '01/2023',
  },
  {
    id: '3',
    name: 'Supportadmin',
    lastActive: '10/2023',
  },
];
