import { useState } from 'react';
import { Box, Card, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import type { CartItem } from '@/store/cartStore';
import { formatPrice } from '@/utils/formatPrice';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (variantId: string, quantity: number) => void;
  onRemove: (variantId: string) => void;
}

export const CartItemCard = ({ item, onUpdateQuantity, onRemove }: CartItemCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleRemove = () => {
    onRemove(item.variantId);
    handleMenuClose();
  };

  const imageUrl = item.variant.images.length > 0 ? item.variant.images[0].url : '/placeholder-image.png';

  return (
    <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5, boxShadow: 'none', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
        <Box
          component="img"
          src={imageUrl}
          alt={item.productName}
          sx={{ width: 48, height: 48, objectFit: 'contain', borderRadius: 1, bgcolor: 'grey.100' }}
        />

        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ lineHeight: 1.2 }}>
            {item.productName}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Color: {item.variant.values[0]}, Talle: {item.variant.values[1]}, Modelo: {item.variant.values[2] || 'N/A'}
          </Typography>
        </Box>

        <IconButton onClick={handleMenuClick} size="small" sx={{ color: 'text.secondary' }}>
          <MoreHorizIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleRemove} sx={{ color: 'error.main' }}>Eliminar producto</MenuItem>
        </Menu>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
        <Box>
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>Precio:</Typography>
          <Typography sx={{ fontSize: '20px', fontWeight: 600, lineHeight: '30px', color: '#353535' }}>
            {formatPrice(item.variant.suggestedPrice)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => onUpdateQuantity(item.variantId, item.quantity - 1)}
            disabled={item.quantity <= 1}
            sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '50%' }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography variant="body1" sx={{ fontWeight: 600, minWidth: 20, textAlign: 'center' }}>
            {item.quantity}
          </Typography>
          <IconButton
            size="small"
            onClick={() => onUpdateQuantity(item.variantId, item.quantity + 1)}
            disabled={item.quantity >= item.variant.stock}
            sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '50%' }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};