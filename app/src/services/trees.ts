import { Router } from 'express';
import { Req, Res } from '../types/app';

const router = Router();

/**
 * Returns the name of my favourite tree
 */
router.get('/', (req: Req, res: Res) => {
  res.status(200);
  return res.json({ myFavouriteTree: 'pine tree 🌲' });
});

export default router;
