"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import type { RegisterFormData } from "../types"
import {
  Box,
  Button,
  Container,
  FormLabel,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material"
import { EyeOff, Eye } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { registerSchema } from "../utils/validationSchemas"
import { useAuth } from "../hooks/useAuth"

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      lastName: '',
      address: '',
      birthDate: new Date().toISOString().split('T')[0],
      loanAmount: 0,
      phone: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError(null);
      const formattedData = {
        ...data,
        birthDate: new Date(data.birthDate).toISOString().split('T')[0],
      };
      await registerUser(formattedData);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
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
      {/* //! Snackbar isn't shown when the user is registering*/}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          zIndex: 9999,
          '& .MuiAlert-root': {
            backgroundColor: '#7c6fb0',
            color: 'white',
            '& .MuiAlert-icon': {
              color: 'white',
            },
          },
        }}
      >
        <Alert 
          severity="success" 
          sx={{ 
            width: '100%',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
          }}
        >
          Registration successful! Redirecting to home page...
        </Alert>
      </Snackbar>
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
            Hello.
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
            Apply for your loan here.
          </Typography>
        </Box>

        {/*form container*/}
        <Box sx={{ backgroundColor: 'white', borderRadius: 2, padding: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/*name*/}
            <Box sx={{ mb: 3 }}>
              <FormLabel sx={{ mb: 1, display: 'block', fontWeight: 500 }}>Name</FormLabel>
              <TextField
                {...register('name')}
                type="text"
                placeholder="Enter your first name here"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    padding: '4px',
                    '& fieldset': {
                      borderColor: errors.name ? '#f87171' : '#e5e7eb',
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

            {/*last name*/}
            <Box sx={{ mb: 3 }}>
              <FormLabel sx={{ mb: 1, display: 'block', fontWeight: 500 }}>Last name</FormLabel>
              <TextField
                {...register('lastName')}
                type="text"
                placeholder="Enter your last name here"
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    padding: '4px',
                    '& fieldset': {
                      borderColor: errors.lastName ? '#f87171' : '#e5e7eb',
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

            {/*address*/}
            <Box sx={{ mb: 3 }}>
              <FormLabel sx={{ mb: 1, display: 'block', fontWeight: 500 }}>Address</FormLabel>
              <TextField
                {...register('address')}
                type="text"
                placeholder="Enter your address here"
                fullWidth
                error={!!errors.address}
                helperText={errors.address?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    padding: '4px',
                    '& fieldset': {
                      borderColor: errors.address ? '#f87171' : '#e5e7eb',
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

            {/*email*/}
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
            {/* loan amount*/}
            <Box sx={{ mb: 3 }}>
              <FormLabel sx={{ mb: 1, display: 'block', fontWeight: 500 }}>Loan amount</FormLabel>
              <TextField
                {...register('loanAmount')}
                type="number"
                placeholder="Enter your loan amount here"
                fullWidth
                error={!!errors.loanAmount}
                helperText={errors.loanAmount?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    padding: '4px',
                    '& fieldset': {
                      borderColor: errors.loanAmount ? '#f87171' : '#e5e7eb',
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
            {/* birth date*/}
            <Box sx={{ mb: 3 }}>
              <FormLabel sx={{ mb: 1, display: 'block', fontWeight: 500 }}>Birth date</FormLabel>
              <TextField
                {...register('birthDate')}
                type="date"
                placeholder="Enter your birth date here"
                fullWidth
                error={!!errors.birthDate}
                helperText={errors.birthDate?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    padding: '4px',
                    '& fieldset': {
                      borderColor: errors.birthDate ? '#f87171' : '#e5e7eb',
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
            {/* phone*/}
            <Box sx={{ mb: 3 }}>
              <FormLabel sx={{ mb: 1, display: 'block', fontWeight: 500 }}>Phone</FormLabel>
              <TextField
                {...register('phone')}
                type="tel"
                placeholder="Enter your phone number here"
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    padding: '4px',
                    '& fieldset': {
                      borderColor: errors.phone ? '#f87171' : '#e5e7eb',
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
            <Box sx={{ mb: 3 }}>
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
              {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
            <Button
              type="button"
              onClick={() => reset()}
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: 'transparent',
                color: '#7c6fb0',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 500,
                textTransform: 'none',
                border: '2px solid #7c6fb0',
                '&:hover': {
                  backgroundColor: '#f3f4f6',
                },
              }}
            >
              Clear Form
            </Button>
          
          <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
            Already have a loan? <Link to="/login">Login</Link>
          </Typography>
          {error && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                backgroundColor: '#fee2e2',
                borderRadius: 1,
                border: '1px solid #f87171',
              }}
            >
              <Typography color="error" sx={{ fontWeight: 500, mb: 1 }}>
                {error.split('\n').map((message, index) => (
                  <Typography key={index} color="error" sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                    Error: {message}
                  </Typography>
                ))}
              </Typography>
            </Box>
          )}
          </form>
        </Box>
      </Box>
    </Container>
  );
}
