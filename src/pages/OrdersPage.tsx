import React, { useState } from 'react';
import { Box } from '@mui/material';
import { PageHeader } from '@/components/ui/PageHeader';
import { FilterBar } from '@/components/ui/FilterBar';
import { StatusTabs, type TabItem } from '@/components/ui/StatusTabs';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { OrdersTable } from '@/components/orders/OrdersTable';
import { useOrders } from '@/hooks/useOrders';
import { DEFAULT_SORT_OPTIONS, EMPTY_FILTER_OPTIONS } from '@/store/tableOptions.store';
import type { OrderStatus } from '@/types/order.type';

const STATUS_TAB_MAP: Record<string, OrderStatus | 'all'> = {
  all: 'all',
  pending_payment: 'pending_payment',
  in_process: 'in_process',
  delivered: 'delivered',
  cancelled: 'cancelled',
  not_delivered: 'not_delivered',
};

const OrdersPage: React.FC = () => {
  const { orders, isLoading, error, refetch } = useOrders();
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [filter, setFilter] = useState('');

  const countByStatus = (status: OrderStatus) =>
    orders.filter((o) => o.status === status).length;

  const tabs: TabItem[] = [
    { value: 'all', label: 'Todas', count: orders.length },
    { value: 'pending_payment', label: 'Pendiente de pago', count: countByStatus('pending_payment') },
    { value: 'in_process', label: 'En proceso', count: countByStatus('in_process') },
    { value: 'delivered', label: 'Entregado', count: countByStatus('delivered') },
    { value: 'cancelled', label: 'Cancelado', count: countByStatus('cancelled') },
    { value: 'not_delivered', label: 'No entregado', count: countByStatus('not_delivered') },
  ];

  const filteredOrders = orders.filter((o) => {
    const tabStatus = STATUS_TAB_MAP[activeTab];
    if (tabStatus !== 'all' && o.status !== tabStatus) return false;
    if (search && !o.storeName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handlePay = (id: string) => {
    console.log('Iniciar pago para orden:', id);
    // TODO: orderService.initiatePayment(id) + redirect a checkoutUrl
  };

  const handleView = (id: string) => {
    console.log('Ver detalle de orden:', id);
    // TODO: navegación a detalle
  };

  if (isLoading) return <LoadingScreen message="Cargando órdenes..." />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <Box sx={{ px: 0, mt: 3 }}>
      <PageHeader title="Pedidos" description="Visualiza las compras que tus clientes hayan hecho en tus tiendas y paga a tus proveedores para completar las operaciones." />

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
        {filteredOrders.length === 0 ? (
          <ErrorMessage message="No se encontraron órdenes para este filtro." onRetry={refetch} />
        ) : (
          <OrdersTable rows={filteredOrders} onPay={handlePay} onView={handleView} />
        )}
      </Box>
    </Box>
  );
};

export default OrdersPage;