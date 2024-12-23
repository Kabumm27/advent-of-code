import { readFileSync } from "https://deno.land/std@0.109.0/node/fs.ts";

const input = readFileSync('input.txt').toString().trim();
const lines = input.split('\n');

const duration: number = parseInt(Array.from(lines[0].matchAll(/\d+/g)).map((match) => match[0]).join(''));
const minDistance: number = parseInt(Array.from(lines[1].matchAll(/\d+/g)).map((match) => match[0]).join(''));

let sum = 0;
for (let j = 0; j < duration; j++) {
    if ((duration - j) * j > minDistance) {
        sum++;
    }
}

console.log(sum);
