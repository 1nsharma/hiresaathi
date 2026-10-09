import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain, Globe, Palette, MessageSquare, Target,
  Upload, CheckCircle2, Settings, Sparkles, Eye,
  FileText, Languages, Zap, TrendingUp
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};
const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
};

const brandProfiles = [
  {
    name: 'TechCorp India',
    url: 'techcorp.in',
    voice: 'Professional, innovative, data-driven',
    colors: ['#6366f1', '#06b6d4', '#10b981'],
    audience: 'B2B SaaS decision makers, CTOs, engineering leads',
    languages: ['English', 'Hindi'],
    status: 'active'
  },
  {
    name: 'FreshBite Foods',
    url: 'freshbite.co',
    voice: 'Friendly, energetic, youth-oriented',
    colors: ['#f59e0b', '#ef4444', '#10b981'],
    audience: 'Millennials, food enthusiasts, urban professionals',
    languages: ['English', 'Hindi', 'Tamil'],
    status: 'active'
  },
  {
    name: 'GreenEarth NGO',
    url: 'greenearth.org',
    voice: 'Empathetic, urgent, community-focused',
    colors: ['#10b981', '#059669', '#84cc16'],
    audience: 'Environmental advocates, CSR leaders, donors',
    languages: ['English', 'Hindi'],
    status: 'draft'
  },
];

const extractedData = [
  { category: 'Products & Services', items: ['Cloud Platform', 'AI Analytics', 'DevOps Tools', 'API Gateway'] },
  { category: 'Target Audience', items: ['Enterprise CTOs', 'Engineering Managers', 'Startup Founders'] },
  { category: 'Key Differentiators', items: ['India-first pricing', 'Multilingual support', 'SOC 2 compliant', '99.9% uptime'] },
  { category: 'Brand Personality', items: ['Innovative', 'Trustworthy', 'Developer-friendly', 'Growth-oriented'] },
];

export default function BrandIQ() {
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => setAnalyzing(false), 2000);
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-6">
        <motion.div variants={item} className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Brand IQ</h1>
            <p className="text-sm text-text-secondary">AI Brand Intelligence — context for every agent</p>
          </div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Brand Profiles */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <h3 className="font-semibold text-text-primary text-sm mb-3">Brand Profiles</h3>
          {brandProfiles.map((brand, i) => (
            <motion.button
              key={brand.name}
              onClick={() => setSelectedBrand(i)}
              whileHover={{ scale: 1.01 }}
              className={`w-full text-left glass-card rounded-xl p-4 transition-all ${
                selectedBrand === i ? 'border-primary/50 bg-primary/5' : 'hover:border-border-light'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex gap-1">
                  {brand.colors.map((c, j) => (
                    <div key={j} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  brand.status === 'active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                }`}>
                  {brand.status}
                </span>
              </div>
              <h4 className="font-medium text-text-primary text-sm">{brand.name}</h4>
              <p className="text-xs text-text-muted">{brand.url}</p>
            </motion.button>
          ))}

          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-border text-sm text-text-muted hover:text-text-primary hover:border-primary/50 transition-all"
          >
            {analyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                Analyzing website...
              </>
            ) : (
              <>
                <Globe className="w-4 h-4" />
                Analyze new website
              </>
            )}
          </button>
        </motion.div>

        {/* Brand Details */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-4"
        >
          {/* Brand Overview */}
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text-primary">{brandProfiles[selectedBrand].name}</h3>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-surface-lighter transition-colors">
                  <Settings className="w-4 h-4 text-text-muted" />
                </button>
                <button className="p-2 rounded-lg hover:bg-surface-lighter transition-colors">
                  <Eye className="w-4 h-4 text-text-muted" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-text-muted mb-1 block">Brand Voice</label>
                <p className="text-sm text-text-primary">{brandProfiles[selectedBrand].voice}</p>
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1 block">Target Audience</label>
                <p className="text-sm text-text-primary">{brandProfiles[selectedBrand].audience}</p>
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1 block">Languages</label>
                <div className="flex gap-2">
                  {brandProfiles[selectedBrand].languages.map((l) => (
                    <span key={l} className="text-xs px-2 py-1 rounded-full bg-surface-lighter text-text-secondary">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1 block">Brand Colors</label>
                <div className="flex gap-2">
                  {brandProfiles[selectedBrand].colors.map((c, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded" style={{ backgroundColor: c }} />
                      <span className="text-[10px] text-text-muted font-mono">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Extracted Intelligence */}
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-primary-light" />
              <h3 className="font-semibold text-text-primary text-sm">Extracted Intelligence</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {extractedData.map((section) => (
                <div key={section.category} className="p-3 rounded-lg bg-surface/50">
                  <h4 className="text-xs font-medium text-text-muted mb-2">{section.category}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {section.items.map((item) => (
                      <span key={item} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary-light">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="glass-card rounded-xl p-5">
            <h3 className="font-semibold text-text-primary text-sm mb-4">How Brand IQ works</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                { step: '1', title: 'Website Scan', desc: 'Extract products, services, audience', icon: Globe },
                { step: '2', title: 'Voice Analysis', desc: 'Determine tone, style, personality', icon: MessageSquare },
                { step: '3', title: 'Context Store', desc: 'Save brand context for all agents', icon: Brain },
                { step: '4', title: 'Auto-Apply', desc: 'Every output uses brand context', icon: Zap },
              ].map((s) => (
                <div key={s.step} className="text-center p-3 rounded-lg bg-surface/50">
                  <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-2">
                    <s.icon className="w-4 h-4 text-primary-light" />
                  </div>
                  <h4 className="text-xs font-medium text-text-primary mb-1">{s.title}</h4>
                  <p className="text-[10px] text-text-muted">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
