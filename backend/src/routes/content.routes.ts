import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { ContentController } from '../controllers/content.controller.js';

export const contentRoutes = Router();
contentRoutes.use(authenticate);

contentRoutes.get('/', asyncHandler(ContentController.getAll));
contentRoutes.get('/:id', asyncHandler(ContentController.getById));
contentRoutes.post('/', asyncHandler(ContentController.create));
contentRoutes.patch('/:id', asyncHandler(ContentController.update));
contentRoutes.delete('/:id', asyncHandler(ContentController.delete));
contentRoutes.post('/:id/approve', asyncHandler(ContentController.approve));
