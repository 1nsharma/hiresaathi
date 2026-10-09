/**
 * Brand Controller
 * Brand IQ - AI Brand Intelligence
 */

import { Request, Response } from 'express';
import { prisma } from '../db/client.js';
import { AppError } from '../middleware/errorHandler.js';
import { AIService } from '../services/ai.service.js';

export class BrandController {
  static async getByWorkspace(req: Request, res: Response) {
    const brand = await prisma.brand.findUnique({
      where: { workspaceId: req.params.workspaceId },
    });

    res.json({ success: true, data: brand });
  }

  static async create(req: Request, res: Response) {
    const { workspaceId, name, website, voiceTone, targetAudience, languages, brandColors } = req.body;

    const brand = await prisma.brand.create({
      data: {
        workspaceId,
        name,
        website,
        voiceTone,
        targetAudience,
        languages,
        brandColors,
      },
    });

    res.status(201).json({ success: true, data: brand });
  }

  static async update(req: Request, res: Response) {
    const brand = await prisma.brand.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json({ success: true, data: brand });
  }

  static async analyzeWebsite(req: Request, res: Response) {
    const brand = await prisma.brand.findUnique({
      where: { id: req.params.id },
    });

    if (!brand || !brand.website) {
      throw new AppError('Brand or website not found', 404);
    }

    // Use AI to analyze website
    const analysis = await AIService.analyzeBrandWebsite(brand.website);

    // Update brand with AI analysis
    const updatedBrand = await prisma.brand.update({
      where: { id: req.params.id },
      data: {
        voiceTone: analysis.voiceTone,
        personality: analysis.personality,
        targetAudience: analysis.targetAudience,
        products: analysis.products,
        services: analysis.services,
        differentiators: analysis.differentiators,
      },
    });

    res.json({ success: true, data: updatedBrand });
  }
}
