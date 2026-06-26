import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import axios from 'axios';
import { createProductSchema, type CreateProductFormValues } from '@/schemas/product.schema';
import { listingsService } from '@/services/listings.service';
import { useProductFormStore } from '@/store/productForm.store';
import { type ImagePreview } from '@/utils/imageUtils';
import type { ApiProduct } from '@/types/product.type';

interface UseProductFormOptions {
  product?: ApiProduct;
}

export const useProductForm = ({ product }: UseProductFormOptions = {}) => {
  const navigate = useNavigate();
  const isEditing = !!product;

  const {
    serverError,
    setServerError,
    reset: resetStore,
    addProperty,
    updateVariant,
    setProductPhotos,
  } = useProductFormStore();

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      categoryId: '',
      images: [],
    },
  });

  const { control, formState: { errors, isValid }, watch, setValue } = form;
  const nameValue = watch('name');

  // ── Hydrate form + store when product loads ─────────────────────────────────
  useEffect(() => {
    if (!product) return;

    // 1. Reset RHF form with the loaded values
    form.reset({
      name: product.name,
      description: product.description ?? '',
      categoryId: product.category?.id ?? '',
      images: product.images.map((img) => ({ base64: img.url, mimetype: 'image/jpeg' })),
    });

    // 2. Reset store to avoid stale state from a previous session
    resetStore();

    // 3. Rebuild properties from attributes + variant values
    if (product.attributes.length > 0 && product.variants.length > 0) {
      product.attributes.forEach((attrName, attrIndex) => {
        const uniqueValues = [
          ...new Set(product.variants.map((v) => v.values[attrIndex]).filter(Boolean)),
        ];

        const attrLower = attrName.toLowerCase();
        const type = attrLower === 'color' ? 'color'
          : attrLower === 'talle' ? 'talle'
            : 'modelo';

        if (type === 'color') {
          addProperty({
            type: 'color',
            name: attrName,
            values: uniqueValues.map((name) => ({ name, hex: '#CCCCCC' })),
          });
        } else {
          addProperty({ type, name: attrName, values: uniqueValues });
        }
      });
    }

    // 4. Hydrate variant data (stock, cost, prices, sku, images) into store variants
    //    buildVariants creates them with zeros — we patch each one with real API data
    //    We do this after a tick so addProperty has finished rebuilding variants
    setTimeout(() => {
      const { variants } = useProductFormStore.getState();
      variants.forEach((storeVariant, storeIdx) => {
        const apiVariant = product.variants.find(
          (av) => av.values.join('|') === storeVariant.values.join('|'),
        );
        if (!apiVariant) return;

        updateVariant(storeIdx, {
          sku: apiVariant.sku ?? '',
          cost: apiVariant.cost,
          suggestedMargin: apiVariant.suggestedMargin,
          suggestedPrice: apiVariant.suggestedPrice,
          stock: apiVariant.stock,
          weight: apiVariant.weight ?? '',
          images: apiVariant.images.map((img) => ({
            base64: img.url,   // base64 = url para imágenes existentes
            mimetype: 'image/jpeg',
          })),
        });
      });
    }, 0);

    // 5. Hydrate product photos — incluye fotos generales + fotos de variantes
    const generalPreviews: ImagePreview[] = product.images.map((img, i) => ({
      id: img.publicId || `existing-general-${i}`,
      previewUrl: img.url,
      base64: img.url,
      mimetype: 'image/jpeg',
    }));

    // Fotos de variantes también van al pool de productPhotos para que el drawer las muestre
    const variantPreviews: ImagePreview[] = product.variants.flatMap((v, vi) =>
      v.images.map((img, ii) => ({
        id: img.publicId || `existing-variant-${vi}-${ii}`,
        previewUrl: img.url,
        base64: img.url,
        mimetype: 'image/jpeg',
      }))
    );

    // Deduplicar por id por si una foto aparece en general y en variante
    const allPreviews = [...generalPreviews];
    variantPreviews.forEach((vp) => {
      if (!allPreviews.some((p) => p.id === vp.id)) {
        allPreviews.push(vp);
      }
    });

    setProductPhotos(allPreviews);
    setValue('images', generalPreviews.map((p) => ({ base64: p.base64, mimetype: p.mimetype })), {
      shouldValidate: true,
    });

    // Only re-run when the product id changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  // ── Image handler ───────────────────────────────────────────────────────────
  const handleImagesChange = (previews: ImagePreview[]) => {
    setValue(
      'images',
      previews.map((p) => ({ base64: p.base64, mimetype: p.mimetype })),
      { shouldValidate: true, shouldDirty: true },
    );
    return previews;
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const onSubmit = form.handleSubmit(async (values) => {
    const { properties, variants, productPhotos } = useProductFormStore.getState();
    setServerError(null);

    try {
      const assignedBase64s = new Set(
        variants.flatMap((v) => v.images.map((img) => img.base64)),
      );

      const unassignedImages = productPhotos
        .filter((p) => !assignedBase64s.has(p.base64))
        .map((p) => ({ base64: p.base64, mimetype: p.mimetype }));

      const variantPayload = variants.map((v) => ({
        values: v.values,
        sku: v.sku,
        cost: v.cost,
        suggestedMargin: v.suggestedMargin,
        suggestedPrice: v.suggestedPrice,
        stock: v.stock,
        weight: v.weight,
        depth: v.depth,
        width: v.width,
        height: v.height,
        images: v.images,
      }));

      if (isEditing && product) {
        await listingsService.update(product.id, {
          name: values.name,
          description: values.description ?? '',
          categoryId: values.categoryId,
          attributes: properties.map((p) => p.name),
          images: unassignedImages,
          variants: variantPayload,
        });
      } else {
        await listingsService.create({
          name: values.name,
          description: values.description ?? '',
          categoryId: values.categoryId,
          attributes: properties.map((p) => p.name),
          images: unassignedImages,
          variants: variantPayload,
        });
      }

      resetStore();
      void navigate('/dashboard/my-listings');
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        setServerError('Revisá los datos ingresados e intentá de nuevo.');
      } else {
        setServerError('Ocurrió un error. Intentá de nuevo.');
      }
    }
  });

  return {
    form,
    control,
    errors,
    isValid,
    nameValue,
    isEditing,
    handleImagesChange,
    onSubmit,
    serverError,
    setServerError,
    isSubmitting: form.formState.isSubmitting,
  };
};