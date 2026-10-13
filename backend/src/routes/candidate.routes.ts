import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

export const candidateRoutes = Router();
candidateRoutes.use(authenticate);

candidateRoutes.get('/', async (req, res) => {
  res.json({ success: true, data: [], message: 'Candidate routes - implement as needed' });
});
