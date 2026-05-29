import React, { useState } from 'react';
import { Box } from '@mui/material';

import { PageHeader } from '@/components/ui/PageHeader';
import { FilterBar } from '@/components/ui/FilterBar';
import { StatusTabs, type TabItem } from '@/components/ui/StatusTabs';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

import { useStoreProducts } from '@/hooks/useStoreProducts';
import { useStoreOperations } from '@/hooks/useStoreOperations';
import { DEFAULT_SORT_OPTIONS, EMPTY_FILTER_OPTIONS } from '@/store/tableOptions.store';
import { ProductsStoreTable } from '@/components/my-stores/ProductsStoreTable';

// ── Tab config ────────────────────────────────────────────────────────────────

type StoreTab = 'products' | 'store_details';

const TABS: TabItem[] = [
  { value: 'products', label: 'Productos' },
  { value: 'store_details', label: 'Detalles de la tienda' },
];

// ── Page ──────────────────────────────────────────────────────────────────────

const MyStoreDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StoreTab>('products');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [filter, setFilter] = useState('');

  const { storeListings, isLoading, error, refetch } = useStoreProducts();
  const { removeProduct, updateSellPrice } = useStoreOperations();

  // ── Filtering ─────────────────────────────────────────────────────────────

  const filteredListings = storeListings.filter((l) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      l.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sort === 'name_asc') return a.name.localeCompare(b.name);
    if (sort === 'name_desc') return b.name.localeCompare(a.name);
    return 0;
  });

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleRemove = async (tiendanubeProductId: string) => {
    await removeProduct(tiendanubeProductId);
    refetch();
  };

  // updateSellPrice no hace refetch: el input ya tiene el nuevo valor en estado local
  // y el backend actualiza en TN. Si el request falla, el snackbar de error avisa
  // y el input queda con el valor que el usuario escribió (puede volver a intentarlo).
  const handleSellPriceChange = async (
    dropshipperVariantId: string,
    newPrice: number,
  ) => {
    await updateSellPrice(dropshipperVariantId, newPrice);
  };

  // ── Render ────────────────────────────────────────────────────────────────

  if (isLoading) return <LoadingScreen message="Cargando productos de tu tienda..." />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <Box sx={{ px: 0, mt: 3 }}>
      <PageHeader
        title="Mi Tienda"
        description="Administrá los productos que tenés publicados en tu tienda Tiendanube."
      />

      <StatusTabs
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={(value) => setActiveTab(value as StoreTab)}
      />

      {activeTab === 'products' && (
        <>
          <FilterBar
            searchValue={search}
            onSearchChange={setSearch}
            sortValue={sort}
            onSortChange={setSort}
            sortOptions={DEFAULT_SORT_OPTIONS}
            filterValue={filter}
            onFilterChange={setFilter}
            filterOptions={EMPTY_FILTER_OPTIONS}
          />

          <ProductsStoreTable
            rows={sortedListings}
            onRemove={(id) => { void handleRemove(id); }}
            onSellPriceChange={(id, price) => { void handleSellPriceChange(id, price); }}
          />
        </>
      )}

      {activeTab === 'store_details' && (
        // TODO: implementar vista de detalles de la tienda
        <Box sx={{ py: 4 }} />
      )}
    </Box>
  );
};

export default MyStoreDetailPage;