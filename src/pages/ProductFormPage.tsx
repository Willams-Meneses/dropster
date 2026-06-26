import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { CategorySection } from '@/components/my-listings/create-product/CategorySection';
import { PhotosSection } from '@/components/my-listings/create-product/PhotosSection';
import { TagsSeoSection } from '@/components/my-listings/create-product/TagsSeoSection';
import { TitleDescriptionSection } from '@/components/my-listings/create-product/TitleDescriptionSection';
import { VariantsSection } from '@/components/my-listings/create-product/VariantsSection';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { PageHeader } from '@/components/ui/PageHeader';
import { useProductForm } from '@/hooks/useProductForm';
import { listingsService } from '@/services/listings.service';
import { useProductFormStore } from '@/store/productForm.store';
import type { ApiProduct } from '@/types/product.type';
import type { ImagePreview } from '@/utils/imageUtils';

const ProductFormPage = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [product, setProduct] = useState<ApiProduct | undefined>(undefined);
  const [loadError, setLoadError] = useState<string | null>(null);
  // ✅ Inicializar isLoading en true solo si estamos editando — sin setState en effect
  const [isLoading, setIsLoading] = useState(isEditing);

  const setProductPhotos = useProductFormStore((s) => s.setProductPhotos);
  // ✅ imagePreviews viene directo del store — no hay estado local duplicado
  const imagePreviews = useProductFormStore((s) => s.productPhotos);

  useEffect(() => {
    if (!id) return;
    // ✅ No llamamos setIsLoading(true) acá porque ya arranca en true
    listingsService
      .getById(id)
      .then(setProduct)
      .catch(() => setLoadError('No se pudo cargar el producto.'))
      .finally(() => setIsLoading(false));
  }, [id]);

  const {
    control, errors, isValid, nameValue,
    handleImagesChange, onSubmit, serverError, setServerError, isSubmitting,
  } = useProductForm({ product });

  const onPhotosChange = (previews: ImagePreview[]) => {
    handleImagesChange(previews);
    setProductPhotos(previews);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isEditing && (loadError || !product)) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography color="error">{loadError ?? 'Producto no encontrado.'}</Typography>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>Volver</Button>
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader title={isEditing ? 'Editar Producto' : 'Nuevo Producto'} />

      {serverError && (
        <ErrorMessage message={serverError} onRetry={() => setServerError(null)} />
      )}

      <Box
        component="form"
        onSubmit={onSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <TitleDescriptionSection control={control} errors={errors} nameValue={nameValue ?? ''} />
        <CategorySection control={control} errors={errors} />
        <PhotosSection
          images={imagePreviews}
          onChange={onPhotosChange}
          error={errors.images?.message}
        />
        <VariantsSection />
        <TagsSeoSection />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 1 }}>
          <Button variant="outlined" onClick={() => navigate(-1)} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting || !isValid}>
            {isSubmitting
              ? isEditing ? 'Guardando...' : 'Publicando...'
              : isEditing ? 'Guardar cambios' : 'Publicar'
            }
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductFormPage;