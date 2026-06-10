import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';

interface GenericDrawerProps {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  width?: number | string;
  footer?: React.ReactNode;
}

export default function GenericDrawer({
  open,
  onClose,
  title,
  children,
  anchor = 'right',
  width = 400,
  footer,
}: GenericDrawerProps) {
  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width,
            borderRadius: anchor === 'right' ? '16px 0 0 16px' : anchor === 'left' ? '0 16px 16px 0' : '16px',
            display: 'flex',
            flexDirection: 'column',
          },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: 2.5,
        }}
      >
        {title}
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Divider />

      {/* Content */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: 3, py: 3 }}>
        {children}
      </Box>

      {/* Footer opcional */}
      {footer && (
        <>
          <Divider />
          <Box sx={{ px: 3, py: 2.5 }}>{footer}</Box>
        </>
      )}
    </Drawer>
  );
}