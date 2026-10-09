import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, PenTool, Share2, Mail, Megaphone, FileText,
  Image, Video, BarChart3, ArrowRight, Sparkles, Filter,
  Star, TrendingUp, Clock, CheckCircle2, Zap, AlertCircle
} from 'lucide-react';
import { AGENT_TOOL_CONFIGS } from '../lib/composio';
import { useToolStore } from '../lib/toolStore';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } }
};
const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
};

const categories = [
  { name: 'All Agents', count: 125, icon: Sparkles, active: true },
  { name: 'Content Marketing', count: 12, icon: PenTool, active: false },
  { name: 'Social Media', count: 12, icon: Share2, active: false },
  { name: 'Lifecycle & Email', count: 12, icon: Mail, active: false },
  { name: 'Product Marketing', count: 8, icon: Megaphone, active: false },
  { name: 'PR & Communications', count: 6, icon: FileText, active: false },
  { name: 'SEO & Search', count: 8, icon: BarChart3, active: false },
  { name: 'Ads & Sales', count: 8, icon: TrendingUp, active: false },
  { name: 'Creative & Multimedia', count: 6, icon: Image, active: false },
];

const agents = [
  { name: 'SEO Blog Writer', agentId: 'seo-blog-writer', category: 'Content Marketing', desc: 'Generate SEO-optimized long-form blog posts with keywords, meta tags and social snippets', rating: 4.9, uses: '12.4K', color: 'from-purple-500 to-pink-500' },
  { name: 'Social Media Manager', agentId: 'social-media-manager', category: 'Social Media', desc: 'Craft engaging LinkedIn posts with hooks, storytelling and professional tone', rating: 4.8, uses: '9.2K', color: 'from-blue-500 to-cyan-500' },
  { name: 'Email Campaign Agent', agentId: 'email-campaign-agent', category: 'Lifecycle & Email', desc: 'Generate high-converting email subject lines with A/B variants', rating: 4.7, uses: '8.1K', color: 'from-green-500 to-emerald-500' },
  { name: 'Lead Qualification Agent', agentId: 'lead-qualification-agent', category: 'Product Marketing', desc: 'Create comprehensive launch campaigns across all channels', rating: 4.9, uses: '5.6K', color: 'from-amber-500 to-orange-500' },
  { name: 'Press Release Writer', agentId: 'content-repurposer', category: 'PR & Communications', desc: 'Professional press releases following AP style with media-ready format', rating: 4.6, uses: '3.2K', color: 'from-rose-500 to-red-500' },
  { name: 'Analytics Reporter', agentId: 'analytics-reporter', category: 'SEO & Search', desc: 'Generate optimized meta titles and descriptions for any page type', rating: 4.8, uses: '7.8K', color: 'from-indigo-500 to-violet-500' },
  { name: 'Instagram Caption Writer', agentId: 'social-media-manager', category: 'Social Media', desc: 'Engaging captions with hashtags, emojis and call-to-actions', rating: 4.7, uses: '11.3K', color: 'from-pink-500 to-rose-500' },
  { name: 'Cold Email Sequence', agentId: 'email-campaign-agent', category: 'Lifecycle & Email', desc: 'Multi-step cold email sequences with personalization tokens', rating: 4.5, uses: '6.4K', color: 'from-teal-500 to-green-500' },
  { name: 'Google Search Ads', agentId: 'social-media-manager', category: 'Ads & Sales', desc: 'High-performing search ad copy with extensions and CTAs', rating: 4.6, uses: '4.9K', color: 'from-yellow-500 to-amber-500' },
  { name: 'Video Script Writer', agentId: 'content-repurposer', category: 'Creative & Multimedia', desc: 'YouTube, TikTok and Reels scripts with hooks and retention tactics', rating: 4.8, uses: '7.1K', color: 'from-red-500 to-pink-500' },
  { name: 'Candidate Sourcer', agentId: 'candidate-sourcer', category: 'Content Marketing', desc: 'Data-driven case studies with problem-solution-result framework', rating: 4.7, uses: '3.8K', color: 'from-cyan-500 to-blue-500' },
  { name: 'Support Ticket Agent', agentId: 'support-ticket-agent', category: 'Social Media', desc: 'Slide-by-slide carousel outlines for LinkedIn and Instagram', rating: 4.9, uses: '8.5K', color: 'from-violet-500 to-purple-500' },
];

export default function Marketing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Agents');
  const { isConnected } = useToolStore();

  const filteredAgents = agents.filter(a =>
    (activeCategory === 'All Agents' || a.category === activeCategory) &&
    (a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     a.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getAgentToolStatus = (agentId: string) => {
    const config = AGENT_TOOL_CONFIGS.find(c => c.agentId === agentId);
    if (!config) return { ready: false, total: 0, connected: 0 };
    const connected = config.requiredTools.filter(t => isConnected(t)).length;
    return { ready: connected === config.requiredTools.length, total: config.requiredTools.length, connected };
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-6">
        <motion.div variants={item} className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Megaphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">AI Marketing</h1>
            <p className="text-sm text-text-secondary">125+ task-specific agent configurations</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Pipeline Steps */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 mb-6 overflow-x-auto pb-2"
      >
        {[
          { step: 'Brand IQ', icon: Sparkles, status: 'active' },
          { step: 'Select Agent', icon: Star, status: 'active' },
          { step: 'Add Context', icon: FileText, status: 'current' },
          { step: 'Generate', icon: Sparkles, status: 'pending' },
          { step: 'Review', icon: CheckCircle2, status: 'pending' },
          { step: 'Publish', icon: Share2, status: 'pending' },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
              s.status === 'active' ? 'bg-success/10 text-success' :
              s.status === 'current' ? 'bg-primary/15 text-primary-light' :
              'bg-surface-lighter text-text-muted'
            }`}>
              <s.icon className="w-3 h-3" />
              {s.step}
            </div>
            {i < 5 && <ArrowRight className="w-3 h-3 text-text-muted flex-shrink-0" />}
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-4 h-fit"
        >
          <h3 className="font-semibold text-text-primary text-sm mb-3">Agent Categories</h3>
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm transition-all ${
                  activeCategory === cat.name
                    ? 'bg-primary/15 text-primary-light'
                    : 'text-text-secondary hover:bg-surface-lighter hover:text-text-primary'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                <span className="flex-1 text-left">{cat.name}</span>
                <span className="text-xs text-text-muted">{cat.count}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Agent Grid */}
        <div className="lg:col-span-3">
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search agents, templates, use cases..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-light border border-border text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-light border border-border text-sm text-text-secondary hover:text-text-primary transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </motion.div>

          {/* Agent Cards */}
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredAgents.map((agent) => (
              <motion.div
                key={agent.name}
                variants={item}
                whileHover={{ scale: 1.01, y: -1 }}
                className="glass-card rounded-xl p-4 cursor-pointer group hover:border-primary/30 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center flex-shrink-0`}>
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-text-primary text-sm truncate">{agent.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-warning">
                        <Star className="w-3 h-3 fill-current" />
                        {agent.rating}
                      </div>
                    </div>
                    <p className="text-xs text-text-muted mb-2 line-clamp-2">{agent.desc}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-lighter text-text-muted">
                        {agent.category}
                      </span>
                      <span className="text-[10px] text-text-muted flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {agent.uses} uses
                      </span>
                    </div>
                    {/* Tool Status */}
                    {(() => {
                      const status = getAgentToolStatus(agent.agentId);
                      return (
                        <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-border/30">
                          {status.ready ? (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/10 text-success flex items-center gap-1">
                              <Zap className="w-2.5 h-2.5" />
                              Ready · {status.connected}/{status.total} tools
                            </span>
                          ) : (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-warning/10 text-warning flex items-center gap-1">
                              <AlertCircle className="w-2.5 h-2.5" />
                              {status.connected}/{status.total} tools connected
                            </span>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredAgents.length === 0 && (
            <div className="text-center py-12 text-text-muted">
              <Search className="w-8 h-8 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No agents found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
