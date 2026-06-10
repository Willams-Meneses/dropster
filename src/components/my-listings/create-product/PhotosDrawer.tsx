// src/components/products/PhotosDrawer.tsx

import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import GenericDrawer from '@/components/ui/drawer/GenericDrawer';
import { ACCEPTED_IMAGE_TYPES, filesToImagePreviews, IMAGE_MAX_COUNT, revokeImagePreviews, type ImagePreview } from '@/utils/imageUtils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PhotosDrawerProps {
  open: boolean;
  onClose: () => void;
  images: ImagePreview[];
  onChange: (images: ImagePreview[]) => void;
}

// ---------------------------------------------------------------------------
// PhotosDrawer
// ---------------------------------------------------------------------------

export default function PhotosDrawer({ open, onClose, images, onChange }: PhotosDrawerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showInfo, setShowInfo] = useState(true);

  const canAddMore = images.length < IMAGE_MAX_COUNT;
  const remaining = IMAGE_MAX_COUNT - images.length;

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, remaining);
    const previews = await filesToImagePreviews(files);
    onChange([...images, ...previews]);
    // Reset input so same file can be re-selected
    e.target.value = '';
  };

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteOne = (id: string) => {
    const removed = images.filter((img) => img.id === id);
    revokeImagePreviews(removed);
    onChange(images.filter((img) => img.id !== id));
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleDeleteSelected = () => {
    const removed = images.filter((img) => selected.has(img.id));
    revokeImagePreviews(removed);
    onChange(images.filter((img) => !selected.has(img.id)));
    setSelected(new Set());
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleClose = () => {
    setSelected(new Set());
    onClose();
  };

  // ── Footer ────────────────────────────────────────────────────────────────

  const footer = selected.size > 0 ? (
    <Button
      variant="outlined"
      color="error"
      startIcon={<DeleteIcon />}
      fullWidth
      onClick={handleDeleteSelected}
    >
      Eliminar seleccionadas ({selected.size})
    </Button>
  ) : null;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <GenericDrawer
      open={open}
      onClose={handleClose}
      title={<Typography variant="h2">Fotos</Typography>}
      width={460}
      footer={footer}
      // Custom header action: "Eliminar Varias" toggle
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

      {/* "Eliminar Varias" action in top-right */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, mt: -1 }}>
        <Button
          size="small"
          startIcon={<DeleteIcon sx={{ fontSize: 16 }} />}
          onClick={() => setSelected(selected.size > 0 ? new Set() : new Set(images.map((img) => img.id)))}
          sx={{
            color: 'text.secondary',
            fontSize: '13px',
            fontWeight: 500,
            textTransform: 'none',
            borderRadius: '8px',
            px: 1.5,
          }}
        >
          {selected.size > 0 ? 'Cancelar selección' : 'Eliminar Varias'}
        </Button>
      </Box>

      {/* Info banner */}
      {showInfo && (
        <Alert
          severity="info"
          icon={<InfoOutlinedIcon fontSize="small" />}
          action={
            <IconButton size="small" onClick={() => setShowInfo(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          sx={{
            mb: 2.5,
            borderRadius: 2,
            backgroundColor: 'grey.100',
            color: 'text.primary',
            '& .MuiAlert-icon': { color: 'text.secondary' },
            fontSize: '13px',
          }}
        >
          Haz clic en las imágenes y arrástralas. La primera será la portada del producto.
        </Alert>
      )}

      {/* Photo grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1.5,
        }}
      >
        {/* Existing images */}
        {images.map((img) => (
          <PhotoTile
            key={img.id}
            img={img}
            isSelected={selected.has(img.id)}
            selectionMode={selected.size > 0}
            onDelete={() => handleDeleteOne(img.id)}
            onToggle={() => toggleSelect(img.id)}
          />
        ))}

        {/* Add button — shown when under limit */}
        {canAddMore && (
          <Box
            onClick={handleAddClick}
            sx={{
              aspectRatio: '1',
              border: '2px dashed',
              borderColor: 'primary.main',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#EBF4FF',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              '&:hover': { backgroundColor: '#D6EAFF' },
            }}
          >
            <AddIcon sx={{ color: 'primary.main', fontSize: 32 }} />
          </Box>
        )}
      </Box>

      {/* Counter */}
      {images.length > 0 && (
        <Typography variant="caption" sx={{ display: 'block', mt: 2, textAlign: 'right' }}>
          {images.length}/{IMAGE_MAX_COUNT} fotos
        </Typography>
      )}
    </GenericDrawer>
  );
}

// ---------------------------------------------------------------------------
// PhotoTile — individual image cell
// ---------------------------------------------------------------------------

interface PhotoTileProps {
  img: ImagePreview;
  isSelected: boolean;
  selectionMode: boolean;
  onDelete: () => void;
  onToggle: () => void;
}

function PhotoTile({ img, isSelected, selectionMode, onDelete, onToggle }: PhotoTileProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        aspectRatio: '1',
        borderRadius: 2,
        overflow: 'hidden',
        border: isSelected ? '2px solid' : '2px solid transparent',
        borderColor: isSelected ? 'primary.main' : 'transparent',
        cursor: selectionMode ? 'pointer' : 'default',
        '&:hover .photo-actions': { opacity: 1 },
      }}
      onClick={selectionMode ? onToggle : undefined}
    >
      {/* Image */}
      <Box
        component="img"
        src={img.previewUrl}
        alt="Foto del producto"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Hover actions (only when NOT in selection mode) */}
      {!selectionMode && (
        <Box
          className="photo-actions"
          sx={{
            position: 'absolute',
            top: 6,
            right: 6,
            display: 'flex',
            gap: 0.5,
            opacity: 0,
            transition: 'opacity 0.2s',
          }}
        >
          <Tooltip title="Eliminar">
            <IconButton
              size="small"
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              sx={{
                backgroundColor: 'white',
                boxShadow: 1,
                width: 28,
                height: 28,
                '&:hover': { backgroundColor: 'grey.100' },
              }}
            >
              <DeleteIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {/* Selection checkbox overlay */}
      {selectionMode && (
        <Box
          sx={{
            position: 'absolute',
            top: 6,
            left: 6,
          }}
        >
          <Checkbox
            checked={isSelected}
            onChange={onToggle}
            onClick={(e) => e.stopPropagation()}
            size="small"
            sx={{ p: 0 }}
          />
        </Box>
      )}

      {/* Selection dim overlay */}
      {selectionMode && isSelected && (
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
    </Box>
  );
}