export type ListingStatus = 'active' | 'pending' | 'in_review' | 'hidden' | 'rejected';

export interface ListingVariant {
  id: string;
  name: string;
  stock: number;
  droppersPrice: number;
  suggestedPrice: number;
  visible: boolean;
}

export interface Listing {
  id: string;
  name: string;
  imageUrl?: string;
  tags: string[];
  status: ListingStatus;
  variants: ListingVariant[];
}