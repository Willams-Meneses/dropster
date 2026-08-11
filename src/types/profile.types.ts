import type { Role } from './auth.types';

export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
  dni?: string;
  phone?: string;
}

export interface ProfileResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role | null;
    dni?: string;
    phone?: string;
  };
}