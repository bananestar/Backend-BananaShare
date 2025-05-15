import { Request, Response, NextFunction } from 'express';

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('❌ Erreur :', err);

  const status = err.status || 500;
  const message = err.message || 'Erreur interne du serveur';

  res.status(status).json({
    status: 'error',
    message,
  });
}

export default errorHandler;
