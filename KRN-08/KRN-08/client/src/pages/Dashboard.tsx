import React from 'react';
import { Layout } from '@/components/Layout';
import { FeatureCard } from '@/components/FeatureCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Activity, HardDrive, Cpu, ShieldCheck } from 'lucide-react';
import { useTerminal } from '@/context/TerminalContext';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const [selectedTools, setSelectedTools] = React.useState<string[]>([]);
  const { simulateCommand } = useTerminal();
  const { toast } = useToast();

  const toggleTool = (id: string) => {
    if (selectedTools.includes(id)) {
      setSelectedTools(selectedTools.filter(t => t !== id));
    } else {
      setSelectedTools([...selectedTools, id]);
    }
  };

  const runOptimization = async () => {
    toast({ title: "Running Optimization", description: "System analysis started..." });
    await simulateCommand(
      'Invoke-KrnOptimization -Level High', 
      [
        'Analyzing system performance...',
        'Clearing temporary files... [2.4 GB Freed]',
        'Optimizing registry keys...',
        'Stopping unused services...',
        'Optimization complete.'
      ]
    );
    toast({ title: "Optimization Complete", description: "System performance improved." });
  };

  const checkUpdates = async () => {
    await simulateCommand(
      'winget upgrade',
      [
        'Checking for package updates...',
        'No updates found.'
      ]
    );
  };

  return (
    <Layout>
      <div className="space-y-8">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 p-6 rounded-xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
            <h1 className="text-3xl font-bold tracking-tight mb-2">System Status</h1>
            <p className="text-muted-foreground mb-6">All systems operational. No critical updates pending.</p>
            <div className="flex gap-4">
               <Button 
                 onClick={runOptimization}
                 className="bg-primary hover:bg-primary/90 text-black font-semibold shadow-[0_0_20px_-5px_hsl(var(--primary))]"
               >
                 Run Optimization
               </Button>
               <Button 
                 onClick={checkUpdates}
                 variant="outline" 
                 className="bg-black/20 backdrop-blur border-white/10 hover:bg-white/5"
               >
                 Check Updates
               </Button>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-card/50 border border-border flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <Activity className="text-green-400" />
              <span className="text-xs text-muted-foreground font-mono">CPU</span>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono">12%</div>
              <Progress value={12} className="h-1 mt-2 bg-white/5" indicatorClassName="bg-green-400" />
            </div>
          </div>

          <div className="p-6 rounded-xl bg-card/50 border border-border flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <HardDrive className="text-blue-400" />
              <span className="text-xs text-muted-foreground font-mono">RAM</span>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono">8.4 GB</div>
              <Progress value={45} className="h-1 mt-2 bg-white/5" indicatorClassName="bg-blue-400" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ShieldCheck className="text-primary" size={20} />
            Recommended Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard 
              title="Remove Bloatware" 
              description="Uninstall pre-installed Windows apps that are rarely used."
              category="Clean"
              isSelected={selectedTools.includes('bloat')}
              onToggle={() => toggleTool('bloat')}
            />
            <FeatureCard 
              title="Disable Telemetry" 
              description="Stop Windows from sending usage data to Microsoft servers."
              category="Privacy"
              isSelected={selectedTools.includes('telemetry')}
              onToggle={() => toggleTool('telemetry')}
            />
            <FeatureCard 
              title="Dark Mode Force" 
              description="Force system-wide dark mode for legacy apps."
              category="Style"
              isSelected={selectedTools.includes('darkmode')}
              onToggle={() => toggleTool('darkmode')}
            />
            <FeatureCard 
              title="Disable Background Apps" 
              description="Prevent apps from running in the background to save resources."
              category="Performance"
              isSelected={selectedTools.includes('bgapps')}
              onToggle={() => toggleTool('bgapps')}
            />
            <FeatureCard 
              title="Disable Recall" 
              description="Turn off Microsoft's Recall AI feature for enhanced privacy."
              category="Privacy"
              isSelected={selectedTools.includes('recall')}
              onToggle={() => toggleTool('recall')}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
