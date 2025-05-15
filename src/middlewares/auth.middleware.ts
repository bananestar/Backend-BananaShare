import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    [key: string]: any;
  };
}

export const authJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token manquant ou invalide' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET non défini');

    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (
      !decoded ||
      typeof decoded !== 'object' ||
      !decoded.id ||
      !decoded.role
    ) {
      res.status(401).json({ message: 'Token invalide ou corrompu' });
      return;
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
      ...decoded,
    };

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};
