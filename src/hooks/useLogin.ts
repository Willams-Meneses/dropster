import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { loginSchema, type LoginFormValues } from '@/schemas/auth.schema';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';

export const useLogin = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);
    try {
      const data = await authService.login(values);
      localStorage.setItem('access_token', data.accessToken);
      setUser({
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        role: data.user.role,
        mercadopagoId: null,
        cbu: null,
        isActive: true,
        createdAt: '',
        updatedAt: '',
      });
      void navigate('/dashboard');
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setServerError('Email o contraseña incorrectos');
      } else {
        setServerError('Ocurrió un error, intentá de nuevo');
      }
    }
  });

  return { form, onSubmit, serverError, setServerError, isSubmitting: form.formState.isSubmitting };
};