import api from '@/lib/axios';
import type { ProfileResponse, UpdateProfilePayload } from '@/types/profile.types';

export const profileService = {
  updateMyInfo: async (payload: UpdateProfilePayload): Promise<ProfileResponse> => {
    const { data } = await api.put<ProfileResponse>('/auth/me/profile', payload);
    return data;
  },
};