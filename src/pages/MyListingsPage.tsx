import React from 'react';
import { Box, Button } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorIcon from '@mui/icons-material/Error';

import { PageHeader } from '@/components/ui/PageHeader';
import { FilterBar } from '@/components/ui/FilterBar';
import { StatusTabs, type TabItem } from '@/components/ui/StatusTabs';

import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

import { useListings } from '@/hooks/useListings';


import { colors } from '@/theme/palette';
import type { ListingStatus } from '@/types/listings.type';
import { usePublicationsStore } from '@/store/table.store';
import { DEFAULT_SORT_OPTIONS, EMPTY_FILTER_OPTIONS } from '@/store/tableOptions.store';
import { ListingsTable } from '@/components/my-listings/ListingsTable';

// ── Tab config ───────────────────────────────────────────────────────────────

const STATUS_TAB_MAP: Record<string, ListingStatus | 'all'> = {
  all: 'all',
  pending: 'pending',
  in_review: 'in_review',
  active: 'active',
  hidden: 'hidden',
  rejected: 'rejected',
};

// ── Page ─────────────────────────────────────────────────────────────────────

const MyListingsPage: React.FC = () => {
  const USE_MOCK = false;

  const { listings: apiListings, isLoading: apiLoading, error: apiError, refetch } = useListings();

  const listings = USE_MOCK ? [] : apiListings;
  const isLoading = USE_MOCK ? false : apiLoading;
  const error = USE_MOCK ? null : apiError;

  const {
    activeTab,
    filters,
    selectedIds,
    setActiveTab,
    setSearch,
    setSort,
    setFilter,
    toggleSelectId,
    selectAll,
  } = usePublicationsStore();

  // ── Counts per status ────────────────────────────────────────────────────

  const countByStatus = (status: ListingStatus) =>
    listings.filter((l) => l.status === status).length;

  const tabs: TabItem[] = [
    { value: 'all', label: 'Todas', count: listings.length },
    {
      value: 'pending',
      label: 'Pendientes',
      count: countByStatus('pending'),
      icon: <WarningAmberIcon sx={{ fontSize: 16, color: colors.status.warning }} />,
    },
    { value: 'in_review', label: 'En revisión', count: countByStatus('in_review') },
    { value: 'active', label: 'Activas', count: countByStatus('active') },
    { value: 'hidden', label: 'Ocultas', count: countByStatus('hidden') },
    {
      value: 'rejected',
      label: 'Rechazadas',
      count: countByStatus('rejected'),
      icon: <ErrorIcon sx={{ fontSize: 16, color: colors.status.error }} />,
    },
  ];

  // ── Filtering ────────────────────────────────────────────────────────────

  const filteredListings = listings
    .filter((l) => {
      const tabStatus = STATUS_TAB_MAP[activeTab];
      if (tabStatus !== 'all' && l.status !== tabStatus) return false;
      return true;
    })
    .filter((l) => {
      if (!filters.search) return true;
      const q = filters.search.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });

  const sortedListings = [...filteredListings].sort((a, b) => {
    if (filters.sort === 'name_asc') return a.name.localeCompare(b.name);
    if (filters.sort === 'name_desc') return b.name.localeCompare(a.name);
    return 0; // newest/oldest requieren createdAt — se puede agregar después
  });

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleSelectRow = (id: string, checked: boolean) => {
    if ((checked && !selectedIds.has(id)) || (!checked && selectedIds.has(id))) {
      toggleSelectId(id);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      selectAll(sortedListings.map((l) => l.id));
    } else {
      selectAll([]); // clearSelection via selectAll vacío
    }
  };

  const handleCopy = (id: string) => {
    console.log('Duplicar listing:', id);
    // TODO: llamar service + refetch
  };

  const handleDelete = (id: string) => {
    console.log('Eliminar listing:', id);
    // TODO: llamar service + refetch
  };

  // ── Render ───────────────────────────────────────────────────────────────

  if (isLoading) return <LoadingScreen message="Cargando publicaciones..." />;

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={refetch}
      />
    );
  }

  return (
    <Box sx={{ px:0, mt:3 }}>
      <PageHeader
        title="Mis Publicaciones"
        description="Desde aquí podrás administrar todas tus publicaciones y su correspondiente stock,"
        actions={
          <>
            <Button
              variant="outlined"
              startIcon={<FileDownloadOutlinedIcon />}
              sx={{
                height:'40px'
              }}
            >
              Exportar .CSV
            </Button>
            <Button
              variant="contained"
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                height:'40px'
              }}
            >
              Publicar
            </Button>
          </>
        }
      />

      <FilterBar
        searchValue={filters.search}
        onSearchChange={setSearch}
        sortValue={filters.sort}
        onSortChange={setSort}
        sortOptions={DEFAULT_SORT_OPTIONS}
        filterValue={filters.filter}
        onFilterChange={setFilter}
        filterOptions={EMPTY_FILTER_OPTIONS}
      />

      <StatusTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <ListingsTable
        rows={sortedListings}
        selectedIds={selectedIds}
        onSelectRow={handleSelectRow}
        onSelectAll={handleSelectAll}
        onCopy={handleCopy}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default MyListingsPage;