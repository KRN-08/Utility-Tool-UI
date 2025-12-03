import React, { createContext, useContext, useState, useCallback } from 'react';

interface LogEntry {
  id: string;
  text: string;
  type?: 'info' | 'success' | 'warning' | 'error' | 'command';
  timestamp: number;
}

interface TerminalContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  logs: LogEntry[];
  addLog: (text: string, type?: LogEntry['type']) => void;
  clearLogs: () => void;
  simulateCommand: (command: string, output: string[], delay?: number) => Promise<void>;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 'init-1', text: '> Initializing KRN-08 environment...', type: 'info', timestamp: Date.now() },
    { id: 'init-2', text: '> Loading modules... [Done]', type: 'info', timestamp: Date.now() + 1 },
    { id: 'init-3', text: '> Checking system requirements... [Win 11 23H2 Detected]', type: 'info', timestamp: Date.now() + 2 },
    { id: 'init-4', text: '> Ready for commands.', type: 'success', timestamp: Date.now() + 3 },
  ]);

  const addLog = useCallback((text: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [...prev, { 
      id: Math.random().toString(36).substring(7), 
      text, 
      type, 
      timestamp: Date.now() 
    }]);
    // Auto-scroll logic is handled in the component via useEffect
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const simulateCommand = useCallback(async (command: string, output: string[], delay = 500) => {
    setIsOpen(true);
    addLog(`> ${command}`, 'command');
    
    for (const line of output) {
      await new Promise(resolve => setTimeout(resolve, delay));
      addLog(line);
    }
    
    await new Promise(resolve => setTimeout(resolve, delay));
    addLog('> Done.', 'success');
  }, [addLog]);

  return (
    <TerminalContext.Provider value={{ isOpen, setIsOpen, logs, addLog, clearLogs, simulateCommand }}>
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
}
