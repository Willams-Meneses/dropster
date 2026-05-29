import React from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import type { Product } from '@/utils/mocks/Products';
import { formatPrice } from '@/utils/formatPrice';
import { ChipCustom } from '../ui/ChipCustom';
import { PercentageIcon } from '../icons/PercentageIcon';
import { colors } from '@/theme/palette';
import { CARD_VARIANT, type CardVariant } from '@/types/product.type';
import { useStoreOperations } from '@/hooks/useStoreOperations';

interface CardProductProps {
  product: Product;
  variant?: CardVariant;
}

// ─── Stock Badge ──────────────────────────────────────────────────────────────

interface StockBadgeProps {
  stock: Product['stock'];
  variant: CardVariant;
}

const StockBadge: React.FC<StockBadgeProps> = ({ stock, variant }) => {
  const isFeatured = variant === CARD_VARIANT.FEATURED;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: isFeatured ? '#5A34D8' : 'white',
        borderRadius: '0 10px 0 10px',
        borderTopRightRadius: 'inherit',
        px: 1.5,
        py: 0.75,
        zIndex: 100,
      }}
    >
      <Typography
        variant="overline"
        sx={{
          color: isFeatured ? '#ffffff' : 'inherit',
          textTransform: 'none',
        }}
      >
        {stock}
      </Typography>
    </Box>
  );
};

// ─── CardProduct ──────────────────────────────────────────────────────────────

const CardProduct: React.FC<CardProductProps> = ({
  product,
  variant = 'default',
}) => {
  // const isFeatured = variant === 'featured';
  const isFeatured = variant === CARD_VARIANT.FEATURED;
  const { addProduct, isLoading } = useStoreOperations(); // ✅ Usar hook

  const handleAddToStore = () => {
    addProduct(product.id); // ✅ Asumiendo que product tiene un 'id'
  };

  // Badge dentro de imageSection, posicionado relativo a la imagen
  const imageSection = (
    <Box
      sx={{
        position: 'relative',
        borderRadius: '10px',
        overflow: 'hidden',
        backgroundColor: 'white',
        aspectRatio: '4/3',
        flexShrink: 0,
        zIndex: 1
      }}
    >
      <Box
        component="img"
        src={product.imageUrl}
        alt={product.name}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          zIndex: 0,
          position: "relative"
        }}
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          e.currentTarget.src =
            'https://via.placeholder.com/400x300?text=Producto';
        }}
      />
      <StockBadge stock={product.stock} variant={variant} />
    </Box>
  );

  const contentSection = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: isFeatured ? 1.25 : 1,
        pt: isFeatured ? 1.5 : 2,
        flex: 1,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: '15px',
          color: isFeatured ? colors.white : colors.content.heading,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: '20px',
          minHeight: '40px',
        }}
      >
        {product.name}
      </Typography>

      <Typography
        sx={{
          fontSize: '28px',
          fontWeight: 700,
          lineHeight: '36px',
          color: isFeatured ? colors.white : colors.content.heading,
          letterSpacing: '-0.5px',
        }}
      >
        {formatPrice(product.price)}
      </Typography>

      <ChipCustom
        label={`${product.profitPercentage}% de ganancia!`}
        backgroundColor={variant === CARD_VARIANT.FEATURED ? colors.green.main : 'rgba(52, 199, 89, 0.10)'}
        textColor={variant === CARD_VARIANT.FEATURED ? '#ffffff' : colors.green.main}
        icon={PercentageIcon}
        iconSize={14}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
        <Typography
          variant="caption"
          sx={{
            color: isFeatured ? 'rgba(255,255,255,0.75)' : '#797979',
          }}
        >
          Precio de venta sugerido
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography
            variant="caption"
            sx={{
              fontSize: '13px',
              fontWeight: 500,
              color: isFeatured ? 'rgba(255,255,255,0.85)' : '#565656',
            }}
          >
            {formatPrice(product.suggestedPrice)}
          </Typography>
          <InfoOutlinedIcon
            sx={{
              fontSize: 14,
              color: isFeatured ? 'rgba(255,255,255,0.6)' : '#797979',
            }}
          />
        </Box>
      </Box>

      <Button variant='contained' color='primary'
        onClick={handleAddToStore}
        disabled={isLoading}
        sx={{
          height: '40px'
        }}>
        {isLoading ? 'Agregando...' : 'Sumar a mi tienda'}
      </Button>
    </Box>
  );

  // ── Destacado variant ────────────────────────────────────────────────────

  if (isFeatured) {
    return (
      <Box
        sx={{
          background: '#5A34D8',
          borderRadius: '20px',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: '18px',
            fontWeight: 700,
            color: colors.white,
          }}
        >
          Destacado 🔥
        </Typography>

        {imageSection}
        {contentSection}
      </Box>
    );
  }

  // ── Default variant ──────────────────────────────────────────────────────

  return (
    <Box
      sx={{
        backgroundColor: colors.white,
        borderRadius: '16px',
        border: '0.5px solid rgba(226, 226, 226, 0.58)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        p: 2,
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {imageSection}
      {contentSection}
    </Box>
  );
};

export default CardProduct;