import { motion } from 'framer-motion';
import {
  BarChart3, TrendingUp, TrendingDown, Users, Eye,
  MousePointer, DollarSign, Target, Calendar, ArrowUpRight,
  ArrowDownRight, Activity
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};
const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
};

const metrics = [
  { label: 'Total Reach', value: '194.5K', change: '+32%', trend: 'up', icon: Eye, color: 'text-blue-400' },
  { label: 'Engagement Rate', value: '4.8%', change: '+12%', trend: 'up', icon: MousePointer, color: 'text-green-400' },
  { label: 'Conversions', value: '1,456', change: '+28%', trend: 'up', icon: Target, color: 'text-purple-400' },
  { label: 'Revenue Impact', value: '₹12.4L', change: '+45%', trend: 'up', icon: DollarSign, color: 'text-amber-400' },
];

const topContent = [
  { title: 'SEO Blog: AI Hiring Trends 2026', channel: 'Website', views: '12.4K', engagement: '8.2%', conversions: 89 },
  { title: 'LinkedIn: Q1 Product Launch', channel: 'LinkedIn', views: '8.9K', engagement: '12.1%', conversions: 67 },
  { title: 'Email: Weekly Newsletter #42', channel: 'Email', views: '6.2K', engagement: '18.4%', conversions: 134 },
  { title: 'Instagram: Carousel Tips', channel: 'Instagram', views: '15.7K', engagement: '6.8%', conversions: 42 },
  { title: 'Google Ads: Q1 Campaign', channel: 'Google Ads', views: '24.1K', engagement: '3.2%', conversions: 156 },
];

const channelPerformance = [
  { channel: 'LinkedIn', posts: 24, reach: '45.2K', engagement: '8.4%', roi: '+127%', color: 'bg-blue-500' },
  { channel: 'Instagram', posts: 48, reach: '78.9K', engagement: '6.2%', roi: '+89%', color: 'bg-pink-500' },
  { channel: 'Email', posts: 12, reach: '24.1K', engagement: '15.8%', roi: '+245%', color: 'bg-green-500' },
  { channel: 'Google Ads', posts: 8, reach: '128K', engagement: '3.1%', roi: '+156%', color: 'bg-amber-500' },
  { channel: 'Twitter/X', posts: 36, reach: '32.4K', engagement: '4.7%', roi: '+34%', color: 'bg-cyan-500' },
];

const weeklyData = [
  { day: 'Mon', posts: 8, reach: 12400, engagement: 890 },
  { day: 'Tue', posts: 12, reach: 18900, engagement: 1240 },
  { day: 'Wed', posts: 6, reach: 9800, engagement: 670 },
  { day: 'Thu', posts: 15, reach: 24100, engagement: 1890 },
  { day: 'Fri', posts: 10, reach: 16700, engagement: 1120 },
  { day: 'Sat', posts: 4, reach: 7200, engagement: 480 },
  { day: 'Sun', posts: 2, reach: 4100, engagement: 290 },
];

export default function Analytics() {
  const maxReach = Math.max(...weeklyData.map(d => d.reach));

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-6">
        <motion.div variants={item} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Marketing Analytics</h1>
              <p className="text-sm text-text-secondary">Performance insights & ROI tracking</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-light border border-border text-sm text-text-secondary hover:text-text-primary transition-colors">
              <Calendar className="w-4 h-4" />
              Last 30 days
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Metrics */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric) => (
          <motion.div key={metric.label} variants={item} className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
              <div className={`flex items-center gap-1 text-xs font-medium ${
                metric.trend === 'up' ? 'text-success' : 'text-danger'
              }`}>
                {metric.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {metric.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-text-primary">{metric.value}</p>
            <p className="text-xs text-text-muted mt-1">{metric.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Weekly Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl p-5 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-text-primary">Weekly Activity</h3>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Reach
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-success" />
              Engagement
            </span>
          </div>
        </div>
        <div className="flex items-end gap-3 h-40">
          {weeklyData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex flex-col items-center gap-1 flex-1 justify-end">
                <div
                  className="w-full bg-gradient-to-t from-primary to-primary-light rounded-t opacity-80"
                  style={{ height: `${(d.reach / maxReach) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-text-muted">{d.day}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Performance */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-card rounded-xl p-5"
        >
          <h3 className="font-semibold text-text-primary mb-4">Channel Performance</h3>
          <div className="space-y-3">
            {channelPerformance.map((ch) => (
              <div key={ch.channel} className="flex items-center gap-3">
                <div className={`w-2 h-8 rounded-full ${ch.color}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-text-primary">{ch.channel}</span>
                    <span className="text-xs text-success">{ch.roi} ROI</span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-text-muted">
                    <span>{ch.posts} posts</span>
                    <span>{ch.reach} reach</span>
                    <span>{ch.engagement} engagement</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Performing Content */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-5"
        >
          <h3 className="font-semibold text-text-primary mb-4">Top Performing Content</h3>
          <div className="space-y-2">
            {topContent.map((content, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-lighter/50 transition-colors">
                <span className="text-xs font-bold text-text-muted w-5">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary truncate">{content.title}</p>
                  <div className="flex items-center gap-3 text-[10px] text-text-muted mt-0.5">
                    <span>{content.channel}</span>
                    <span>·</span>
                    <span>{content.views} views</span>
                    <span>·</span>
                    <span>{content.engagement} engagement</span>
                  </div>
                </div>
                <span className="text-xs font-medium text-success">{content.conversions} conv.</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
