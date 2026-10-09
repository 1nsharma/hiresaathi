import { motion } from 'framer-motion';
import {
  LayoutDashboard, Megaphone, UserCheck, Brain, PenTool,
  CalendarDays, Zap, MessageSquare, Code2, Network,
  Plug, Settings, ChevronLeft, ChevronRight, Sparkles
} from 'lucide-react';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, group: 'main' },
  { id: 'marketing', label: 'AI Marketing', icon: Megaphone, group: 'modules' },
  { id: 'brand', label: 'Brand IQ', icon: Brain, group: 'modules' },
  { id: 'studio', label: 'Content Studio', icon: PenTool, group: 'modules' },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays, group: 'modules' },
  { id: 'recruit', label: 'AI Recruit', icon: UserCheck, group: 'modules' },
  { id: 'support', label: 'AI Support', icon: MessageSquare, group: 'modules' },
  { id: 'automation', label: 'Automation', icon: Zap, group: 'modules' },
  { id: 'builder', label: 'AI Builder', icon: Code2, group: 'modules' },
  { id: 'mcp', label: 'MCP Connect', icon: Plug, group: 'modules' },
  { id: 'architecture', label: 'Architecture', icon: Network, group: 'system' },
  { id: 'settings', label: 'Settings', icon: Settings, group: 'system' },
];

export default function Sidebar({ activePage, setActivePage, isOpen, setIsOpen }: SidebarProps) {
  const groups = [
    { key: 'main', label: '' },
    { key: 'modules', label: 'AI Modules' },
    { key: 'system', label: 'System' },
  ];

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
            className="overflow-hidden"
          >
            <h1 className="text-base font-bold text-text-primary whitespace-nowrap">HireSaathi</h1>
            <p className="text-[10px] text-text-muted uppercase tracking-wider">Enterprise AI</p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        {groups.map((group) => {
          const items = navItems.filter(n => n.group === group.key);
          return (
            <div key={group.key} className={group.key !== 'main' ? 'mt-4' : ''}>
              {isOpen && group.label && (
                <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                  {group.label}
                </p>
              )}
              {!isOpen && group.key !== 'main' && (
                <div className="my-2 mx-2 border-t border-border/50" />
              )}
              {items.map((item) => {
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
            </div>
          );
        })}
      </nav>

      {/* Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-surface-lighter border border-border flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-lighter/80 transition-colors z-10"
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
              <p className="text-[10px] text-text-muted whitespace-nowrap">Admin · Enterprise</p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
