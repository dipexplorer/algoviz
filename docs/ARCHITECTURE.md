# Architecture Overview

## High-Level Architecture
- **Frontend:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Visualization Engine:** Framer Motion + SVG / Canvas
- **Deployment:** Vercel (Recommended)

## Component Structure
1. **Layouts:** `DashboardLayout`, `VisualizationLayout`
2. **Components:**
   - `Sidebar` (Algorithm/Data Structure Selection)
   - `ControlPanel` (Play, Pause, Step, Speed)
   - `VisualizerCanvas` (Main drawing area for nodes/arrays)
3. **State Management:** React hooks / Context API to manage algorithm state history.
