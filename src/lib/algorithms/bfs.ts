import { GridType, NodeType } from "../pathfinding/types";

export function bfs(grid: GridType, startNode: NodeType, finishNode: NodeType) {
  const visitedNodesInOrder: NodeType[] = [];
  const queue: NodeType[] = [];
  
  startNode.distance = 0;
  startNode.isVisited = true;
  queue.push(startNode);

  while (queue.length > 0) {
    const currentNode = queue.shift()!; // Dequeue
    
    // If we hit a wall, skip it
    if (currentNode.isWall) continue;
    
    visitedNodesInOrder.push(currentNode);
    
    if (currentNode === finishNode) return visitedNodesInOrder;
    
    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.isVisited = true;
      neighbor.previousNode = currentNode;
      queue.push(neighbor);
    }
  }
  
  return visitedNodesInOrder;
}

function getUnvisitedNeighbors(node: NodeType, grid: GridType) {
  const neighbors: NodeType[] = [];
  const { row, col } = node;
  
  if (row > 0) neighbors.push(grid[row - 1][col]); // Up
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Down
  if (col > 0) neighbors.push(grid[row][col - 1]); // Left
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right
  
  return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the bfs method above.
export function getNodesInShortestPathOrder(finishNode: NodeType) {
  const nodesInShortestPathOrder: NodeType[] = [];
  let currentNode: NodeType | null = finishNode;
  
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  
  return nodesInShortestPathOrder;
}
