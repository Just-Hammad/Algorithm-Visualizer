// mazeGenerator.js
export async function generateMaze(width, height, updateMaze, delay, signal) {

  async function visualize(maze) {
    if (delay <= 0) return;
    await new Promise(resolve => setTimeout(resolve, delay));
    updateMaze([...maze]);
  }

  const maze = Array.from({ length: height }, () => Array(width).fill(1)); // Start with walls everywhere
  const stack = [];
  const start = { x: 1, y: 1 };
  maze[start.y][start.x] = 0; // Mark the starting cell as part of the maze
  stack.push(start);

  while (stack.length > 0) {
    if (signal.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }

    const current = stack.pop();
    // visualize current cell
    maze[current.y][current.x] = 3; // Mark as current cell
    await visualize(maze);

    const neighbors = getUnvisitedNeighbors(current, maze);
    // Visualize neighbours
    neighbors.forEach(neighbor => {
      maze[neighbor.y][neighbor.x] = 2; // Mark as neighbor
    });
    await visualize(maze);


    if (neighbors.length > 0) {
      stack.push(current);

      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      removeWall(current, randomNeighbor, maze);

      await visualize(maze);

      maze[randomNeighbor.y][randomNeighbor.x] = 0;
      stack.push(randomNeighbor);
    }

    neighbors.forEach(neighbor => {
      if (maze[neighbor.y][neighbor.x] === 2) maze[neighbor.y][neighbor.x] = 1; // Mark as neighbor
    });

    maze[current.y][current.x] = 0; // Mark as part of the maze

    await visualize(maze);
  }

  // Mark start and end points
  maze[1][1] = -1;
  maze[height - 2][width - 2] = -2;

  updateMaze([...maze]);
  return maze;

}

function getUnvisitedNeighbors(cell, maze) {
  const { x, y } = cell;
  const neighbors = [];

  if (x > 1 && (maze[y][x - 2]) === 1) neighbors.push({ x: x - 2, y }); // Left
  if (y > 1 && (maze[y - 2][x]) === 1) neighbors.push({ x, y: y - 2 }); // Up
  if (x < maze[0].length - 2 && (maze[y][x + 2]) === 1) neighbors.push({ x: x + 2, y }); // Right
  if (y < maze.length - 2 && (maze[y + 2][x]) === 1) neighbors.push({ x, y: y + 2 }); // Down

  return neighbors;
}

function removeWall(current, next, maze) {
  const x = (current.x + next.x) / 2;
  const y = (current.y + next.y) / 2;
  maze[y][x] = 0; // Remove the wall
}

function isNeighbor(cell1, cell2) {
  const dx = Math.abs(cell1.x - cell2.x);
  const dy = Math.abs(cell1.y - cell2.y);
  return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
}
