import React from 'react';
import { LayoutDashboard, ListTree, Code2, Network } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-background/50 backdrop-blur-xl h-full flex flex-col p-4 space-y-4">
      <div className="flex items-center space-x-2 font-bold text-xl mb-6">
        <Code2 className="text-primary" />
        <span>AlgoViz</span>
      </div>
      <nav className="flex-1 space-y-2">
        <a href="#" className="flex items-center space-x-2 p-2 hover:bg-accent rounded-lg text-accent-foreground transition-all">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </a>
        <div className="pt-4 pb-2 text-xs font-semibold uppercase text-muted-foreground">Data Structures</div>
        <a href="#" className="flex items-center space-x-2 p-2 hover:bg-accent rounded-lg transition-all">
          <ListTree size={18} />
          <span>Trees</span>
        </a>
        <a href="#" className="flex items-center space-x-2 p-2 hover:bg-accent rounded-lg transition-all">
          <Network size={18} />
          <span>Graphs</span>
        </a>
      </nav>
    </aside>
  );
}
