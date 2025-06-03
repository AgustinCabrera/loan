import React, { ReactNode } from 'react';
import './App.css';
import { Route, Routes, Navigate, BrowserRouter, useNavigate, useLocation } from 'react-router-dom';
import { HomePage } from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { useAuth } from './hooks/useAuth';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { customTheme } from './theme';
import { AuthProvider } from './context/AuthContext';

function ProtectedRoute({ children }: { children: ReactNode }): React.ReactElement {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/register" />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>
    </Container>
  );
}
export default function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
