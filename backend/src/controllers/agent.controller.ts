/**
 * Agent Controller
 * AI Agent execution with Composio tools
 */

import { Request, Response } from 'express';
import { prisma } from '../db/client.js';
import { AppError } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';
import { AgentRuntimeService } from '../services/agentRuntime.service.js';

export class AgentController {
  static async getAll(req: Request, res: Response) {
    const { category } = req.query;
    
    const agents = await prisma.agent.findMany({
      where: category ? { category: category as string } : undefined,
      orderBy: { name: 'asc' },
    });

    res.json({ success: true, data: agents });
  }

  static async getById(req: Request, res: Response) {
    const agent = await prisma.agent.findUnique({
      where: { id: req.params.id },
    });

    if (!agent) throw new AppError('Agent not found', 404);

    res.json({ success: true, data: agent });
  }

  static async execute(req: AuthRequest, res: Response) {
    const { input, context } = req.body;
    const agentId = req.params.id;

    const agent = await prisma.agent.findUnique({
      where: { id: agentId },
    });

    if (!agent) throw new AppError('Agent not found', 404);

    // Create execution record
    const execution = await prisma.agentExecution.create({
      data: {
        agentId,
        workspaceId: context?.workspaceId || '',
        userId: req.user!.id,
        input,
        context,
        status: 'RUNNING',
        steps: [],
      },
    });

    // Execute agent
    try {
      const result = await AgentRuntimeService.execute(agent, input, context);

      await prisma.agentExecution.update({
        where: { id: execution.id },
        data: {
          status: 'COMPLETED',
          output: result.output,
          steps: result.steps,
          completedAt: new Date(),
          durationMs: result.durationMs,
        },
      });

      res.json({ success: true, data: result });
    } catch (error) {
      await prisma.agentExecution.update({
        where: { id: execution.id },
        data: {
          status: 'FAILED',
          error: error instanceof Error ? error.message : 'Unknown error',
          completedAt: new Date(),
        },
      });

      throw error;
    }
  }

  static async getExecution(req: Request, res: Response) {
    const execution = await prisma.agentExecution.findUnique({
      where: { id: req.params.id },
      include: { agent: true },
    });

    if (!execution) throw new AppError('Execution not found', 404);

    res.json({ success: true, data: execution });
  }
}
