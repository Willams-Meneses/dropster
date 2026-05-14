import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { registerSchema, type RegisterFormValues } from '@/schemas/auth.schema';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import { Role } from '@/types/auth.types';
import type { Role as RoleType } from '@/types/auth.types';

export const useRegister = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const [isSubmittingRole, setIsSubmittingRole] = useState(false);

  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: undefined,
      newsletter: false,
    },
  });

  // Paso 1 — registra sin rol y navega a select-role
  const onSubmitStep1 = form.handleSubmit(async (values) => {
    setServerError(null);
    try {
      const data = await authService.register({
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      });
      localStorage.setItem('access_token', data.accessToken);
      setUser({
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        role: null,
        mercadopagoId: null,
        cbu: null,
        isActive: true,
        createdAt: '',
        updatedAt: '',
      });
      void navigate('/select-role');
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setServerError('Ya existe una cuenta con ese email');
      } else {
        setServerError('Ocurrió un error, intentá de nuevo');
      }
    }
  });

  // Paso 2 — actualiza el rol y entra al dashboard
  const onSubmitRole = async () => {
    if (!selectedRole) {
      setServerError('Seleccioná un rol para continuar');
      return;
    }

    setServerError(null);
    setIsSubmittingRole(true);

    try {
      const response = await authService.updateMe({ role: selectedRole });
      localStorage.setItem('access_token', response.accessToken);
      const currentUser = useAuthStore.getState().user;
      setUser({
        ...currentUser!,
        role: response.user.role,
      });
      //TODO: No navegas. ProtectedRoute se encarga. Ver App.tsx
      void navigate('/');
    } catch {
      setServerError('Ocurrió un error al guardar el rol, intentá de nuevo');
    } finally {
      setIsSubmittingRole(false);
    }
  };

  return {
    form,
    onSubmitStep1,
    onSubmitRole,
    selectedRole,
    setSelectedRole,
    serverError,
    setServerError,
    isSubmitting: form.formState.isSubmitting,
    isSubmittingRole,
    Role,
  };
};