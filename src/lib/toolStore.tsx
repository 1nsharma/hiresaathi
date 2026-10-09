/**
 * Global state for Composio tool connections
 * Simple React context-based store
 */

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ALL_APPS, ToolConnection, connectTool as composioConnect } from './composio';

interface ToolStore {
  connectedTools: Map<string, ToolConnection>;
  connectionIds: Map<string, string>; // appId -> connectionId
  isConnecting: Set<string>;
  composioApiKey: string | null;
  connectTool: (appId: string) => Promise<boolean>;
  disconnectTool: (appId: string) => void;
  setApiKey: (key: string) => void;
  getConnectedAppIds: () => string[];
  isConnected: (appId: string) => boolean;
}

const ToolStoreContext = createContext<ToolStore | null>(null);

// Load initial state from localStorage
function loadInitialState(): Map<string, ToolConnection> {
  if (typeof window === 'undefined') return new Map();
  const saved = localStorage.getItem('hiresaathi_connected_tools');
  if (!saved) return new Map();
  try {
    const parsed = JSON.parse(saved);
    return new Map(Object.entries(parsed));
  } catch {
    return new Map();
  }
}

function saveToStorage(tools: Map<string, ToolConnection>) {
  if (typeof window === 'undefined') return;
  const obj = Object.fromEntries(tools);
  localStorage.setItem('hiresaathi_connected_tools', JSON.stringify(obj));
}

export function ToolStoreProvider({ children }: { children: ReactNode }) {
  const [connectedTools, setConnectedTools] = useState<Map<string, ToolConnection>>(loadInitialState);
  const [connectionIds, setConnectionIds] = useState<Map<string, string>>(new Map());
  const [isConnecting, setIsConnecting] = useState<Set<string>>(new Set());
  const [composioApiKey, setComposioApiKeyState] = useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('hiresaathi_composio_api_key') : null
  );

  const connectTool = useCallback(async (appId: string): Promise<boolean> => {
    setIsConnecting(prev => new Set(prev).add(appId));
    
    try {
      const result = await composioConnect(appId);
      if (result.success) {
        const app = ALL_APPS.find(a => a.id === appId);
        if (!app) return false;

        const connection: ToolConnection = {
          appId: app.id,
          appName: app.name,
          icon: app.icon,
          category: app.category,
          status: 'connected',
          connectedAt: new Date().toISOString(),
          actions: app.actions,
        };

        setConnectedTools(prev => {
          const next = new Map(prev);
          next.set(appId, connection);
          saveToStorage(next);
          return next;
        });

        setConnectionIds(prev => {
          const next = new Map(prev);
          next.set(appId, result.connectionId);
          return next;
        });

        return true;
      }
      return false;
    } finally {
      setIsConnecting(prev => {
        const next = new Set(prev);
        next.delete(appId);
        return next;
      });
    }
  }, []);

  const disconnectTool = useCallback((appId: string) => {
    setConnectedTools(prev => {
      const next = new Map(prev);
      next.delete(appId);
      saveToStorage(next);
      return next;
    });
    setConnectionIds(prev => {
      const next = new Map(prev);
      next.delete(appId);
      return next;
    });
  }, []);

  const setApiKey = useCallback((key: string) => {
    setComposioApiKeyState(key);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hiresaathi_composio_api_key', key);
    }
  }, []);

  const getConnectedAppIds = useCallback(() => {
    return Array.from(connectedTools.keys());
  }, [connectedTools]);

  const isConnected = useCallback((appId: string) => {
    return connectedTools.has(appId);
  }, [connectedTools]);

  return (
    <ToolStoreContext.Provider value={{
      connectedTools,
      connectionIds,
      isConnecting,
      composioApiKey,
      connectTool,
      disconnectTool,
      setApiKey,
      getConnectedAppIds,
      isConnected,
    }}>
      {children}
    </ToolStoreContext.Provider>
  );
}

export function useToolStore(): ToolStore {
  const ctx = useContext(ToolStoreContext);
  if (!ctx) throw new Error('useToolStore must be used within ToolStoreProvider');
  return ctx;
}
