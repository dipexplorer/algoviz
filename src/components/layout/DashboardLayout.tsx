import React from 'react';
import { Sidebar, AlgorithmType } from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeAlgorithm?: AlgorithmType;
  onSelectAlgorithm?: (algo: AlgorithmType) => void;
}

export function DashboardLayout({ children, activeAlgorithm, onSelectAlgorithm }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-black text-white relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#00F0FF]/5 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#FF003C]/5 blur-[120px]"></div>
      </div>
      
      <Sidebar activeAlgorithm={activeAlgorithm} onSelectAlgorithm={onSelectAlgorithm} />
      <main className="flex-1 relative flex flex-col">
        <div className="flex-1 p-8 overflow-auto relative custom-scrollbar z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
