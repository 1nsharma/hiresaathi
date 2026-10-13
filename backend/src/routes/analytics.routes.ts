import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

export const analyticsRoutes = Router();
analyticsRoutes.use(authenticate);

analyticsRoutes.get('/', async (req, res) => {
  res.json({ success: true, data: {}, message: 'Analytics routes - implement as needed' });
});
