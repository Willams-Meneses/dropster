import { CategorySection } from '@/components/my-listings/create-product/CategorySection';
import { PhotosSection } from '@/components/my-listings/create-product/PhotosSection';
import { TagsSeoSection } from '@/components/my-listings/create-product/TagsSeoSection';
import { TitleDescriptionSection } from '@/components/my-listings/create-product/TitleDescriptionSection';
import { VariantsSection } from '@/components/my-listings/create-product/VariantsSection';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { PageHeader } from '@/components/ui/PageHeader';
import { useCreateProduct } from '@/hooks/useCreateProduct';
import { useProductFormStore } from '@/store/productForm.store';
import type { ImagePreview } from '@/utils/imageUtils';
import { Box, Button } from '@mui/material';
import { useState } from 'react';


const CreateProductPage = () => {
  const {
    control,
    errors,
    isValid,
    nameValue,
    handleImagesChange,
    onSubmit,
    serverError,
    setServerError,
    isSubmitting,
  } = useCreateProduct();

  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const setProductPhotos = useProductFormStore((s) => s.setProductPhotos);

  const onPhotosChange = (previews: ImagePreview[]) => {
    setImagePreviews(previews);
    handleImagesChange(previews);
    setProductPhotos(previews);
  };

  return (
    <Box>
      {/* Header */}
      <PageHeader title={'Nuevo Producto'} />

      {serverError && (
        <ErrorMessage
          message={serverError}
          onRetry={() => {
            setServerError(null);
          }}
        />
      )}

      <Box
        component="form"
        onSubmit={onSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <TitleDescriptionSection
          control={control}
          errors={errors}
          nameValue={nameValue ?? ''}
        />

        <CategorySection control={control} errors={errors} />
        <PhotosSection
          images={imagePreviews}
          onChange={onPhotosChange}
          // Pasá el error de Zod si querés mostrarlo bajo la sección:
          error={errors.images?.message}
        />

        <VariantsSection />

        <TagsSeoSection />

        {/* Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 1 }}>
          <Button
            variant="outlined"
            onClick={() => window.history.back()}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? 'Publicando...' : 'Publicar'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateProductPage;