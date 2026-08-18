import type { ProductImagePayload } from "@/types/product.type";

export const IMAGE_MAX_COUNT = 12;

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export interface ImagePreview {
  id: string;
  base64: string;
  mimetype: string;
  file?: File; // optional — existing images from API don't have a File object
  previewUrl: string;
}

/**
 * Converts a File to a base64 string (includes the data URI prefix, e.g. "data:image/jpeg;base64,...")
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.readAsDataURL(file);
  });
}

/**
 * Processes a list of Files and returns ImagePreview objects.
 * Filters by accepted MIME types.
 */
export async function filesToImagePreviews(files: File[]): Promise<ImagePreview[]> {
  const validFiles = files.filter((f) => ACCEPTED_IMAGE_TYPES.includes(f.type));

  const previews = await Promise.all(
    validFiles.map(async (file): Promise<ImagePreview> => {
      const base64 = await fileToBase64(file);
      return {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        base64,
        mimetype: file.type,
        file,
        previewUrl: URL.createObjectURL(file),
      };
    }),
  );

  return previews;
}

/**
 * Frees object URLs to avoid memory leaks.
 */
export function revokeImagePreviews(previews: ImagePreview[]): void {
  previews.forEach((p) => URL.revokeObjectURL(p.previewUrl));
}

/**
 * Convierte una imagen "interna" (que puede tener una URL de Cloudinary
 * disfrazada de base64) al shape que espera el backend:
 * - si `base64` arranca con 'http' → es una imagen ya existente → {url, publicId}
 * - si no → es una imagen nueva subida por el usuario → {base64}
 */
export function toApiImage(img: {
  base64?: string;
  mimetype: string;
  id?: string;
}): ProductImagePayload {
  if (img.base64?.startsWith('http')) {
    return {
      url: img.base64,
      publicId: img.id ?? '',
      mimetype: img.mimetype,
    };
  }
  return { base64: img.base64 ?? '', mimetype: img.mimetype };
}