// src/components/product-detail/ImageGallery.tsx
import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import type { ProductImage } from '@/types/product.type';

interface ImageGalleryProps {
  images: ProductImage[];
}

export const ImageGallery = ({ images }: ImageGalleryProps) => {
  // Solo guardamos lo que el usuario clickeó explícitamente.
  // Si las imágenes cambian (nueva variante) y esa url ya no está
  // en la lista, cae automáticamente al default sin necesitar un effect.
  const [overrideUrl, setOverrideUrl] = useState<string | null>(null);

  const activeUrl = useMemo(() => {
    if (overrideUrl && images.some((img) => img.url === overrideUrl)) {
      return overrideUrl;
    }
    return images[0]?.url ?? '';
  }, [images, overrideUrl]);

  if (images.length === 0) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Box
        sx={{
          width: '100%',
          aspectRatio: '1 / 1',
          borderRadius: 3,
          overflow: 'hidden',
          bgcolor: 'grey.100',
        }}
      >
        <Box
          component="img"
          src={activeUrl}
          alt="Producto"
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 1.5, overflowX: 'auto' }}>
        {images.map((img) => (
          <Box
            key={img.publicId}
            component="img"
            src={img.url}
            alt="Miniatura"
            onClick={() => setOverrideUrl(img.url)}
            sx={{
              width: 64,
              height: 64,
              borderRadius: 2,
              objectFit: 'cover',
              cursor: 'pointer',
              flexShrink: 0,
              border: '2px solid',
              borderColor: activeUrl === img.url ? 'primary.main' : 'transparent',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};