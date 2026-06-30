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
      <div className="bg-background border rounded-2xl p-6 shadow-sm flex flex-col">
        <div className="flex items-center space-x-2 text-primary font-semibold mb-4">
          <Clock size={20} />
          <h3 className="text-lg">Time Complexity</h3>
        </div>
        <div className="space-y-4 flex-1">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-muted-foreground">Best Case</span>
            <span className="font-mono bg-accent px-2 py-1 rounded text-sm text-green-500 font-medium">{algorithm.complexities.time.best}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-muted-foreground">Average Case</span>
            <span className="font-mono bg-accent px-2 py-1 rounded text-sm text-yellow-500 font-medium">{algorithm.complexities.time.average}</span>
          </div>
          <div className="flex justify-between items-center pb-2">
            <span className="text-muted-foreground">Worst Case</span>
            <span className="font-mono bg-accent px-2 py-1 rounded text-sm text-destructive font-medium">{algorithm.complexities.time.worst}</span>
          </div>
        </div>
      </div>

      {/* Space Complexity Card */}
      <div className="bg-background border rounded-2xl p-6 shadow-sm flex flex-col">
        <div className="flex items-center space-x-2 text-primary font-semibold mb-4">
          <HardDrive size={20} />
          <h3 className="text-lg">Space Complexity</h3>
        </div>
        <div className="space-y-4 flex-1">
          <div className="flex justify-between items-center pb-2">
            <span className="text-muted-foreground">Worst Case</span>
            <span className="font-mono bg-accent px-2 py-1 rounded text-sm text-primary font-medium">{algorithm.complexities.space}</span>
          </div>
        </div>
        <div className="mt-auto pt-4 text-xs text-muted-foreground">
          Space complexity refers to the total amount of memory space used by an algorithm, including the space of input values for execution.
        </div>
      </div>

      {/* Code Snippet Card */}
      <div className="bg-[#1e1e1e] border border-border/50 rounded-2xl p-6 shadow-sm md:col-span-1 overflow-hidden flex flex-col">
        <div className="flex items-center space-x-2 text-white/90 font-semibold mb-4">
          <Code2 size={20} />
          <h3 className="text-lg">Implementation</h3>
        </div>
        <div className="flex-1 overflow-auto bg-black/50 p-4 rounded-xl custom-scrollbar">
          <pre className="text-sm font-mono text-gray-300">
            <code>{algorithm.codeSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
