import { readFileSync } from "https://deno.land/std@0.109.0/node/fs.ts";

const input = readFileSync('input.txt').toString().trim();
const lines = input.split('\n');

let sum = 0;
const numbersStore: { y: number; startX: number; endX: number, num: number, hit: boolean }[] = [];
const partsStore: { x: number, y: number, symbol: string, neighbourCnt: number, neighbourProd: number }[] = [];
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
        return { y: y, x: startX, symbol: match[0], neighbourCnt: 0, neighbourProd: 1 };
    }));
}

for (const numberEntry of numbersStore) {
    const { y, startX, endX, num } = numberEntry;
    for (const partEntry of partsStore) {
        const { x: partX, y: partY } = partEntry;
        if ((y - 1  <= partY && partY <= y + 1) && (startX - 1 <= partX && partX <= endX)) {
            numberEntry.hit = true;
            partEntry.neighbourCnt += 1;
            partEntry.neighbourProd *= num;
        }
    }
}

for (const partEntry of partsStore) {
    if (partEntry.neighbourCnt === 2) {
        sum += partEntry.neighbourProd;
    }
}

console.log(sum);
