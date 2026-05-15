import Sidebar, { SIDEBAR_WIDTH } from '@/components/ui/Sidebar';
import Topbar, { TOPBAR_HEIGHT } from '@/components/ui/Topbar';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: '#f8f8f8' }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: `${SIDEBAR_WIDTH}px`,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <Topbar />

        <Box
          sx={{
            flexGrow: 1,
            mt: `${TOPBAR_HEIGHT}px`,
            ml:4,
            mr:3,
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;