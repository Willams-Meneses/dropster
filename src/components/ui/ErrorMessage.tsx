// components/ErrorMessage.tsx
import { Box, Typography, Button } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

interface ErrorMessageProps {
  message?: string;
  fullScreen?: boolean;
  onRetry?: () => void;
  showIcon?: boolean;
}

export const ErrorMessage = ({ 
  message = 'Ocurrió un error al cargar los datos',
  fullScreen = false,
  onRetry,
  showIcon = true,
}: ErrorMessageProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        ...(fullScreen && { minHeight: '100vh' }),
      }}
    >
      {showIcon && (
        <ErrorIcon
          sx={{ 
            fontSize: 48, 
            color: 'error.main' 
          }} 
        />
      )}
      
      <Typography 
        variant="body1" 
        color="error"
        sx={{ fontWeight: 500, textAlign: 'center' }}
      >
        {message}
      </Typography>
      
      {onRetry && (
        <Button 
          variant="contained" 
          color="primary"
          onClick={onRetry}
          sx={{ mt: 1 }}
        >
          Reintentar
        </Button>
      )}
    </Box>
  );
};