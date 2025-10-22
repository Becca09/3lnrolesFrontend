export interface UserRole {
  id: string;
  name: string;
  type: 'DEFAULT' | 'CUSTOM' | 'SYSTEM-CUSTOM';
  dateCreated: string;
  status: 'Active' | 'Pending' | 'Inactive';
  users: string[];
  lastActive?: string;
}

export interface ActiveRole {
  id: string;
  name: string;
  lastActive: string;
  isDefault?: boolean;
}
