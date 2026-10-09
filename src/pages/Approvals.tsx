import { motion } from 'framer-motion';
import {
  CheckCircle2, XCircle, Clock, Eye, Edit3, MessageSquare,
  FileText, Image, Video, Mail, Calendar, User, AlertCircle
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } }
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 }
};

const pendingApprovals = [
  {
    id: '1',
    title: 'LinkedIn Post: Q1 Product Launch Announcement',
    type: 'social',
    author: 'Priya Sharma',
    brand: 'TechCorp India',
    submittedAt: '2 hours ago',
    scheduledFor: 'Jan 10, 2026 · 10:30 AM',
    status: 'pending',
    comments: 2,
    preview: 'Excited to announce our Q1 product launch! After months of development, we\'re bringing you AI-powered hiring that understands India...',
    icon: Image,
    color: 'border-l-blue-500',
  },
  {
    id: '2',
    title: 'Email Campaign: Weekly Newsletter #43',
    type: 'email',
    author: 'Rahul Verma',
    brand: 'TechCorp India',
    submittedAt: '5 hours ago',
    scheduledFor: 'Jan 12, 2026 · 8:00 AM',
    status: 'pending',
    comments: 0,
    preview: 'This week in AI hiring: New features, customer success stories, and industry insights you need to know...',
    icon: Mail,
    color: 'border-l-green-500',
  },
  {
    id: '3',
    title: 'Blog: "The Future of Remote Hiring in 2026"',
    type: 'blog',
    author: 'Ananya Patel',
    brand: 'TechCorp India',
    submittedAt: '1 day ago',
    scheduledFor: 'Jan 15, 2026 · 9:00 AM',
    status: 'pending',
    comments: 3,
    preview: 'Remote hiring has evolved from a pandemic necessity to a strategic advantage. Here\'s how leading companies are leveraging AI...',
    icon: FileText,
    color: 'border-l-purple-500',
  },
  {
    id: '4',
    title: 'Instagram Carousel: 5 Hiring Mistakes to Avoid',
    type: 'social',
    author: 'Priya Sharma',
    brand: 'FreshBite Foods',
    submittedAt: '3 hours ago',
    scheduledFor: 'Jan 11, 2026 · 2:00 PM',
    status: 'revision',
    comments: 1,
    preview: 'Slide 1: 5 Hiring Mistakes That Cost You Top Talent\nSlide 2: Mistake #1 - Ignoring cultural fit...',
    icon: Image,
    color: 'border-l-pink-500',
  },
];

const recentDecisions = [
  { title: 'Press Release: Series B Funding', author: 'Amey', decision: 'approved', decidedAt: '2 hours ago', icon: FileText },
  { title: 'Google Ads: Q1 Campaign Copy', author: 'Rahul', decision: 'approved', decidedAt: '5 hours ago', icon: Image },
  { title: 'YouTube Script: Product Demo', author: 'Priya', decision: 'rejected', decidedAt: '1 day ago', icon: Video },
  { title: 'Twitter Thread: AI Trends', author: 'Ananya', decision: 'approved', decidedAt: '1 day ago', icon: Image },
];

export default function Approvals() {
  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-6">
        <motion.div variants={item} className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Approvals</h1>
            <p className="text-sm text-text-secondary">Review & approve content before publishing</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Pending Review', value: '4', icon: Clock, color: 'text-warning' },
          { label: 'Approved Today', value: '7', icon: CheckCircle2, color: 'text-success' },
          { label: 'Revision Requested', value: '1', icon: Edit3, color: 'text-primary-light' },
          { label: 'Rejected', value: '0', icon: XCircle, color: 'text-danger' },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Approvals */}
        <div className="lg:col-span-2 space-y-3">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-semibold text-text-primary text-sm mb-3"
          >
            Pending Your Review
          </motion.h3>
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
            {pendingApprovals.map((approval) => (
              <motion.div
                key={approval.id}
                variants={item}
                className={`glass-card rounded-xl p-4 border-l-4 ${approval.color} hover:border-primary/30 transition-all`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-surface-lighter flex items-center justify-center flex-shrink-0">
                    <approval.icon className="w-4 h-4 text-text-muted" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-text-primary text-sm truncate">{approval.title}</h4>
                      {approval.status === 'revision' && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-warning/10 text-warning">
                          Revision
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-text-muted mb-2">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {approval.author}
                      </span>
                      <span>·</span>
                      <span>{approval.brand}</span>
                      <span>·</span>
                      <span>{approval.submittedAt}</span>
                    </div>
                    <p className="text-xs text-text-muted line-clamp-2 mb-2">{approval.preview}</p>
                    <div className="flex items-center gap-3 text-[10px] text-text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Scheduled: {approval.scheduledFor}
                      </span>
                      {approval.comments > 0 && (
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {approval.comments} comments
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-success/10 text-success text-xs font-medium hover:bg-success/20 transition-colors">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Approve
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-warning/10 text-warning text-xs font-medium hover:bg-warning/20 transition-colors">
                    <Edit3 className="w-3.5 h-3.5" />
                    Request Revision
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-danger/10 text-danger text-xs font-medium hover:bg-danger/20 transition-colors">
                    <XCircle className="w-3.5 h-3.5" />
                    Reject
                  </button>
                  <div className="flex-1" />
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-lighter text-text-secondary text-xs font-medium hover:text-text-primary transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                    Preview
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Recent Decisions */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-4 h-fit"
        >
          <h3 className="font-semibold text-text-primary text-sm mb-3">Recent Decisions</h3>
          <div className="space-y-2">
            {recentDecisions.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-lighter/50 transition-colors"
              >
                <d.icon className="w-4 h-4 text-text-muted flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-text-primary truncate">{d.title}</p>
                  <p className="text-[10px] text-text-muted">{d.author} · {d.decidedAt}</p>
                </div>
                {d.decision === 'approved' ? (
                  <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-danger flex-shrink-0" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="text-xs font-medium text-text-muted mb-2">Approval Workflow</h4>
            <div className="space-y-2">
              {['Draft Created', 'AI Review', 'Manager Approval', 'Scheduled'].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    i < 3 ? 'bg-success/20 text-success' : 'bg-surface-lighter text-text-muted'
                  }`}>
                    {i < 3 ? '✓' : i + 1}
                  </div>
                  <span className={`text-xs ${i < 3 ? 'text-text-primary' : 'text-text-muted'}`}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
