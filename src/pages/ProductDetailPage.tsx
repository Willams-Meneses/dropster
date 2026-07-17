import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { useParams } from 'react-router-dom';
import { useProductDetail } from '@/hooks/useProductDetail';
import { ProductInfo } from '@/components/products/product-detail/ProductInfo';
import { ImageGallery } from '@/components/products/product-detail/ImageGallery';
import { ProductDescription } from '@/components/products/product-detail/ProductDescription';
import { ProviderInfo } from '@/components/products/product-detail/ProviderInfo';
import { BackButton } from '@/components/ui/buttons/BackButton';
import { useCartStore } from '@/store/cartStore';
import { useSnackbar } from 'notistack';

// Wrapper con key={id} fuerza un remount limpio del hook cuando cambia el producto,
// así no hay que preocuparse por resetear estado local "a mano".
export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  return <ProductDetailContent key={id} />;
};

const ProductDetailContent = () => {
  const {
    product,
    isLoading,
    isError,
    attributeOptions,
    selected,
    selectValue,
    selectedVariant,
    getColorHex,
    displayImages,
    quantity,
    increaseQuantity,
    decreaseQuantity,
  } = useProductDetail();

  const { addItem } = useCartStore();
  const { enqueueSnackbar } = useSnackbar();

  // Handler para agregar al carrito
  const handleAddToCart = () => {
    if (!selectedVariant || !product) return;
    addItem(selectedVariant, product.id, product.name);
    enqueueSnackbar('✅ Producto agregado al carrito', { variant: 'success' });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !product) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <Typography variant="body1">No se pudo cargar el producto.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <BackButton />
        <Typography variant="button" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}>
          Compartir <ShareIcon fontSize="small" />
        </Typography>
      </Box>

      {/* Fila 1: galería + selector de variantes */}
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ImageGallery images={displayImages} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ProductInfo
            product={product}
            attributeOptions={attributeOptions}
            selected={selected}
            onSelect={selectValue}
            selectedVariant={selectedVariant}
            getColorHex={getColorHex}
            quantity={quantity}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onAddToCart={handleAddToCart}
          />
        </Grid>
      </Grid>

      {/* Fila 2: descripción + datos del proveedor/envío, mismo nivel */}
      <Grid container spacing={4} sx={{ mt: { xs: 1, md: 2 } }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <ProductDescription description={product.description} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <ProviderInfo provider={product.provider} />
        </Grid>
      </Grid>
    </Box>
  );
};