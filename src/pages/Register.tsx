import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Controller } from 'react-hook-form';
import { useRegister } from '@/hooks/useRegister';
import { BackButton } from '@/components/ui/buttons/BackButton';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { form, onSubmitStep1, isSubmitting, serverError, setServerError } = useRegister();
  const { control, formState: { errors, isValid } } = form;

  const ACCOUNT_TYPES: { label: string; value: string }[] = [
    { label: 'Personal', value: 'PERSONAL' },
    { label: 'Empresa', value: 'BUSINESS' },
  ];

  return (
    <Box sx={{
      width: '100%', maxWidth: 480, maxHeight: '90vh',  // Altura máxima para activar scroll
      overflowY: 'auto', border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2, p: 3
    }}>
      {/* Back button */}
      <BackButton />

      {/* Title */}
      <Typography variant="h1" sx={{ mb: 1 }}>
        Creá tu cuenta
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Creá tu cuenta para hacer dropshipping o vender tus productos, es gratis.
      </Typography>

      <Box component="form" onSubmit={onSubmitStep1} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Account type toggle */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Tipo de cuenta
          </Typography>
          {/*TODO: ver esto porque puede ser un componente y asi facilitar el mantenimiento y reutilizacion. */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {ACCOUNT_TYPES.map((r) => (
              <Button
                key={r.value}
                sx={{
                  borderRadius: '40px',
                  px: 2.5,
                  py: 0.75,
                  fontSize: '14px',
                  fontWeight: 500,
                  backgroundColor: 'grey.100',
                  color: 'text.secondary',
                  border: 'none',
                  '&:hover': { backgroundColor: 'grey.200', border: 'none' },
                }}
              >
                {r.label}
              </Button>
            ))}
          </Box>
        </Box>

        {serverError && (
          <Alert
            severity="error"
            sx={{ mb: 2, fontSize: '12px' }}
            onClose={() => { setServerError(null); }}
          >
            {serverError}
          </Alert>
        )}

        {/* Nombre / Apellido */}
        <Grid container spacing={2}>
          <Grid size={6}>
            <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Nombre</Typography>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Apellido</Typography>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* Email */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Email *</Typography>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Box>

        {/* Password */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Contraseña *</Typography>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type={showPassword ? 'text' : 'password'}
                error={!!errors.password}
                helperText={errors.password?.message}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((p) => !p)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
        </Box>

        {/* Confirm password */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Repetir contraseña *</Typography>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type={showConfirm ? 'text' : 'password'}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirm((p) => !p)} edge="end">
                          {showConfirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
        </Box>

        {/* Terms */}
        <Box>
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value === true}
                    onChange={(e) => field.onChange(e.target.checked || undefined)}
                    sx={{ color: errors.terms ? 'error.main' : 'default', minWidth: 25, mx: 1.4 }}
                  />
                }
                label={
                  <Typography variant="body1" sx={{ color: 'text.primary' }}>
                    Acepto los{' '}
                    <Typography component="span" variant="body1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                      Términos y Condiciones
                    </Typography>
                    {' '}y las{' '}
                    <Typography component="span" variant="body1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                      Políticas de Privacidad
                    </Typography>
                    {' '}de Droppers.
                  </Typography>
                }
              />
            )}
          />
          {errors.terms && (
            <FormHelperText error sx={{ ml: 4 }}>
              {errors.terms.message}
            </FormHelperText>
          )}
        </Box>

        {/* Newsletter */}
        <Controller
          name="newsletter"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  sx={{
                    minWidth: 25, mx: 1.4
                  }}
                />
              }
              label={
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Suscribirme para recibir noticias importantes y novedades acerca de cambios de precios, nuevos ingresos y productos agotados
                </Typography>
              }
            />
          )}
        />

        {/* Submit */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting || !isValid}
          sx={{ mt: 1 }}
        >
          {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </Box>
    </Box>
  );
};

export default Register;