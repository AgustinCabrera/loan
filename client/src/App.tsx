import React, { ReactNode } from "react";
import "./App.css";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { HomePage } from "./components/Home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { useAuth } from "./hooks/useAuth";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import { customTheme } from "./theme";
import { AuthProvider } from "./context/AuthContext";
import { Loader } from "./components/shared/Loader";

function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}

function PublicRoute({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterForm />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginForm />
              </PublicRoute>
            }
          />
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
