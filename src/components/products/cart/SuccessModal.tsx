import { Box, Typography, Button, Modal } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export const SuccessModal = ({ open, onClose }: SuccessModalProps) => {
  const navigate = useNavigate();

  const handleGoToOrders = () => {
    onClose();
    navigate('/dashboard/orders');
  };

  const handleGoToProducts = () => {
    onClose();
    navigate('/dashboard/products');
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: 400 }, bgcolor: 'background.paper', borderRadius: 3,
        boxShadow: 24, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2
      }}>
        <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main' }} />
        <Typography variant="h3" sx={{ textAlign: 'center' }}>Tu pedido se cargó con éxito</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
          Tu pedido esta listo para que lo abones y comience el proceso de envío. Podés revisarlo en la sección "Pedidos".
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%', mt: 2 }}>
          <Button variant="text" color="primary" onClick={handleGoToOrders}>
            Ir a Pedidos
          </Button>
          <Button variant="text" color="primary" onClick={onClose}>
            Cargar otro pedido igual
          </Button>
          <Button variant="contained" fullWidth onClick={handleGoToProducts} sx={{ mt: 1 }}>
            Continuar comprando
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};