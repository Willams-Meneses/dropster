import { z } from 'zod';

export const checkoutSchema = z.object({
  firstName: z.string().min(1, 'El nombre es requerido'),
  lastName: z.string().min(1, 'El apellido es requerido'),
  dni: z.string().min(1, 'El DNI es requerido'),
  phone: z.string().min(1, 'El teléfono es requerido'),
  street: z.string().min(1, 'La calle es requerida'),
  height: z.string().min(1, 'La altura es requerida'),
  province: z.string().min(1, 'Seleccioná una provincia'),
  city: z.string().min(1, 'La ciudad es requerida'),
  postalCode: z.string().min(1, 'El código postal es requerido'),
  country: z.string().min(1, 'Seleccioná un país'),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;