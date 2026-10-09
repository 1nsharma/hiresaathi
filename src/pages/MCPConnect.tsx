import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plug, Search, Plus, CheckCircle2, AlertCircle,
  Shield, Zap, ExternalLink, Settings, RefreshCw,
  Link2, Unlink, Loader2, Key, Eye, EyeOff, Sparkles
} from 'lucide-react';
import { COMPOSIO_APPS, ALL_APPS } from '../lib/composio';
import { useToolStore } from '../lib/toolStore';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.03 } }
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

const categories = ['All', 'Communication', 'Development', 'Productivity', 'CRM', 'Social', 'Data', 'Design', 'Finance', 'Infrastructure'];

export default function MCPConnect() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showApiModal, setShowApiModal] = useState(false);
  const { connectedTools, connectionIds, isConnecting, composioApiKey, connectTool, disconnectTool, setApiKey } = useToolStore();

  const filteredApps = ALL_APPS.filter(app =>
    (activeCategory === 'All' || app.category === activeCategory) &&
    (app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     app.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const connectedCount = connectedTools.size;
  const totalApps = ALL_APPS.length;

  const handleConnect = async (appId: string) => {
    if (!composioApiKey) {
      setShowApiModal(true);
      return;
    }
    await connectTool(appId);
  };

  const handleSaveApiKey = () => {
    if (apiKeyInput.trim()) {
      setApiKey(apiKeyInput.trim());
      setShowApiModal(false);
      setApiKeyInput('');
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-6">
        <motion.div variants={item} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <Plug className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">MCP Connect</h1>
              <p className="text-sm text-text-secondary">
                Powered by Composio — {connectedCount}/{totalApps} tools connected
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowApiModal(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-light border border-border text-xs text-text-secondary hover:text-text-primary transition-colors"
            >
              <Key className="w-3.5 h-3.5" />
              {composioApiKey ? 'API Key Set' : 'Set API Key'}
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Composio Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className={`glass-card rounded-xl p-4 mb-6 border ${
          composioApiKey ? 'border-success/30' : 'border-warning/30'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              composioApiKey ? 'bg-success/10' : 'bg-warning/10'
            }`}>
              {composioApiKey ? (
                <CheckCircle2 className="w-4 h-4 text-success" />
              ) : (
                <AlertCircle className="w-4 h-4 text-warning" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                Composio Integration {composioApiKey ? 'Active' : 'Not Configured'}
              </p>
              <p className="text-xs text-text-muted">
                {composioApiKey
                  ? '250+ tools available. Connect tools to enable agent actions.'
                  : 'Add your Composio API key to connect real tools and enable agent workflows.'}
              </p>
            </div>
          </div>
          {!composioApiKey && (
            <button
              onClick={() => setShowApiModal(true)}
              className="px-3 py-1.5 rounded-lg bg-warning/10 text-warning text-xs font-medium hover:bg-warning/20 transition-colors"
            >
              Configure Now
            </button>
          )}
        </div>
      </motion.div>

      {/* Connected Tools */}
      {connectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-success" />
            Connected Tools ({connectedCount})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {Array.from(connectedTools.values()).map((tool) => (
              <motion.div
                key={tool.appId}
                layout
                className="glass-card rounded-xl p-4 border-success/20 hover:border-success/40 transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{tool.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium text-text-primary">{tool.appName}</h4>
                      <CheckCircle2 className="w-3 h-3 text-success" />
                    </div>
                    <p className="text-[10px] text-text-muted">{tool.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-wrap mb-2">
                  {tool.actions.slice(0, 3).map((action) => (
                    <span key={action} className="text-[9px] px-1.5 py-0.5 rounded bg-success/10 text-success">
                      {action}
                    </span>
                  ))}
                  {tool.actions.length > 3 && (
                    <span className="text-[9px] text-text-muted">+{tool.actions.length - 3}</span>
                  )}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="text-[10px] text-text-muted">
                    Connected {new Date(tool.connectedAt!).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => disconnectTool(tool.appId)}
                    className="p-1 rounded hover:bg-danger/10 text-text-muted hover:text-danger transition-colors"
                  >
                    <Unlink className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Search & Filter */}
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
            placeholder="Search 250+ Composio tools..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-light border border-border text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50"
          />
        </div>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 mb-4 overflow-x-auto pb-2"
      >
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

      {/* Available Tools Grid */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredApps.map((app) => {
          const isConnected = connectedTools.has(app.id);
          const isConnectingNow = isConnecting.has(app.id);

          return (
            <motion.div
              key={app.id}
              variants={item}
              whileHover={{ scale: 1.01, y: -1 }}
              className={`glass-card rounded-xl p-4 transition-all ${
                isConnected ? 'border-success/20' : 'hover:border-primary/30'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{app.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-sm font-medium text-text-primary">{app.name}</h4>
                    <Shield className="w-3 h-3 text-success" />
                  </div>
                  <p className="text-xs text-text-muted mb-2">{app.category}</p>
                  <div className="flex items-center gap-1 flex-wrap mb-3">
                    {app.actions.slice(0, 3).map((action) => (
                      <span key={action} className="text-[9px] px-1.5 py-0.5 rounded bg-surface-lighter text-text-muted">
                        {action}
                      </span>
                    ))}
                    {app.actions.length > 3 && (
                      <span className="text-[9px] text-text-muted">+{app.actions.length - 3}</span>
                    )}
                  </div>
                  {isConnected ? (
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/10 text-success flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        Connected
                      </span>
                      <button
                        onClick={() => disconnectTool(app.id)}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-danger/10 text-danger hover:bg-danger/20 transition-colors"
                      >
                        Disconnect
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleConnect(app.id)}
                      disabled={isConnectingNow}
                      className="flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary-light hover:bg-primary/20 transition-colors disabled:opacity-50"
                    >
                      {isConnectingNow ? (
                        <>
                          <Loader2 className="w-2.5 h-2.5 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Link2 className="w-2.5 h-2.5" />
                          Connect via Composio
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* API Key Modal */}
      <AnimatePresence>
        {showApiModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowApiModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-2xl p-6 max-w-md w-full border border-border"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Key className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Composio API Key</h3>
                  <p className="text-xs text-text-muted">Connect your Composio account</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-text-muted mb-1 block">API Key</label>
                  <div className="relative">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      placeholder="Enter your Composio API key..."
                      className="w-full px-3 py-2.5 pr-10 rounded-lg bg-surface border border-border text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50"
                    />
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-xs text-text-secondary">
                    <Sparkles className="w-3 h-3 inline mr-1 text-primary-light" />
                    Get your API key from{' '}
                    <a href="https://app.composio.dev" target="_blank" rel="noopener noreferrer" className="text-primary-light hover:underline">
                      app.composio.dev
                    </a>
                    {' '}→ Settings → API Keys
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => setShowApiModal(false)}
                    className="flex-1 px-4 py-2 rounded-lg bg-surface-lighter text-text-secondary text-sm hover:text-text-primary transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveApiKey}
                    disabled={!apiKeyInput.trim()}
                    className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    Save Key
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
