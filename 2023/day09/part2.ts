import { readFileSync } from "https://deno.land/std@0.109.0/node/fs.ts";

const input = readFileSync('input.txt').toString().trim();
const lines = input.split('\n');

function calculateNextValue(numbers: number[], deltaNumbers: number[][]) {
    return numbers[0] - deltaNumbers.reduceRight((prev, curr) => curr[0] - prev, 0);
}

function calculateDistancesRecursively(numbers: number[]): number[][] {
    const distances = [];
    for (let i = 0; i < numbers.length - 1; i++) {
        const distance = numbers[i + 1] - numbers[i];
        distances.push(distance);
    }

    if (distances.every(distance => distance === 0)) {
        return [distances];
    }
    else {
        return [distances].concat(calculateDistancesRecursively(distances));
    }
}

let sum = 0;
for (const line of lines) {
    const numbers = line.split(' ').map(Number);
    const distances = calculateDistancesRecursively(numbers);
    // console.log(numbers, distances, calculateNextValue(numbers, distances));
    sum += calculateNextValue(numbers, distances);
}

console.log(sum);