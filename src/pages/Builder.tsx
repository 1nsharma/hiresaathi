import { motion } from 'framer-motion';
import {
  Code2, Plus, Eye, Copy, ExternalLink, Settings,
  Layout, Database, Zap, Globe, Shield, Clock,
  ArrowRight, Star, Download, Play
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};
const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
};

const apps = [
  {
    name: 'Candidate Portal',
    desc: 'Self-service portal for applicants to track applications, upload documents, and schedule interviews',
    status: 'live',
    users: 1247,
    tech: ['React', 'Node.js', 'PostgreSQL'],
    icon: Globe,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Interview Scheduler',
    desc: 'AI-powered scheduling tool that matches interviewer availability with candidate preferences',
    status: 'live',
    users: 342,
    tech: ['React', 'Python', 'Redis'],
    icon: Clock,
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Salary Calculator',
    desc: 'Market benchmarking tool with AI predictions for compensation packages by role and location',
    status: 'beta',
    users: 89,
    tech: ['Next.js', 'ML Pipeline'],
    icon: Database,
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Resume Builder',
    desc: 'AI-assisted resume creation tool optimized for ATS systems and specific job requirements',
    status: 'live',
    users: 2891,
    tech: ['React', 'GPT-4', 'PDF Gen'],
    icon: Layout,
    color: 'from-amber-500 to-orange-500'
  },
  {
    name: 'Compliance Checker',
    desc: 'Automated compliance verification for job descriptions, hiring processes, and data handling',
    status: 'beta',
    users: 56,
    tech: ['Python', 'NLP', 'Rules Engine'],
    icon: Shield,
    color: 'from-rose-500 to-red-500'
  },
  {
    name: 'Onboarding Flow',
    desc: 'Customizable onboarding experience with document collection, training modules, and progress tracking',
    status: 'draft',
    users: 0,
    tech: ['React', 'Workflow Engine'],
    icon: Zap,
    color: 'from-indigo-500 to-violet-500'
  },
];

const templates = [
  { name: 'Job Board', desc: 'Public job listing with AI search', icon: Globe },
  { name: 'Internal Tools', desc: 'Admin dashboards & reporting', icon: Layout },
  { name: 'Client Portal', desc: 'White-labeled client experience', icon: Shield },
  { name: 'API Explorer', desc: 'Interactive API documentation', icon: Code2 },
];

export default function Builder() {
  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-6">
        <motion.div variants={item} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">AI Builder</h1>
              <p className="text-sm text-text-secondary">Build apps, tools & prototypes with AI</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white text-sm font-medium hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            New App
          </button>
        </motion.div>
      </motion.div>

      {/* Quick Templates */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <h3 className="text-sm font-semibold text-text-primary mb-3">Start from Template</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {templates.map((t) => (
            <motion.button
              key={t.name}
              whileHover={{ scale: 1.02, y: -2 }}
              className="glass-card rounded-xl p-4 text-left hover:border-primary/30 transition-all group"
            >
              <t.icon className="w-5 h-5 text-primary-light mb-2" />
              <h4 className="text-sm font-medium text-text-primary">{t.name}</h4>
              <p className="text-xs text-text-muted mt-1">{t.desc}</p>
              <ArrowRight className="w-3 h-3 text-text-muted mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Apps Grid */}
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={item} className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-text-primary">Your Apps</h3>
          <span className="text-xs text-text-muted">{apps.length} apps</span>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {apps.map((app) => (
            <motion.div
              key={app.name}
              variants={item}
              whileHover={{ scale: 1.01, y: -2 }}
              className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${app.color} flex items-center justify-center`}>
                  <app.icon className="w-5 h-5 text-white" />
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  app.status === 'live' ? 'bg-success/10 text-success' :
                  app.status === 'beta' ? 'bg-warning/10 text-warning' :
                  'bg-surface-lighter text-text-muted'
                }`}>
                  {app.status}
                </span>
              </div>
              <h4 className="font-medium text-text-primary text-sm mb-1">{app.name}</h4>
              <p className="text-xs text-text-muted mb-3 line-clamp-2">{app.desc}</p>
              <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                {app.tech.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-surface-lighter text-text-muted">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {app.users.toLocaleString()} users
                </span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 rounded hover:bg-surface-lighter text-text-muted hover:text-text-primary transition-colors">
                    <Play className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded hover:bg-surface-lighter text-text-muted hover:text-text-primary transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded hover:bg-surface-lighter text-text-muted hover:text-text-primary transition-colors">
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
