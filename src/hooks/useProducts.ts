import { useState, useEffect } from 'react';
import { productsService } from '@/services/products.service';
import { mapApiProductsToProducts } from '@/utils/mappers/product.mapper';
import type { Product } from '@/types/product.type';

interface UseProductsResult {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

export const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiProducts = await productsService.getCatalog();
        if (!cancelled) {
          setProducts(mapApiProductsToProducts(apiProducts));
        }
      } catch {
        if (!cancelled) {
          setError('No se pudieron cargar los productos. Intentá de nuevo.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, isLoading, error };
};