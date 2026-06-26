import { useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import GenericDrawer from '@/components/ui/drawer/GenericDrawer';
import type { ImagePreview } from '@/utils/imageUtils';
import { ACCEPTED_IMAGE_TYPES, filesToImagePreviews, IMAGE_MAX_COUNT } from '@/utils/imageUtils';

interface VariantPhotosDrawerProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;   
  variantLabel: string;
  productPhotos: ImagePreview[];
  selectedIds: Set<string>;
  onChange: (ids: Set<string>) => void;
  /** Called when the user uploads new photos from within this drawer */
  onAddProductPhotos: (newPhotos: ImagePreview[]) => void;
}

export default function VariantPhotosDrawer({
  open,
  onClose,
  onConfirm,
  variantLabel,
  productPhotos,
  selectedIds,
  onChange,
  onAddProductPhotos,
}: VariantPhotosDrawerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggle = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange(next);
  };

  const canAddMore = productPhotos.length < IMAGE_MAX_COUNT;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const remaining = IMAGE_MAX_COUNT - productPhotos.length;
    const files = Array.from(e.target.files).slice(0, remaining);
    const previews = await filesToImagePreviews(files);
    onAddProductPhotos(previews);
    // Auto-select the newly added photos
    const next = new Set(selectedIds);
    previews.forEach((p) => next.add(p.id));
    onChange(next);
    e.target.value = '';
  };

  const footer = (
    <Button variant="contained" fullWidth onClick={onConfirm}>
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
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        multiple
        style={{ display: 'none' }}
        onChange={(e) => { void handleFileChange(e); }}
      />

      {productPhotos.length === 0 ? (
        // No photos at all — prompt to upload
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 4 }}>
          <Alert severity="info" icon={<InfoOutlinedIcon fontSize="small" />} sx={{ width: '100%' }}>
            No hay fotos cargadas en el producto. Agregá fotos para asignarlas a esta variante.
          </Alert>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => fileInputRef.current?.click()}
          >
            Agregar fotos al producto
          </Button>
        </Box>
      ) : (
        <>
          <Alert
            severity="info"
            icon={<InfoOutlinedIcon fontSize="small" />}
            sx={{
              mb: 2.5, borderRadius: 2, backgroundColor: 'grey.100',
              color: 'text.primary', '& .MuiAlert-icon': { color: 'text.secondary' },
            }}
          >
            Seleccioná una o más fotos del producto para asociarlas a esta variante.
          </Alert>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5 }}>
            {productPhotos.map((photo) => {
              const isSelected = selectedIds.has(photo.id);
              return (
                <Box
                  key={photo.id}
                  onClick={() => toggle(photo.id)}
                  sx={{
                    position: 'relative', aspectRatio: '1', borderRadius: 2,
                    overflow: 'hidden', cursor: 'pointer', border: '2px solid',
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
                  {isSelected && (
                    <Box sx={{
                      position: 'absolute', inset: 0, backgroundColor: 'primary.main',
                      opacity: 0.15, pointerEvents: 'none',
                    }} />
                  )}
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

            {/* Add more photos tile */}
            {canAddMore && (
              <Box
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  aspectRatio: '1', border: '2px dashed', borderColor: 'primary.main',
                  borderRadius: 2, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', backgroundColor: '#EBF4FF',
                  cursor: 'pointer', transition: 'background-color 0.2s',
                  '&:hover': { backgroundColor: '#D6EAFF' },
                }}
              >
                <AddIcon sx={{ color: 'primary.main', fontSize: 32 }} />
              </Box>
            )}
          </Box>

          <Typography variant="caption" sx={{ display: 'block', mt: 2, textAlign: 'right' }}>
            {selectedIds.size} foto{selectedIds.size !== 1 ? 's' : ''} seleccionada{selectedIds.size !== 1 ? 's' : ''}
          </Typography>
        </>
      )}
    </GenericDrawer>
  );
}