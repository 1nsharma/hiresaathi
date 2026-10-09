import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserCheck, Search, Filter, MapPin, Briefcase, Clock,
  Star, TrendingUp, Users, FileText, CheckCircle2,
  ArrowRight, Sparkles, BarChart3, Zap
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};
const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
};

const jobs = [
  { title: 'Senior Full-Stack Developer', company: 'TechCorp', location: 'Remote', type: 'Full-time', applicants: 47, match: 94, status: 'active', salary: '₹25-35L' },
  { title: 'AI/ML Engineer', company: 'DataVerse', location: 'Bangalore', type: 'Full-time', applicants: 32, match: 89, status: 'active', salary: '₹30-45L' },
  { title: 'Product Designer', company: 'DesignHub', location: 'Mumbai', type: 'Full-time', applicants: 28, match: 91, status: 'active', salary: '₹18-28L' },
  { title: 'DevOps Engineer', company: 'CloudFirst', location: 'Remote', type: 'Contract', applicants: 19, match: 87, status: 'active', salary: '₹20-30L' },
  { title: 'Marketing Manager', company: 'GrowthLab', location: 'Delhi', type: 'Full-time', applicants: 56, match: 85, status: 'active', salary: '₹15-22L' },
];

const candidates = [
  { name: 'Priya Sharma', role: 'Full-Stack Developer', experience: '5 yrs', skills: ['React', 'Node.js', 'AWS'], match: 96, status: 'shortlisted' },
  { name: 'Rahul Verma', role: 'AI/ML Engineer', experience: '4 yrs', skills: ['Python', 'TensorFlow', 'MLOps'], match: 93, status: 'interview' },
  { name: 'Ananya Patel', role: 'Product Designer', experience: '6 yrs', skills: ['Figma', 'UX Research', 'Design Systems'], match: 91, status: 'shortlisted' },
  { name: 'Vikram Singh', role: 'DevOps Engineer', experience: '7 yrs', skills: ['K8s', 'Terraform', 'CI/CD'], match: 89, status: 'screening' },
  { name: 'Meera Joshi', role: 'Data Scientist', experience: '3 yrs', skills: ['Python', 'SQL', 'Statistics'], match: 88, status: 'new' },
];

const stats = [
  { label: 'Active Jobs', value: '24', icon: Briefcase, color: 'text-blue-400' },
  { label: 'Total Candidates', value: '1,847', icon: Users, color: 'text-green-400' },
  { label: 'Avg. Match Score', value: '89%', icon: Target, color: 'text-purple-400' },
  { label: 'Time to Hire', value: '12 days', icon: Clock, color: 'text-amber-400' },
];

function Target({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  );
}

export default function Recruit() {
  const [view, setView] = useState<'jobs' | 'candidates'>('jobs');

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-6">
        <motion.div variants={item} className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <UserCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">AI Recruit</h1>
            <p className="text-sm text-text-secondary">AI-powered hiring platform</p>
          </div>
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
            <p className="text-xl font-bold text-text-primary">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* AI Matching Pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl p-5 mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-amber-400" />
          <h3 className="font-semibold text-text-primary text-sm">AI Matching Pipeline</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { stage: 'Resume Parse', count: 847, icon: FileText },
            { stage: 'AI Screening', count: 423, icon: Sparkles },
            { stage: 'Skill Match', count: 289, icon: Target },
            { stage: 'Shortlisted', count: 142, icon: CheckCircle2 },
            { stage: 'Interview', count: 47, icon: Users },
          ].map((s, i) => (
            <div key={i} className="text-center p-3 rounded-lg bg-surface/50">
              <s.icon className="w-5 h-5 mx-auto mb-2 text-primary-light" />
              <p className="text-lg font-bold text-text-primary">{s.count}</p>
              <p className="text-[10px] text-text-muted">{s.stage}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tab Switch */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setView('jobs')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            view === 'jobs' ? 'bg-primary/15 text-primary-light' : 'text-text-muted hover:text-text-primary'
          }`}
        >
          Active Jobs
        </button>
        <button
          onClick={() => setView('candidates')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            view === 'candidates' ? 'bg-primary/15 text-primary-light' : 'text-text-muted hover:text-text-primary'
          }`}
        >
          Top Candidates
        </button>
      </div>

      {/* Content */}
      {view === 'jobs' ? (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
          {jobs.map((job) => (
            <motion.div key={job.title} variants={item} className="glass-card rounded-xl p-4 hover:border-primary/30 transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-text-primary text-sm">{job.title}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/10 text-success">Active</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                    <span>{job.type}</span>
                    <span>{job.salary}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm font-medium text-success">
                    <TrendingUp className="w-3 h-3" />
                    {job.match}%
                  </div>
                  <p className="text-xs text-text-muted">{job.applicants} applicants</p>
                </div>
                <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary-light transition-colors" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
          {candidates.map((c) => (
            <motion.div key={c.name} variants={item} className="glass-card rounded-xl p-4 hover:border-primary/30 transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-sm font-bold text-text-primary">
                  {c.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-text-primary text-sm">{c.name}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      c.status === 'shortlisted' ? 'bg-success/10 text-success' :
                      c.status === 'interview' ? 'bg-primary/10 text-primary-light' :
                      c.status === 'screening' ? 'bg-warning/10 text-warning' :
                      'bg-surface-lighter text-text-muted'
                    }`}>{c.status}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <span>{c.role}</span>
                    <span>·</span>
                    <span>{c.experience}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    {c.skills.map((skill) => (
                      <span key={skill} className="text-[10px] px-2 py-0.5 rounded-full bg-surface-lighter text-text-muted">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-success">{c.match}%</div>
                  <p className="text-[10px] text-text-muted">AI Match</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
