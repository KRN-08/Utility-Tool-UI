import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

interface FeatureCardProps {
  title: string;
  description: string;
  category?: string;
  isSelected?: boolean;
  onToggle?: () => void;
}

export function FeatureCard({ title, description, category, isSelected, onToggle }: FeatureCardProps) {
  return (
    <div 
      className={cn(
        "group relative p-4 rounded-lg border transition-all duration-200 cursor-pointer overflow-hidden",
        isSelected 
          ? "bg-primary/10 border-primary/50 shadow-[0_0_15px_-5px_hsl(var(--primary)/0.3)]" 
          : "bg-card/50 border-border hover:border-primary/30 hover:bg-card"
      )}
      onClick={onToggle}
    >
      {/* Selection Glow */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
      )}
      
      <div className="flex items-start gap-3 relative z-10">
        <Checkbox checked={isSelected} className="mt-1" />
        <div>
          <div className="flex items-center gap-2">
            <h3 className={cn("font-medium text-sm", isSelected ? "text-primary" : "text-foreground")}>
              {title}
            </h3>
            {category && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-muted-foreground uppercase tracking-wider">
                {category}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
