import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { BrandController } from '../controllers/brand.controller.js';

export const brandRoutes = Router();
brandRoutes.use(authenticate);

brandRoutes.get('/:workspaceId', asyncHandler(BrandController.getByWorkspace));
brandRoutes.post('/', asyncHandler(BrandController.create));
brandRoutes.patch('/:id', asyncHandler(BrandController.update));
brandRoutes.post('/:id/analyze', asyncHandler(BrandController.analyzeWebsite));
