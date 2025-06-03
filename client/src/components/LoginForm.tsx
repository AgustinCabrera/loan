import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../hooks/useAuth';
import { LoginFormData } from '../types';
import { TextField } from '@mui/material';

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
    <div className="w-full max-w-md">
      {/*hader*/}
      <div className="mb-8">
        <h1 className="text-6xl font-bold text-[#7c6fb0] mb-2">Hello!</h1>
        <h2 className="text-4xl font-bold text-gray-700 mb-6">Login here.</h2>
      </div>

      {/*form container*/}
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-600 mb-3 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7c6fb0] focus:border-transparent"
              placeholder="Enter your email"
              required
            />
            {errors.email && <p className="text-red-600 text-sm mt-2">{errors.email.message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
