import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

export const assetRoutes = Router();
assetRoutes.use(authenticate);

assetRoutes.get('/', async (req, res) => {
  res.json({ success: true, data: [], message: 'Asset routes - implement as needed' });
});
