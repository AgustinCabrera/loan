import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../hooks/useAuth';
import { LoginFormData } from '../types';

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function LoginForm() {
  const { login } = useAuth();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  //! check if this is correct
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return <div></div>;
}
