import { Box, Button, Container, Grid, Paper, Typography, Divider, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Email, Phone, Home } from '@mui/icons-material';

export const HomePage = () => {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading || !user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Grid container spacing={2}>
        {/* main  */}
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 3,
              background: "white",
            }}
          >
            {/* header  */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#2c3e50",
                  fontSize: { xs: "24px", md: "32px" },
                }}
              >
                Congrats {user.name}!
              </Typography>
            </Box>
            {/*message */}
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                color: "#34495e",
                lineHeight: 1.4,
                fontSize: { xs: "18px", md: "20px" },
              }}
            >
              You've been pre-qualified for a loan up to a{" "}
              <Box component="span" sx={{ fontWeight: 700, color: "#7c6fb0" }}>
                ${user.loanAmount?.toLocaleString() || '0'}
              </Box>{" "}
              loan 
            </Typography>
            <Divider sx={{ my: 3 }} />
            {/* property information */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#2c3e50" }}>
                Home Address
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Home sx={{ color: "#7f8c8d", mr: 1 }} />
                <Typography variant="body1" color="text.secondary">
                  {user.address}
                </Typography>
              </Box>
            </Box>
            {/* contact information */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#2c3e50" }}>
                Your Information
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Email sx={{ color: "#7f8c8d", mr: 1 }} />
                <Typography variant="body1" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Phone sx={{ color: "#7f8c8d", mr: 1 }} />
                <Typography variant="body1" color="text.secondary">
                  {user.phone}
                </Typography>
              </Box>
            </Box>
            <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            sx={{
              width: "100%",
              display: "block",
              mx: "auto",
              backgroundColor: '#7c6fb0',
            }}
          >
            Logout
          </Button>
          </Paper>
        </Grid>
    </Container>
  );
};
