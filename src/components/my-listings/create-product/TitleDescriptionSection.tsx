import { Box, Card, CardContent, TextField, Typography } from '@mui/material';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import type { CreateProductFormValues } from '@/schemas/product.schema';

interface TitleDescriptionSectionProps {
  control: Control<CreateProductFormValues>;
  errors: FieldErrors<CreateProductFormValues>;
  nameValue: string;
}

const TITLE_MAX_LENGTH = 100;

export const TitleDescriptionSection = ({
  control,
  errors,
  nameValue,
}: TitleDescriptionSectionProps) => {
  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <Typography variant="h3">Título y descripción</Typography>

        {/* Título */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 0.75 }}>
            Título
          </Typography>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                slotProps={{
                  htmlInput: { maxLength: TITLE_MAX_LENGTH },
                  formHelperText: {
                    sx: { textAlign: 'right' },
                  },
                }}
                // Cuando no hay error mostramos el contador como helper text
                {...(!errors.name && {
                  helperText: `${nameValue.length}/${TITLE_MAX_LENGTH}`,
                })}
              />
            )}
          />
        </Box>

        {/* Descripción */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 0.75 }}>
            Descripción
          </Typography>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={6}
                error={!!errors.description}
                helperText={errors.description?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: 'auto',
                  },
                }}
              />
            )}
          />
        </Box>
      </CardContent>
    </Card>
  );
};