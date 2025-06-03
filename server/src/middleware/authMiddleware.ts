import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { findUserById } from '../config/database';

interface JwtPayload {
  userId: string;
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // barer token

  if (!token)
    return res
      .sendStatus(401)
      .json({ success: false, message: 'Unauthorized. Access token required' });

  try {
    const verification = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const user = await findUserById(verification.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: ' User not found' });
    }
    req.user = { id: user.id };
    next(); // continue to next middleware
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Invalid token' });
  }
};
