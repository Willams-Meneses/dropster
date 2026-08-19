import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/ui/PageHeader';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { useAuthStore } from '@/store/auth.store';
import { ProfileHeaderCard } from '@/components/my-profile/ProfileHeaderCard';
import { ProfileMenuList } from '@/components/my-profile/ProfileMenuList';

const MyProfilePage: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  if (!user) {
    return <LoadingScreen message="Cargando datos del usuario..." />;
  }

  return (
    <Box>
      <PageHeader
        title="Mi cuenta"
        description="Desde aquí podrás mantener actualizados toda la información necesaria para que puedas operar con Droppers."
      />

      <ProfileHeaderCard user={user} />

      <ProfileMenuList user={user} onNavigate={(path) => navigate(path)} />
    </Box>
  );
};

export default MyProfilePage;