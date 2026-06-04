import { useState, useEffect } from 'react';
import { categoriesService } from '@/services/categories.service';
import type { Category } from '@/types/category.type';

interface UseCategoriesResult {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

export const useCategories = (): UseCategoriesResult => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await categoriesService.getAll();
        if (!cancelled) {
          setCategories(data);
        }
      } catch {
        if (!cancelled) {
          setError('No se pudieron cargar las categorías.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void fetchCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  return { categories, isLoading, error };
};