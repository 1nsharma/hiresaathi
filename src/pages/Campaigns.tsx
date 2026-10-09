import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Megaphone, Plus, Search, Filter, Calendar,
  TrendingUp, Eye, Edit3, Copy, Trash2, MoreHorizontal,
  BarChart3, Target, Users, Zap, CheckCircle2, Clock
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } }
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 }
};

const campaigns = [
  {
    name: 'Q1 Product Launch',
    status: 'active',
    channel: 'Multi-channel',
    startDate: 'Jan 15, 2026',
    endDate: 'Feb 28, 2026',
    budget: '₹2,50,000',
    spent: '₹1,42,300',
    reach: '45.2K',
    conversions: 342,
    roi: '+127%',
    progress: 57,
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Hiring Season 2026',
    status: 'active',
    channel: 'LinkedIn + Email',
    startDate: 'Jan 1, 2026',
    endDate: 'Mar 31, 2026',
    budget: '₹5,00,000',
    spent: '₹2,15,000',
    reach: '128K',
    conversions: 891,
    roi: '+245%',
    progress: 43,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Brand Awareness - Delhi NCR',
    status: 'scheduled',
    channel: 'Instagram + Google Ads',
    startDate: 'Feb 1, 2026',
    endDate: 'Feb 28, 2026',
    budget: '₹1,80,000',
    spent: '₹0',
    reach: '—',
    conversions: '—',
    roi: '—',
    progress: 0,
    color: 'from-amber-500 to-orange-500',
  },
  {
    name: 'Year-End Newsletter Series',
    status: 'completed',
    channel: 'Email',
    startDate: 'Dec 1, 2025',
    endDate: 'Dec 31, 2025',
    budget: '₹50,000',
    spent: '₹42,800',
    reach: '12.4K',
    conversions: 156,
    roi: '+89%',
    progress: 100,
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Startup Founder Outreach',
    status: 'active',
    channel: 'LinkedIn + Cold Email',
    startDate: 'Jan 5, 2026',
    endDate: 'Jan 31, 2026',
    budget: '₹75,000',
    spent: '₹58,200',
    reach: '8.9K',
    conversions: 67,
    roi: '+56%',
    progress: 78,
    color: 'from-rose-500 to-red-500',
  },
  {
    name: 'Developer Conference Promo',
    status: 'draft',
    channel: 'Twitter + Blog',
    startDate: 'Mar 1, 2026',
    endDate: 'Mar 15, 2026',
    budget: '₹1,20,000',
    spent: '₹0',
    reach: '—',
    conversions: '—',
    roi: '—',
    progress: 0,
    color: 'from-indigo-500 to-violet-500',
  },
];

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: 'bg-success/10', text: 'text-success', label: 'Active' },
  scheduled: { bg: 'bg-primary/15', text: 'text-primary-light', label: 'Scheduled' },
  completed: { bg: 'bg-accent/10', text: 'text-accent', label: 'Completed' },
  draft: { bg: 'bg-surface-lighter', text: 'text-text-muted', label: 'Draft' },
};

export default function Campaigns() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = campaigns.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = filter === 'all' || c.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-6">
        <motion.div variants={item} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Campaigns</h1>
              <p className="text-sm text-text-secondary">Plan, launch & track marketing campaigns</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white text-sm font-medium hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            New Campaign
          </button>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Active Campaigns', value: '3', icon: Zap, color: 'text-amber-400' },
          { label: 'Total Reach', value: '194.5K', icon: Users, color: 'text-blue-400' },
          { label: 'Conversions', value: '1,456', icon: Target, color: 'text-green-400' },
          { label: 'Avg. ROI', value: '+143%', icon: TrendingUp, color: 'text-purple-400' },
        ].map((stat) => (
          <motion.div key={stat.label} variants={item} className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-xs text-text-muted">{stat.label}</span>
            </div>
            <p className="text-xl font-bold text-text-primary">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex items-center gap-3 mb-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campaigns..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-light border border-border text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50"
          />
        </div>
        <div className="flex items-center gap-1">
          {['all', 'active', 'scheduled', 'completed', 'draft'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                filter === f ? 'bg-primary/15 text-primary-light' : 'text-text-muted hover:text-text-primary hover:bg-surface-lighter'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Campaign Cards */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((campaign) => {
          const status = statusConfig[campaign.status];
          return (
            <motion.div
              key={campaign.name}
              variants={item}
              whileHover={{ scale: 1.01, y: -2 }}
              className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${campaign.color} flex items-center justify-center`}>
                    <Megaphone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary text-sm">{campaign.name}</h4>
                    <p className="text-xs text-text-muted">{campaign.channel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${status.bg} ${status.text}`}>
                    {status.label}
                  </span>
                  <button className="p-1 rounded hover:bg-surface-lighter text-text-muted opacity-0 group-hover:opacity-100 transition-all">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-text-muted">Progress</span>
                  <span className="text-[10px] text-text-muted">{campaign.progress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-lighter overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${campaign.progress}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${campaign.color}`}
                  />
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                <div>
                  <p className="text-[10px] text-text-muted">Budget</p>
                  <p className="text-xs font-medium text-text-primary">{campaign.budget}</p>
                </div>
                <div>
                  <p className="text-[10px] text-text-muted">Spent</p>
                  <p className="text-xs font-medium text-text-primary">{campaign.spent}</p>
                </div>
                <div>
                  <p className="text-[10px] text-text-muted">Reach</p>
                  <p className="text-xs font-medium text-text-primary">{campaign.reach}</p>
                </div>
                <div>
                  <p className="text-[10px] text-text-muted">ROI</p>
                  <p className="text-xs font-medium text-success">{campaign.roi}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="flex items-center gap-2 pt-3 border-t border-border/50 text-[10px] text-text-muted">
                <Calendar className="w-3 h-3" />
                <span>{campaign.startDate} → {campaign.endDate}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
