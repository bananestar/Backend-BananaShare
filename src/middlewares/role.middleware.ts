import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

export function requireRole(role: string) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || typeof req.user !== 'object') {
      res.status(401).json({ message: 'Utilisateur non authentifié' });
      return;
    }

    if (req.user.role !== role) {
      res.status(403).json({ message: `Accès réservé au rôle ${role}` });
      return;
    }

    next();
  };
}
