import api from '@/lib/axios';
import type { AddressFormValues } from '@/schemas/address.schema';
import type { ProfileResponse, UpdateProfilePayload } from '@/types/profile.types';

export const profileService = {
  updateMyInfo: async (payload: UpdateProfilePayload): Promise<ProfileResponse> => {
    const { data } = await api.put<ProfileResponse>('/auth/me/profile', payload);
    return data;
  },

  updateAddress: async (payload: AddressFormValues): Promise<ProfileResponse> => {
    const { data } = await api.put<ProfileResponse>('/auth/me/address', payload);
    return data;
  },
};