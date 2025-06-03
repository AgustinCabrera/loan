import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoginFormData } from '../types';
import {
  Box,
  Button,
  Container,
  FormHelperText,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material';
import { EyeOff, Eye } from 'lucide-react';

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        {/*hader*/}
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
        <Box sx={{ backgroundColor: 'white', borderRadius: 2, padding: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <FormLabel sx={{ mb: 1 }}>Email address</FormLabel>
              <TextField
                id="email"
                type="email"
                {...register('email')}
                placeholder="Enter your email here"
                className={`w-full px-4 py-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c6fb0] focus:border-transparent text-gray-700 placeholder-gray-400 transition-colors ${
                  errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/*pass*/}
            <div>
              <FormLabel sx={{ mb: 1 }}>Password</FormLabel>
              <div className="relative">
                <TextField
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="Type in here"
                  className={`w-full px-4 py-4 pr-12 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7c6fb0] focus:border-transparent text-gray-700 placeholder-gray-400 transition-colors ${
                    errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200'
                  }`}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#7c6fb0] focus:ring-offset-1 rounded"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </Button>
              </div>
              {errors.password && (
                <p id="password-error" className="mt-2 text-sm text-red-600" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/*submit button*/}
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#7c6fb0] text-white px-4 py-3 rounded-lg hover:bg-[#6a5996] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </form>
        </Box>
      </Box>
    </Container>
  );
}
