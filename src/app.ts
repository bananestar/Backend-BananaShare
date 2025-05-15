import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import routes from './routes';
import errorHandler from './middlewares/errorHandler.middleware';
import Logger from './utils/logger';
import { requestLogger } from './middlewares/logger.middleware';

dotenv.config();

const app: Application = express();

Logger.info('Serveur en démarrage...');

// Trust proxy (si derrière un reverse proxy)
app.set('trust proxy', 1);

// Sécurité & middlewares globaux
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limit
Logger.info('Chargement du limiter...');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Middleware de logging personnalisé (avant routes)
app.use(requestLogger);

// Routes principales
Logger.info('Chargement des routes...');
app.use('/api', routes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler global
app.use(errorHandler);

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  Logger.sucess(
    `🚀 BananaShare backend lancé sur ${
      process.env.BASE_URL || 'http://localhost:' + PORT
    }`
  );
});
