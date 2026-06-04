import { z } from 'zod';

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, 'El título es requerido')
    .max(100, 'El título no puede superar los 100 caracteres'),
  description: z.string().optional(),
  categoryId: z.string().min(1, 'Debés seleccionar al menos una categoría'),
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;