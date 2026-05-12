import { Routes, Route } from 'react-router'
import Login from './pages/Login'
import AuthLayout from './layouts/AuthLayout'

function App() {
  return (
    <Routes>
      {/* 👇 LANDING PAGE - usa layout especial */}
      {/* <Route element={<LandingLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route> */}

      {/* 👇 PÁGINAS DE AUTENTICACIÓN - layout sin header/footer */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* 👇 APP PRINCIPAL - layout con header, footer, sidebar */}
      {/* <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route> */}
    </Routes>
  )
}

export default App