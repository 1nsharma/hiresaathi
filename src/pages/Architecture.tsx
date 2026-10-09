import { motion } from 'framer-motion';
import {
  Network, Server, Database, Shield, Globe, Cpu,
  Layers, GitBranch, Box, Container, Cloud, Lock,
  ArrowRight, CheckCircle2, Circle
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};
const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
};

const repoStructure = [
  { name: 'apps/', desc: 'User-facing applications', icon: Globe, items: ['web/ — Main SaaS dashboard', 'admin/ — Internal admin console', 'developer-portal/ — APIs, SDKs, docs', 'docs-site/ — Public documentation'] },
  { name: 'services/', desc: 'Backend services and workers', icon: Server, items: ['api-gateway/ — API entry point', 'identity/ — Auth, users, workspaces', 'ai-gateway/ — Model routing', 'agent-runtime/ — Agent execution', 'mcp-gateway/ — MCP discovery', 'workflow-engine/ — Automation', 'recruit-service/ — AI hiring', 'billing-service/ — Plans, payments'] },
  { name: 'packages/', desc: 'Shared code and SDKs', icon: Box, items: ['ui/ — Shared design system', 'auth-sdk/', 'api-client/', 'agent-sdk/', 'mcp-sdk/', 'shared-types/', 'observability-sdk/'] },
  { name: 'integrations/', desc: 'AI providers & MCP servers', icon: GitBranch, items: ['model-providers/ — OpenAI, Anthropic', 'mcp/ — GitHub, Postgres', 'business/ — Email, WhatsApp, CRM'] },
  { name: 'infra/', desc: 'Cloud & deployment', icon: Cloud, items: ['docker/', 'kubernetes/', 'terraform/', 'environments/ — dev, staging, prod'] },
  { name: 'security/', desc: 'Policies & threat models', icon: Shield, items: ['threat-models/', 'authorization-policies/', 'sandbox/', 'security-tests/'] },
];

const stages = [
  {
    stage: 'Stage 1', title: 'MVP', desc: 'Modular monolith — one deployable backend, one database, clearly separated modules',
    color: 'from-blue-500 to-cyan-500', items: ['Working dashboard (apps/web)', 'Authentication & backend APIs', 'Shared type contracts', 'Database schema & migrations', 'CI/CD with automated tests']
  },
  {
    stage: 'Stage 2', title: 'Growth', desc: 'Workers and independent workloads — background processing, queues, caching',
    color: 'from-purple-500 to-pink-500', items: ['Resume parsing workers', 'AI inference queue', 'Scheduled automations', 'Caching layer (Redis)', 'Enhanced observability']
  },
  {
    stage: 'Stage 3', title: 'Scale', desc: 'Selective microservices — split when independent scaling is needed',
    color: 'from-amber-500 to-orange-500', items: ['AI Gateway as separate service', 'Agent Runtime independent deploy', 'Recruitment service isolation', 'Team ownership boundaries', 'Service mesh introduction']
  },
  {
    stage: 'Stage 4', title: 'Enterprise', desc: 'Multi-region platform with ecosystem — tenant isolation, SDKs, marketplace',
    color: 'from-green-500 to-emerald-500', items: ['Multi-region deployment', 'Tenant isolation & data controls', 'Developer SDKs & marketplace', 'Enterprise auditability', 'Advanced disaster recovery']
  },
];

export default function Architecture() {
  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-8">
        <motion.div variants={item} className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
            <Network className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Enterprise Architecture</h1>
            <p className="text-sm text-text-secondary">Modular monorepo → independently deployable services</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Repository Structure */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-8">
        <motion.h2 variants={item} className="text-lg font-semibold text-text-primary mb-4">
          Repository Structure
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repoStructure.map((section) => (
            <motion.div
              key={section.name}
              variants={item}
              className="glass-card rounded-xl p-4 hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <section.icon className="w-4 h-4 text-primary-light" />
                <code className="text-sm font-mono font-bold text-primary-light">{section.name}</code>
              </div>
              <p className="text-xs text-text-muted mb-3">{section.desc}</p>
              <div className="space-y-1.5">
                {section.items.map((i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Circle className="w-1.5 h-1.5 mt-1.5 text-text-muted flex-shrink-0 fill-current" />
                    <span className="text-xs text-text-secondary">{i}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Growth Stages */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-8">
        <motion.h2 variants={item} className="text-lg font-semibold text-text-primary mb-4">
          Growth Evolution
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((stage) => (
            <motion.div
              key={stage.stage}
              variants={item}
              className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stage.color}`} />
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r ${stage.color} text-white`}>
                  {stage.stage}
                </span>
              </div>
              <h3 className="font-semibold text-text-primary mb-1">{stage.title}</h3>
              <p className="text-xs text-text-muted mb-4">{stage.desc}</p>
              <div className="space-y-2">
                {stage.items.map((i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 mt-0.5 text-success flex-shrink-0" />
                    <span className="text-xs text-text-secondary">{i}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Service Internal Structure */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-xl p-6"
      >
        <h3 className="font-semibold text-text-primary mb-4">Service Internal Structure</h3>
        <p className="text-sm text-text-muted mb-4">
          Example: <code className="text-primary-light">services/recruit-service/</code>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="font-mono text-xs space-y-1 bg-surface/50 rounded-lg p-4">
            <p className="text-primary-light font-bold">recruit-service/</p>
            <p className="text-text-secondary pl-4">├── src/recruit/</p>
            <p className="text-text-muted pl-8">│   ├── api/routes/</p>
            <p className="text-text-muted pl-12">│   │   ├── jobs.py</p>
            <p className="text-text-muted pl-12">│   │   ├── candidates.py</p>
            <p className="text-text-muted pl-12">│   │   └── assessments.py</p>
            <p className="text-text-muted pl-8">│   ├── domain/</p>
            <p className="text-text-muted pl-12">│   │   ├── models.py</p>
            <p className="text-text-muted pl-12">│   │   ├── matching.py</p>
            <p className="text-text-muted pl-12">│   │   └── policies.py</p>
            <p className="text-text-muted pl-8">│   ├── application/</p>
            <p className="text-text-muted pl-12">│   │   ├── create_job.py</p>
            <p className="text-text-muted pl-12">│   │   ├── parse_resume.py</p>
            <p className="text-text-muted pl-12">│   │   └── rank_candidates.py</p>
            <p className="text-text-muted pl-8">│   ├── infrastructure/</p>
            <p className="text-text-muted pl-12">│   │   ├── database.py</p>
            <p className="text-text-muted pl-12">│   │   ├── resume_parser.py</p>
            <p className="text-text-muted pl-12">│   │   └── model_client.py</p>
            <p className="text-text-muted pl-8">│   └── main.py</p>
            <p className="text-text-secondary pl-4">├── tests/</p>
            <p className="text-text-secondary pl-4">├── Dockerfile</p>
            <p className="text-text-secondary pl-4">├── pyproject.toml</p>
            <p className="text-text-secondary pl-4">└── README.md</p>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-surface/50 border border-border">
              <h4 className="text-sm font-medium text-text-primary mb-1">api/</h4>
              <p className="text-xs text-text-muted">HTTP routes and request handling. No business logic here.</p>
            </div>
            <div className="p-3 rounded-lg bg-surface/50 border border-border">
              <h4 className="text-sm font-medium text-text-primary mb-1">domain/</h4>
              <p className="text-xs text-text-muted">Core business logic. Independent of AI providers and databases.</p>
            </div>
            <div className="p-3 rounded-lg bg-surface/50 border border-border">
              <h4 className="text-sm font-medium text-text-primary mb-1">application/</h4>
              <p className="text-xs text-text-muted">Use cases that orchestrate domain logic. Testable in isolation.</p>
            </div>
            <div className="p-3 rounded-lg bg-surface/50 border border-border">
              <h4 className="text-sm font-medium text-text-primary mb-1">infrastructure/</h4>
              <p className="text-xs text-text-muted">External dependencies: databases, AI models, file storage.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
