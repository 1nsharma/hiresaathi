import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon, User, Building2, Bell, Shield,
  Palette, Globe, Key, CreditCard, Users, Database,
  Save, ChevronRight, ToggleLeft, ToggleRight, Check
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } }
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 }
};

const sections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'workspace', label: 'Workspace', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'integrations', label: 'Integrations', icon: Globe },
  { id: 'api-keys', label: 'API Keys', icon: Key },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'data', label: 'Data & Storage', icon: Database },
];

const teamMembers = [
  { name: 'Amey (You)', email: 'amey@hiresaathi.ai', role: 'Owner', avatar: 'A' },
  { name: 'Priya Sharma', email: 'priya@hiresaathi.ai', role: 'Admin', avatar: 'PS' },
  { name: 'Rahul Verma', email: 'rahul@hiresaathi.ai', role: 'Developer', avatar: 'RV' },
  { name: 'Ananya Patel', email: 'ananya@hiresaathi.ai', role: 'Designer', avatar: 'AP' },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [toggles, setToggles] = useState({
    emailNotifs: true,
    pushNotifs: true,
    weeklyDigest: false,
    twoFactor: true,
    aiSuggestions: true,
    autoSave: true,
  });

  const toggleSwitch = (key: string) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-6">
        <motion.div variants={item} className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-gray-600 flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
            <p className="text-sm text-text-secondary">Manage your workspace preferences</p>
          </div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Nav */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-3 h-fit"
        >
          <div className="space-y-0.5">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-all ${
                  activeSection === s.id
                    ? 'bg-primary/15 text-primary-light'
                    : 'text-text-secondary hover:bg-surface-lighter hover:text-text-primary'
                }`}
              >
                <s.icon className="w-4 h-4" />
                <span>{s.label}</span>
                {activeSection === s.id && <ChevronRight className="w-3 h-3 ml-auto" />}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Settings Content */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-3 space-y-4"
        >
          {activeSection === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-4">Profile Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-text-muted mb-1 block">Full Name</label>
                  <input type="text" defaultValue="Amey" className="w-full px-3 py-2.5 rounded-lg bg-surface border border-border text-sm text-text-primary outline-none focus:border-primary/50" />
                </div>
                <div>
                  <label className="text-xs text-text-muted mb-1 block">Email</label>
                  <input type="email" defaultValue="amey@hiresaathi.ai" className="w-full px-3 py-2.5 rounded-lg bg-surface border border-border text-sm text-text-primary outline-none focus:border-primary/50" />
                </div>
                <div>
                  <label className="text-xs text-text-muted mb-1 block">Role</label>
                  <input type="text" defaultValue="Founder & CEO" className="w-full px-3 py-2.5 rounded-lg bg-surface border border-border text-sm text-text-primary outline-none focus:border-primary/50" />
                </div>
                <div>
                  <label className="text-xs text-text-muted mb-1 block">Timezone</label>
                  <select className="w-full px-3 py-2.5 rounded-lg bg-surface border border-border text-sm text-text-primary outline-none focus:border-primary/50">
                    <option>Asia/Kolkata (IST)</option>
                    <option>UTC</option>
                    <option>America/New_York</option>
                  </select>
                </div>
              </div>
              <button className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/15 text-primary-light text-sm font-medium hover:bg-primary/20 transition-colors">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </motion.div>
          )}

          {activeSection === 'workspace' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-4">Workspace Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-text-muted mb-1 block">Workspace Name</label>
                  <input type="text" defaultValue="HireSaathi AI" className="w-full px-3 py-2.5 rounded-lg bg-surface border border-border text-sm text-text-primary outline-none focus:border-primary/50" />
                </div>
                <div>
                  <label className="text-xs text-text-muted mb-1 block">Workspace URL</label>
                  <input type="text" defaultValue="hiresaathi.hiresaathi.ai" className="w-full px-3 py-2.5 rounded-lg bg-surface border border-border text-sm text-text-primary outline-none focus:border-primary/50" />
                </div>
                <div>
                  <label className="text-xs text-text-muted mb-1 block">Default Language</label>
                  <select className="w-full px-3 py-2.5 rounded-lg bg-surface border border-border text-sm text-text-primary outline-none focus:border-primary/50">
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Multi-language</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'notifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { key: 'emailNotifs', label: 'Email Notifications', desc: 'Receive updates via email' },
                  { key: 'pushNotifs', label: 'Push Notifications', desc: 'Browser and mobile push alerts' },
                  { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Summary of platform activity' },
                ].map((n) => (
                  <div key={n.key} className="flex items-center justify-between p-3 rounded-lg bg-surface/50">
                    <div>
                      <p className="text-sm font-medium text-text-primary">{n.label}</p>
                      <p className="text-xs text-text-muted">{n.desc}</p>
                    </div>
                    <button onClick={() => toggleSwitch(n.key)} className="transition-colors">
                      {toggles[n.key as keyof typeof toggles] ? (
                        <ToggleRight className="w-8 h-8 text-primary-light" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-text-muted" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'security' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-surface/50">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Two-Factor Authentication</p>
                    <p className="text-xs text-text-muted">Add extra security to your account</p>
                  </div>
                  <button onClick={() => toggleSwitch('twoFactor')} className="transition-colors">
                    {toggles.twoFactor ? (
                      <ToggleRight className="w-8 h-8 text-success" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-text-muted" />
                    )}
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-surface/50">
                  <p className="text-sm font-medium text-text-primary mb-2">Active Sessions</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-text-secondary">Chrome · macOS</span>
                      <span className="text-success flex items-center gap-1"><Check className="w-3 h-3" /> Current</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-text-secondary">Safari · iPhone</span>
                      <span className="text-text-muted">2 hours ago</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-danger/10 text-danger text-sm font-medium hover:bg-danger/20 transition-colors">
                  Change Password
                </button>
              </div>
            </motion.div>
          )}

          {activeSection === 'team' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-text-primary">Team Members</h3>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/15 text-primary-light text-xs font-medium hover:bg-primary/20 transition-colors">
                  <Users className="w-3.5 h-3.5" />
                  Invite Member
                </button>
              </div>
              <div className="space-y-2">
                {teamMembers.map((member) => (
                  <div key={member.email} className="flex items-center gap-3 p-3 rounded-lg bg-surface/50">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-xs font-bold text-text-primary">
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">{member.name}</p>
                      <p className="text-xs text-text-muted">{member.email}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      member.role === 'Owner' ? 'bg-primary/15 text-primary-light' :
                      member.role === 'Admin' ? 'bg-success/10 text-success' :
                      'bg-surface-lighter text-text-muted'
                    }`}>
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'billing' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-4">Billing & Plan</h3>
              <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-text-primary">Enterprise Plan</p>
                    <p className="text-xs text-text-muted">Unlimited users · Priority support · Custom integrations</p>
                  </div>
                  <span className="text-lg font-bold text-primary-light">₹49,999/mo</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-surface/50">
                  <p className="text-xs text-text-muted">Next Billing Date</p>
                  <p className="text-sm font-medium text-text-primary">Feb 1, 2026</p>
                </div>
                <div className="p-3 rounded-lg bg-surface/50">
                  <p className="text-xs text-text-muted">Payment Method</p>
                  <p className="text-sm font-medium text-text-primary">Visa •••• 4242</p>
                </div>
              </div>
            </motion.div>
          )}

          {(activeSection === 'appearance' || activeSection === 'integrations' || activeSection === 'api-keys' || activeSection === 'data') && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-4">{sections.find(s => s.id === activeSection)?.label}</h3>
              <div className="text-center py-8">
                <SettingsIcon className="w-8 h-8 mx-auto mb-3 text-text-muted opacity-50" />
                <p className="text-sm text-text-muted">Configuration panel for this section</p>
                <p className="text-xs text-text-muted mt-1">Coming in next update</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
