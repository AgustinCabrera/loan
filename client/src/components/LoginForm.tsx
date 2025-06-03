'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Container,
  FormLabel,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { EyeOff, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log('Login attempt:', { data });
      //api call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      //TODO: handle api call
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9f7f1',
        padding: 2,
      }}
    >
      <Box sx={{ maxWidth: '450px', width: '100%' }}>
        {/*header*/}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: '72px',
              fontWeight: 700,
              color: '#7c6fb0',
              lineHeight: 1.1,
              mb: 0.5,
            }}
          >
            Hello!
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: '48px',
              fontWeight: 700,
              color: '#333',
              lineHeight: 1.1,
            }}
          >
            Login here.
          </Typography>
        </Box>

        {/*form container*/}
        <Box sx={{ backgroundColor: 'white', borderRadius: 2, padding: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 3 }}>
              <FormLabel sx={{ mb: 1, display: 'block', fontWeight: 500 }}>Email address</FormLabel>
              <TextField
                {...register('email')}
                type="email"
                placeholder="Enter your email here"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    padding: '4px',
                    '& fieldset': {
                      borderColor: errors.email ? '#f87171' : '#e5e7eb',
                    },
                    '&:hover fieldset': {
                      borderColor: '#7c6fb0',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#7c6fb0',
                      borderWidth: '2px',
                    },
                  },
                  '& .MuiOutlinedInput-input': {
                    padding: '16px',
                    color: '#374151',
                    '&::placeholder': {
                      color: '#9ca3af',
                      opacity: 1,
                    },
                  },
                }}
              />
            </Box>

            {/*password*/}
            <Box sx={{ mb: 4 }}>
              <FormLabel sx={{ mb: 1, display: 'block', fontWeight: 500 }}>Password</FormLabel>
              <TextField
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Type in here"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        sx={{
                          color: '#9ca3af',
                          '&:hover': {
                            color: '#6b7280',
                          },
                        }}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    padding: '4px',
                    '& fieldset': {
                      borderColor: errors.password ? '#f87171' : '#e5e7eb',
                    },
                    '&:hover fieldset': {
                      borderColor: '#7c6fb0',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#7c6fb0',
                      borderWidth: '2px',
                    },
                  },
                  '& .MuiOutlinedInput-input': {
                    padding: '16px',
                    color: '#374151',
                    '&::placeholder': {
                      color: '#9ca3af',
                      opacity: 1,
                    },
                  },
                }}
              />
            </Box>

            {/*submit button*/}
            <Button
              type="submit"
              disabled={isSubmitting}
              fullWidth
              sx={{
                backgroundColor: '#7c6fb0',
                color: 'white',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#6a5996',
                },
                '&:disabled': {
                  opacity: 0.5,
                  cursor: 'not-allowed',
                },
              }}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
            Don't have a loan? <Link to="/register">Register</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
