import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare, Bot, Users, CheckCircle2, Clock,
  AlertCircle, TrendingUp, Send, Paperclip, Smile,
  Mic, MoreHorizontal, ArrowRight, Zap, Star
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } }
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 }
};

const conversations = [
  { id: '1', name: 'Priya Sharma', lastMsg: 'Can you help me with the onboarding process?', time: '2m', unread: 2, avatar: 'PS', status: 'online', bot: false },
  { id: '2', name: 'Rahul Verma', lastMsg: 'Thanks! That resolved my issue.', time: '15m', unread: 0, avatar: 'RV', status: 'online', bot: false },
  { id: '3', name: 'Bot: FAQ Assistant', lastMsg: 'Handled 47 queries today', time: '1h', unread: 0, avatar: '🤖', status: 'active', bot: true },
  { id: '4', name: 'Ananya Patel', lastMsg: 'When will my application be reviewed?', time: '2h', unread: 1, avatar: 'AP', status: 'offline', bot: false },
  { id: '5', name: 'Bot: Resume Helper', lastMsg: 'Parsed 128 resumes this week', time: '3h', unread: 0, avatar: '🤖', status: 'active', bot: true },
  { id: '6', name: 'Vikram Singh', lastMsg: 'I need help updating my profile', time: '5h', unread: 0, avatar: 'VS', status: 'offline', bot: false },
];

const messages = [
  { id: '1', sender: 'user', text: 'Hi, I applied for the Senior Developer position last week. Can you tell me the status?', time: '10:30 AM' },
  { id: '2', sender: 'bot', text: 'Hello Priya! I can see your application for the Senior Full-Stack Developer role. Let me check the current status for you.', time: '10:30 AM' },
  { id: '3', sender: 'bot', text: 'Your application has been reviewed by our AI matching system with a 94% match score. You\'ve been shortlisted for the next round!', time: '10:31 AM' },
  { id: '4', sender: 'user', text: 'That\'s great news! When will the interview be scheduled?', time: '10:32 AM' },
  { id: '5', sender: 'bot', text: 'The hiring team typically schedules interviews within 3-5 business days. I\'ll send you a notification as soon as it\'s confirmed. Would you like me to share any preparation resources in the meantime?', time: '10:32 AM' },
  { id: '6', sender: 'user', text: 'Yes please! That would be very helpful.', time: '10:33 AM' },
  { id: '7', sender: 'bot', text: 'Here are some resources:\n\n📚 Tech Stack Overview: React, Node.js, AWS\n🎯 Common Interview Topics: System Design, DSA, Behavioral\n📹 Mock Interview Link: Available in your dashboard\n\nGood luck! 🍀', time: '10:34 AM' },
];

const stats = [
  { label: 'Open Tickets', value: '24', icon: MessageSquare, color: 'text-blue-400' },
  { label: 'Resolved Today', value: '47', icon: CheckCircle2, color: 'text-green-400' },
  { label: 'Avg Response', value: '1.2s', icon: Clock, color: 'text-purple-400' },
  { label: 'CSAT Score', value: '4.8/5', icon: Star, color: 'text-amber-400' },
];

export default function Support() {
  const [selectedChat, setSelectedChat] = useState('1');
  const [message, setMessage] = useState('');

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-6">
        <motion.div variants={item} className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">AI Support</h1>
            <p className="text-sm text-text-secondary">Chatbots, tickets & human handoff</p>
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

      {/* Chat Interface */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[500px]"
      >
        {/* Conversations List */}
        <div className="glass-card rounded-xl overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-semibold text-text-primary text-sm">Conversations</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-border/30 ${
                  selectedChat === conv.id ? 'bg-primary/10' : 'hover:bg-surface-lighter/50'
                }`}
              >
                <div className="relative">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                    conv.bot ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 text-purple-300' : 'bg-gradient-to-br from-primary/30 to-accent/30 text-text-primary'
                  }`}>
                    {conv.avatar}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-surface-light ${
                    conv.status === 'online' ? 'bg-success' :
                    conv.status === 'active' ? 'bg-primary-light' :
                    'bg-text-muted'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text-primary truncate">{conv.name}</span>
                    <span className="text-[10px] text-text-muted">{conv.time}</span>
                  </div>
                  <p className="text-xs text-text-muted truncate">{conv.lastMsg}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 glass-card rounded-xl overflow-hidden flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-xs font-bold text-text-primary">
                PS
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-primary">Priya Sharma</h4>
                <p className="text-[10px] text-success flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-success" />
                  Online · AI Bot handling
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-lg text-xs bg-warning/10 text-warning hover:bg-warning/20 transition-colors">
                <Zap className="w-3 h-3 inline mr-1" />
                Take Over
              </button>
              <button className="p-1.5 rounded-lg hover:bg-surface-lighter text-text-muted transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] px-3 py-2 rounded-xl text-sm ${
                  msg.sender === 'user'
                    ? 'bg-primary/20 text-text-primary rounded-br-sm'
                    : 'bg-surface-lighter text-text-secondary rounded-bl-sm'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className="text-[10px] text-text-muted mt-1 block">{msg.time}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-border">
            <button className="p-2 rounded-lg hover:bg-surface-lighter text-text-muted transition-colors">
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message or let AI handle it..."
              className="flex-1 px-3 py-2 rounded-lg bg-surface border border-border text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50"
            />
            <button className="p-2 rounded-lg hover:bg-surface-lighter text-text-muted transition-colors">
              <Smile className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg hover:bg-surface-lighter text-text-muted transition-colors">
              <Mic className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg bg-primary/20 text-primary-light hover:bg-primary/30 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
