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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 glass-panel rounded-full px-6 py-3 flex items-center space-x-6 z-50">
      <button onClick={onReset} className="p-2 hover:bg-white/10 rounded-full transition-all text-white/50 hover:text-white">
        <RotateCcw size={20} />
      </button>
      
      {isPlaying ? (
        <button onClick={onPause} className="p-3 bg-[#FF003C] text-black hover:bg-[#FF003C]/90 rounded-full transition-all glow-magenta">
          <Pause size={24} />
        </button>
      ) : (
        <button onClick={onPlay} className="p-3 bg-[#00F0FF] text-black hover:bg-[#00F0FF]/90 rounded-full transition-all glow-cyan">
          <Play size={24} className="ml-1" />
        </button>
      )}

      <button onClick={onStep} className="p-2 hover:bg-white/10 rounded-full transition-all text-white/50 hover:text-white">
        <StepForward size={20} />
      </button>

      <div className="w-px h-6 bg-white/10 mx-2"></div>
      
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-white/50 w-12 font-mono uppercase tracking-wider text-xs">Speed</span>
        <input 
          type="range" 
          min="50" 
          max="2000" 
          step="50"
          value={sliderValue} 
          onChange={handleSpeedChange}
          className="w-24 accent-[#00F0FF]" 
        />
      </div>
    </div>
  );
}
