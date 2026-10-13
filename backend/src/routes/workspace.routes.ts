/**
 * Workspace Routes
 */

import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { WorkspaceController } from '../controllers/workspace.controller.js';

export const workspaceRoutes = Router();

workspaceRoutes.use(authenticate);

workspaceRoutes.get('/', asyncHandler(WorkspaceController.getAll));
workspaceRoutes.get('/:id', asyncHandler(WorkspaceController.getById));
workspaceRoutes.post('/', asyncHandler(WorkspaceController.create));
workspaceRoutes.patch('/:id', asyncHandler(WorkspaceController.update));
workspaceRoutes.delete('/:id', asyncHandler(WorkspaceController.delete));
workspaceRoutes.post('/:id/members', asyncHandler(WorkspaceController.addMember));
workspaceRoutes.delete('/:id/members/:userId', asyncHandler(WorkspaceController.removeMember));
