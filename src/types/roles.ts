export interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
}

export interface Role {
  id: string;
  name: string;
  type: string;
  dateCreated: string;
  status: string;
  teamMembers?: TeamMember[];
  users?: TeamMember[];
  lastActive?: string;
}

export interface RolesResponse {
  success: boolean;
  data: Role[];
  total: number;
}

export interface RoleResponse {
  success: boolean;
  data: Role;
}
