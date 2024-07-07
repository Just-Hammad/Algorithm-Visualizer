export async function dijkstraAlgorithm(maze, width, height, setMaze, delay, signal) {
    
    let start = null;
    let end = null;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (maze[y][x] === -1) {
                start = { x, y };
            }
            if (maze[y][x] === -2) {
                end = { x, y };
            }
        }
    }

    const getNeighbours = (cell) => {
        const { x, y } = cell;
        const neighbours = [];
        if (x > 0) neighbours.push({ x: x - 1, y });
        if (x < width - 1) neighbours.push({ x: x + 1, y });
        if (y > 0) neighbours.push({ x, y: y - 1 });
        if (y < height - 1) neighbours.push({ x, y: y + 1 });
        return neighbours;
    }

    async function visualize(maze) {
        if (delay <= 0) return;
        await new Promise(resolve => setTimeout(resolve, delay));
        setMaze([...maze]);
    }

    const distance = Array.from({ length: height }, () => Array(width).fill(Infinity));
    distance[start.y][start.x] = 0;

    const previous = Array.from({ length: height }, () => Array(width).fill(null));
    const unvisited = new Set();
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (maze[y][x] !== 1) unvisited.add(`${x},${y}`);
        }
    }

    while (unvisited.size > 0) {
        if (signal.aborted) {
            throw new DOMException('Aborted', 'AbortError');
        }

        let current = null;
        let minDistance = Infinity;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
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
