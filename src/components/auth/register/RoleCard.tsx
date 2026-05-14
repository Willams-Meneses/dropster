import { Box, Typography } from '@mui/material';
import { colors } from '@/theme/palette';

interface RoleCardProps {
  image: string;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

const RoleCard = ({ image, title, description, selected, onClick }: RoleCardProps) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        borderRadius: '16px',
        overflow: 'hidden',
        border: '2px solid',
        borderColor: selected ? 'primary.main' : 'transparent',
        boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
        backgroundColor: colors.white,
      }}
    >
      {/* Image + checkbox */}
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 24,
            height: 24,
            borderRadius: '6px',
            border: '2px solid',
            borderColor: selected ? 'primary.main' : colors.white,
            backgroundColor: selected ? 'primary.main' : 'transparent',
            backgroundImage: selected
              ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z' fill='white'/%3E%3C/svg%3E")`
              : 'none',
            backgroundSize: '16px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            transition: 'all 0.2s',
          }}
        />
      </Box>

      {/* Text */}
      <Box sx={{ p: 2.5 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: colors.content.body }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default RoleCard;