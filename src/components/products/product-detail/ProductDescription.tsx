// src/components/product-detail/ProductDescription.tsx
import { Stack, Typography } from '@mui/material';

interface ProductDescriptionProps {
  description: string | null;
}

export const ProductDescription = ({ description }: ProductDescriptionProps) => {
  if (!description) return null;

  return (
    <Stack spacing={1.5}>
      <Typography variant="h3">Descripción</Typography>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
        {description}
      </Typography>
    </Stack>
  );
};