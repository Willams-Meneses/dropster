import api from '@/lib/axios';
import type { LoginPayload, LoginResponse, RegisterPayload, User } from '@/types/auth.types';

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>('/auth/login', payload);
    return data;
  },

  register: async (payload: RegisterPayload): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>('/auth/register', payload);
    return data;
  },

  me: async (): Promise<User> => {
    const { data } = await api.get<User>('/auth/me');
    return data;
  },
};  