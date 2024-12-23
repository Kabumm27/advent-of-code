import { readFileSync } from "https://deno.land/std@0.109.0/node/fs.ts";

const input = readFileSync('input.txt').toString().trim();
const lines = input.split('\n');

const durations: number[] = Array.from(lines[0].matchAll(/\d+/g)).map((match) => parseInt(match[0]));
const distances: number[] = Array.from(lines[1].matchAll(/\d+/g)).map((match) => parseInt(match[0]));

let result = 1;
for (let i = 0; i < durations.length; i++) {
    const duration = durations[i];
    const minDistance = distances[i];

    let sum = 0;
    for (let j = 0; j < duration; j++) {
        if ((duration - j) * j > minDistance) {
            sum++;
        }
    }

    result *= sum;
}

console.log(result);
