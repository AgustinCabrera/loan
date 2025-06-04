import express, { RequestHandler } from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import {
  validateRegisterUser,
  validateLoginUser,
  handleValidationErrors,
} from '../middleware/validationSchemas';

const router = express.Router();

const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

router.post('/register', validateRegisterUser, handleValidationErrors, asyncHandler(registerUser));
router.post('/login', validateLoginUser, handleValidationErrors, asyncHandler(loginUser));

export default router;
