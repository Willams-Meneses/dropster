export const CARD_VARIANT = {
  DEFAULT: 'default',
  FEATURED: 'featured',
} as const;

export type CardVariant = typeof CARD_VARIANT[keyof typeof CARD_VARIANT];