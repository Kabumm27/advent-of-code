import { readFileSync } from "https://deno.land/std@0.109.0/node/fs.ts";

const input = readFileSync('input.txt').toString().trim();
const lines = input.split('\n');

let sum = 0;
for (const line of lines) {
    const numbers = line.replace(/[^\d]/g, '').split('');
    const first = parseInt(numbers[0]);
    const last = parseInt(numbers[numbers.length - 1])

    sum += first * 10 + last;
}

console.log(sum);