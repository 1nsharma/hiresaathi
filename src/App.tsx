import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Marketing from './pages/Marketing';
import Recruit from './pages/Recruit';
import Architecture from './pages/Architecture';
import BrandIQ from './pages/BrandIQ';
import ContentStudio from './pages/ContentStudio';
import Calendar from './pages/Calendar';
import Automation from './pages/Automation';
import Support from './pages/Support';
import Builder from './pages/Builder';
import MCPConnect from './pages/MCPConnect';
import Settings from './pages/Settings';

const pages: Record<string, React.ComponentType> = {
  dashboard: Dashboard,
  marketing: Marketing,
  recruit: Recruit,
  brand: BrandIQ,
  studio: ContentStudio,
  calendar: Calendar,
  automation: Automation,
  support: Support,
  builder: Builder,
  mcp: MCPConnect,
  architecture: Architecture,
  settings: Settings,
};

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const ActiveComponent = pages[activePage] || Dashboard;

  return (
    <div className="flex h-screen overflow-hidden bg-surface">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="min-h-full"
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
