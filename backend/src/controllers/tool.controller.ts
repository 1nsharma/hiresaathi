/**
 * Tool Controller
 * MCP & Integrations (Composio)
 */

import { Request, Response } from 'express';
import { prisma } from '../db/client.js';
import { ComposioService } from '../services/composio.service.js';
import { AuthRequest } from '../middleware/auth.js';

export class ToolController {
  static async getAvailable(req: Request, res: Response) {
    const tools = await ComposioService.getAvailableTools();
    res.json({ success: true, data: tools });
  }

  static async getConnected(req: AuthRequest, res: Response) {
    const { workspaceId } = req.query;

    const connections = await prisma.toolConnection.findMany({
      where: { workspaceId: workspaceId as string },
    });

    res.json({ success: true, data: connections });
  }

  static async connect(req: AuthRequest, res: Response) {
    const { appId, appName, appIcon, category, workspaceId } = req.body;

    const result = await ComposioService.connectTool(appId, workspaceId);

    const connection = await prisma.toolConnection.create({
      data: {
        workspaceId,
        userId: req.user!.id,
        appId,
        appName,
        appIcon,
        category,
        connectionId: result.connectionId,
        status: 'ACTIVE',
      },
    });

    res.status(201).json({ success: true, data: connection });
  }

  static async disconnect(req: Request, res: Response) {
    const connection = await prisma.toolConnection.findUnique({
      where: { id: req.params.id },
    });

    if (connection) {
      await ComposioService.disconnectTool(connection.connectionId);
      await prisma.toolConnection.delete({ where: { id: req.params.id } });
    }

    res.json({ success: true, message: 'Tool disconnected' });
  }
}
