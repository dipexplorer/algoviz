import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="h-full flex flex-col">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Bubble Sort</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Bubble Sort is a simple sorting algorithm that repeatedly steps through the input list element by element, comparing the current element with the one after it, swapping their values if needed.
          </p>
        </header>
        
        {/* Visualizer Canvas Placeholder */}
        <div className="flex-1 border rounded-2xl bg-muted/30 flex items-center justify-center relative overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]"></div>
          <div className="text-muted-foreground flex flex-col items-center z-10">
            <div className="w-16 h-16 mb-4 rounded-full bg-primary/20 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-primary"></div>
            </div>
            <p className="font-medium text-lg">Visualizer Canvas</p>
            <p className="text-sm">Select an algorithm to begin</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
