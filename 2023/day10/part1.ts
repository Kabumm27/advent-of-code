import { readFileSync, writeFileSync } from "https://deno.land/std@0.109.0/node/fs.ts";

const input = readFileSync('input.txt').toString().trim();
const lines = input.split('\n');

const grid: (string | number)[][] = lines.map(line => line.trim().split(''));

function getStartPos(): [number, number] {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 'S') {
                return [x, y];
            }
        }
    }

    return [0, 0];
}

const queue: [number, number, number][] = [[...getStartPos(), 0]];

while (queue.length > 0) {
    const [x, y, distance] = queue[0];
    queue.shift();

    if (y < 0 || y >= grid.length || x < 0 || x >= grid[y].length) continue;

    if (grid[y][x] === '|') {
        grid[y][x] = distance;
        queue.push([x, y - 1, distance + 1]);
        queue.push([x, y + 1, distance + 1]);
    } else if (grid[y][x] === '-') {
        grid[y][x] = distance;
        queue.push([x - 1, y, distance + 1]);
        queue.push([x + 1, y, distance + 1]);
    } else if (grid[y][x] === 'L') {
        grid[y][x] = distance;
        queue.push([x, y - 1, distance + 1]);
        queue.push([x + 1, y, distance + 1]);
    } else if (grid[y][x] === 'J') {
        grid[y][x] = distance;
        queue.push([x, y - 1, distance + 1]);
        queue.push([x - 1, y, distance + 1]);
    } else if (grid[y][x] === '7') {
        grid[y][x] = distance;
        queue.push([x, y + 1, distance + 1]);
        queue.push([x - 1, y, distance + 1]);
    } else if (grid[y][x] === 'F') {
        grid[y][x] = distance;
        queue.push([x, y + 1, distance + 1]);
        queue.push([x + 1, y, distance + 1]);
    } else if (grid[y][x] === 'S') {
        grid[y][x] = distance;
        queue.push([x, y + 1, distance + 1]);
        queue.push([x, y - 1, distance + 1]);
        queue.push([x + 1, y, distance + 1]);
        queue.push([x - 1, y, distance + 1]);
    }
}

// console.log(Math.max(...grid.map((row) => Math.max(...row.filter((cell) => !isNaN(cell as number)) as number[]))));

let max = 0;
for (const row of grid) {
    for (const cell of row) {
        if (!isNaN(cell as number) && parseInt(cell as string) > max) {
            max = parseInt(cell as string);
        }
    }
}

writeFileSync('test.txt', grid.map(row => row.join(' ')).join('\n'));

console.log(max)