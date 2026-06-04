import { CategorySection } from '@/components/my-listings/create-product/CategorySection';
import { TagsSeoSection } from '@/components/my-listings/create-product/TagsSeoSection';
import { TitleDescriptionSection } from '@/components/my-listings/create-product/TitleDescriptionSection';
import { VariantsSection } from '@/components/my-listings/create-product/VariantsSection';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { PageHeader } from '@/components/ui/PageHeader';
import { useCreateProduct } from '@/hooks/useCreateProduct';
import { Box, Button } from '@mui/material';


const CreateProductPage = () => {
  const {
    control,
    errors,
    isValid,
    nameValue,
    onSubmit,
    serverError,
    setServerError,
    isSubmitting,
  } = useCreateProduct();

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