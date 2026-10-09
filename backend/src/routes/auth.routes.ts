/**
 * Authentication Routes
 * Login, register, token refresh
 */

import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { AuthController } from '../controllers/auth.controller.js';

export const authRoutes = Router();

authRoutes.post('/register', asyncHandler(AuthController.register));
authRoutes.post('/login', asyncHandler(AuthController.login));
authRoutes.post('/refresh', asyncHandler(AuthController.refreshToken));
authRoutes.post('/logout', asyncHandler(AuthController.logout));
authRoutes.get('/me', asyncHandler(AuthController.getCurrentUser));
