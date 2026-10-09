import { motion } from 'framer-motion';
import {
  FileText, Terminal, Copy, CheckCircle2, BookOpen,
  Download, ExternalLink, Code2, Database, Shield,
  Zap, Globe, Settings, AlertCircle
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};
const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
};

const setupSteps = [
  { step: '1', title: 'Extract ZIP', desc: 'Downloaded file ko extract karein', code: 'unzip hiresaathi-ai.zip' },
  { step: '2', title: 'Open Terminal', desc: 'Project folder mein terminal kholein', code: 'cd hiresaathi-ai' },
  { step: '3', title: 'Install Dependencies', desc: 'Required packages install karein', code: 'npm install' },
  { step: '4', title: 'Run Development Server', desc: 'Local server start karein', code: 'npm run dev' },
  { step: '5', title: 'Open Browser', desc: 'Vite ka diya hua address kholein', code: 'http://localhost:5173' },
];

const techStack = [
  { name: 'React 18', desc: 'UI Framework', icon: Code2, color: 'text-blue-400' },
  { name: 'TypeScript', desc: 'Type Safety', icon: Code2, color: 'text-blue-500' },
  { name: 'Tailwind CSS', desc: 'Styling', icon: Code2, color: 'text-cyan-400' },
  { name: 'Framer Motion', desc: 'Animations', icon: Zap, color: 'text-purple-400' },
  { name: 'Lucide React', desc: 'Icons', icon: Code2, color: 'text-green-400' },
  { name: 'Vite', desc: 'Build Tool', icon: Zap, color: 'text-amber-400' },
];

const modules = [
  { name: 'Dashboard', desc: 'Unified workspace overview', status: 'complete' },
  { name: 'AI Marketing', desc: '125+ agent configurations', status: 'complete' },
  { name: 'Brand IQ', desc: 'AI brand intelligence', status: 'complete' },
  { name: 'Content Studio', desc: 'Unified content editor', status: 'complete' },
  { name: 'Calendar', desc: 'Content scheduling', status: 'complete' },
  { name: 'Campaigns', desc: 'Campaign management', status: 'complete' },
  { name: 'Approvals', desc: 'Content review workflow', status: 'complete' },
  { name: 'Asset Library', desc: 'Media & document storage', status: 'complete' },
  { name: 'Analytics', desc: 'Performance tracking', status: 'complete' },
  { name: 'AI Recruit', desc: 'Hiring platform', status: 'complete' },
  { name: 'AI Support', desc: 'Chatbots & tickets', status: 'complete' },
  { name: 'Automation', desc: 'Workflow engine', status: 'complete' },
  { name: 'AI Builder', desc: 'App builder', status: 'complete' },
  { name: 'MCP Connect', desc: 'Tool integrations', status: 'complete' },
  { name: 'Architecture', desc: 'System design docs', status: 'complete' },
  { name: 'Settings', desc: 'Workspace configuration', status: 'complete' },
];

export default function Docs() {
  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-8">
        <motion.div variants={item} className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-gray-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Documentation & Setup</h1>
            <p className="text-sm text-text-secondary">Master system specification & getting started</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Start */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-xl p-6 mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="w-5 h-5 text-primary-light" />
          <h2 className="text-lg font-semibold text-text-primary">Quick Start Guide</h2>
        </div>
        <div className="space-y-3">
          {setupSteps.map((step) => (
            <div key={step.step} className="flex items-start gap-3 p-3 rounded-lg bg-surface/50">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary-light flex-shrink-0">
                {step.step}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-text-primary mb-0.5">{step.title}</h4>
                <p className="text-xs text-text-muted mb-2">{step.desc}</p>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-lighter font-mono text-xs text-primary-light">
                  <code className="flex-1">{step.code}</code>
                  <button className="p-1 rounded hover:bg-surface text-text-muted hover:text-text-primary transition-colors">
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-card rounded-xl p-6 mb-6"
      >
        <h2 className="text-lg font-semibold text-text-primary mb-4">Technology Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {techStack.map((tech) => (
            <div key={tech.name} className="text-center p-3 rounded-lg bg-surface/50">
              <tech.icon className={`w-6 h-6 mx-auto mb-2 ${tech.color}`} />
              <p className="text-xs font-medium text-text-primary">{tech.name}</p>
              <p className="text-[10px] text-text-muted">{tech.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Modules Status */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Module Status</h2>
          <span className="text-xs text-success flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {modules.filter(m => m.status === 'complete').length}/{modules.length} Complete
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {modules.map((mod) => (
            <div key={mod.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-surface/50">
              <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">{mod.name}</p>
                <p className="text-xs text-text-muted">{mod.desc}</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/10 text-success">
                {mod.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Important Notes */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass-card rounded-xl p-6 border-warning/20"
      >
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-5 h-5 text-warning" />
          <h2 className="text-lg font-semibold text-text-primary">Important Notes</h2>
        </div>
        <div className="space-y-2 text-sm text-text-secondary">
          <p>✓ Yeh complete frontend source code hai with all modules implemented</p>
          <p>✓ Dark theme responsive UI with smooth animations</p>
          <p>✓ All 16 modules fully functional with mock data</p>
          <p className="text-warning">⚠ Production-ready complete SaaS nahi hai</p>
          <p className="text-warning">⚠ Live AI model calls abhi connect karne hain</p>
          <p className="text-warning">⚠ Backend APIs, database persistence, authentication pending</p>
          <p className="text-warning">⚠ Real social publishing integrations pending</p>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-xl p-6 mt-6"
      >
        <h2 className="text-lg font-semibold text-text-primary mb-4">Next Steps for Production</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { title: 'Backend API Development', desc: 'Node.js/Python backend with authentication', icon: Database },
            { title: 'AI Model Integration', desc: 'Connect OpenAI, Anthropic, or local models', icon: Zap },
            { title: 'Database Setup', desc: 'PostgreSQL with migrations & seed data', icon: Database },
            { title: 'Authentication', desc: 'JWT/OAuth with role-based access control', icon: Shield },
            { title: 'Social Publishing', desc: 'LinkedIn, Instagram, Twitter API integration', icon: Globe },
            { title: 'Deployment', desc: 'Docker, Kubernetes, CI/CD pipeline', icon: Settings },
          ].map((step) => (
            <div key={step.title} className="flex items-start gap-3 p-3 rounded-lg bg-surface/50">
              <step.icon className="w-5 h-5 text-primary-light flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-text-primary">{step.title}</h4>
                <p className="text-xs text-text-muted">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
