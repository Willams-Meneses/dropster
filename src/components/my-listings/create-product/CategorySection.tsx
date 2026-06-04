import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { colors } from '@/theme/palette';
import type { CreateProductFormValues } from '@/schemas/product.schema';
import { useCategories } from '@/hooks/useCategories';

interface CategorySectionProps {
  control: Control<CreateProductFormValues>;
  errors: FieldErrors<CreateProductFormValues>;
}

export const CategorySection = ({ control, errors }: CategorySectionProps) => {
  const { categories, isLoading } = useCategories();

  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h3">Categoría</Typography>

        <Box>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.categoryId}>
                <Select
                  {...field}
                  displayEmpty
                  disabled={isLoading}
                  startAdornment={
                    isLoading ? (
                      <CircularProgress size={16} sx={{ mr: 1 }} />
                    ) : null
                  }
                  sx={{
                    height: '40px'
                  }}
                >
                  <MenuItem value="" disabled>
                    <Typography variant="body1" sx={{ color: colors.content.muted }}>
                      Selecciona una categoría
                    </Typography>
                  </MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

          {errors.categoryId && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
              <WarningAmberRoundedIcon
                sx={{ fontSize: 16, color: colors.status.error }}
              />
              <Typography
                variant="subtitle2"
                sx={{ color: colors.status.error, fontWeight: 600 }}
              >
                {errors.categoryId.message}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};