import React from 'react';
import { Box, Typography, IconButton, Divider } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { colors } from '@/theme/palette';
import { formatPrice } from '@/utils/format.utils';


const PLACEHOLDER_IMG = 'https://via.placeholder.com/72x72.png?text=Prod';

export interface DetailLineItem {
  id: string;
  name: string;
  imageUrl?: string;
  sku?: string;
  quantity: number;
  unitPrice: number | string;
  attributes?: string[];
}

interface DetailItemRowProps {
  item: DetailLineItem;
  isLast: boolean;
}

export const DetailItemRow: React.FC<DetailItemRowProps> = ({ item, isLast }) => (
  <>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 3, py: 2 }}>
      <Box
        component="img"
        src={item.imageUrl || PLACEHOLDER_IMG}
        alt={item.name}
        sx={{ width: 72, height: 72, borderRadius: 2, objectFit: 'contain', bgcolor: colors.neutral[100], flexShrink: 0 }}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="h5" sx={{ color: colors.brand.orange }}>
          {item.name}
        </Typography>
        {!!item.attributes?.length && (
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 0.25 }}>
            {`Cantidad: ${item.quantity}, ${item.attributes.join(', ')}`}
          </Typography>
        )}
      </Box>
      <IconButton size="medium" sx={{ border: `1px solid ${colors.neutral[300]}`, borderRadius: '50%', flexShrink: 0 }}>
        <MoreHorizIcon fontSize="small" />
      </IconButton>
    </Box>

    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, px: 3, pb: 2 }}>
      <Typography variant="body1">
        SKU: <Box component="span" sx={{ fontWeight: 700 }}>{item.sku ?? '-'}</Box>
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        Productos:{' '}
        <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>
          {formatPrice(Number(item.unitPrice) * item.quantity)}
        </Box>
      </Typography>
    </Box>

    {!isLast && <Divider />}
  </>
);