import React from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  Typography,
  type SelectChangeEvent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export interface FilterOption {
  value: string;
  label: string;
}

export interface SortOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;

  sortValue: string;
  onSortChange: (value: string) => void;
  sortOptions: SortOption[];

  filterValue: string;
  onFilterChange: (value: string) => void;
  filterOptions: FilterOption[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Buscar por nombre, SKU o Tags',
  sortValue,
  onSortChange,
  sortOptions,
  filterValue,
  onFilterChange,
  filterOptions,
}) => {
  const handleSortChange = (event: SelectChangeEvent) => {
    onSortChange(event.target.value);
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    onFilterChange(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 2,
        mb: 2,
      }}
    >
      {/* Search */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 0.75 }}>
          Buscar
        </Typography>
        <TextField
          fullWidth
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {/* Sort */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 0.75 }}>
          Ordenar
        </Typography>
        <FormControl fullWidth>
          <Select
            value={sortValue}
            onChange={handleSortChange}
            IconComponent={KeyboardArrowDownIcon}
            displayEmpty
            sx={{
              height:'40px'
            }}
          >
            {sortOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Filter */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 0.75 }}>
          Filtrar
        </Typography>
        <FormControl fullWidth>
          <Select
            value={filterValue}
            onChange={handleFilterChange}
            IconComponent={KeyboardArrowDownIcon}
            displayEmpty
            renderValue={(value) =>
              value === '' ? (
                <Typography variant="body1" sx={{ color: 'text.disabled' }}>
                  Elegir filtro
                </Typography>
              ) : (
                filterOptions.find((o) => o.value === value)?.label ?? value
              )
            }
            sx={{
              height:'40px'
            }}
          >
            <MenuItem value="">
              <em>Elegir filtro</em>
            </MenuItem>
            {filterOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};