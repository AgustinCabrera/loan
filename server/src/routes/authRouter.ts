import express from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import {
  validateRegisterUser,
  validateLoginUser,
  handleValidationErrors,
} from '../middleware/validation';

const router = express.Router();

router.post('/register', validateRegisterUser, handleValidationErrors, registerUser);
router.post('/login', validateLoginUser, handleValidationErrors, loginUser);

export default router;
