# DSA Visualizer Platform - Requirements Document

## 1. Product Goal
Create an interactive web application that enables users to learn Data Structures and Algorithms visually. Users should be able to:
- Learn DSA concepts visually.
- Interact with data structures in real time.
- Observe algorithm execution step-by-step.
- Understand time and space complexity.

## 2. Functional Requirements
### Supported Data Structures
- Arrays
- Linked Lists
- Stacks
- Queues
- Trees
- Binary Search Trees (BST)
- Heaps
- Graphs

### Supported Algorithms
- **Sorting:** Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort.
- **Searching:** Linear Search, Binary Search.
- **Graph Algorithms:** Breadth First Search (BFS), Depth First Search (DFS).

### User Actions and Controls
- **Structure Controls:** Insert, Delete, Search, Traverse, Reset.
- **Execution Controls:** Play, Pause, Step Forward, Restart, Adjust Execution Speed.

## 3. Learning Experience Requirements
Each data structure and algorithm must include:
- **Concept:** A simple and clear explanation of the topic.
- **Working:** A step-by-step breakdown of behavior during execution.
- **Complexity Analysis:** Display Best Case, Average Case, Worst Case, and Space Complexity.

## 4. User Experience & Expected Behavior
- Visualizations update immediately after every operation.
- Current state is always clearly visible.
- Animations illustrate structural changes and algorithm flow.
- Active elements are highlighted during execution.
- Invalid operations display meaningful feedback.
- **UX Requirements:** Responsive Design, Smooth Animations, Fast Interaction, Clear Typography, Accessible Navigation.

## 5. Technical Requirements
- **Frontend Framework:** Next.js (App Router recommended).
- **Language:** TypeScript.
- **Styling:** Tailwind CSS.
- **Component Library:** Optional (shadcn/ui recommended).
- **Visualization:** SVG or Canvas-based rendering (Framer Motion + SVG recommended for ease of animation).

## 6. Git Commit Guidelines
All agents and contributors must strictly adhere to the following commit convention:
`<type>: <short description>`

**Allowed Types:**
- `init`: initializing a new project.
- `feat`: introducing new functionality.
- `fix`: correcting bugs.
- `refactor`: improving code without changing behavior.
- `docs`: documentation updates.
- `style`: formatting changes (prettier, whitespace).
- `test`: adding/updating automated tests.
- `perf`: performance improvements.
- `build`: build system or dependency changes.
- `ci`: CI/CD workflow changes.
- `chore`: maintenance tasks.

*Example:* `feat: add bubble sort algorithm animation`
