import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const jobRoutes = Router();
jobRoutes.use(authenticate);

jobRoutes.get('/', async (req, res) => {
  res.json({ success: true, data: [], message: 'Job routes - implement as needed' });
});
