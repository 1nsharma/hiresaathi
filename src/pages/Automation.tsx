import { motion } from 'framer-motion';
import {
  Zap, Play, Pause, CheckCircle2, Clock, AlertCircle,
  ArrowRight, GitBranch, Webhook, Database, Mail,
  MessageSquare, FileText, BarChart3, Plus, Settings,
  Eye, Copy, Trash2
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};
const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
};

const workflows = [
  {
    name: 'New Lead → Welcome Sequence',
    trigger: 'Form submission',
    steps: 5,
    status: 'active',
    runs: 847,
    lastRun: '2 min ago',
    success: 96,
    nodes: ['Webhook', 'Parse Data', 'AI Enrichment', 'Send Email', 'Log CRM']
  },
  {
    name: 'Resume → AI Screening → Shortlist',
    trigger: 'File upload',
    steps: 7,
    status: 'active',
    runs: 2341,
    lastRun: '5 min ago',
    success: 98,
    nodes: ['Upload', 'Parse PDF', 'Extract Skills', 'AI Match', 'Score', 'Shortlist', 'Notify']
  },
  {
    name: 'Weekly Content Report',
    trigger: 'Schedule (Monday 9AM)',
    steps: 4,
    status: 'active',
    runs: 52,
    lastRun: '3 days ago',
    success: 100,
    nodes: ['Fetch Analytics', 'AI Summary', 'Generate PDF', 'Email Team']
  },
  {
    name: 'Candidate Follow-up Reminder',
    trigger: '7 days after interview',
    steps: 3,
    status: 'paused',
    runs: 189,
    lastRun: '1 day ago',
    success: 94,
    nodes: ['Check Status', 'Send Reminder', 'Update CRM']
  },
  {
    name: 'Social Post → Analytics → Report',
    trigger: 'Post published',
    steps: 4,
    status: 'active',
    runs: 312,
    lastRun: '1 hour ago',
    success: 91,
    nodes: ['Detect Publish', 'Wait 48h', 'Fetch Metrics', 'AI Report']
  },
  {
    name: 'Invoice → Payment Reconciliation',
    trigger: 'Payment received',
    steps: 6,
    status: 'error',
    runs: 156,
    lastRun: '6 hours ago',
    success: 87,
    nodes: ['Webhook', 'Validate', 'Match Invoice', 'Update Ledger', 'Notify', 'Archive']
  },
];

const stats = [
  { label: 'Active Workflows', value: '48', change: '+6', icon: Zap, color: 'text-amber-400' },
  { label: 'Total Runs (30d)', value: '12,847', change: '+23%', icon: Play, color: 'text-green-400' },
  { label: 'Success Rate', value: '95.2%', change: '+1.4%', icon: CheckCircle2, color: 'text-blue-400' },
  { label: 'Time Saved', value: '340 hrs', change: '+18%', icon: Clock, color: 'text-purple-400' },
];

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  active: { color: 'text-success', bg: 'bg-success/10', label: 'Active' },
  paused: { color: 'text-warning', bg: 'bg-warning/10', label: 'Paused' },
  error: { color: 'text-danger', bg: 'bg-danger/10', label: 'Error' },
};

export default function Automation() {
  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-6">
        <motion.div variants={item} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">AI Automation</h1>
              <p className="text-sm text-text-secondary">Workflows, scheduling & business automation</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white text-sm font-medium hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            New Workflow
          </button>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={item} className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-xs text-text-muted">{stat.label}</span>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold text-text-primary">{stat.value}</p>
              <span className="text-xs text-success mb-0.5">{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Workflow Cards */}
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
        {workflows.map((wf) => {
          const status = statusConfig[wf.status];
          return (
            <motion.div
              key={wf.name}
              variants={item}
              className="glass-card rounded-xl p-4 hover:border-primary/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                {/* Status indicator */}
                <div className={`w-2 h-10 rounded-full ${status.bg} flex items-center justify-center`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${status.color.replace('text-', 'bg-')}`} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-text-primary text-sm truncate">{wf.name}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Webhook className="w-3 h-3" />
                      {wf.trigger}
                    </span>
                    <span>{wf.steps} steps</span>
                    <span>{wf.runs.toLocaleString()} runs</span>
                    <span className="flex items-center gap-1 text-success">
                      {wf.success}% success
                    </span>
                  </div>
                </div>

                {/* Flow visualization */}
                <div className="hidden md:flex items-center gap-1">
                  {wf.nodes.slice(0, 4).map((node, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span className="text-[9px] px-2 py-1 rounded bg-surface-lighter text-text-muted whitespace-nowrap">
                        {node}
                      </span>
                      {i < 3 && <ArrowRight className="w-2.5 h-2.5 text-text-muted" />}
                    </div>
                  ))}
                  {wf.nodes.length > 4 && (
                    <span className="text-[9px] text-text-muted">+{wf.nodes.length - 4}</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 rounded hover:bg-surface-lighter text-text-muted hover:text-text-primary transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded hover:bg-surface-lighter text-text-muted hover:text-text-primary transition-colors">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded hover:bg-surface-lighter text-text-muted hover:text-text-primary transition-colors">
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Workflow Builder Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 glass-card rounded-xl p-6"
      >
        <h3 className="font-semibold text-text-primary mb-4">Workflow Builder</h3>
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {[
            { label: 'Trigger', icon: Webhook, color: 'border-amber-500 bg-amber-500/10' },
            { label: 'Condition', icon: GitBranch, color: 'border-blue-500 bg-blue-500/10' },
            { label: 'AI Action', icon: Zap, color: 'border-purple-500 bg-purple-500/10' },
            { label: 'Database', icon: Database, color: 'border-green-500 bg-green-500/10' },
            { label: 'Notification', icon: Mail, color: 'border-rose-500 bg-rose-500/10' },
            { label: 'Delay', icon: Clock, color: 'border-cyan-500 bg-cyan-500/10' },
            { label: 'Webhook Out', icon: Webhook, color: 'border-indigo-500 bg-indigo-500/10' },
          ].map((node, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${node.color} cursor-pointer hover:opacity-80 transition-opacity`}>
                <node.icon className="w-4 h-4 text-text-primary" />
                <span className="text-xs font-medium text-text-primary whitespace-nowrap">{node.label}</span>
              </div>
              {i < 6 && <ArrowRight className="w-3 h-3 text-text-muted flex-shrink-0" />}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
