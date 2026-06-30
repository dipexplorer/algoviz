import React from 'react';
import { Sidebar } from './Sidebar';
import { ControlPanel } from './ControlPanel';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 relative flex flex-col">
        <div className="flex-1 p-8 overflow-auto relative">
          {children}
        </div>
        <ControlPanel />
      </main>
    </div>
  );
}
