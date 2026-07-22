import api from '@/lib/axios';

export interface QuoteShippingPayload {
  cp: string;
  items: { variantId: string; quantity: number }[];
}

export interface QuoteShippingResponse {
  shippingCost: string;
}

export const shippingService = {
  quoteShipping: async (payload: QuoteShippingPayload): Promise<QuoteShippingResponse> => {
    const { data } = await api.post<QuoteShippingResponse>('/shipping/quote', payload);
    return data;
  },
};