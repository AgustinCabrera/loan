import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateRegisterUser = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('Name must contain only letters and spaces'),

  body('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters long')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('Last name must contain only letters and spaces'),

  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),

  body('address')
    .notEmpty()
    .withMessage('Address is required')
    .isLength({ min: 10 })
    .withMessage('Address must be at least 10 characters long')
    .matches(/^[a-zA-Z0-9\s,'-]*$/)
    .withMessage('Address must contain only letters, numbers, spaces, commas, and hyphens'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage(
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),

  body('birthDate')
    .notEmpty()
    .withMessage('Birth date is required')
    .isDate()
    .withMessage('Invalid birth date')
    .custom((value) => {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18;
      }
      return age >= 18;
    }),

  body('phone')
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^\(\d{3}\)\s\d{3}-\d{4}$/)
    .withMessage('Invalid phone number format'),

  body('loanAmount')
    .notEmpty()
    .withMessage('Loan amount is required')
    .isNumeric()
    .withMessage('Loan amount must be a number')
    .custom((value) => {
      if (value < 2500) {
        throw new Error('Loan amount must be at least $2500');
      }
      if (value > 250000) {
        throw new Error('Loan amount must be less than $250000');
      }
      if (value.toString().includes('.')) {
        throw new Error('Loan amount must be a whole number');
      }
      return true;
    }),
];
export const validateLoginUser = [
  body('email').notEmpty().withMessage('Email is required').isEmail(),

  body('password').notEmpty().withMessage('Password is required'),
];

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, message: 'Validation error', errors: errors.array() });
  }
  next();
};
