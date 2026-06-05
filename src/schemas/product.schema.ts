import { z } from 'zod';

const imageSchema = z.object({
  base64: z.string().min(1),
  mimetype: z.string().min(1),
});

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, 'El título es requerido')
    .max(100, 'El título no puede superar los 100 caracteres'),
  description: z
    .string()
    .min(1, 'La descripción es requerida'),
  categoryId: z
    .string()
    .min(1, 'Debés seleccionar al menos una categoría'),
  images: z
    .array(imageSchema)
    .min(1, 'Debés agregar al menos una foto'),
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;