import { create } from 'zustand';

interface TableFilters {
  search: string;
  sort: string;
  filter: string;
}

interface TableViewState {
  activeTab: string;
  filters: TableFilters;
  selectedIds: Set<string>;
}

interface TableViewActions {
  setActiveTab: (tab: string) => void;
  setSearch: (value: string) => void;
  setSort: (value: string) => void;
  setFilter: (value: string) => void;
  toggleSelectId: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  resetFilters: () => void;
}

const DEFAULT_FILTERS: TableFilters = {
  search: '',
  sort: 'newest',
  filter: '',
};

function createTableStore(defaultTab: string) {
  return create<TableViewState & TableViewActions>((set) => ({
    activeTab: defaultTab,
    filters: { ...DEFAULT_FILTERS },
    selectedIds: new Set<string>(),

    setActiveTab: (tab) =>
      set(() => ({
        activeTab: tab,
        filters: { ...DEFAULT_FILTERS },
        selectedIds: new Set<string>(),
      })),

    setSearch: (value) =>
      set((state) => ({ filters: { ...state.filters, search: value } })),

    setSort: (value) =>
      set((state) => ({ filters: { ...state.filters, sort: value } })),

    setFilter: (value) =>
      set((state) => ({ filters: { ...state.filters, filter: value } })),

    toggleSelectId: (id) =>
      set((state) => {
        const next = new Set(state.selectedIds);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return { selectedIds: next };
      }),

    selectAll: (ids) =>
      set((state) => {
        const allSelected = ids.every((id) => state.selectedIds.has(id));
        return { selectedIds: allSelected ? new Set<string>() : new Set(ids) };
      }),

    clearSelection: () => set({ selectedIds: new Set<string>() }),

    resetFilters: () => set({ filters: { ...DEFAULT_FILTERS } }),
  }));
}

// One store per section — keeps state isolated between views
export const usePublicationsStore = createTableStore('all');
export const useOrdersStore = createTableStore('pending_payment');
export const useSalesStore = createTableStore('ready_to_ship');
export const useReturnsStore = createTableStore('in_progress');
export const useStoreProductsStore = createTableStore('products');