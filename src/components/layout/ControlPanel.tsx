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
    <div className="bg-white border border-slate-200 rounded-full px-6 py-3 flex items-center space-x-6 shadow-sm">
      <button onClick={onReset} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-500 hover:text-slate-800">
        <RotateCcw size={20} />
      </button>
      
      {isPlaying ? (
        <button onClick={onPause} className="p-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-full transition-all">
          <Pause size={24} />
        </button>
      ) : (
        <button onClick={onPlay} className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-full transition-all">
          <Play size={24} className="ml-1" />
        </button>
      )}

      <button onClick={onStep} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-500 hover:text-slate-800">
        <StepForward size={20} />
      </button>

      <div className="w-px h-6 bg-slate-200 mx-2"></div>
      
      <div className="flex items-center space-x-3">
        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Speed</span>
        <input 
          type="range" 
          min="50" 
          max="2000" 
          step="50"
          value={sliderValue} 
          onChange={handleSpeedChange}
          className="w-24 accent-blue-500" 
        />
      </div>
    </div>
  );
}
