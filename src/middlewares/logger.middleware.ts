import { Request, Response, NextFunction } from 'express';
import Logger from '../utils/logger';

export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const start = process.hrtime();

  res.on('finish', () => {
    const [sec, nano] = process.hrtime(start);
    const duration = Math.round(sec * 1e3 + nano / 1e6); // en ms

    const status = res.statusCode;
    const method = req.method;
    const url = req.originalUrl;

    const msg = `${method} ${url} -> ${status} (${duration}ms)`;

    switch (true) {
      case status >= 500:
        Logger.error(msg);
        break;
      case status >= 400:
        Logger.warn(msg);
        break;
      case status >= 300:
        Logger.info(msg);
        break;
      default:
        Logger.sucess(msg);
        break;
    }
  });
  next();
}
