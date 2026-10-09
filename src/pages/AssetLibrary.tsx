import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FolderOpen, Search, Plus, Upload, Grid, List,
  Image, FileText, Video, Music, Download, Trash2,
  Eye, Tag, Clock, User, MoreHorizontal, Filter
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.03 } }
};
const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 }
};

const folders = [
  { name: 'Brand Assets', count: 24, icon: FolderOpen, color: 'text-amber-400' },
  { name: 'Campaign Images', count: 156, icon: FolderOpen, color: 'text-blue-400' },
  { name: 'Blog Graphics', count: 89, icon: FolderOpen, color: 'text-purple-400' },
  { name: 'Social Media', count: 234, icon: FolderOpen, color: 'text-pink-400' },
  { name: 'Videos', count: 42, icon: FolderOpen, color: 'text-green-400' },
  { name: 'Templates', count: 18, icon: FolderOpen, color: 'text-cyan-400' },
];

const assets = [
  { name: 'hero-banner-q1.png', type: 'image', size: '2.4 MB', uploadedBy: 'Priya', uploadedAt: '2 days ago', tags: ['brand', 'hero'], color: 'from-purple-500 to-pink-500' },
  { name: 'product-launch-video.mp4', type: 'video', size: '48.2 MB', uploadedBy: 'Rahul', uploadedAt: '3 days ago', tags: ['campaign', 'video'], color: 'from-blue-500 to-cyan-500' },
  { name: 'team-photo-2026.jpg', type: 'image', size: '1.8 MB', uploadedBy: 'Amey', uploadedAt: '1 week ago', tags: ['team', 'about'], color: 'from-green-500 to-emerald-500' },
  { name: 'blog-template-v2.fig', type: 'file', size: '12.4 MB', uploadedBy: 'Ananya', uploadedAt: '4 days ago', tags: ['template', 'blog'], color: 'from-amber-500 to-orange-500' },
  { name: 'social-post-carousel.psd', type: 'image', size: '8.9 MB', uploadedBy: 'Priya', uploadedAt: '5 days ago', tags: ['social', 'carousel'], color: 'from-rose-500 to-red-500' },
  { name: 'podcast-ep-42.mp3', type: 'audio', size: '32.1 MB', uploadedBy: 'Rahul', uploadedAt: '1 week ago', tags: ['podcast', 'audio'], color: 'from-indigo-500 to-violet-500' },
  { name: 'logo-variations.svg', type: 'image', size: '245 KB', uploadedBy: 'Amey', uploadedAt: '2 weeks ago', tags: ['brand', 'logo'], color: 'from-teal-500 to-cyan-500' },
  { name: 'case-study-template.docx', type: 'file', size: '1.2 MB', uploadedBy: 'Ananya', uploadedAt: '3 days ago', tags: ['template', 'case-study'], color: 'from-pink-500 to-rose-500' },
  { name: 'testimonial-video.mp4', type: 'video', size: '67.8 MB', uploadedBy: 'Priya', uploadedAt: '6 days ago', tags: ['testimonial', 'video'], color: 'from-purple-500 to-indigo-500' },
  { name: 'infographic-ai-hiring.png', type: 'image', size: '3.4 MB', uploadedBy: 'Rahul', uploadedAt: '1 week ago', tags: ['infographic', 'ai'], color: 'from-cyan-500 to-blue-500' },
  { name: 'brand-guidelines.pdf', type: 'file', size: '5.6 MB', uploadedBy: 'Amey', uploadedAt: '2 weeks ago', tags: ['brand', 'guidelines'], color: 'from-amber-500 to-yellow-500' },
  { name: 'email-header-template.html', type: 'file', size: '124 KB', uploadedBy: 'Ananya', uploadedAt: '4 days ago', tags: ['email', 'template'], color: 'from-green-500 to-teal-500' },
];

const typeIcons: Record<string, typeof Image> = {
  image: Image,
  video: Video,
  audio: Music,
  file: FileText,
};

export default function AssetLibrary() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssets = assets.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.tags.some(t => t.includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-6">
        <motion.div variants={item} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
              <FolderOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Asset Library</h1>
              <p className="text-sm text-text-secondary">Images, videos, documents & brand assets</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white text-sm font-medium hover:opacity-90 transition-opacity">
            <Upload className="w-4 h-4" />
            Upload
          </button>
        </motion.div>
      </motion.div>

      {/* Folders */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <h3 className="text-sm font-semibold text-text-primary mb-3">Folders</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {folders.map((folder) => (
            <motion.button
              key={folder.name}
              whileHover={{ scale: 1.02, y: -2 }}
              className="glass-card rounded-xl p-3 text-left hover:border-primary/30 transition-all"
            >
              <folder.icon className={`w-6 h-6 ${folder.color} mb-2`} />
              <p className="text-xs font-medium text-text-primary truncate">{folder.name}</p>
              <p className="text-[10px] text-text-muted">{folder.count} files</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Search & View Toggle */}
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
            placeholder="Search assets by name or tag..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-light border border-border text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-surface-light border border-border text-sm text-text-secondary hover:text-text-primary transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
        <div className="flex items-center gap-1 bg-surface-light border border-border rounded-lg p-1">
          <button
            onClick={() => setView('grid')}
            className={`p-1.5 rounded ${view === 'grid' ? 'bg-primary/15 text-primary-light' : 'text-text-muted hover:text-text-primary'}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-1.5 rounded ${view === 'list' ? 'bg-primary/15 text-primary-light' : 'text-text-muted hover:text-text-primary'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Assets Grid/List */}
      {view === 'grid' ? (
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredAssets.map((asset) => {
            const Icon = typeIcons[asset.type] || FileText;
            return (
              <motion.div
                key={asset.name}
                variants={item}
                whileHover={{ scale: 1.02, y: -2 }}
                className="glass-card rounded-xl overflow-hidden hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className={`aspect-video bg-gradient-to-br ${asset.color} flex items-center justify-center relative`}>
                  <Icon className="w-8 h-8 text-white/80" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium text-text-primary truncate mb-1">{asset.name}</p>
                  <div className="flex items-center justify-between text-[10px] text-text-muted">
                    <span>{asset.size}</span>
                    <span>{asset.uploadedAt}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2 flex-wrap">
                    {asset.tags.map((tag) => (
                      <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full bg-surface-lighter text-text-muted">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <motion.div variants={container} initial="hidden" animate="show" className="glass-card rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-surface-light/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-text-muted">Name</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-text-muted">Type</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-text-muted">Size</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-text-muted">Uploaded By</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-text-muted">Date</th>
                <th className="text-right px-4 py-2.5 text-xs font-medium text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => {
                const Icon = typeIcons[asset.type] || FileText;
                return (
                  <motion.tr
                    key={asset.name}
                    variants={item}
                    className="border-b border-border/30 hover:bg-surface-lighter/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-text-muted" />
                        <span className="text-sm text-text-primary">{asset.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-text-muted capitalize">{asset.type}</td>
                    <td className="px-4 py-3 text-xs text-text-muted">{asset.size}</td>
                    <td className="px-4 py-3 text-xs text-text-muted">{asset.uploadedBy}</td>
                    <td className="px-4 py-3 text-xs text-text-muted">{asset.uploadedAt}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1 rounded hover:bg-surface-lighter text-text-muted hover:text-text-primary transition-colors">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1 rounded hover:bg-surface-lighter text-text-muted hover:text-text-primary transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
