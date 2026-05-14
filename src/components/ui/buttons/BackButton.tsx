import { Button } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      startIcon={<ArrowBack />}
      onClick={() => { navigate(-1); }}
      sx={{
        mb: 3,
        color: 'text.primary',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '40px',
        px: 2,
        py: 0.75,
        fontSize: '14px',
        fontWeight: 500,
        backgroundColor: 'background.paper',
        '&:hover': { backgroundColor: 'grey.100' },
      }}
    >
      Volver
    </Button>
  );
};