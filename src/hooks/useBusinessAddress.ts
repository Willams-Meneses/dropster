import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addressSchema, type AddressFormValues } from '@/schemas/address.schema';
import { profileService } from '@/services/profile.service';
import { useAuthStore } from '@/store/auth.store';

interface useBusinessAddressProps {
  defaultValues: AddressFormValues;
}

export const useBusinessAddress = ({ defaultValues }: useBusinessAddressProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);
  const currentUser = useAuthStore((s) => s.user);

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    mode: 'onChange',
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const data = await profileService.updateAddress(values);

      setUser({
        ...currentUser!,
        ...data.user,
      });

      enqueueSnackbar('Dirección guardada correctamente', { variant: 'success' });
      navigate('/dashboard/my-profile');

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        enqueueSnackbar('Ocurrió un error al guardar la dirección.', { variant: 'error' });
      } else {
        enqueueSnackbar('Ocurrió un error inesperado.', { variant: 'error' });
      }
    }
  });

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
    isValid: form.formState.isValid,
  };
};