import express from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import {
  handleValidationErrors,
  validateLoginUser,
  validateRegisterUser,
} from '../middleware/validationSchemas';

const router = express.Router();
router.post('/register', validateRegisterUser, handleValidationErrors, registerUser);
router.post('/login', validateLoginUser, handleValidationErrors, loginUser);

export const authRoutes = router;
