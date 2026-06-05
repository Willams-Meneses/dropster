// src/components/products/PhotosSection.tsx

import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import type { ImagePreview } from '@/utils/imageUtils';
import PhotosDrawer from './PhotosDrawer';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface PhotosSectionProps {
  images: ImagePreview[];
  onChange: (images: ImagePreview[]) => void;
  error?: string;
}

// ---------------------------------------------------------------------------
// PhotosSection
// ---------------------------------------------------------------------------

export const PhotosSection = ({ images, onChange, error }: PhotosSectionProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Card>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h3">Fotos</Typography>

          <Typography variant="body1">
            Cargá las fotos principales de tu producto. Si tu producto tiene variantes (talle, modelo, color) vas a
            poder agregar las fotos específicas cuando agregues las variantes.
          </Typography>

          {/* Upload area */}
          <Box
            onClick={() => setDrawerOpen(true)}
            sx={{
              width: '100%',
              minHeight: 160,
              border: '2px dashed',
              borderColor: error ? 'error.main' : 'primary.main',
              borderRadius: 3,
              backgroundColor: error ? '#FFF5F5' : '#EBF4FF',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              '&:hover': { backgroundColor: error ? '#FFE8E8' : '#D6EAFF' },
            }}
          >
            {images.length === 0 ? (
              <AddIcon sx={{ color: error ? 'error.main' : 'primary.main', fontSize: 40 }} />
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {images.slice(0, 4).map((img) => (
                    <Box
                      key={img.id}
                      component="img"
                      src={img.previewUrl}
                      alt="preview"
                      sx={{
                        width: 56,
                        height: 56,
                        objectFit: 'cover',
                        borderRadius: 1.5,
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    />
                  ))}
                  {images.length > 4 && (
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 1.5,
                        backgroundColor: 'grey.200',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        +{images.length - 4}
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Typography variant="caption">
                  {images.length} foto{images.length !== 1 ? 's' : ''} · Clic para editar
                </Typography>
              </Box>
            )}
          </Box>

          {/* Error message — mismo estilo que MuiFormHelperText */}
          {error && (
            <Typography
              variant="body2"
              sx={{ color: 'error.main', mt: -0.5, ml: '14px', fontSize: '13px' }}
            >
              {error}
            </Typography>
          )}

          {/* "¿Cómo tomar tus fotos?" link */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CameraAltOutlinedIcon sx={{ fontSize: 16, color: 'primary.main' }} />
            <Typography
              variant="body2"
              component="span"
              sx={{ color: 'primary.main', cursor: 'pointer', fontWeight: 500 }}
            >
              ¿Cómo tomar tus fotos?
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <PhotosDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        images={images}
        onChange={onChange}
      />
    </>
  );
};