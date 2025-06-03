import * as yup from 'yup';

export const validateAge = (birthDate: Date | undefined) => {
  if (!birthDate) {
    return false;
  }
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1 >= 18;
  }
  return age >= 18;
};

export const registerSchema = yup.object({
  name: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Name should not contain numbers or special characters'),

  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Name should not contain numbers or special characters'),

  email: yup.string().email('Invalid email address').required('Email is required'),

  address: yup
    .string()
    .required('Address is required')
    .min(10, 'Address must be at least 10 characters')
    .matches(
      /^[a-zA-Z0-9\s,'-]*$/,
      'Address must contain only letters, numbers, spaces, commas, and hyphens'
    ),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),

  birthDate: yup
    .date()
    .required('Birth date is required')
    .test('is-valid-age', 'You must be at least 18 years old', validateAge),

  loanAmount: yup
    .number()
    .required('Loan amount is required')
    .min(2500, 'Loan amount must be at least $2500')
    .max(250000, 'Loan amount must be less than $250000'),

  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\(\d{3}\)\s\d{3}-\d{4}$/, 'Phone number must be in the format (123) 456-7890'),
});

export const loginSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export type RegistrationFormData = yup.InferType<typeof registerSchema>;
export type LoginFormData = yup.InferType<typeof loginSchema>;
