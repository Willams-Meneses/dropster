import { useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  GridView,
  AccountCircle,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { colors } from '@/theme/palette';
import starImg from '@/assets/svg/star-dashboard.svg';
import timerCheckImg from '@/assets/svg/timer-check-dashboard.svg'
import { Role } from '@/types/auth.types';
import { ShopIcon } from '../icons/ShopIcon';
import { ChartIcon } from '../icons/ChartIcon';
import { CashRegisterIcon } from '../icons/CashRegisterIcon';
import { OrdersIcon } from '../icons/OrdersIcon';
import { RefundIcon } from '../icons/RefundIcon';

export const SIDEBAR_WIDTH = 252;

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface NavSection {
  section: string;
  items: NavItem[];
}

const NAV_DROPSHIPPER: NavSection = {
  section: 'Dropshipper',
  items: [
    { label: 'Mis tiendas', path: '/dashboard/mis-tiendas', icon: <ShopIcon /> },
    { label: 'Pedidos', path: '/dashboard/pedidos', icon: <OrdersIcon /> },
    { label: 'Devoluciones', path: '/dashboard/devoluciones', icon: <RefundIcon /> },
  ],
};

const NAV_PROVIDER: NavSection = {
  section: 'Proveedor',
  items: [
    { label: 'Mis publicaciones', path: '/dashboard/mis-publicaciones', icon: <ShopIcon /> },
    { label: 'Resumen', path: '/dashboard/resumen', icon: <ChartIcon /> },
    { label: 'Mis ventas', path: '/dashboard/mis-ventas', icon: <CashRegisterIcon /> },
  ],
};

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  const nav: NavSection[] = user?.role === Role.DROPSHIPPER
    ? [NAV_DROPSHIPPER]
    : user?.role === Role.PROVIDER
      ? [NAV_PROVIDER]
      : [];

  // Todas las secciones abiertas por defecto
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    Object.fromEntries(nav.map((s) => [s.section, true])),
  );

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const isActive = (path: string) => pathname === path;

  return (
    <Box
      component="nav"
      sx={{
        width: SIDEBAR_WIDTH,
        height: '100%',
        backgroundColor: colors.white,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 8,
        left: 8,
        bottom: 0,
        overflowY: 'auto',
        zIndex: 200,
        px: 2
      }}
    >
      {/* Logo */}
      <Box sx={{ px: 3, pt: 3, pb: 2 }}>
        {/* Reemplazá con tu SVG: import droppersLogo from '@/assets/svg/droppers-logo.svg' */}
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: colors.content.heading,
          }}
        >
          DROPPERS
        </Typography>
      </Box>

      {/* <Divider /> */}

      {/* User card */}
      <Box sx={{ px: 2, py: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, borderRadius: '16px', border: '0.5px solid', borderColor: 'divider' }}>
        {/* Avatar — reemplazá con img cuando tengas el asset */}
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            backgroundColor: colors.neutral[200],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 1,
          }}
        >
          <AccountCircle sx={{ fontSize: 48, color: colors.neutral[400] }} />
        </Box>

        <Typography variant="caption" sx={{ color: colors.content.muted }}>
          {/* número de proveedor — reemplazá con dato real */}
          0987654322
        </Typography>

        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          {user?.firstName} {user?.lastName}
        </Typography>

        <Typography variant="caption" sx={{ color: colors.content.muted }}>
          {user?.email}
        </Typography>

        {/* Stats */}
        <Box sx={{ mt: 1.5, width: '100%', display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px', mr: 2 }}>
            <Typography variant="caption" sx={{ color: colors.content.muted, display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ mr: '-7px', position: 'relative', zIndex: 1, fontSize: '12px', fontWeight: 600, color: colors.content.heading }}>
                4.7
              </Box>
              <Box
                component="img"
                src={starImg}
                alt="star"
                sx={{ width: 15, height: 15, objectFit: 'cover', position: 'relative', zIndex: 0, ml: '3px' }}
              />
            </Typography>
            <Typography variant="caption" sx={{ color: colors.content.muted }}>
              Promedio de valoración
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              component="img"
              src={timerCheckImg}
              alt={'timer check'}
              sx={{ width: 19, height: 19, objectFit: 'cover', display: 'block' }}
            />
            <Typography variant="caption" sx={{ color: colors.content.muted }}>
              Despacha sus productos a tiempo
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* icon */}
            <Typography variant="caption" sx={{ color: colors.content.heading, fontWeight: 500 }}>
              +1000
            </Typography>
            <Typography variant="caption" sx={{ color: colors.content.muted }}>
              Ventas concretadas
            </Typography>
          </Box>
        </Box>

        {/* Mi cuenta button */}
        <Button
          variant="outlined"
          fullWidth
          onClick={() => void navigate('/dashboard/mi-cuenta')}
          sx={{ mt: 2, borderRadius: '100px', fontSize: '13px', py: 0.75 }}
        >
          Mi cuenta
        </Button>
      </Box>

      {/* Nav */}
      <List disablePadding sx={{ flex: 1, py: 1 }}>
        {/* Productos — item principal */}
        <ListItemButton
          onClick={() => void navigate('/dashboard')}
          sx={{
            mx: 1,
            borderRadius: '8px',
            backgroundColor: isActive('/dashboard') ? `${colors.brand.orange}18` : 'transparent',
            '&:hover': { backgroundColor: `${colors.brand.orange}10` },
          }}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            <GridView fontSize="small" sx={{ color: isActive('/dashboard') ? colors.brand.orange : colors.content.muted }} />
          </ListItemIcon>
          <ListItemText
            primary="Productos"
            slotProps={{
              primary: {
                sx: {
                  fontSize: '14px',
                  fontWeight: isActive('/dashboard') ? 600 : 400,
                  color: isActive('/dashboard') ? colors.brand.orange : colors.content.heading,
                }
              }
            }}
          />
        </ListItemButton>

        {/* Secciones colapsables */}
        {nav.map(({ section, items }) => (
          <Box key={section}>
            <ListItemButton
              onClick={() => toggleSection(section)}
              sx={{ px: 2, py: 0.75 }}
            >
              <ListItemText
                primary={section}
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: '14px',
                      fontWeight: 500,
                      color: colors.content.body,
                    }
                  }
                }}
              />
              {openSections[section] ? (
                <ExpandLess fontSize="small" sx={{ color: colors.content.muted }} />
              ) : (
                <ExpandMore fontSize="small" sx={{ color: colors.content.muted }} />
              )}
            </ListItemButton>

            <Collapse in={openSections[section]} timeout="auto" unmountOnExit>
              <List disablePadding>
                {items.map((item) => (
                  <ListItemButton
                    key={item.path}
                    onClick={() => void navigate(item.path)}
                    sx={{
                      mx: 1,
                      borderRadius: '8px',
                      pl: 2,
                      backgroundColor: isActive(item.path) ? `${colors.brand.orange}18` : 'transparent',
                      '&:hover': { backgroundColor: `${colors.brand.orange}10` },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ color: isActive(item.path) ? colors.brand.orange : colors.content.muted }}>
                        {item.icon}
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      slotProps={{
                        primary: {
                          sx: {
                            fontSize: '14px',
                            fontWeight: isActive(item.path) ? 600 : 500,
                            color: isActive(item.path) ? colors.brand.orange : colors.content.muted,
                          }
                        }
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

            <Divider sx={{ my: 0.5, mx: 2 }} />
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;