import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // barer token

  if (!token)
    return res
      .sendStatus(401)
      .json({ success: false, message: 'Unauthorized. Access token required' });

  try {
    const verification = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;
    const user = findUserById(verification.userId); //! TODO: define database methods
    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized. User not found' });
    }
    req.user = { id: verification.userId }; // add user id to request object
    next(); // continue to next middleware
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Invalid token' });
  }
};
