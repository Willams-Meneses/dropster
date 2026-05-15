import { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import { colors } from '@/theme/palette';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { useLogin } from '@/hooks/useLogin';
import { BackButton } from '@/components/ui/buttons/BackButton';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { form, onSubmit, serverError, setServerError, isSubmitting } = useLogin();
  const { control, formState: { errors, isValid } } = form;

  return (
    <Box sx={{
      width: '100%', maxWidth: 480, border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2, p: 3
    }}>
      {/* Back button */}
      <BackButton />

      {/* Title */}
      <Typography variant="h1" sx={{ mb: 1 }}>
        Te damos la bienvenida una vez más
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, fontWeight: 500, fontSize: '14px', color: colors.content.muted }}>
        Si tenés una cuenta, iniciá sesión con tu dirección de correo electrónico.
      </Typography>

      {serverError && (
        <Alert
          severity="error"
          sx={{ mb: 2, fontSize: '12px' }}
          onClose={() => { setServerError(null); }}
        >
          {serverError}
        </Alert>
      )}

      <Box component="form" onSubmit={onSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Email */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 0.75 }}>
            Email
          </Typography>
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
                sx={{ fontSize: "12px" }}
              />
            )}
          />
        </Box>

        {/* Password */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 0.75 }}>
            Contraseña
          </Typography>
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

        {/* Forgot password */}
        <Box sx={{ textAlign: 'left' }}>
          <Typography
            variant='h6'
            component={Link}
            to="/forgot-password"
            sx={{ color: 'primary.main', textDecoration: 'none' }}
          >
            ¿Olvidaste tu contraseña?
          </Typography>
        </Box>

        {/* Submit */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting || !isValid}
          sx={{ mt: 2 }}
        >
          {isSubmitting ? 'Ingresando...' : 'Ingresar'}
        </Button>
      </Box>

      {/* Register link */}
      <Box
        sx={{
          mt: 3,
          py: 1,
          px: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" component="span">
          ¿Aún no tenés una cuenta?{' '}
        </Typography>
        <Typography
          component={Link}
          to="/register"
          variant="body1"
          sx={{ color: 'primary.main', fontWeight: 600, textDecoration: 'none' }}
        >
          Creá tu cuenta
        </Typography>
      </Box>


    </Box>
  );
};

export default LoginPage;