import { Box, Button, Container, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../types';

export const HomePage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = fetch('/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        navigate('/login');
      });
  }, [navigate]); //!!!!! check navigate dependency

  const handleLogout = () => {
    fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Welcome, {userData ? `${userData.firstName} ${userData.lastName}` : 'User'}!
        </Typography>

        {userData ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">Email: {userData.email}</Typography>
            <Typography variant="body1">Address: {userData.adress}</Typography>
            <Typography variant="body1">Loan Amount: ${userData.loanAmount}</Typography>
            <Typography variant="body1">Birth Date: {userData.birthDate}</Typography>
            <Typography variant="body1">Phone Number: {userData.phoneNumber}</Typography>

            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 3 }}
              onClick={handleLogout}
              fullWidth
            >
              logout
            </Button>
          </Box>
        ) : (
          <Typography variant="body1">Loading user data...</Typography>
        )}
      </Paper>
    </Container>
  );
};
