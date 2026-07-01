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
      <div className="bento-card p-6 flex flex-col">
        <div className="flex items-center space-x-2 text-slate-800 font-bold mb-4">
          <Clock size={20} className="text-blue-500" />
          <h3 className="text-lg tracking-wide uppercase text-sm">Time Complexity</h3>
        </div>
        <div className="space-y-4 flex-1">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <span className="text-slate-500 text-sm font-medium">Best Case</span>
            <span className="font-mono bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-lg text-sm font-semibold">{algorithm.complexities.time.best}</span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <span className="text-slate-500 text-sm font-medium">Average Case</span>
            <span className="font-mono bg-amber-50 text-amber-600 px-2.5 py-1 rounded-lg text-sm font-semibold">{algorithm.complexities.time.average}</span>
          </div>
          <div className="flex justify-between items-center pb-2">
            <span className="text-slate-500 text-sm font-medium">Worst Case</span>
            <span className="font-mono bg-red-50 text-red-600 px-2.5 py-1 rounded-lg text-sm font-semibold">{algorithm.complexities.time.worst}</span>
          </div>
        </div>
      </div>

      {/* Space Complexity Card */}
      <div className="bento-card p-6 flex flex-col">
        <div className="flex items-center space-x-2 text-slate-800 font-bold mb-4">
          <HardDrive size={20} className="text-blue-500" />
          <h3 className="text-lg tracking-wide uppercase text-sm">Space Complexity</h3>
        </div>
        <div className="space-y-4 flex-1">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <span className="text-slate-500 text-sm font-medium">Worst Case</span>
            <span className="font-mono bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg text-sm font-semibold">{algorithm.complexities.space}</span>
          </div>
        </div>
        <div className="mt-auto pt-4 text-sm text-slate-500 leading-relaxed">
          Space complexity refers to the total amount of memory space used by an algorithm, including the space of input values for execution.
        </div>
      </div>

      {/* Code Snippet Card */}
      <div className="bento-card p-6 md:col-span-1 flex flex-col">
        <div className="flex items-center space-x-2 text-slate-800 font-bold mb-4">
          <Code2 size={20} className="text-blue-500" />
          <h3 className="text-lg tracking-wide uppercase text-sm">Implementation</h3>
        </div>
        <div className="flex-1 overflow-auto bg-slate-50 border border-slate-200 p-5 rounded-2xl custom-scrollbar shadow-inner">
          <pre className="text-sm font-mono text-slate-700 leading-relaxed">
            <code>{algorithm.codeSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
