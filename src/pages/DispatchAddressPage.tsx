import React from 'react';
import { Box, Grid, TextField, Typography, Button } from '@mui/material';
import { Controller } from 'react-hook-form';
import { PageHeader } from '@/components/ui/PageHeader';
import { useDispatchAddress } from '@/hooks/useDispatchAddress';
import { useAuthStore } from '@/store/auth.store';
import type { User } from '@/types/auth.types';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

const DispatchAddressPage: React.FC = () => {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <LoadingScreen message="Cargando datos del usuario..." />;
  }

  return <DispatchAddressForm user={user} />;
};

const DispatchAddressForm: React.FC<{ user: User }> = ({ user }) => {
  const { form, onSubmit, isSubmitting, isValid } = useDispatchAddress({
    defaultValues: {
      street: user.street || '',
      height: user.height || '',
      floor: user.floor || '',
      apartment: user.apartment || '',
      city: user.city || '',
      province: user.province || '',
      postalCode: user.postalCode || '',
      country: user.country || 'Argentina',
    },
  });

  const { control, formState: { errors } } = form;

  return (
    <Box>
      <PageHeader
        title="Dirección de despacho"
        description="Declará la dirección desde donde despachás tus productos."
      />

      <Box
        component="form"
        onSubmit={onSubmit}
        noValidate
        sx={{
          backgroundColor: 'background.paper',
          p: 3,
          borderRadius: 2,
          boxShadow: '0px 2px 12px rgba(0,0,0,0.08)'
        }}
      >
        <Grid container spacing={1.5}>
          {/* Calle y Altura */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Calle</Typography>
              <Controller
                name="street"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth placeholder="Calle" error={!!errors.street} helperText={errors.street?.message} />
                )}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Altura</Typography>
              <Controller
                name="height"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth placeholder="Altura" error={!!errors.height} helperText={errors.height?.message} />
                )}
              />
            </Box>
          </Grid>

          {/* Piso y Departamento */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Piso</Typography>
              <Controller
                name="floor"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth placeholder="Piso" error={!!errors.floor} helperText={errors.floor?.message} />
                )}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Departamento</Typography>
              <Controller
                name="apartment"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth placeholder="Departamento" error={!!errors.apartment} helperText={errors.apartment?.message} />
                )}
              />
            </Box>
          </Grid>

          {/* Ciudad y Provincia */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Ciudad</Typography>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth placeholder="Ciudad" error={!!errors.city} helperText={errors.city?.message} />
                )}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Provincia</Typography>
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
                    {/* <option value="">Provincia</option>
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="CABA">CABA</option> */}
                    <option value="">Provincia</option>
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="CABA">CABA</option>
                    <option value="Catamarca">Catamarca</option>
                    <option value="Chaco">Chaco</option>
                    <option value="Chubut">Chubut</option>
                    <option value="Córdoba">Córdoba</option>
                    <option value="Corrientes">Corrientes</option>
                    <option value="Entre Ríos">Entre Ríos</option>
                    <option value="Formosa">Formosa</option>
                    <option value="Jujuy">Jujuy</option>
                    <option value="La Pampa">La Pampa</option>
                    <option value="La Rioja">La Rioja</option>
                    <option value="Mendoza">Mendoza</option>
                    <option value="Misiones">Misiones</option>
                    <option value="Neuquén">Neuquén</option>
                    <option value="Río Negro">Río Negro</option>
                    <option value="Salta">Salta</option>
                    <option value="San Juan">San Juan</option>
                    <option value="San Luis">San Luis</option>
                    <option value="Santa Cruz">Santa Cruz</option>
                    <option value="Santa Fe">Santa Fe</option>
                    <option value="Santiago del Estero">Santiago del Estero</option>
                    <option value="Tierra del Fuego">Tierra del Fuego</option>
                    <option value="Tucumán">Tucumán</option>
                  </TextField>
                )}
              />
            </Box>
          </Grid>

          {/* CP y País */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Código Postal</Typography>
              <Controller
                name="postalCode"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth placeholder="Código Postal" error={!!errors.postalCode} helperText={errors.postalCode?.message} />
                )}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.75 }}>País</Typography>
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
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? 'Guardando...' : 'Actualizar'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DispatchAddressPage;