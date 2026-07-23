import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { PageHeader } from '@/components/ui/PageHeader';
import { FilterBar } from '@/components/ui/FilterBar';
import { StatusTabs, type TabItem } from '@/components/ui/StatusTabs';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { useSales } from '@/hooks/useSales';
import { DEFAULT_SORT_OPTIONS, EMPTY_FILTER_OPTIONS } from '@/store/tableOptions.store';
import type { SaleStatus } from '@/types/sale.type';
import { SalesTable } from '@/components/my-sales/SalesTable';

const STATUS_TAB_MAP: Record<string, SaleStatus | 'all'> = {
  all: 'all',
  ready_to_dispatch: 'ready_to_dispatch',
  in_process: 'in_process',
  delivered: 'delivered',
  returned: 'returned',
  not_delivered: 'not_delivered',
};

const MySalesPage: React.FC = () => {
  const { sales, isLoading, error, refetch } = useSales();
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [filter, setFilter] = useState('');

  const countByStatus = (status: SaleStatus) =>
    sales.filter((s) => s.status === status).length;

  const tabs: TabItem[] = [
    { value: 'all', label: 'Todas', count: sales.length },
    { value: 'ready_to_dispatch', label: 'Listo para despachar', count: countByStatus('ready_to_dispatch') },
    { value: 'in_process', label: 'En proceso', count: countByStatus('in_process') },
    { value: 'delivered', label: 'Entregado', count: countByStatus('delivered') },
    { value: 'returned', label: 'Devuelto', count: countByStatus('returned') },
    { value: 'not_delivered', label: 'No entregado', count: countByStatus('not_delivered') },
  ];

  const filteredSales = sales.filter((s) => {
    const tabStatus = STATUS_TAB_MAP[activeTab];
    if (tabStatus !== 'all' && s.status !== tabStatus) return false;
    if (search && !s.customerName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleView = (id: string) => {
    console.log('Ver detalle de venta:', id);
    // TODO: navegación a detalle
  };

  const handlePrintLabel = (id: string) => {
    console.log('Imprimir etiqueta para venta:', id);
    // TODO: Lógica para imprimir etiqueta
  };

  if (isLoading) return <LoadingScreen message="Cargando ventas..." />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <Box sx={{ px: 0, mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <PageHeader
          title="Mis ventas"
          description="Visualiza el historial de ventas de tus productos y gestiona los envíos de las órdenes pagas."
        />
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          sx={{ height: 'fit-content' }}
        >
          Descargar CSV
        </Button>
      </Box>



      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Buscar por nombre, SKU o Tags"
        sortValue={sort}
        onSortChange={setSort}
        sortOptions={DEFAULT_SORT_OPTIONS}
        filterValue={filter}
        onFilterChange={setFilter}
        filterOptions={EMPTY_FILTER_OPTIONS}
      />

      <StatusTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <Box sx={{ mt: 2 }}>
        {filteredSales.length === 0 ? (
          <ErrorMessage message="No se encontraron ventas para este filtro." onRetry={refetch} />
        ) : (
          <SalesTable
            rows={filteredSales}
            onView={handleView}
            onPrintLabel={handlePrintLabel}
          />
        )}
      </Box>
    </Box>
  );
};

export default MySalesPage;