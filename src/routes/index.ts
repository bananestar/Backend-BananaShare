import { Router, Request, Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { devOnly } from '../middlewares/devOnly.middleware';
import { authJWT } from '../middlewares/auth.middleware';

const router = Router();

const pkg = JSON.parse(
  readFileSync(join(__dirname, '../../package.json'), 'utf-8')
);
const version = pkg.version || '0.0.0';

router.get('/secure', authJWT, (req, res) => {
  res.status(200).json({ message: 'Zone sécurisée BananaCorp 🍌' });
});

// ✅ Ping uniquement accessible en dev
router.get('/ping', devOnly, (req: Request, res: Response) => {
  res.status(200).json({
    message: "i'm alive",
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version,
    env: process.env.NODE_ENV || 'undefined',
  });
});

export default router;
