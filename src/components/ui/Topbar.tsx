import { Box, IconButton, InputAdornment, TextField, Typography, Badge } from '@mui/material';
import { Search, ShoppingCart, Notifications } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { colors } from '@/theme/palette';
import { routesConfig } from '@/config/routes.config';

const TOPBAR_HEIGHT = 72;

const Topbar = () => {
  const { pathname } = useLocation();
  const config = routesConfig[pathname] ?? { title: '', showSearch: false };

  return (
    <Box
      component="header"
      sx={{
        height: TOPBAR_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        pl:3,
        pr:"25px",
        gap: 2,
        backgroundColor: 'transparent',
        position: 'fixed',
        top: 0,
        left: 260,
        right: 0,
        zIndex: 800,
      }}
    >
      {/* Page title */}
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, whiteSpace: 'nowrap', color: colors.content.heading }}
      >
        {config.title}
      </Typography>

      {/* Search — solo en rutas que lo tienen habilitado */}
      {config.showSearch && (
        <TextField
          placeholder="Buscar productos y más..."
          size="small"
          sx={{
            flex: 1,
            mx: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '100px',
              backgroundColor: colors.white,
              height: '40px',
              '& fieldset': { borderColor: 'transparent' },
              '&:hover fieldset': { borderColor: colors.neutral[300] },
              '&.Mui-focused fieldset': { borderColor: colors.brand.orange },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: colors.content.muted, fontSize: 20 }} />
                </InputAdornment>
              ),
            },
          }}
        />
      )}

      {/* Spacer cuando no hay search */}
      {!config.showSearch && <Box sx={{ flex: 1 }} />}

      {/* Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton
          sx={{
            backgroundColor: colors.white,
            borderRadius: '100%',
            width: 40,
            height: 40,
            '&:hover': { backgroundColor: colors.neutral[200] },
          }}
        >
          <ShoppingCart sx={{ fontSize: 20, color: colors.content.heading }} />
        </IconButton>

        <IconButton
          sx={{
            backgroundColor: colors.white,
            borderRadius: '100%',
            width: 40,
            height: 40,
            '&:hover': { backgroundColor: colors.neutral[200] },
          }}
        >
          <Badge badgeContent={1} color="error">
            <Notifications sx={{ fontSize: 20, color: colors.content.heading }} />
          </Badge>
        </IconButton>
      </Box>
    </Box>
  );
};

export { TOPBAR_HEIGHT };
export default Topbar;