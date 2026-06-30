import React from 'react';
import { Play, Pause, StepForward, RotateCcw } from 'lucide-react';

export function ControlPanel() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-2xl border rounded-full px-6 py-3 flex items-center space-x-6 shadow-2xl">
      <button className="p-2 hover:bg-accent rounded-full transition-all">
        <RotateCcw size={20} />
      </button>
      <button className="p-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full transition-all shadow-lg shadow-primary/20">
        <Play size={24} className="ml-1" />
      </button>
      <button className="p-2 hover:bg-accent rounded-full transition-all">
        <StepForward size={20} />
      </button>
      <div className="w-px h-6 bg-border mx-2"></div>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-muted-foreground">Speed</span>
        <input type="range" className="w-24 accent-primary" />
      </div>
    </div>
  );
}
