import { useState, type MouseEvent, type ReactNode } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { colors } from '@/theme/palette';

export interface ActionsMenuItem {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  danger?: boolean;
  disabled?: boolean;
}

interface ActionsMenuProps {
  actions: ActionsMenuItem[];
  ariaLabel?: string;
}

export const ActionsMenu = ({ actions, ariaLabel = 'Más opciones' }: ActionsMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (action: ActionsMenuItem) => (event: MouseEvent) => {
    event.stopPropagation();
    handleClose();
    action.onClick();
  };

  return (
    <>
      <IconButton
        aria-label={ariaLabel}
        aria-controls={open ? 'actions-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpen}
        size="small"
        sx={{ bgcolor: 'grey.100', '&:hover': { bgcolor: 'grey.200' } }}
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu
        id="actions-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            elevation: 3,
            sx: {
              mt: 1.5,
              borderRadius: 3,
              minWidth: 240,
              overflow: 'visible',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -8,
                right: 14,
                width: 16,
                height: 16,
                bgcolor: 'background.paper',
                transform: 'rotate(45deg)',
              },
            },
          },
        }}
      >
        {actions.map((action) => (
          <MenuItem
            key={action.label}
            onClick={handleItemClick(action)}
            disabled={action.disabled}
            sx={{
              color: action.danger ? 'error.main' : 'text.primary',
              py: 1.25,
              fontWeight: 500,
            }}
          >
            {action.icon && (
              <ListItemIcon sx={{ color: action.danger ? colors.status.error : 'inherit' }}>
                {action.icon}
              </ListItemIcon>
            )}
            <ListItemText primary={action.label} slotProps={{
              primary: {
                sx: {
                  color: action.danger ? colors.status.error : 'red',
                },
              },
            }} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};