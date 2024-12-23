import { readFileSync } from "https://deno.land/std@0.109.0/node/fs.ts";

const input = readFileSync('input.txt').toString().trim();
const lines = input.split('\n');

const path = lines[0].trim().split('');

const network: { [key: string]: { left: string; right: string; } } = {};
for (const line of lines.splice(2)) {
    const [start, paths] = line.split('=');
    const [left, right] = paths.replaceAll('(', '').replaceAll(')', '').trim().split(', ');

    network[start.trim()] = { left, right };
}

function leastCommonMultipleWithOffset(n: number[], offset: number[]) {
    
}

// Calculate the least common multiple
function leastCommonMultipleArray(n: number[]) {
    let lcm = n[0];
    for (let i = 1; i < n.length; i++) {
        lcm = leastCommonMultiple(lcm, n[i]);
    }
    return lcm;
}

function leastCommonMultiple(a: number, b: number) {
    return (a * b) / greatestCommonDivisor(a, b);
}

function greatestCommonDivisor(a: number, b: number): number {
    return b === 0 ? a : greatestCommonDivisor(b, a % b);
}


// const startNodes = Object.keys(network).filter((key) => key[2] === 'A');
const endNodes = ['NMZ', 'SJZ', 'GNZ', 'TNZ', 'BNZ', 'ZZZ'];
const positions = [...endNodes];

for (let i = 0; i < positions.length; i++) {
    let steps = 1;
    const route = path[steps % path.length];
    if (route === 'R') {
        positions[i] = network[positions[i]].right;
    }
    else {
        positions[i] = network[positions[i]].left;
    }

    while (positions[i][2] !== 'Z') {
        const route = path[steps % path.length];
        if (route === 'R') {
            positions[i] = network[positions[i]].right;
        }
        else {
            positions[i] = network[positions[i]].left;
        }

        steps++;
    }

    console.log(positions[i], steps);
}

// End Node     First Run   Loop
// NMZ          15871       6725
// SJZ          16409       10491
// GNZ          21251       9953
// TNZ          18023       17754
// BNZ          12643       7801
// ZZZ          19099       5111

console.log(leastCommonMultipleArray([15871, 16409, 21251, 18023, 12643, 19099]));