import React from 'react';
import { Layout } from '@/components/Layout';
import { FeatureCard } from '@/components/FeatureCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2, RefreshCw, Download } from 'lucide-react';
import { useTerminal } from '@/context/TerminalContext';
import { useToast } from '@/hooks/use-toast';

export default function Install() {
  const [selectedPackages, setSelectedPackages] = React.useState<string[]>([]);
  const { simulateCommand } = useTerminal();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const togglePackage = (id: string) => {
    if (selectedPackages.includes(id)) {
      setSelectedPackages(selectedPackages.filter(p => p !== id));
    } else {
      setSelectedPackages([...selectedPackages, id]);
    }
  };

  const handleInstall = async () => {
    setIsProcessing(true);
    for (const pkg of selectedPackages) {
      await simulateCommand(
        `winget install -e --id ${pkg}`,
        [
          'Found ' + pkg,
          'Downloading installer...',
          '  ████████████████████ 100%',
          'Verifying hash...',
          'Installing package...',
          'Successfully installed!'
        ]
      );
    }
    toast({
      title: "Installation Complete",
      description: `Successfully installed ${selectedPackages.length} application(s).`,
    });
    setIsProcessing(false);
    setSelectedPackages([]);
  };

  const handleUninstall = async () => {
    setIsProcessing(true);
    for (const pkg of selectedPackages) {
      await simulateCommand(
        `winget uninstall ${pkg}`,
        [
          'Found ' + pkg,
          'Starting uninstaller...',
          'Waiting for uninstaller to finish...',
          'Successfully uninstalled!'
        ]
      );
    }
    toast({
      title: "Uninstallation Complete",
      description: `Successfully uninstalled ${selectedPackages.length} application(s).`,
    });
    setIsProcessing(false);
    setSelectedPackages([]);
  };

  const handleUpgradeAll = async () => {
    setIsProcessing(true);
    await simulateCommand(
      'winget upgrade --all',
      [
        'Checking for updates...',
        'Found 3 updates.',
        '--------------------------------',
        'Upgrading Microsoft.PowerToys...',
        '  ████████████████████ 100%',
        'Upgrading Google.Chrome...',
        '  ████████████████████ 100%',
        'Upgrading Discord...',
        '  ████████████████████ 100%',
        '--------------------------------',
        'All packages are up to date.'
      ]
    );
    toast({
      title: "Upgrade Complete",
      description: "All applications have been updated to their latest versions.",
    });
    setIsProcessing(false);
  };

  const categories = {
    browsers: [
      { id: 'Google.Chrome', title: 'Google Chrome', desc: 'Fast and secure web browser.' },
      { id: 'Mozilla.Firefox', title: 'Firefox', desc: 'Privacy-focused web browser.' },
      { id: 'Brave.Brave', title: 'Brave', desc: 'Ad-blocking browser.' },
    ],
    dev: [
      { id: 'Microsoft.VisualStudioCode', title: 'VS Code', desc: 'Code editing. Redefined.' },
      { id: 'OpenJS.NodeJS', title: 'Node.js', desc: 'JavaScript runtime.' },
      { id: 'Git.Git', title: 'Git', desc: 'Version control system.' },
      { id: 'Python.Python.3.12', title: 'Python', desc: 'Programming language.' },
    ],
    gaming: [
      { id: 'Valve.Steam', title: 'Steam', desc: 'The ultimate destination for playing, discussing, and creating games.' },
      { id: 'Guru3D.Afterburner', title: 'MSI Afterburner', desc: 'Graphics card overclocking utility.' },
      { id: 'Nvidia.App', title: 'NVIDIA App', desc: 'Essential companion for gamers & creators.' },
    ],
    tools: [
      { id: '7zip.7zip', title: '7-Zip', desc: 'File archiver.' },
      { id: 'Microsoft.PowerToys', title: 'PowerToys', desc: 'System utilities.' },
      { id: 'Notepad++.Notepad++', title: 'Notepad++', desc: 'Text editor.' },
    ],
    runtimes: [
      { id: 'Microsoft.VCRedist.2015+.x64', title: 'Visual C++ Runtimes (AIO)', desc: 'All Visual C++ Redistributables 2005-2022.' },
      { id: 'Microsoft.DotNet.DesktopRuntime', title: '.NET Desktop Runtime', desc: 'Run desktop apps on Windows.' },
      { id: 'Microsoft.DirectX', title: 'DirectX End-User Runtime', desc: 'Legacy DirectX libraries for games.' },
    ]
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Package Installer</h1>
            <p className="text-muted-foreground">Select software to install via Winget.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              disabled={selectedPackages.length === 0 || isProcessing}
              onClick={handleInstall}
              className="bg-primary text-black hover:bg-primary/90 shadow-[0_0_15px_-5px_hsl(var(--primary))]"
            >
              {isProcessing ? 'Processing...' : `Install Selected (${selectedPackages.length})`}
            </Button>
            <Button 
              variant="destructive"
              disabled={selectedPackages.length === 0 || isProcessing}
              onClick={handleUninstall}
              className="shadow-sm"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Uninstall Selected
            </Button>
            <Button 
              variant="secondary"
              disabled={isProcessing}
              onClick={handleUpgradeAll}
              className="bg-white/10 hover:bg-white/20 text-foreground"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Upgrade All
            </Button>
            <Button
              variant="outline"
              disabled={selectedPackages.length === 0}
              onClick={() => {
                 const commands = [
                    '# KRN-08 Auto-Generated Installer Script',
                    '# Checks for Winget and installs selected packages',
                    '',
                    'Write-Host "Checking for Winget..." -ForegroundColor Cyan',
                    'if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {',
                    '    Write-Error "Winget not found! Please update App Installer from Microsoft Store."',
                    '    exit 1',
                    '}',
                    '',
                    'Write-Host "Starting Installation..." -ForegroundColor Green',
                    ...selectedPackages.map(pkg => `winget install -e --id ${pkg} --accept-package-agreements --accept-source-agreements`),
                    '',
                    'Write-Host "All tasks completed." -ForegroundColor Green',
                    'Pause'
                 ];
                 const scriptContent = commands.join('\r\n');
                 const blob = new Blob([scriptContent], { type: 'text/plain' });
                 const url = URL.createObjectURL(blob);
                 const a = document.createElement('a');
                 a.href = url;
                 a.download = 'install_packages.ps1';
                 document.body.appendChild(a);
                 a.click();
                 document.body.removeChild(a);
                 URL.revokeObjectURL(url);
                 toast({ title: "Script Downloaded", description: "Run this PowerShell script on your PC to install." });
              }}
              className="bg-transparent border-white/20 hover:bg-white/10"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Script
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-white/5 border border-white/5 p-1 h-auto flex-wrap justify-start">
            <TabsTrigger value="all">All Packages</TabsTrigger>
            <TabsTrigger value="browsers">Browsers</TabsTrigger>
            <TabsTrigger value="dev">Development</TabsTrigger>
            <TabsTrigger value="gaming">Gaming</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="runtimes">Runtimes</TabsTrigger>
          </TabsList>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {Object.entries(categories).map(([cat, items]) => (
               <React.Fragment key={cat}>
                 <TabsContent value={cat} className="contents">
                    {items.map(item => (
                      <FeatureCard
                          key={item.id}
                          title={item.title}
                          description={item.desc}
                          category={cat}
                          isSelected={selectedPackages.includes(item.id)}
                          onToggle={() => togglePackage(item.id)}
                      />
                    ))}
                 </TabsContent>
                 <TabsContent value="all" className="contents">
                    {items.map(item => (
                       <FeatureCard
                          key={`all-${item.id}`}
                          title={item.title}
                          description={item.desc}
                          category={cat}
                          isSelected={selectedPackages.includes(item.id)}
                          onToggle={() => togglePackage(item.id)}
                       />
                    ))}
                 </TabsContent>
               </React.Fragment>
             ))}
          </div>
        </Tabs>
      </div>
    </Layout>
  );
}
