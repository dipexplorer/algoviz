import React from 'react';
import { Sidebar, AlgorithmType } from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeAlgorithm?: AlgorithmType;
  onSelectAlgorithm?: (algo: AlgorithmType) => void;
}

export function DashboardLayout({ children, activeAlgorithm, onSelectAlgorithm }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900">
      <Sidebar activeAlgorithm={activeAlgorithm} onSelectAlgorithm={onSelectAlgorithm} />
      
      {/* Main Content Area - Scrollable */}
      <main className="flex-1 flex flex-col h-screen overflow-auto">
        <div className="p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
