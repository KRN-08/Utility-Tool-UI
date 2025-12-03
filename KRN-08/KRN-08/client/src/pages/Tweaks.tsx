import React from 'react';
import { Layout } from '@/components/Layout';
import { FeatureCard } from '@/components/FeatureCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTerminal } from '@/context/TerminalContext';
import { useToast } from '@/hooks/use-toast';

export default function Tweaks() {
  const [selectedTweaks, setSelectedTweaks] = React.useState<string[]>(['restorepoint']);
  const { simulateCommand } = useTerminal();
  const { toast } = useToast();
  const [isApplying, setIsApplying] = React.useState(false);

  const toggleTweak = (id: string) => {
    if (selectedTweaks.includes(id)) {
      setSelectedTweaks(selectedTweaks.filter(t => t !== id));
    } else {
      setSelectedTweaks([...selectedTweaks, id]);
    }
  };

  const applyTweaks = async () => {
    setIsApplying(true);
    
    if (selectedTweaks.includes('restorepoint')) {
       await simulateCommand('Checkpoint-Computer -Description "KRN-08 Backup" -RestorePointType "MODIFY_SETTINGS"', ['Creating System Restore Point... [Done]']);
    }

    for (const tweak of selectedTweaks) {
      if (tweak === 'restorepoint') continue; // already handled
      
      await simulateCommand(
        `Apply-Tweak -Id ${tweak}`,
        [
           `Applying tweak: ${tweak}...`,
           `Modifying Registry keys...`,
           `Done.`
        ]
      );
    }

    toast({ title: "Tweaks Applied", description: "System settings have been updated." });
    setIsApplying(false);
  };

  const tweaks = {
    essential: [
      { id: 'restorepoint', title: 'Create Restore Point', desc: 'Always recommended before making changes.' },
      { id: 'ooshutup', title: 'Run O&O ShutUp10', desc: 'Import recommended privacy settings.' },
      { id: 'wifisense', title: 'Disable Wi-Fi Sense', desc: 'Stop sharing Wi-Fi credentials automatically.' },
    ],
    ui: [
      { id: 'bingsearch', title: 'Disable Bing Search', desc: 'Remove Bing results from Start Menu.' },
      { id: 'oldcontext', title: 'Old Context Menus', desc: 'Restore Windows 10 style right-click menus.' },
      { id: 'secondsclock', title: 'Show Seconds in Clock', desc: 'Display seconds in the system tray clock.' },
    ],
    performance: [
      { id: 'ultimaperf', title: 'Ultimate Performance Plan', desc: 'Unlock hidden power plan for high-end PCs.' },
      { id: 'gamebar', title: 'Disable Game Bar', desc: 'Free up resources if you don\'t use Xbox features.' },
      { id: 'hibernation', title: 'Disable Hibernation', desc: 'Save disk space (approx. equal to RAM size).' },
    ]
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">System Tweaks</h1>
            <p className="text-muted-foreground">Optimize your Windows experience.</p>
          </div>
          <Button 
            onClick={applyTweaks}
            disabled={isApplying}
            className="bg-primary text-black hover:bg-primary/90 shadow-[0_0_15px_-5px_hsl(var(--primary))]"
          >
            {isApplying ? 'Applying...' : 'Apply Selected Tweaks'}
          </Button>
        </div>

        <Tabs defaultValue="essential" className="w-full">
          <TabsList className="bg-white/5 border border-white/5 p-1">
            <TabsTrigger value="essential">Essential</TabsTrigger>
            <TabsTrigger value="ui">Interface</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          {Object.entries(tweaks).map(([category, items]) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map(item => (
                  <FeatureCard
                    key={item.id}
                    title={item.title}
                    description={item.desc}
                    isSelected={selectedTweaks.includes(item.id)}
                    onToggle={() => toggleTweak(item.id)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
}
