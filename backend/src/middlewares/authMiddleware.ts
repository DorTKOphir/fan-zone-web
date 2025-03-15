import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'Access denied' });
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    (req as any).user = verified;
    return next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
    return;
  }
};

export default authMiddleware;
