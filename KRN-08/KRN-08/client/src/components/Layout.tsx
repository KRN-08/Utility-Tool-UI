import React from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Settings, 
  Sliders, 
  Download, 
  Terminal, 
  Menu,
  X,
  Minus,
  Square
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TerminalOutput } from './TerminalOutput';
import { useTerminal } from '@/context/TerminalContext';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const { isOpen, setIsOpen } = useTerminal();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: Download, label: 'Install', href: '/install' },
    { icon: Sliders, label: 'Tweaks', href: '/tweaks' },
    { icon: Settings, label: 'Config', href: '/config' },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-sidebar-border bg-sidebar flex flex-col">
        <div className="p-4 h-14 flex items-center border-b border-sidebar-border/50">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center text-primary border border-primary/50">
              <Terminal size={18} />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              KRN-08
            </span>
          </div>
        </div>

        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_3px_0_0_0_hsl(var(--primary))]" 
                      : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t border-sidebar-border/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>v0.8.0-beta</span>
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Custom Titlebar/Header area */}
        <header className="h-14 border-b border-border/40 flex items-center justify-between px-6 bg-background/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-mono">C:\Users\Admin\KRN-08\</span>
            <span className="text-primary animate-pulse">_</span>
          </div>
          
          {/* Window Controls Mockup */}
          <div className="flex items-center gap-4">
             <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 hover:bg-white/5"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Terminal size={16} className={isOpen ? "text-primary" : "text-muted-foreground"} />
            </Button>
            <div className="flex items-center gap-1 pl-4 border-l border-border/40">
              <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50 hover:bg-yellow-500 transition-colors" />
              <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50 hover:bg-green-500 transition-colors" />
              <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50 hover:bg-red-500 transition-colors" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden flex flex-col">
          <ScrollArea className="flex-1 p-6">
            <div className="max-w-5xl mx-auto space-y-8 pb-20">
              {children}
            </div>
          </ScrollArea>

          {/* Terminal Panel */}
          {isOpen && (
            <div className="h-48 border-t border-border bg-black/40 backdrop-blur-xl flex-shrink-0 transition-all duration-300 ease-in-out">
               <TerminalOutput />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
