import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { createProductSchema, type CreateProductFormValues } from '@/schemas/product.schema';
import { listingsService } from '@/services/listings.service';
import { useProductFormStore } from '@/store/productForm.store';

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
    },
  });

  const { control, formState: { errors, isValid }, watch } = form;

  const nameValue = watch('name');

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);
    try {
      const payload = {
        name: values.name,
        description: values.description ?? '',
        categoryId: values.categoryId,
        attributes: [],
        images: [],
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
    onSubmit,
    serverError,
    setServerError,
    isSubmitting: form.formState.isSubmitting,
  };
};