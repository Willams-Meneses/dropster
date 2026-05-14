import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
}

export const LoadingScreen = ({ 
  message, 
  fullScreen = true 
}: LoadingScreenProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...(fullScreen && { minHeight: '100vh' }),
        gap: 2,
      }}
    >
      <CircularProgress color="primary" size={40} />
      {message && (
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ fontWeight: 500}}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};