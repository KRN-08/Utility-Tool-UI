import React, { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTerminal } from '@/context/TerminalContext';
import { cn } from '@/lib/utils';

export function TerminalOutput() {
  const { logs } = useTerminal();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <div className="flex flex-col h-full font-mono text-xs">
      <div className="flex items-center justify-between px-4 py-1 bg-white/5 border-b border-white/5">
        <span className="text-muted-foreground">Output Console</span>
        <span className="text-[10px] text-muted-foreground">PowerShell 7.4.1</span>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-1">
          {logs.map((log) => (
            <div 
              key={log.id} 
              className={cn(
                "break-all",
                log.type === 'command' && "text-blue-400 font-bold mt-2",
                log.type === 'success' && "text-green-400",
                log.type === 'error' && "text-red-400",
                log.type === 'warning' && "text-yellow-400",
                log.type === 'info' && "text-foreground/80"
              )}
            >
              {log.text}
            </div>
          ))}
          <div className="flex items-center text-blue-400 pt-2">
            <span>&gt; Waiting for user input...</span>
            <span className="animate-pulse ml-1">_</span>
          </div>
          <div ref={bottomRef} />
        </div>
      </ScrollArea>
    </div>
  );
}
