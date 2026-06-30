import React from 'react';
import { Sidebar, AlgorithmType } from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeAlgorithm?: AlgorithmType;
  onSelectAlgorithm?: (algo: AlgorithmType) => void;
}

export function DashboardLayout({ children, activeAlgorithm, onSelectAlgorithm }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar activeAlgorithm={activeAlgorithm} onSelectAlgorithm={onSelectAlgorithm} />
      <main className="flex-1 relative flex flex-col">
        <div className="flex-1 p-8 overflow-auto relative custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
