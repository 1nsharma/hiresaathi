import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { ToolController } from '../controllers/tool.controller.js';

export const toolRoutes = Router();
toolRoutes.use(authenticate);

toolRoutes.get('/', asyncHandler(ToolController.getAvailable));
toolRoutes.get('/connected', asyncHandler(ToolController.getConnected));
toolRoutes.post('/connect', asyncHandler(ToolController.connect));
toolRoutes.delete('/disconnect/:id', asyncHandler(ToolController.disconnect));
