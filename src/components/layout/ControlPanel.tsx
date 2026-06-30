import React from 'react';
import { Play, Pause, StepForward, RotateCcw } from 'lucide-react';

interface ControlPanelProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
}

export function ControlPanel({
  isPlaying,
  onPlay,
  onPause,
  onStep,
  onReset,
  speed,
  onSpeedChange,
}: ControlPanelProps) {
  // Map internal speed (ms per step) to a slider value (1-100) where 100 is fastest (e.g., 50ms) and 1 is slowest (e.g., 2000ms)
  // Let's use a simpler approach for the slider: inverse mapping
  const sliderValue = 2050 - speed; // If speed is 500, value is 1550

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    onSpeedChange(2050 - val);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-2xl border rounded-full px-6 py-3 flex items-center space-x-6 shadow-2xl">
      <button onClick={onReset} className="p-2 hover:bg-accent rounded-full transition-all text-muted-foreground hover:text-foreground">
        <RotateCcw size={20} />
      </button>
      
      {isPlaying ? (
        <button onClick={onPause} className="p-3 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full transition-all shadow-lg shadow-destructive/20">
          <Pause size={24} />
        </button>
      ) : (
        <button onClick={onPlay} className="p-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full transition-all shadow-lg shadow-primary/20">
          <Play size={24} className="ml-1" />
        </button>
      )}

      <button onClick={onStep} className="p-2 hover:bg-accent rounded-full transition-all text-muted-foreground hover:text-foreground">
        <StepForward size={20} />
      </button>

      <div className="w-px h-6 bg-border mx-2"></div>
      
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-muted-foreground w-12">Speed</span>
        <input 
          type="range" 
          min="50" 
          max="2000" 
          step="50"
          value={sliderValue} 
          onChange={handleSpeedChange}
          className="w-24 accent-primary" 
        />
      </div>
    </div>
  );
}
