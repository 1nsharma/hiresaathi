import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PenTool, Sparkles, Bold, Italic, List, Link,
  Image, Type, AlignLeft, AlignCenter, AlignRight,
  Eye, Download, Share2, CheckCircle2, RotateCcw,
  Wand2, Languages, Hash, Clock
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};
const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
};

const contentTypes = [
  { name: 'SEO Blog Post', icon: '📝', desc: 'Long-form optimized content' },
  { name: 'LinkedIn Post', icon: '💼', desc: 'Professional social content' },
  { name: 'Email Campaign', icon: '📧', desc: 'Multi-step email sequences' },
  { name: 'Instagram Caption', icon: '📸', desc: 'Visual-first captions' },
  { name: 'Product Description', icon: '🏷️', desc: 'Compelling product copy' },
  { name: 'Press Release', icon: '📰', desc: 'Media-ready announcements' },
  { name: 'Ad Copy', icon: '🎯', desc: 'High-converting ads' },
  { name: 'Case Study', icon: '📊', desc: 'Data-driven success stories' },
];

const sampleContent = `# The Future of AI-Powered Hiring in India

## Introduction

The Indian job market is undergoing a seismic shift. With over 12 million fresh graduates entering the workforce annually, traditional hiring methods are struggling to keep pace. Enter AI-powered recruitment — not as a replacement for human judgment, but as an amplifier of it.

## Why Traditional Hiring Falls Short

Manual resume screening takes an average of 7.2 seconds per candidate. At scale, this leads to:

- **Unconscious bias** in candidate selection
- **Missed talent** from non-traditional backgrounds  
- **Slow time-to-hire** averaging 42 days for tech roles
- **Poor candidate experience** with ghosting rates above 60%

## How AI Changes the Game

AI recruitment platforms like HireSaathi use advanced NLP and machine learning to:

1. Parse resumes in multiple languages (Hindi, English, Tamil, Telugu)
2. Match skills semantically, not just keyword-based
3. Predict candidate success based on historical data
4. Automate scheduling and follow-ups

## The Results

Companies using AI-assisted hiring report:
- 65% reduction in time-to-hire
- 40% improvement in candidate quality scores
- 3x increase in diversity metrics
- 89% improvement in candidate satisfaction

## Conclusion

The future of hiring in India isn't about choosing between AI and human judgment — it's about combining both for outcomes neither could achieve alone.`;

export default function ContentStudio() {
  const [selectedType, setSelectedType] = useState(0);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2500);
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-6">
        <motion.div variants={item} className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
            <PenTool className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Content Studio</h1>
            <p className="text-sm text-text-secondary">Unified AI content creation & editing</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Content Type Selector */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 mb-6 overflow-x-auto pb-2"
      >
        {contentTypes.map((type, i) => (
          <button
            key={type.name}
            onClick={() => setSelectedType(i)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
              selectedType === i
                ? 'bg-primary/15 text-primary-light border border-primary/30'
                : 'bg-surface-light text-text-secondary hover:text-text-primary border border-transparent'
            }`}
          >
            <span>{type.icon}</span>
            <span>{type.name}</span>
          </button>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel - Configuration */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-4"
        >
          {/* Input Config */}
          <div className="glass-card rounded-xl p-4">
            <h3 className="font-semibold text-text-primary text-sm mb-3">Configuration</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-text-muted mb-1 block">Topic / Title</label>
                <input
                  type="text"
                  defaultValue="The Future of AI-Powered Hiring in India"
                  className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm text-text-primary outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1 block">Keywords</label>
                <input
                  type="text"
                  defaultValue="AI hiring, recruitment, India, NLP, resume parsing"
                  className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm text-text-primary outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1 block">Target Audience</label>
                <input
                  type="text"
                  defaultValue="HR leaders, startup founders, tech recruiters"
                  className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm text-text-primary outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1 block">Length</label>
                <select className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm text-text-primary outline-none focus:border-primary/50">
                  <option>Long-form (1500+ words)</option>
                  <option>Medium (800-1500 words)</option>
                  <option>Short (300-800 words)</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1 block">Tone</label>
                <select className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm text-text-primary outline-none focus:border-primary/50">
                  <option>Professional & Authoritative</option>
                  <option>Friendly & Conversational</option>
                  <option>Technical & Detailed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Brand Context */}
          <div className="glass-card rounded-xl p-4">
            <h3 className="font-semibold text-text-primary text-sm mb-3">Brand Context</h3>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-success/5 border border-success/20">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="text-xs text-success">TechCorp India brand loaded</span>
            </div>
            <div className="mt-2 space-y-1.5">
              <p className="text-xs text-text-muted">Voice: Professional, innovative</p>
              <p className="text-xs text-text-muted">Audience: B2B SaaS decision makers</p>
              <p className="text-xs text-text-muted">Language: English (primary)</p>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {generating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating content...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                Generate Content
              </>
            )}
          </button>
        </motion.div>

        {/* Editor */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 glass-card rounded-xl overflow-hidden"
        >
          {/* Toolbar */}
          <div className="flex items-center gap-1 px-4 py-2 border-b border-border bg-surface-light/50">
            {[Bold, Italic, Type, List, Link, Image, AlignLeft, AlignCenter, AlignRight].map((Icon, i) => (
              <button key={i} className="p-1.5 rounded hover:bg-surface-lighter text-text-muted hover:text-text-primary transition-colors">
                <Icon className="w-4 h-4" />
              </button>
            ))}
            <div className="flex-1" />
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-text-muted hover:text-text-primary hover:bg-surface-lighter transition-colors">
              <Languages className="w-3.5 h-3.5" />
              Translate
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-text-muted hover:text-text-primary hover:bg-surface-lighter transition-colors">
              <Hash className="w-3.5 h-3.5" />
              SEO Score
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6 max-h-[500px] overflow-y-auto">
            <div className="prose prose-invert prose-sm max-w-none">
              {sampleContent.split('\n').map((line, i) => {
                if (line.startsWith('# ')) return <h1 key={i} className="text-xl font-bold text-text-primary mb-3">{line.slice(2)}</h1>;
                if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-semibold text-text-primary mt-4 mb-2">{line.slice(3)}</h2>;
                if (line.startsWith('- **')) return <li key={i} className="text-sm text-text-secondary ml-4 mb-1" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-primary">$1</strong>').slice(2) }} />;
                if (line.match(/^\d+\./)) return <li key={i} className="text-sm text-text-secondary ml-4 mb-1 list-decimal">{line.replace(/^\d+\.\s*/, '')}</li>;
                if (line.trim() === '') return <br key={i} />;
                return <p key={i} className="text-sm text-text-secondary mb-2">{line}</p>;
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-surface-light/30">
            <div className="flex items-center gap-4">
              <span className="text-xs text-text-muted flex items-center gap-1">
                <Clock className="w-3 h-3" />
                1,247 words
              </span>
              <span className="text-xs text-success flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                SEO Score: 92
              </span>
              <span className="text-xs text-text-muted">Readability: A</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-text-muted hover:text-text-primary hover:bg-surface-lighter transition-colors">
                <RotateCcw className="w-3.5 h-3.5" />
                Regenerate
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-text-muted hover:text-text-primary hover:bg-surface-lighter transition-colors">
                <Eye className="w-3.5 h-3.5" />
                Preview
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-primary-light bg-primary/10 hover:bg-primary/20 transition-colors">
                <Share2 className="w-3.5 h-3.5" />
                Approve
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
