import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { createProductSchema, type CreateProductFormValues } from '@/schemas/product.schema';
import { listingsService } from '@/services/listings.service';
import { useProductFormStore } from '@/store/productForm.store';
import { type ImagePreview } from '@/utils/imageUtils';

export const useCreateProduct = () => {
  const navigate = useNavigate();
  const { serverError, setServerError, reset } = useProductFormStore();

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      categoryId: '',
      images: [],
    },
  });

  const { control, formState: { errors, isValid }, watch, setValue } = form;

  const nameValue = watch('name');
  const imagesValue = watch('images');

  /**
   * Called by PhotosSection whenever the user adds/removes photos.
   * Converts ImagePreview[] → the plain payload shape that Zod validates,
   * and stores the full previews in a ref so we can revoke URLs later.
   */
  const handleImagesChange = (previews: ImagePreview[]) => {
    setValue(
      'images',
      previews.map((p) => ({ base64: p.base64, mimetype: p.mimetype })),
      { shouldValidate: true, shouldDirty: true },
    );
    // Keep previews accessible for the section component via a separate state.
    // Return them so the caller can store them locally.
    return previews;
  };

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);
    try {
      const payload = {
        name: values.name,
        description: values.description ?? '',
        categoryId: values.categoryId,
        attributes: [],
        images: values.images,
        variants: [],
      };
      const product = await listingsService.create(payload);
      reset();
      void navigate(`/dashboard/products/${product.id}`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        setServerError('Revisá los datos ingresados e intentá de nuevo.');
      } else {
        setServerError('Ocurrió un error al crear el producto. Intentá de nuevo.');
      }
    }
  });

  return {
    form,
    control,
    errors,
    isValid,
    nameValue,
    imagesValue,
    handleImagesChange,
    onSubmit,
    serverError,
    setServerError,
    isSubmitting: form.formState.isSubmitting,
  };
};