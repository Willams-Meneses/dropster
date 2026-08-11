import React from 'react';
import { Box, Button, Grid, TextField, Typography, CircularProgress } from '@mui/material';
import { Controller } from 'react-hook-form';
import { PageHeader } from '@/components/ui/PageHeader';
import { useProfile } from '@/hooks/useProfile';
import { useAuthStore } from '@/store/auth.store';
import type { User } from '@/types/auth.types';

const PersonalInfoPage: React.FC = () => {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return <PersonalInfoForm user={user} />;
};

const PersonalInfoForm: React.FC<{ user: User }> = ({ user }) => {
  const { form, onSubmit, isSubmitting, isValid } = useProfile({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      dni: user.dni || '',
      phone: user.phone || '',
    },
  });

  const { control, formState: { errors } } = form;

  return (
    <Box>
      <PageHeader 
        title="Información personal" 
        description="Datos referentes a tu persona ya sea física o jurídica." 
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
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Nombre</Typography>
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
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Apellido</Typography>
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
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.75 }}>DNI</Typography>
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
                  />
                )}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Teléfono de contacto</Typography>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="Teléfono de contacto"
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            </Box>
          </Grid>

          {/* Email Read-only con el MISMO formato y tamaño que los demás */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Email</Typography>
              <TextField
                value={user.email}
                fullWidth
                placeholder="Email"
                disabled
                helperText="El email no puede ser modificado"
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
            {isSubmitting ? 'Actualizando...' : 'Actualizar'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PersonalInfoPage;