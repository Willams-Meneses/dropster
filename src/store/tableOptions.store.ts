import type { FilterOption, SortOption } from "@/components/ui/FilterBar";

export const DEFAULT_SORT_OPTIONS: SortOption[] = [
  { value: 'newest', label: 'Más nuevo primero' },
  { value: 'oldest', label: 'Más antiguo primero' },
  { value: 'name_asc', label: 'Nombre A-Z' },
  { value: 'name_desc', label: 'Nombre Z-A' },
];

export const EMPTY_FILTER_OPTIONS: FilterOption[] = [];