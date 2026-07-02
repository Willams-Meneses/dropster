// src/components/product-detail/ProductInfo.tsx
import { Box, Button, Chip, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import type { ApiProduct, ProductVariant } from '@/types/product.type';
import type { AttributeOption } from '@/types/productDetail.type';

interface ProductInfoProps {
  product: ApiProduct;
  attributeOptions: AttributeOption[];
  selected: Record<string, string>;
  onSelect: (attrName: string, value: string) => void;
  selectedVariant: ProductVariant | undefined;
  getColorHex: (name: string) => string;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const ProductInfo = ({
  product,
  attributeOptions,
  selected,
  onSelect,
  selectedVariant,
  getColorHex,
  quantity,
  onIncrease,
  onDecrease,
}: ProductInfoProps) => {
  const price = selectedVariant ? Number(selectedVariant.suggestedPrice) : undefined;
  const margin = selectedVariant ? Number(selectedVariant.suggestedMargin) : undefined;
  // TODO: confirmar con back qué campo corresponde a "Precio sugerido" del mock
  const referencePrice = selectedVariant ? Number(selectedVariant.cost) : undefined;
  const stock = selectedVariant?.stock ?? 0;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Typography variant="h4">{product.name}</Typography>

      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography sx={{ fontSize: '32px', fontWeight: 600, lineHeight: '48px', color: '#353535' }}>
            {price !== undefined ? `$ ${price.toFixed(2).replace('.', ',')}` : '—'}
          </Typography>
          {margin !== undefined && (
            <Chip
              size="small"
              label={`${margin.toFixed(0)}% de ganancia`}
              sx={{ bgcolor: 'success.light', color: 'success.dark', fontWeight: 600 }}
            />
          )}
        </Box>
        {referencePrice !== undefined && (
          <Typography variant="caption">
            Precio sugerido: $ {referencePrice.toFixed(2).replace('.', ',')}
          </Typography>
        )}
      </Box>

      {attributeOptions.map((attr) => (
        <Box key={attr.name}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {attr.name}
          </Typography>

          {attr.type === 'color' ? (
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              {attr.values.map((value) => (
                <Box
                  key={value}
                  onClick={() => onSelect(attr.name, value)}
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    bgcolor: getColorHex(value),
                    cursor: 'pointer',
                    border: '2px solid',
                    borderColor: selected[attr.name] === value ? 'text.primary' : 'grey.300',
                  }}
                />
              ))}
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {attr.values.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  variant={selected[attr.name] === value ? 'filled' : 'outlined'}
                  onClick={() => onSelect(attr.name, value)}
                  sx={{
                    borderRadius: '100px',
                    borderColor: selected[attr.name] === value ? 'text.primary' : 'grey.300',
                    bgcolor: 'transparent',
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      ))}

      <Box>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Cantidad:
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton
            size="small"
            onClick={onDecrease}
            disabled={quantity <= 1}
            sx={{ border: '1px solid', borderColor: 'grey.300' }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography variant="h6">{quantity}</Typography>
          <IconButton
            size="small"
            onClick={onIncrease}
            disabled={!selectedVariant || quantity >= stock}
            sx={{ border: '1px solid', borderColor: 'grey.300' }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
          <Chip size="small" label={`Stock: ${stock}`} sx={{ bgcolor: 'grey.100' }} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pt: 1 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<ShoppingCartIcon />}
          disabled={!selectedVariant}
        >
          Sumar a mi tienda
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          startIcon={<ShoppingCartIcon />}
          disabled={!selectedVariant}
        >
          Compra manual
        </Button>
      </Box>
    </Box>
  );
};