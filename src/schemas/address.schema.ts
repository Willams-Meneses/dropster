import { z } from 'zod';

export const addressSchema = z.object({
  street: z.string().min(1, 'La calle es requerida'),
  height: z.string().min(1, 'La altura es requerida'),
  floor: z.string().optional(),
  apartment: z.string().optional(),
  city: z.string().min(1, 'La ciudad es requerida'),
  province: z.string().min(1, 'Seleccioná una provincia'),
  postalCode: z.string().min(1, 'El código postal es requerido'),
  country: z.string().min(1, 'Seleccioná un país'),
});

export type AddressFormValues = z.infer<typeof addressSchema>;