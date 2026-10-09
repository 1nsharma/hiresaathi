import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Megaphone,
  UserCheck,
  Brain,
  PenTool,
  CalendarDays,
  Zap,
  Network,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'marketing', label: 'AI Marketing', icon: Megaphone },
  { id: 'brand', label: 'Brand IQ', icon: Brain },
  { id: 'studio', label: 'Content Studio', icon: PenTool },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
  { id: 'recruit', label: 'AI Recruit', icon: UserCheck },
  { id: 'automation', label: 'Automation', icon: Zap },
  { id: 'architecture', label: 'Architecture', icon: Network },
];

export default function Sidebar({ activePage, setActivePage, isOpen, setIsOpen }: SidebarProps) {
  return (
    <motion.aside
      animate={{ width: isOpen ? 260 : 72 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative flex flex-col h-full bg-surface-light border-r border-border overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overflow-hidden"
          >
            <h1 className="text-base font-bold text-text-primary whitespace-nowrap">HireSaathi</h1>
            <p className="text-[10px] text-text-muted uppercase tracking-wider">AI Platform</p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`relative flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                isActive
                  ? 'bg-primary/15 text-primary-light'
                  : 'text-text-secondary hover:bg-surface-lighter hover:text-text-primary'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary-light' : ''}`} />
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-surface-lighter border border-border flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-lighter/80 transition-colors"
      >
        {isOpen ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
      </button>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-success flex items-center justify-center text-xs font-bold text-white">
            A
          </div>
          {isOpen && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-text-primary whitespace-nowrap">Amey</p>
              <p className="text-[10px] text-text-muted whitespace-nowrap">Admin · Pro Plan</p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
