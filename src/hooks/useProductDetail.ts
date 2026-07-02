import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { listingsService } from '@/services/listings.service';
import { COLOR_PRESETS } from '@/types/variant.type';
import type { ApiProduct } from '@/types/product.type';
import type { AttributeOption } from '@/types/productDetail.type';

function inferAttributeType(attrName: string): 'color' | 'talle' | 'modelo' {
  const lower = attrName.toLowerCase();
  if (lower === 'color') return 'color';
  if (lower === 'talle') return 'talle';
  return 'modelo';
}

export function useProductDetail() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const fetchProduct = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await listingsService.getById(id);
        if (!cancelled) setProduct(data);
      } catch {
        if (!cancelled) setIsError(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  // ── Atributos disponibles (Color / Talle / Modelo) ──────────────────────────
  const attributeOptions: AttributeOption[] = useMemo(() => {
    if (!product) return [];

    return product.attributes.map((attrName, index) => {
      const uniqueValues = [
        ...new Set(product.variants.map((v) => v.values[index]).filter(Boolean)),
      ];
      return {
        name: attrName,
        index,
        type: inferAttributeType(attrName),
        values: uniqueValues,
      };
    });
  }, [product]);

  // ── Selección actual por atributo ────────────────────────────────────────────
  // Guardamos solo lo que el usuario tocó explícitamente ("overrides").
  // El valor efectivo se calcula con useMemo, mergeando override + default
  // (primer valor disponible). Esto evita setState dentro de un effect.
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  const selected: Record<string, string> = useMemo(() => {
    const result: Record<string, string> = {};
    attributeOptions.forEach((attr) => {
      result[attr.name] = overrides[attr.name] ?? attr.values[0] ?? '';
    });
    return result;
  }, [attributeOptions, overrides]);

  const selectValue = (attrName: string, value: string) => {
    setOverrides((prev) => ({ ...prev, [attrName]: value }));
    setQuantity(1);
  };

  // ── Variante que matchea la selección actual ─────────────────────────────────
  const selectedVariant = useMemo(() => {
    if (!product || attributeOptions.length === 0) return undefined;

    const orderedValues = attributeOptions.map((attr) => selected[attr.name]);
    if (orderedValues.some((v) => !v)) return undefined;

    return product.variants.find((v) => v.values.join('|') === orderedValues.join('|'));
  }, [product, attributeOptions, selected]);

  // ── Helper para mapear color -> hex (usa preset, fallback gris) ─────────────
  const getColorHex = (colorName: string): string =>
    COLOR_PRESETS.find((c) => c.name === colorName)?.hex ?? '#CCCCCC';

  // ── Imágenes a mostrar: las de la variante si tiene, sino las generales ─────
  const displayImages = useMemo(() => {
    if (selectedVariant && selectedVariant.images.length > 0) {
      return selectedVariant.images;
    }
    return product?.images ?? [];
  }, [product, selectedVariant]);

  const increaseQuantity = () => {
    if (!selectedVariant) return;
    setQuantity((q) => Math.min(q + 1, selectedVariant.stock));
  };

  const decreaseQuantity = () => {
    setQuantity((q) => Math.max(q - 1, 1));
  };

  return {
    product,
    isLoading,
    isError,
    attributeOptions,
    selected,
    selectValue,
    selectedVariant,
    getColorHex,
    displayImages,
    quantity,
    increaseQuantity,
    decreaseQuantity,
  };
}