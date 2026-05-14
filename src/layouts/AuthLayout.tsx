import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import planetEarthAuth from '@/assets/planet-earth-auth.png';

const AuthLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left — auth forms */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
          overflowY: 'auto',
          p: 2,
        }}
      >
        <Outlet />
      </Box>

      {/* Right — illustration */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          backgroundColor: 'background.default',
        }}
      >
        <Box
          component="img"
          src={planetEarthAuth}
          alt=""
          sx={{ maxWidth: '110%', maxHeight: '70vh', objectFit: 'contain' }}
        />
      </Box>
    </Box>
  )
}

export default AuthLayout