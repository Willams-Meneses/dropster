import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import GenericDrawer from '@/components/ui/drawer/GenericDrawer';
import type { ImagePreview } from '@/utils/imageUtils';

interface VariantPhotosDrawerProps {
  open: boolean;
  onClose: () => void;
  variantLabel: string;
  /** Todas las fotos cargadas en el producto */
  productPhotos: ImagePreview[];
  /** IDs ya seleccionados para esta variante */
  selectedIds: Set<string>;
  onChange: (ids: Set<string>) => void;
}

export default function VariantPhotosDrawer({
  open,
  onClose,
  variantLabel,
  productPhotos,
  selectedIds,
  onChange,
}: VariantPhotosDrawerProps) {
  const toggle = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange(next);
  };

  const footer = (
    <Button variant="contained" fullWidth onClick={onClose}>
      Confirmar selección ({selectedIds.size})
    </Button>
  );

  return (
    <GenericDrawer
      open={open}
      onClose={onClose}
      title={
        <Box>
          <Typography variant="h2">Fotos de variante</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>
            {variantLabel}
          </Typography>
        </Box>
      }
      width={460}
      footer={footer}
    >
      {productPhotos.length === 0 ? (
        <Alert severity="warning" icon={<InfoOutlinedIcon fontSize="small" />}>
          No hay fotos cargadas en el producto. Primero agregá fotos desde la sección &quot;Fotos&quot;.
        </Alert>
      ) : (
        <>
          <Alert
            severity="info"
            icon={<InfoOutlinedIcon fontSize="small" />}
            sx={{ mb: 2.5, borderRadius: 2, backgroundColor: 'grey.100', color: 'text.primary', '& .MuiAlert-icon': { color: 'text.secondary' } }}
          >
            Seleccioná una o más fotos del producto para asociarlas a esta variante.
          </Alert>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1.5,
            }}
          >
            {productPhotos.map((photo) => {
              const isSelected = selectedIds.has(photo.id);
              return (
                <Box
                  key={photo.id}
                  onClick={() => toggle(photo.id)}
                  sx={{
                    position: 'relative',
                    aspectRatio: '1',
                    borderRadius: 2,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '2px solid',
                    borderColor: isSelected ? 'primary.main' : 'transparent',
                    transition: 'border-color 0.15s',
                  }}
                >
                  <Box
                    component="img"
                    src={photo.previewUrl}
                    alt="Foto del producto"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />

                  {/* Dim overlay when selected */}
                  {isSelected && (
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'primary.main',
                        opacity: 0.15,
                        pointerEvents: 'none',
                      }}
                    />
                  )}

                  {/* Checkbox top-left */}
                  <Box sx={{ position: 'absolute', top: 6, left: 6 }}>
                    <Checkbox
                      checked={isSelected}
                      onChange={() => toggle(photo.id)}
                      onClick={(e) => e.stopPropagation()}
                      size="small"
                      sx={{ p: 0 }}
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Typography variant="caption" sx={{ display: 'block', mt: 2, textAlign: 'right' }}>
            {selectedIds.size} foto{selectedIds.size !== 1 ? 's' : ''} seleccionada{selectedIds.size !== 1 ? 's' : ''}
          </Typography>
        </>
      )}
    </GenericDrawer>
  );
}