/**
 * Authentication Controller
 * Handles user registration, login, and token management
 */

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db/client.js';
import { config } from '../config/env.js';
import { AppError } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';

export class AuthController {
  /**
   * Register new user
   */
  static async register(req: Request, res: Response) {
    const { email, password, name } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new AppError('User with this email already exists', 400);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        role: 'USER',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    // Create default workspace
    const workspace = await prisma.workspace.create({
      data: {
        name: `${name}'s Workspace`,
        slug: `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        members: {
          create: {
            userId: user.id,
            role: 'OWNER',
          },
        },
      },
    });

    // Generate tokens
    const token = AuthController.generateToken(user);
    const refreshToken = AuthController.generateRefreshToken(user);

    res.status(201).json({
      success: true,
      data: {
        user,
        workspace,
        token,
        refreshToken,
      },
    });
  }

  /**
   * Login user
   */
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        workspaces: {
          include: { workspace: true },
        },
      },
    });

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new AppError('Invalid credentials', 401);
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate tokens
    const token = AuthController.generateToken(user);
    const refreshToken = AuthController.generateRefreshToken(user);

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        workspaces: user.workspaces.map(wm => wm.workspace),
        token,
        refreshToken,
      },
    });
  }

  /**
   * Refresh access token
   */
  static async refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body;

    try {
      const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET) as {
        userId: string;
      };

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        throw new AppError('User not found', 401);
      }

      const token = AuthController.generateToken(user);

      res.json({
        success: true,
        data: { token },
      });
    } catch (error) {
      throw new AppError('Invalid refresh token', 401);
    }
  }

  /**
   * Logout user
   */
  static async logout(req: AuthRequest, res: Response) {
    // In a real implementation, you'd invalidate the token in Redis
    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  }

  /**
   * Get current user
   */
  static async getCurrentUser(req: AuthRequest, res: Response) {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        createdAt: true,
        workspaces: {
          include: { workspace: true },
        },
      },
    });

    res.json({
      success: true,
      data: user,
    });
  }

  /**
   * Generate JWT token
   */
  private static generateToken(user: { id: string; email: string; role: string }): string {
    return jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN as any }
    );
  }

  /**
   * Generate refresh token
   */
  private static generateRefreshToken(user: { id: string }): string {
    return jwt.sign(
      { userId: user.id },
      config.JWT_REFRESH_SECRET,
      { expiresIn: config.JWT_REFRESH_EXPIRES_IN as any }
    );
  }
}
