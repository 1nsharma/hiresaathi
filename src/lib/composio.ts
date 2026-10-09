/**
 * Composio Integration Layer for HireSaathi AI
 * 
 * Composio provides 250+ tool integrations for AI agents.
 * This module handles:
 * - Tool discovery and connection
 * - Authentication flows
 * - Tool execution for agents
 * - Real-time status monitoring
 */

// Composio App Categories
export const COMPOSIO_APPS = {
  // Communication
  COMMUNICATION: {
    GMAIL: { id: 'gmail', name: 'Gmail', icon: '📧', category: 'Communication', actions: ['send_email', 'read_email', 'search_email', 'create_draft'] },
    SLACK: { id: 'slack', name: 'Slack', icon: '💬', category: 'Communication', actions: ['send_message', 'create_channel', 'read_messages', 'upload_file'] },
    DISCORD: { id: 'discord', name: 'Discord', icon: '🎮', category: 'Communication', actions: ['send_message', 'create_channel', 'manage_roles'] },
    WHATSAPP: { id: 'whatsapp', name: 'WhatsApp', icon: '📱', category: 'Communication', actions: ['send_message', 'send_template', 'read_messages'] },
  },
  // Development
  DEVELOPMENT: {
    GITHUB: { id: 'github', name: 'GitHub', icon: '🐙', category: 'Development', actions: ['create_issue', 'create_pr', 'list_repos', 'search_code', 'manage_actions'] },
    GITLAB: { id: 'gitlab', name: 'GitLab', icon: '🦊', category: 'Development', actions: ['create_issue', 'create_mr', 'list_projects'] },
    JIRA: { id: 'jira', name: 'Jira', icon: '🎯', category: 'Development', actions: ['create_issue', 'update_issue', 'search_issues', 'create_sprint'] },
    LINEAR: { id: 'linear', name: 'Linear', icon: '📐', category: 'Development', actions: ['create_issue', 'list_issues', 'update_status'] },
  },
  // Productivity
  PRODUCTIVITY: {
    NOTION: { id: 'notion', name: 'Notion', icon: '📝', category: 'Productivity', actions: ['create_page', 'search_pages', 'update_page', 'create_database'] },
    GOOGLE_CALENDAR: { id: 'google_calendar', name: 'Google Calendar', icon: '📅', category: 'Productivity', actions: ['create_event', 'list_events', 'update_event'] },
    GOOGLE_DOCS: { id: 'google_docs', name: 'Google Docs', icon: '📄', category: 'Productivity', actions: ['create_doc', 'read_doc', 'update_doc'] },
    TRELLO: { id: 'trello', name: 'Trello', icon: '📋', category: 'Productivity', actions: ['create_card', 'move_card', 'list_boards'] },
    ASANA: { id: 'asana', name: 'Asana', icon: '✅', category: 'Productivity', actions: ['create_task', 'update_task', 'list_projects'] },
  },
  // CRM & Sales
  CRM: {
    HUBSPOT: { id: 'hubspot', name: 'HubSpot', icon: '🧲', category: 'CRM', actions: ['create_contact', 'create_deal', 'send_email', 'list_contacts'] },
    SALESFORCE: { id: 'salesforce', name: 'Salesforce', icon: '☁️', category: 'CRM', actions: ['create_lead', 'update_opportunity', 'search_records'] },
    ZOHOCRM: { id: 'zohocrm', name: 'Zoho CRM', icon: '💼', category: 'CRM', actions: ['create_contact', 'create_lead', 'send_email'] },
  },
  // Social Media
  SOCIAL: {
    TWITTER: { id: 'twitter', name: 'Twitter/X', icon: '🐦', category: 'Social', actions: ['post_tweet', 'search_tweets', 'reply_tweet', 'like_tweet'] },
    LINKEDIN: { id: 'linkedin', name: 'LinkedIn', icon: '💼', category: 'Social', actions: ['share_post', 'search_people', 'send_message'] },
    INSTAGRAM: { id: 'instagram', name: 'Instagram', icon: '📸', category: 'Social', actions: ['post_image', 'post_story', 'read_comments'] },
    YOUTUBE: { id: 'youtube', name: 'YouTube', icon: '▶️', category: 'Social', actions: ['upload_video', 'search_videos', 'read_comments'] },
  },
  // Data & Storage
  DATA: {
    GOOGLE_SHEETS: { id: 'google_sheets', name: 'Google Sheets', icon: '📊', category: 'Data', actions: ['read_sheet', 'write_sheet', 'create_sheet', 'append_data'] },
    AIRTABLE: { id: 'airtable', name: 'Airtable', icon: '🗂️', category: 'Data', actions: ['create_record', 'list_records', 'update_record'] },
    POSTGRES: { id: 'postgres', name: 'PostgreSQL', icon: '🐘', category: 'Data', actions: ['query', 'insert', 'update', 'create_table'] },
    MONGODB: { id: 'mongodb', name: 'MongoDB', icon: '🍃', category: 'Data', actions: ['find', 'insert', 'update', 'aggregate'] },
  },
  // Design & Content
  DESIGN: {
    FIGMA: { id: 'figma', name: 'Figma', icon: '🎨', category: 'Design', actions: ['get_file', 'get_comments', 'list_projects'] },
    CANVA: { id: 'canva', name: 'Canva', icon: '🖼️', category: 'Design', actions: ['create_design', 'list_designs', 'export_design'] },
  },
  // Finance
  FINANCE: {
    STRIPE: { id: 'stripe', name: 'Stripe', icon: '💳', category: 'Finance', actions: ['create_payment', 'list_customers', 'create_invoice'] },
    QUICKBOOKS: { id: 'quickbooks', name: 'QuickBooks', icon: '📒', category: 'Finance', actions: ['create_invoice', 'list_customers', 'record_payment'] },
  },
  // Infrastructure
  INFRA: {
    AWS_S3: { id: 'aws_s3', name: 'AWS S3', icon: '🪣', category: 'Infrastructure', actions: ['upload_file', 'list_buckets', 'download_file'] },
    VERCEL: { id: 'vercel', name: 'Vercel', icon: '▲', category: 'Infrastructure', actions: ['list_deployments', 'create_deployment'] },
  },
};

// Flatten all apps for easy iteration
export const ALL_APPS = Object.values(COMPOSIO_APPS).flatMap(category => Object.values(category));

// Agent Tool Configurations
export interface AgentToolConfig {
  agentId: string;
  agentName: string;
  requiredTools: string[];
  description: string;
}

export const AGENT_TOOL_CONFIGS: AgentToolConfig[] = [
  {
    agentId: 'seo-blog-writer',
    agentName: 'SEO Blog Writer',
    requiredTools: ['google_docs', 'notion', 'wordpress'],
    description: 'Writes SEO blogs and publishes to connected platforms',
  },
  {
    agentId: 'social-media-manager',
    agentName: 'Social Media Manager',
    requiredTools: ['twitter', 'linkedin', 'instagram'],
    description: 'Creates and schedules social media posts across platforms',
  },
  {
    agentId: 'email-campaign-agent',
    agentName: 'Email Campaign Agent',
    requiredTools: ['gmail', 'hubspot', 'google_sheets'],
    description: 'Creates email campaigns and tracks engagement',
  },
  {
    agentId: 'lead-qualification-agent',
    agentName: 'Lead Qualification Agent',
    requiredTools: ['hubspot', 'salesforce', 'gmail', 'google_sheets'],
    description: 'Qualifies leads from CRM and sends personalized follow-ups',
  },
  {
    agentId: 'candidate-sourcer',
    agentName: 'Candidate Sourcer',
    requiredTools: ['linkedin', 'gmail', 'google_sheets', 'notion'],
    description: 'Sources candidates and manages recruitment pipeline',
  },
  {
    agentId: 'support-ticket-agent',
    agentName: 'Support Ticket Agent',
    requiredTools: ['slack', 'jira', 'gmail', 'notion'],
    description: 'Handles support tickets and escalates when needed',
  },
  {
    agentId: 'content-repurposer',
    agentName: 'Content Repurposer',
    requiredTools: ['notion', 'twitter', 'linkedin', 'gmail'],
    description: 'Repurposes blog content into social posts, emails, and more',
  },
  {
    agentId: 'analytics-reporter',
    agentName: 'Analytics Reporter',
    requiredTools: ['google_sheets', 'gmail', 'slack', 'notion'],
    description: 'Generates weekly reports and shares with team',
  },
];

// Connection status for each tool
export interface ToolConnection {
  appId: string;
  appName: string;
  icon: string;
  category: string;
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  connectedAt?: string;
  lastUsed?: string;
  actions: string[];
}

// Composio API configuration
export const COMPOSIO_CONFIG = {
  API_KEY_STORAGE: 'hiresaathi_composio_api_key',
  AUTH_REDIRECT_URL: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : '',
  DEFAULT_ENTITY: 'default',
};

/**
 * Get stored API key
 */
export function getComposioApiKey(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(COMPOSIO_CONFIG.API_KEY_STORAGE);
}

/**
 * Store API key
 */
export function setComposioApiKey(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(COMPOSIO_CONFIG.API_KEY_STORAGE, key);
}

/**
 * Remove API key
 */
export function removeComposioApiKey(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(COMPOSIO_CONFIG.API_KEY_STORAGE);
}

/**
 * Simulate connecting a tool via Composio
 * In production, this would redirect to Composio's auth flow
 */
export async function connectTool(appId: string): Promise<{ success: boolean; connectionId: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const connectionId = `conn_${appId}_${Date.now()}`;
      resolve({ success: true, connectionId });
    }, 1500);
  });
}

/**
 * Simulate executing a tool action
 * In production, this calls Composio's API
 */
export async function executeToolAction(
  connectionId: string,
  action: string,
  params: Record<string, unknown>
): Promise<{ success: boolean; data: unknown }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          action,
          params,
          executedAt: new Date().toISOString(),
          result: `Action "${action}" executed successfully via Composio`,
        },
      });
    }, 800);
  });
}

/**
 * Get available actions for a connected tool
 */
export function getToolActions(appId: string): string[] {
  const app = ALL_APPS.find(a => a.id === appId);
  return app?.actions || [];
}

/**
 * Check which tools an agent needs
 */
export function getAgentRequiredTools(agentId: string): string[] {
  const config = AGENT_TOOL_CONFIGS.find(c => c.agentId === agentId);
  return config?.requiredTools || [];
}

/**
 * Check if an agent has all required tools connected
 */
export function isAgentReady(agentId: string, connectedTools: string[]): boolean {
  const required = getAgentRequiredTools(agentId);
  return required.every(tool => connectedTools.includes(tool));
}
