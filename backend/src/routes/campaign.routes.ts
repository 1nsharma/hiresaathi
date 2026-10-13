import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const campaignRoutes = Router();
campaignRoutes.use(authenticate);

campaignRoutes.get('/', async (req, res) => {
  res.json({ success: true, data: [], message: 'Campaign routes - implement as needed' });
});
