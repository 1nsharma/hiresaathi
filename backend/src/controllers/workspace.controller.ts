/**
 * Workspace Controller
 */

import { Request, Response } from 'express';
import { prisma } from '../db/client.js';
import { AppError } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';

export class WorkspaceController {
  static async getAll(req: AuthRequest, res: Response) {
    const workspaces = await prisma.workspace.findMany({
      where: {
        members: { some: { userId: req.user!.id } },
      },
      include: {
        members: {
          include: { user: { select: { id: true, name: true, email: true } } },
        },
      },
    });

    res.json({ success: true, data: workspaces });
  }

  static async getById(req: Request, res: Response) {
    const workspace = await prisma.workspace.findUnique({
      where: { id: req.params.id },
      include: {
        members: {
          include: { user: { select: { id: true, name: true, email: true, role: true } } },
        },
        brand: true,
      },
    });

    if (!workspace) throw new AppError('Workspace not found', 404);

    res.json({ success: true, data: workspace });
  }

  static async create(req: AuthRequest, res: Response) {
    const { name, description } = req.body;
    const slug = `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;

    const workspace = await prisma.workspace.create({
      data: {
        name,
        slug,
        description,
        members: {
          create: { userId: req.user!.id, role: 'OWNER' },
        },
      },
    });

    res.status(201).json({ success: true, data: workspace });
  }

  static async update(req: Request, res: Response) {
    const { name, description, logo } = req.body;

    const workspace = await prisma.workspace.update({
      where: { id: req.params.id },
      data: { name, description, logo },
    });

    res.json({ success: true, data: workspace });
  }

  static async delete(req: Request, res: Response) {
    await prisma.workspace.update({
      where: { id: req.params.id },
      data: { isActive: false },
    });

    res.json({ success: true, message: 'Workspace deleted' });
  }

  static async addMember(req: Request, res: Response) {
    const { userId, role } = req.body;

    const member = await prisma.workspaceMember.create({
      data: {
        workspaceId: req.params.id,
        userId,
        role: role || 'MEMBER',
      },
    });

    res.status(201).json({ success: true, data: member });
  }

  static async removeMember(req: Request, res: Response) {
    await prisma.workspaceMember.deleteMany({
      where: {
        workspaceId: req.params.id,
        userId: req.params.userId,
      },
    });

    res.json({ success: true, message: 'Member removed' });
  }
}
