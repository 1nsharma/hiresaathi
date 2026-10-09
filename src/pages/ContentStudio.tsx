import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PenTool, Wand2, CheckCircle2, Clock, Sparkles,
  Loader2, ArrowRight, Zap, AlertCircle, Play,
  FileText, Share2, Eye, RotateCcw
} from 'lucide-react';
import { AGENT_TOOL_CONFIGS } from '../lib/composio';
import { executeAgent, AgentExecution, AgentStep } from '../lib/agentRuntime';
import { useToolStore } from '../lib/toolStore';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } }
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 }
};

const agentOptions = AGENT_TOOL_CONFIGS.map(a => ({
  id: a.agentId,
  name: a.agentName,
  desc: a.description,
  tools: a.requiredTools,
}));

export default function ContentStudio() {
  const [selectedAgent, setSelectedAgent] = useState(agentOptions[0].id);
  const [taskInput, setTaskInput] = useState('');
  const [execution, setExecution] = useState<AgentExecution | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const { connectedTools, connectionIds, isConnected } = useToolStore();

  const selectedAgentConfig = agentOptions.find(a => a.id === selectedAgent);
  const connectedAppIds = Array.from(connectedTools.keys());
  const missingTools = selectedAgentConfig?.tools.filter(t => !isConnected(t)) || [];
  const allToolsReady = missingTools.length === 0;

  const handleRunAgent = async () => {
    if (!taskInput.trim()) return;
    setIsRunning(true);
    setExecution(null);

    const result = await executeAgent(
      { agentId: selectedAgent, input: taskInput },
      connectionIds
    );

    setExecution(result);
    setIsRunning(false);
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
            <p className="text-sm text-text-secondary">AI agents with Composio tool execution</p>
          </div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent Selection & Input */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {/* Agent Selector */}
          <div className="glass-card rounded-xl p-4">
            <h3 className="font-semibold text-text-primary text-sm mb-3">Select Agent</h3>
            <div className="space-y-1.5 max-h-[200px] overflow-y-auto">
              {agentOptions.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent.id)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs transition-all ${
                    selectedAgent === agent.id
                      ? 'bg-primary/15 text-primary-light border border-primary/30'
                      : 'text-text-secondary hover:bg-surface-lighter hover:text-text-primary border border-transparent'
                  }`}
                >
                  <p className="font-medium">{agent.name}</p>
                  <p className="text-[10px] text-text-muted mt-0.5 line-clamp-1">{agent.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Tool Requirements */}
          <div className="glass-card rounded-xl p-4">
            <h3 className="font-semibold text-text-primary text-sm mb-3">Required Tools</h3>
            <div className="space-y-1.5">
              {selectedAgentConfig?.tools.map((tool) => {
                const connected = isConnected(tool);
                return (
                  <div key={tool} className="flex items-center gap-2">
                    {connected ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-warning" />
                    )}
                    <span className={`text-xs ${connected ? 'text-text-primary' : 'text-text-muted'}`}>
                      {tool}
                    </span>
                    {connected && <span className="text-[10px] text-success ml-auto">Ready</span>}
                  </div>
                );
              })}
            </div>
            {!allToolsReady && (
              <div className="mt-3 p-2 rounded-lg bg-warning/5 border border-warning/20">
                <p className="text-[10px] text-warning">
                  ⚠ {missingTools.length} tool(s) not connected. Connect via MCP Connect page.
                </p>
              </div>
            )}
          </div>

          {/* Task Input */}
          <div className="glass-card rounded-xl p-4">
            <h3 className="font-semibold text-text-primary text-sm mb-3">Task</h3>
            <textarea
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Describe what you want the agent to do..."
              rows={4}
              className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50 resize-none"
            />
            <button
              onClick={handleRunAgent}
              disabled={isRunning || !taskInput.trim()}
              className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-primary to-accent text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Agent Running...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Execute Agent
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Execution Log */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-2 glass-card rounded-xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface-light/50">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary-light" />
              <h3 className="font-semibold text-text-primary text-sm">Agent Execution Log</h3>
            </div>
            {execution && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                execution.status === 'completed' ? 'bg-success/10 text-success' :
                execution.status === 'failed' ? 'bg-danger/10 text-danger' :
                'bg-primary/15 text-primary-light'
              }`}>
                {execution.status}
              </span>
            )}
          </div>

          <div className="p-4 max-h-[500px] overflow-y-auto">
            {!execution && !isRunning && (
              <div className="text-center py-12">
                <Sparkles className="w-8 h-8 mx-auto mb-3 text-text-muted opacity-50" />
                <p className="text-sm text-text-muted">Select an agent and describe a task</p>
                <p className="text-xs text-text-muted mt-1">The agent will execute using connected Composio tools</p>
              </div>
            )}

            {isRunning && (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 mx-auto mb-3 text-primary-light animate-spin" />
                <p className="text-sm text-text-primary">Agent is executing...</p>
                <p className="text-xs text-text-muted mt-1">Connecting to Composio tools</p>
              </div>
            )}

            {execution && (
              <motion.div variants={container} initial="hidden" animate="show" className="space-y-2">
                {execution.steps.map((step, i) => (
                  <motion.div
                    key={step.id}
                    variants={item}
                    className={`p-3 rounded-lg border-l-2 ${
                      step.type === 'thinking' ? 'border-l-purple-500 bg-purple-500/5' :
                      step.type === 'tool_call' ? 'border-l-blue-500 bg-blue-500/5' :
                      step.type === 'tool_result' ? 'border-l-green-500 bg-green-500/5' :
                      'border-l-amber-500 bg-amber-500/5'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {step.type === 'thinking' && <Sparkles className="w-3.5 h-3.5 text-purple-400 mt-0.5" />}
                      {step.type === 'tool_call' && <Zap className="w-3.5 h-3.5 text-blue-400 mt-0.5" />}
                      {step.type === 'tool_result' && <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5" />}
                      {step.type === 'output' && <FileText className="w-3.5 h-3.5 text-amber-400 mt-0.5" />}
                      <div className="flex-1">
                        <p className="text-xs text-text-primary">{step.description}</p>
                        {step.tool && (
                          <p className="text-[10px] text-text-muted mt-1">
                            Tool: {step.tool} → {step.action}()
                          </p>
                        )}
                        {step.result !== undefined && step.result !== null && typeof step.result === 'object' && (
                          <pre className="text-[10px] text-text-muted mt-1 bg-surface/50 p-2 rounded overflow-x-auto">
                            {String(JSON.stringify(step.result, null, 2))}
                          </pre>
                        )}
                      </div>
                      <span className="text-[9px] text-text-muted">
                        {new Date(step.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {/* Final Result */}
                {execution.result !== undefined && execution.result !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
                  >
                    <h4 className="text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      Agent Output
                    </h4>
                    <pre className="text-xs text-text-secondary bg-surface/50 p-3 rounded overflow-x-auto">
                      {String(JSON.stringify(execution.result, null, 2))}
                    </pre>
                    <div className="flex items-center gap-2 mt-3">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-success/10 text-success text-xs hover:bg-success/20 transition-colors">
                        <CheckCircle2 className="w-3 h-3" />
                        Approve
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-lighter text-text-secondary text-xs hover:text-text-primary transition-colors">
                        <RotateCcw className="w-3 h-3" />
                        Regenerate
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary-light text-xs hover:bg-primary/20 transition-colors">
                        <Share2 className="w-3 h-3" />
                        Publish
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
