import React from 'react';
import { Layout } from '@/components/Layout';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Config() {
  return (
    <Layout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configuration</h1>
          <p className="text-muted-foreground">Manage KRN-08 settings and preferences.</p>
        </div>

        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Customize how KRN-08 behaves.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Check for updates on startup</Label>
                <p className="text-sm text-muted-foreground">Automatically notify when a new version is available.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-border/50" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Force dark theme across the application.</p>
              </div>
              <Switch defaultChecked disabled />
            </div>
             <Separator className="bg-border/50" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Expert Mode</Label>
                <p className="text-sm text-muted-foreground">Show advanced tweaks that may be risky.</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle>Winget Configuration</CardTitle>
            <CardDescription>Settings for the package manager.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="source">Custom Source URL</Label>
              <div className="flex gap-2">
                <Input type="text" id="source" placeholder="https://winget.azureedge.net/cache" className="bg-black/20" />
                <Button variant="secondary">Update</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
            <Button variant="destructive" className="opacity-80 hover:opacity-100">Reset All Settings</Button>
        </div>
      </div>
    </Layout>
  );
}
