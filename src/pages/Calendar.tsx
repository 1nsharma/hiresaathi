import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarDays, ChevronLeft, ChevronRight, Plus,
  CheckCircle2, Clock, AlertCircle, Eye, Edit3,
  Share2, FileText, Image, Video, Mail, Megaphone
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.03 } }
};
const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 }
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dates = Array.from({ length: 35 }, (_, i) => {
  const d = new Date(2026, 0, 1);
  d.setDate(d.getDate() + i - 3);
  return d;
});

type ContentItem = {
  id: string;
  title: string;
  type: 'blog' | 'social' | 'email' | 'ad' | 'video';
  channel: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  time: string;
  brand: string;
};

const contentItems: Record<string, ContentItem[]> = {
  '2026-01-05': [
    { id: '1', title: 'SEO Blog: AI Hiring Trends 2026', type: 'blog', channel: 'Website', status: 'published', time: '09:00', brand: 'TechCorp' },
  ],
  '2026-01-06': [
    { id: '2', title: 'LinkedIn: Product Launch Announcement', type: 'social', channel: 'LinkedIn', status: 'published', time: '10:30', brand: 'TechCorp' },
    { id: '3', title: 'Instagram: Behind the scenes', type: 'social', channel: 'Instagram', status: 'published', time: '14:00', brand: 'FreshBite' },
  ],
  '2026-01-07': [
    { id: '4', title: 'Email: Weekly Newsletter #42', type: 'email', channel: 'Email', status: 'scheduled', time: '08:00', brand: 'TechCorp' },
  ],
  '2026-01-08': [
    { id: '5', title: 'Google Ads: Q1 Campaign', type: 'ad', channel: 'Google Ads', status: 'scheduled', time: '00:00', brand: 'TechCorp' },
    { id: '6', title: 'LinkedIn: Thought Leadership', type: 'social', channel: 'LinkedIn', status: 'draft', time: '11:00', brand: 'TechCorp' },
  ],
  '2026-01-09': [
    { id: '7', title: 'Blog: Case Study - DataVerse', type: 'blog', channel: 'Website', status: 'draft', time: '09:00', brand: 'TechCorp' },
    { id: '8', title: 'YouTube: Product Demo', type: 'video', channel: 'YouTube', status: 'scheduled', time: '15:00', brand: 'FreshBite' },
  ],
  '2026-01-10': [
    { id: '9', title: 'Instagram: Carousel - Tips', type: 'social', channel: 'Instagram', status: 'draft', time: '12:00', brand: 'FreshBite' },
  ],
  '2026-01-12': [
    { id: '10', title: 'Email: Re-engagement Sequence', type: 'email', channel: 'Email', status: 'scheduled', time: '08:00', brand: 'TechCorp' },
  ],
  '2026-01-13': [
    { id: '11', title: 'Blog: MCP Integration Guide', type: 'blog', channel: 'Website', status: 'draft', time: '09:00', brand: 'TechCorp' },
    { id: '12', title: 'LinkedIn: Hiring Tips Thread', type: 'social', channel: 'LinkedIn', status: 'draft', time: '10:00', brand: 'TechCorp' },
  ],
  '2026-01-14': [
    { id: '13', title: 'Press Release: Series B', type: 'blog', channel: 'PR', status: 'draft', time: '09:00', brand: 'TechCorp' },
  ],
  '2026-01-15': [
    { id: '14', title: 'Instagram: Recipe Video', type: 'video', channel: 'Instagram', status: 'scheduled', time: '18:00', brand: 'FreshBite' },
    { id: '15', title: 'Email: Product Update', type: 'email', channel: 'Email', status: 'scheduled', time: '08:00', brand: 'TechCorp' },
  ],
};

const typeIcons: Record<string, typeof FileText> = {
  blog: FileText,
  social: Megaphone,
  email: Mail,
  ad: Image,
  video: Video,
};

const statusColors: Record<string, string> = {
  draft: 'bg-text-muted/20 text-text-muted',
  scheduled: 'bg-primary/15 text-primary-light',
  published: 'bg-success/10 text-success',
  failed: 'bg-danger/10 text-danger',
};

const typeColors: Record<string, string> = {
  blog: 'border-l-purple-500',
  social: 'border-l-blue-500',
  email: 'border-l-green-500',
  ad: 'border-l-amber-500',
  video: 'border-l-rose-500',
};

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>('2026-01-08');
  const [view, setView] = useState<'month' | 'week'>('month');

  const getDateKey = (d: Date) => d.toISOString().split('T')[0];
  const selectedItems = selectedDate ? (contentItems[selectedDate] || []) : [];

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-6">
        <motion.div variants={item} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Content Calendar</h1>
              <p className="text-sm text-text-secondary">Plan, schedule & track all content</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView('month')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${view === 'month' ? 'bg-primary/15 text-primary-light' : 'text-text-muted hover:text-text-primary'}`}
            >
              Month
            </button>
            <button
              onClick={() => setView('week')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${view === 'week' ? 'bg-primary/15 text-primary-light' : 'text-text-muted hover:text-text-primary'}`}
            >
              Week
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/15 text-primary-light text-xs font-medium hover:bg-primary/20 transition-colors">
              <Plus className="w-3.5 h-3.5" />
              New Content
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-4 mb-4"
      >
        {[
          { label: 'Published', count: 12, color: 'text-success' },
          { label: 'Scheduled', count: 8, color: 'text-primary-light' },
          { label: 'Drafts', count: 15, color: 'text-text-muted' },
          { label: 'Failed', count: 1, color: 'text-danger' },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${s.color.replace('text-', 'bg-')}`} />
            <span className="text-xs text-text-muted">{s.label}:</span>
            <span className={`text-xs font-medium ${s.color}`}>{s.count}</span>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-3 glass-card rounded-xl overflow-hidden"
        >
          {/* Month Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <button className="p-1 rounded hover:bg-surface-lighter text-text-muted">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h3 className="font-semibold text-text-primary text-sm">January 2026</h3>
            <button className="p-1 rounded hover:bg-surface-lighter text-text-muted">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b border-border">
            {days.map((day) => (
              <div key={day} className="px-2 py-2 text-center text-[10px] font-medium text-text-muted uppercase">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {dates.map((date, i) => {
              const dateKey = getDateKey(date);
              const items = contentItems[dateKey] || [];
              const isCurrentMonth = date.getMonth() === 0;
              const isSelected = selectedDate === dateKey;
              const isToday = dateKey === '2026-01-08';

              return (
                <motion.button
                  key={i}
                  variants={item}
                  onClick={() => setSelectedDate(dateKey)}
                  className={`min-h-[80px] p-1.5 border-b border-r border-border/50 text-left transition-all ${
                    isSelected ? 'bg-primary/10 border-primary/30' :
                    isToday ? 'bg-accent/5' : ''
                  } ${!isCurrentMonth ? 'opacity-30' : ''} hover:bg-surface-lighter/50`}
                >
                  <span className={`text-[10px] font-medium ${
                    isToday ? 'text-accent' : 'text-text-muted'
                  }`}>
                    {date.getDate()}
                  </span>
                  <div className="mt-1 space-y-0.5">
                    {items.slice(0, 2).map((item) => {
                      const Icon = typeIcons[item.type] || FileText;
                      return (
                        <div
                          key={item.id}
                          className={`flex items-center gap-1 px-1 py-0.5 rounded text-[9px] truncate border-l-2 ${typeColors[item.type]} ${statusColors[item.status]}`}
                        >
                          <Icon className="w-2.5 h-2.5 flex-shrink-0" />
                          <span className="truncate">{item.title.split(':')[1]?.trim() || item.title}</span>
                        </div>
                      );
                    })}
                    {items.length > 2 && (
                      <span className="text-[9px] text-text-muted pl-1">+{items.length - 2} more</span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Day Detail */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-4"
        >
          <h3 className="font-semibold text-text-primary text-sm mb-1">
            {selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' }) : 'Select a date'}
          </h3>
          <p className="text-xs text-text-muted mb-4">
            {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} scheduled
          </p>

          <div className="space-y-2">
            {selectedItems.map((item) => {
              const Icon = typeIcons[item.type] || FileText;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg bg-surface/50 border-l-2 ${typeColors[item.type]}`}
                >
                  <div className="flex items-start gap-2">
                    <Icon className="w-4 h-4 text-text-muted mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium text-text-primary truncate">{item.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-text-muted">{item.channel}</span>
                        <span className="text-[10px] text-text-muted">·</span>
                        <span className="text-[10px] text-text-muted">{item.time}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${statusColors[item.status]}`}>
                          {item.status}
                        </span>
                        <span className="text-[10px] text-text-muted">{item.brand}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2 pt-2 border-t border-border/50">
                    <button className="p-1 rounded hover:bg-surface-lighter text-text-muted hover:text-text-primary transition-colors">
                      <Eye className="w-3 h-3" />
                    </button>
                    <button className="p-1 rounded hover:bg-surface-lighter text-text-muted hover:text-text-primary transition-colors">
                      <Edit3 className="w-3 h-3" />
                    </button>
                    <button className="p-1 rounded hover:bg-surface-lighter text-text-muted hover:text-text-primary transition-colors">
                      <Share2 className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              );
            })}

            {selectedItems.length === 0 && selectedDate && (
              <div className="text-center py-8">
                <CalendarDays className="w-6 h-6 mx-auto mb-2 text-text-muted opacity-50" />
                <p className="text-xs text-text-muted">No content scheduled</p>
                <button className="mt-2 text-xs text-primary-light hover:underline">
                  + Add content
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
