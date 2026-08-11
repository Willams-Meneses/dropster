import { z } from 'zod';

export const profileSchema = z.object({
  firstName: z.string().min(1, 'El nombre es requerido'),
  lastName: z.string().min(1, 'El apellido es requerido'),
  dni: z.string().min(1, 'El DNI es requerido'),
  phone: z.string().min(1, 'El teléfono es requerido'),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;