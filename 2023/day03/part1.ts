import { readFileSync } from "https://deno.land/std@0.109.0/node/fs.ts";

const input = readFileSync('input.txt').toString().trim();
const lines = input.split('\n');

let sum = 0;
const numbersStore: { y: number; startX: number; endX: number, num: number, hit: boolean }[] = [];
const partsStore: { x: number, y: number }[] = [];
for (const [y, line] of lines.entries()) {
    const numbers = Array.from(line.trim().matchAll(/\d+/g));
    numbersStore.push(...numbers.map((match) => {
        const startX = match?.index;
        const length = match[0].length;
        if (startX === undefined) {
            throw new Error('Invalid number startX');
        }
        return { y: y, startX: startX, endX: startX + length, num: parseInt(match[0]), hit: false };
    }));

    const parts = Array.from(line.trim().matchAll(/[^.0-9]+/g));
    partsStore.push(...parts.map((match) => {
        const startX = match?.index;
        if (startX === undefined) {
            throw new Error('Invalid part startX');
        }
        return { y: y, x: startX };
    }));
}

for (const entry of numbersStore) {
    const { y, startX, endX, num } = entry;
    let hit = false;
    for (const {x: partX, y: partY} of partsStore) {
        if ((y - 1  <= partY && partY <= y + 1) && (startX - 1 <= partX && partX <= endX)) {
            hit = true;
            entry.hit = true;
            break;
        }
    }

    if (hit) {
        sum += num;
        console.log(num, 'at x:', startX, 'y:', y,);
    }
}

console.log(sum);