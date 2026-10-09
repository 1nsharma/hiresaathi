import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

export const workflowRoutes = Router();
workflowRoutes.use(authenticate);

workflowRoutes.get('/', async (req, res) => {
  res.json({ success: true, data: [], message: 'Workflow routes - implement as needed' });
});
