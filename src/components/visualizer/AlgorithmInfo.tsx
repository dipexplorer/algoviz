import React from 'react';
import { AlgorithmDetails } from '@/lib/data/algorithms';
import { Clock, HardDrive, Code2 } from 'lucide-react';

interface AlgorithmInfoProps {
  algorithm: AlgorithmDetails;
}

export function AlgorithmInfo({ algorithm }: AlgorithmInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pb-8">
      {/* Time Complexity Card */}
      <div className="glass-card rounded-2xl p-6 flex flex-col transition-all duration-300 hover:glow-cyan">
        <div className="flex items-center space-x-2 text-[#00F0FF] font-semibold mb-4">
          <Clock size={20} />
          <h3 className="text-lg tracking-wide uppercase">Time Complexity</h3>
        </div>
        <div className="space-y-4 flex-1">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-white/50 text-sm">Best Case</span>
            <span className="font-mono bg-[#39FF14]/10 border border-[#39FF14]/30 px-2 py-1 rounded text-sm text-[#39FF14] font-medium glow-lime">{algorithm.complexities.time.best}</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-white/50 text-sm">Average Case</span>
            <span className="font-mono bg-yellow-500/10 border border-yellow-500/30 px-2 py-1 rounded text-sm text-yellow-500 font-medium glow-yellow">{algorithm.complexities.time.average}</span>
          </div>
          <div className="flex justify-between items-center pb-2">
            <span className="text-white/50 text-sm">Worst Case</span>
            <span className="font-mono bg-[#FF003C]/10 border border-[#FF003C]/30 px-2 py-1 rounded text-sm text-[#FF003C] font-medium glow-magenta">{algorithm.complexities.time.worst}</span>
          </div>
        </div>
      </div>

      {/* Space Complexity Card */}
      <div className="glass-card rounded-2xl p-6 flex flex-col transition-all duration-300 hover:glow-cyan">
        <div className="flex items-center space-x-2 text-[#00F0FF] font-semibold mb-4">
          <HardDrive size={20} />
          <h3 className="text-lg tracking-wide uppercase">Space Complexity</h3>
        </div>
        <div className="space-y-4 flex-1">
          <div className="flex justify-between items-center pb-2">
            <span className="text-white/50 text-sm">Worst Case</span>
            <span className="font-mono bg-[#00F0FF]/10 border border-[#00F0FF]/30 px-2 py-1 rounded text-sm text-[#00F0FF] font-medium glow-cyan">{algorithm.complexities.space}</span>
          </div>
        </div>
        <div className="mt-auto pt-4 text-xs text-white/40 leading-relaxed">
          Space complexity refers to the total amount of memory space used by an algorithm, including the space of input values for execution.
        </div>
      </div>

      {/* Code Snippet Card */}
      <div className="glass-card rounded-2xl p-6 md:col-span-1 overflow-hidden flex flex-col transition-all duration-300 hover:glow-cyan">
        <div className="flex items-center space-x-2 text-[#00F0FF] font-semibold mb-4">
          <Code2 size={20} />
          <h3 className="text-lg tracking-wide uppercase">Implementation</h3>
        </div>
        <div className="flex-1 overflow-auto bg-black/80 border border-white/5 p-4 rounded-xl custom-scrollbar relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent"></div>
          <pre className="text-sm font-mono text-[#00F0FF]/80 leading-relaxed">
            <code>{algorithm.codeSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
