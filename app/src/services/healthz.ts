import { Router } from 'express';
import { Req, Res } from '../types/app';

const router = Router();

/**
 * Healthz endpoint for k8s to probe the service on
 */
router.get('/', (req: Req, res: Res) => {
  res.status(200);
  return res.send('OK');
});

export default router;
