import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TerminalProvider } from "@/context/TerminalContext";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Install from "@/pages/Install";
import Tweaks from "@/pages/Tweaks";
import Config from "@/pages/Config";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/install" component={Install} />
      <Route path="/tweaks" component={Tweaks} />
      <Route path="/config" component={Config} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TerminalProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </TerminalProvider>
    </QueryClientProvider>
  );
}

export default App;
