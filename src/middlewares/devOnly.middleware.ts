import { Request, Response, NextFunction } from 'express';

export const devOnly = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (process.env.NODE_ENV !== 'development') {
    res.status(403).json({
      message: 'Accès interdit : ping uniquement en développement',
    });
    return;
  }

  next();
};
