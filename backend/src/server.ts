/**
 * HireSaathi AI - Backend Server
 * Main entry point for the Express application
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { authRoutes } from './routes/auth.routes.js';
import { workspaceRoutes } from './routes/workspace.routes.js';
import { brandRoutes } from './routes/brand.routes.js';
import { agentRoutes } from './routes/agent.routes.js';
import { contentRoutes } from './routes/content.routes.js';
import { campaignRoutes } from './routes/campaign.routes.js';
import { jobRoutes } from './routes/job.routes.js';
import { candidateRoutes } from './routes/candidate.routes.js';
import { ticketRoutes } from './routes/ticket.routes.js';
import { workflowRoutes } from './routes/workflow.routes.js';
import { toolRoutes } from './routes/tool.routes.js';
import { assetRoutes } from './routes/asset.routes.js';
import { analyticsRoutes } from './routes/analytics.routes.js';

const app = express();

// ============================================
// MIDDLEWARE
// ============================================

// Security
app.use(helmet());
app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true,
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX_REQUESTS,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Body Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (config.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// ============================================
// HEALTH CHECK
// ============================================

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: config.NODE_ENV,
  });
});

// ============================================
// API ROUTES
// ============================================

const API_PREFIX = `/api/${config.API_VERSION}`;

// Authentication
app.use(`${API_PREFIX}/auth`, authRoutes);

// Workspace Management
app.use(`${API_PREFIX}/workspaces`, workspaceRoutes);

// Brand IQ
app.use(`${API_PREFIX}/brands`, brandRoutes);

// AI Marketing - Agents & Content
app.use(`${API_PREFIX}/agents`, agentRoutes);
app.use(`${API_PREFIX}/content`, contentRoutes);
app.use(`${API_PREFIX}/campaigns`, campaignRoutes);

// AI Hiring
app.use(`${API_PREFIX}/jobs`, jobRoutes);
app.use(`${API_PREFIX}/candidates`, candidateRoutes);

// AI Support
app.use(`${API_PREFIX}/tickets`, ticketRoutes);

// AI Automation
app.use(`${API_PREFIX}/workflows`, workflowRoutes);

// MCP & Integrations (Composio)
app.use(`${API_PREFIX}/tools`, toolRoutes);

// Asset Management
app.use(`${API_PREFIX}/assets`, assetRoutes);

// Analytics
app.use(`${API_PREFIX}/analytics`, analyticsRoutes);

// ============================================
// 404 HANDLER
// ============================================

app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// ============================================
// ERROR HANDLER
// ============================================

app.use(errorHandler);

// ============================================
// START SERVER
// ============================================

const PORT = config.PORT || 4000;

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 HireSaathi AI Backend Server                        ║
║                                                           ║
║   Environment: ${config.NODE_ENV.padEnd(15)}                        ║
║   Port: ${String(PORT).padEnd(15)}                                  ║
║   API Version: ${config.API_VERSION.padEnd(15)}                        ║
║   Database: Connected                                   ║
║                                                           ║
║   Server running at: http://localhost:${PORT}             ║
║   API Docs: http://localhost:${PORT}/api/docs             ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

export default app;
