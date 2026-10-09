import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { AgentController } from '../controllers/agent.controller.js';

export const agentRoutes = Router();
agentRoutes.use(authenticate);

agentRoutes.get('/', asyncHandler(AgentController.getAll));
agentRoutes.get('/:id', asyncHandler(AgentController.getById));
agentRoutes.post('/:id/execute', asyncHandler(AgentController.execute));
agentRoutes.get('/executions/:id', asyncHandler(AgentController.getExecution));
