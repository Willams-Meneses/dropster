import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { profileSchema, type ProfileFormValues } from '@/schemas/profile.schema';
import { profileService } from '@/services/profile.service';
import { useAuthStore } from '@/store/auth.store';

interface UseProfileProps {
  defaultValues: ProfileFormValues;
}

export const useProfile = ({ defaultValues }: UseProfileProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);
  const currentUser = useAuthStore((s) => s.user);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async (values) => {    
    try {
      const data = await profileService.updateMyInfo({
        firstName: values.firstName,
        lastName: values.lastName,
        dni: values.dni,
        phone: values.phone,
      });
      
      // Actualizamos el store global
      setUser({
        ...currentUser!,
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        role: data.user.role,
        dni: data.user.dni,
        phone: data.user.phone,
      });

      // Mostramos el toast de éxito
      enqueueSnackbar('Tus datos se actualizaron correctamente', { variant: 'success' });
      
      // Redirigimos a la vista de Mi Perfil 
      navigate('/dashboard/my-profile'); 
      
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        enqueueSnackbar('Ocurrió un error al actualizar tus datos.', { variant: 'error' });
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