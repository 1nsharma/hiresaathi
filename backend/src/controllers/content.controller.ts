/**
 * Content Controller
 */

import { Request, Response } from 'express';
import { prisma } from '../db/client.js';
import { AppError } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';

export class ContentController {
  static async getAll(req: Request, res: Response) {
    const { workspaceId, status, contentType } = req.query;

    const contents = await prisma.content.findMany({
      where: {
        workspaceId: workspaceId as string,
        status: status as any,
        contentType: contentType as any,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, data: contents });
  }

  static async getById(req: Request, res: Response) {
    const content = await prisma.content.findUnique({
      where: { id: req.params.id },
      include: { approvals: true, brand: true },
    });

    if (!content) throw new AppError('Content not found', 404);

    res.json({ success: true, data: content });
  }

  static async create(req: AuthRequest, res: Response) {
    const { workspaceId, brandId, title, content, contentType, keywords } = req.body;

    const newContent = await prisma.content.create({
      data: {
        workspaceId,
        brandId,
        userId: req.user!.id,
        title,
        content,
        contentType,
        keywords,
        wordCount: content.split(/\s+/).length,
      },
    });

    res.status(201).json({ success: true, data: newContent });
  }

  static async update(req: Request, res: Response) {
    const content = await prisma.content.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json({ success: true, data: content });
  }

  static async delete(req: Request, res: Response) {
    await prisma.content.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Content deleted' });
  }

  static async approve(req: AuthRequest, res: Response) {
    const { status, comments } = req.body;

    const approval = await prisma.approval.create({
      data: {
        contentId: req.params.id,
        reviewerId: req.user!.id,
        status,
        comments,
        reviewedAt: new Date(),
      },
    });

    // Update content status
    await prisma.content.update({
      where: { id: req.params.id },
      data: { status: status === 'APPROVED' ? 'APPROVED' : 'IN_REVIEW' },
    });

    res.json({ success: true, data: approval });
  }
}
