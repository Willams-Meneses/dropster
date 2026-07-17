import { Box, Grid, Typography, TextField, Alert } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import type { CheckoutFormValues } from '@/schemas/checkout.schema';

interface CheckoutFormProps {
  control: Control<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
}

export const CheckoutForm = ({ control, errors }: CheckoutFormProps) => {
  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 2 }}>Datos de envío</Typography>

      <Typography variant="subtitle1" sx={{ mb: 1.5, color: 'text.primary' }}>¿Quién recibe?</Typography>
      <Grid container spacing={1.5} sx={{ mb: 2 }}>
        <Grid size={{ xs: 6 }}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Nombre"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Apellido"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            )}
          />
        </Grid>
      </Grid>

      <Controller
        name="dni"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            placeholder="DNI"
            error={!!errors.dni}
            helperText={errors.dni?.message}
            sx={{ mb: 1.5 }}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            placeholder="Teléfono"
            error={!!errors.phone}
            helperText={errors.phone?.message}
            sx={{ mb: 2 }}
          />
        )}
      />

      <Typography variant="subtitle1" sx={{ mb: 1.5, color: 'text.primary' }}>Dirección</Typography>
      <Controller
        name="street"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            placeholder="Calle"
            error={!!errors.street}
            helperText={errors.street?.message}
            sx={{ mb: 1.5 }}
          />
        )}
      />

      <Controller
        name="height"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            placeholder="Altura"
            error={!!errors.height}
            helperText={errors.height?.message}
            sx={{ mb: 1.5 }}
          />
        )}
      />

      <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
        <Grid size={{ xs: 6 }}>
          <Controller
            name="province"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                placeholder="Provincia"
                error={!!errors.province}
                helperText={errors.province?.message}
                slotProps={{ select: { native: true } }}
              >
                <option value="">Provincia</option>
                <option value="Buenos Aires">Buenos Aires</option>
                <option value="CABA">CABA</option>
              </TextField>
            )}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Ciudad"
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            )}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1.5} sx={{ mb: 2 }}>
        <Grid size={{ xs: 6 }}>
          <Controller
            name="postalCode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Código Postal"
                error={!!errors.postalCode}
                helperText={errors.postalCode?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                placeholder="País"
                error={!!errors.country}
                helperText={errors.country?.message}
                slotProps={{ select: { native: true } }}
              >
                <option value="">País</option>
                <option value="Argentina">Argentina</option>
              </TextField>
            )}
          />
        </Grid>
      </Grid>

      <Alert severity="info" icon={<InfoOutlinedIcon fontSize="small" />} sx={{ borderRadius: 2, bgcolor: 'neutral.100', color: 'text.primary' }}>
        <Typography variant="body2">
          El pedido llegara a destino de 5 a 7 días habiles al domicilio proporcionado según el código postal ingresado.
        </Typography>
      </Alert>
    </Box>
  );
};