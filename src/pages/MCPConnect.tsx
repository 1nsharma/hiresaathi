import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plug, Search, Plus, CheckCircle2, AlertCircle,
  Globe, Database, Code2, Shield, Zap, ExternalLink,
  Settings, Trash2, RefreshCw, Lock, Unlock
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } }
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 }
};

const connectedServers = [
  { name: 'GitHub', desc: 'Repository management, issues, PRs', status: 'connected', tools: 24, icon: '🐙', category: 'Development' },
  { name: 'PostgreSQL', desc: 'Database queries and schema management', status: 'connected', tools: 8, icon: '🐘', category: 'Database' },
  { name: 'Google Workspace', desc: 'Gmail, Calendar, Drive integration', status: 'connected', tools: 12, icon: '📧', category: 'Productivity' },
  { name: 'Slack', desc: 'Messages, channels, and notifications', status: 'connected', tools: 15, icon: '💬', category: 'Communication' },
];

const availableServers = [
  { name: 'Notion', desc: 'Pages, databases, and wikis', tools: 18, icon: '📝', category: 'Productivity', verified: true },
  { name: 'Jira', desc: 'Project management and issue tracking', tools: 22, icon: '🎯', category: 'Development', verified: true },
  { name: 'Figma', desc: 'Design files and components', tools: 10, icon: '🎨', category: 'Design', verified: true },
  { name: 'Linear', desc: 'Issue tracking and roadmaps', tools: 16, icon: '📐', category: 'Development', verified: true },
  { name: 'Airtable', desc: 'Spreadsheets and databases', tools: 14, icon: '📊', category: 'Database', verified: false },
  { name: 'Stripe', desc: 'Payments and billing management', tools: 20, icon: '💳', category: 'Finance', verified: true },
  { name: 'SendGrid', desc: 'Email sending and templates', tools: 8, icon: '✉️', category: 'Communication', verified: true },
  { name: 'Twilio', desc: 'SMS, voice, and WhatsApp messaging', tools: 12, icon: '📱', category: 'Communication', verified: true },
  { name: 'AWS S3', desc: 'Object storage and file management', tools: 6, icon: '☁️', category: 'Infrastructure', verified: true },
  { name: 'MongoDB', desc: 'NoSQL database operations', tools: 10, icon: '🍃', category: 'Database', verified: false },
  { name: 'HubSpot CRM', desc: 'Contacts, deals, and pipelines', tools: 28, icon: '🧲', category: 'Sales', verified: true },
  { name: 'Salesforce', desc: 'Enterprise CRM and automation', tools: 32, icon: '☁️', category: 'Sales', verified: true },
];

const categories = ['All', 'Development', 'Database', 'Productivity', 'Communication', 'Design', 'Finance', 'Infrastructure', 'Sales'];

export default function MCPConnect() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredServers = availableServers.filter(s =>
    (activeCategory === 'All' || s.category === activeCategory) &&
    (s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     s.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-6">
        <motion.div variants={item} className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
            <Plug className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">MCP Connect</h1>
            <p className="text-sm text-text-secondary">Model Context Protocol — Tools & Integrations</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Connected Servers */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h3 className="text-sm font-semibold text-text-primary mb-3">Connected Servers ({connectedServers.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {connectedServers.map((server) => (
            <motion.div
              key={server.name}
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-xl p-4 border-success/20 hover:border-success/40 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{server.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-text-primary">{server.name}</h4>
                    <CheckCircle2 className="w-3 h-3 text-success" />
                  </div>
                  <p className="text-[10px] text-text-muted">{server.category}</p>
                </div>
              </div>
              <p className="text-xs text-text-muted mb-3 line-clamp-1">{server.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-success">{server.tools} tools active</span>
                <div className="flex items-center gap-1">
                  <button className="p-1 rounded hover:bg-surface-lighter text-text-muted hover:text-text-primary transition-colors">
                    <RefreshCw className="w-3 h-3" />
                  </button>
                  <button className="p-1 rounded hover:bg-surface-lighter text-text-muted hover:text-text-primary transition-colors">
                    <Settings className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Available Servers */}
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={item} className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-text-primary">Available MCP Servers</h3>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-primary-light bg-primary/10 hover:bg-primary/20 transition-colors">
            <Plus className="w-3.5 h-3.5" />
            Add Custom Server
          </button>
        </motion.div>

        {/* Search & Filter */}
        <motion.div variants={item} className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search MCP servers..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-light border border-border text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div variants={item} className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-primary/15 text-primary-light'
                  : 'text-text-muted hover:text-text-primary hover:bg-surface-lighter'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Server Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredServers.map((server) => (
            <motion.div
              key={server.name}
              variants={item}
              whileHover={{ scale: 1.01, y: -1 }}
              className="glass-card rounded-xl p-4 hover:border-primary/30 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{server.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-sm font-medium text-text-primary">{server.name}</h4>
                    {server.verified && (
                      <Shield className="w-3 h-3 text-success" />
                    )}
                  </div>
                  <p className="text-xs text-text-muted mb-2">{server.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-lighter text-text-muted">
                      {server.tools} tools
                    </span>
                    <button className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary-light hover:bg-primary/20 transition-colors opacity-0 group-hover:opacity-100">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
