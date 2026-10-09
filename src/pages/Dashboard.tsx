import { motion } from 'framer-motion';
import {
  Megaphone, UserCheck, Bot, Zap, Code2, BarChart3,
  TrendingUp, Users, FileText, MessageSquare, ArrowRight,
  Sparkles, Globe, Target, Clock
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } }
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const modules = [
  { id: 'recruit', title: 'AI Recruit', desc: 'Jobs, CVs, assessments', icon: UserCheck, color: 'from-blue-500 to-cyan-500', count: '24 Jobs', trend: '+12%' },
  { id: 'marketing', title: 'AI Marketing', desc: 'Agents, content, campaigns', icon: Megaphone, color: 'from-purple-500 to-pink-500', count: '125+ Agents', trend: '+34%' },
  { id: 'support', title: 'AI Support', desc: 'Chatbots, tickets, handoff', icon: MessageSquare, color: 'from-green-500 to-emerald-500', count: '1.2K Tickets', trend: '+8%' },
  { id: 'automate', title: 'AI Automate', desc: 'Workflows, reports, follow-ups', icon: Zap, color: 'from-amber-500 to-orange-500', count: '48 Flows', trend: '+22%' },
  { id: 'builder', title: 'AI Builder', desc: 'Apps, tools, prototypes', icon: Code2, color: 'from-rose-500 to-red-500', count: '7 Apps', trend: '+5%' },
  { id: 'intelligence', title: 'AI Intelligence', desc: 'Models, knowledge, analytics', icon: BarChart3, color: 'from-indigo-500 to-violet-500', count: '12 Models', trend: '+18%' },
];

const stats = [
  { label: 'Active Users', value: '2,847', change: '+14%', icon: Users },
  { label: 'Content Generated', value: '18,420', change: '+32%', icon: FileText },
  { label: 'Candidates Matched', value: '3,291', change: '+21%', icon: Target },
  { label: 'Avg. Response Time', value: '1.2s', change: '-18%', icon: Clock },
];

const recentActivity = [
  { action: 'Blog post generated', module: 'Marketing', time: '2 min ago', status: 'success' },
  { action: 'New candidate matched', module: 'Recruit', time: '5 min ago', status: 'success' },
  { action: 'Email campaign scheduled', module: 'Marketing', time: '12 min ago', status: 'pending' },
  { action: 'Support ticket resolved', module: 'Support', time: '18 min ago', status: 'success' },
  { action: 'Workflow completed', module: 'Automate', time: '25 min ago', status: 'success' },
  { action: 'App deployed to staging', module: 'Builder', time: '32 min ago', status: 'pending' },
];

export default function Dashboard() {
  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-8">
        <motion.div variants={item} className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Welcome back, Amey</h1>
            <p className="text-sm text-text-secondary">HireSaathi AI Platform — Unified Workspace</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={item}
            className="glass-card rounded-xl p-4 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="w-5 h-5 text-text-muted" />
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                stat.change.startsWith('+') ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
            <p className="text-xs text-text-muted mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Platform Modules */}
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={item} className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Platform Modules</h2>
          <span className="text-xs text-text-muted">6 active modules</span>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {modules.map((mod) => (
            <motion.div
              key={mod.id}
              variants={item}
              whileHover={{ scale: 1.02, y: -2 }}
              className="glass-card rounded-xl p-5 cursor-pointer group hover:border-primary/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${mod.color} flex items-center justify-center`}>
                  <mod.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center gap-1 text-xs text-success">
                  <TrendingUp className="w-3 h-3" />
                  {mod.trend}
                </div>
              </div>
              <h3 className="font-semibold text-text-primary mb-1">{mod.title}</h3>
              <p className="text-xs text-text-muted mb-3">{mod.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-text-secondary">{mod.count}</span>
                <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary-light transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-card rounded-xl p-5"
        >
          <h3 className="font-semibold text-text-primary mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-lighter/50 transition-colors"
              >
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-success' : 'bg-warning'
                }`} />
                <span className="text-sm text-text-primary flex-1">{activity.action}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-surface-lighter text-text-muted">
                  {activity.module}
                </span>
                <span className="text-xs text-text-muted">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-5"
        >
          <h3 className="font-semibold text-text-primary mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { label: 'Create Blog Post', icon: FileText, color: 'text-purple-400' },
              { label: 'Post New Job', icon: UserCheck, color: 'text-blue-400' },
              { label: 'Launch Campaign', icon: Megaphone, color: 'text-pink-400' },
              { label: 'Build Workflow', icon: Zap, color: 'text-amber-400' },
              { label: 'Connect MCP Tool', icon: Globe, color: 'text-cyan-400' },
            ].map((action) => (
              <button
                key={action.label}
                className="flex items-center gap-3 w-full p-2.5 rounded-lg text-sm text-text-secondary hover:bg-surface-lighter hover:text-text-primary transition-all group"
              >
                <action.icon className={`w-4 h-4 ${action.color}`} />
                <span className="flex-1 text-left">{action.label}</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Prompt Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 glass-card rounded-xl p-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Ask AI, connect tools, create agents or automate your business..."
              className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
            />
          </div>
          <button className="px-4 py-1.5 rounded-lg bg-primary/20 text-primary-light text-sm font-medium hover:bg-primary/30 transition-colors">
            Send
          </button>
        </div>
      </motion.div>
    </div>
  );
}
