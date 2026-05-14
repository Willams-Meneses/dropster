export const Role = {
  PROVIDER: 'PROVIDER',
  DROPSHIPPER: 'DROPSHIPPER',
} as const;

export type Role = typeof Role[keyof typeof Role];

export interface User {
  id: string;
  email: string;
  role: Role | null;
  firstName: string;
  lastName: string;
  mercadopagoId: string | null;
  cbu: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role | null;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UpdateUserPayload {
  role?: Role;
}
export interface UpdateMeResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    role: Role;
  };
}