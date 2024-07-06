// dijkstra.js
export async function dijkstraAlgorithm(maze, width, height, setMaze, delay, signal) {

    const getNeighbours = (cell) => {
        const { x, y } = cell;
        const neighbours = [];
        if (x > 1) neighbours.push({ x: x - 1, y });
        if (x < width - 2) neighbours.push({ x: x + 1, y });
        if (y > 1) neighbours.push({ x, y: y - 1 });
        if (y < height - 2) neighbours.push({ x, y: y + 1 });
        return neighbours;
    }

    async function visualize(maze) {
        if (delay <= 0) return;
        await new Promise(resolve => setTimeout(resolve, delay));
        setMaze([...maze]);
    }

    const start = { x: 1, y: 1 };
    const end = { x: width - 2, y: height - 2 };

    const distance = Array.from({ length: height }, () => Array(width).fill(Infinity));
    distance[start.y][start.x] = 0;

    const previous = Array.from({ length: height }, () => Array(width).fill(null));
    const unvisited = new Set();
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            if (maze[y][x] !== 1) unvisited.add(`${x},${y}`);
        }
    }

    while (unvisited.size > 0) {
        if (signal.aborted) {
            throw new DOMException('Aborted', 'AbortError');
        }

        let current = null;
        let minDistance = Infinity;
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                if (unvisited.has(`${x},${y}`) && distance[y][x] < minDistance) {
                    current = { x, y };
                    minDistance = distance[y][x];
                }
            }
        }

        if (current === null) break;

        unvisited.delete(`${current.x},${current.y}`);
        maze[current.y][current.x] = 3; // Mark as current cell

        await visualize(maze);
        maze[current.y][current.x] = 2;

        if (current.x === end.x && current.y === end.y) break;

        const neighbours = getNeighbours(current);
        for (const neighbour of neighbours) {
            if (signal.aborted) {
                throw new DOMException('Aborted', 'AbortError');
            }

            const { x, y } = neighbour;
            if (unvisited.has(`${x},${y}`)) {
                const newDistance = distance[current.y][current.x] + 1;
                if (newDistance < distance[y][x]) {
                    distance[y][x] = newDistance;
                    previous[y][x] = current;
                }
                maze[y][x] = 2; // Mark as neighbour
            }
        }
    }


    console.log("doing", distance);
    let current = end;
    while (current) {
        maze[current.y][current.x] = -2;
        current = previous[current.y][current.x];
    }

    setMaze([...maze]);
}
