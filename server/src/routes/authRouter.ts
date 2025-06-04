import express, { RequestHandler } from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import {
  validateRegisterUser,
  validateLoginUser,
  handleValidationErrors,
} from '../middleware/validationSchemas';
import { getUserController } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

router.post('/register', validateRegisterUser, handleValidationErrors, asyncHandler(registerUser));
router.post('/login', validateLoginUser, handleValidationErrors, asyncHandler(loginUser));
router.get('/user', authenticateToken, asyncHandler(getUserController));

export default router;
