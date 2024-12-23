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

let position = 'AAA';
let i = 0;
while (position !== 'ZZZ') {
    const route = path[i % path.length];
    let next = '';
    if (route === 'R') {
        next = network[position].right;
    }
    else {
        next = network[position].left;
    }

    position = next;
    i++;
}

console.log(position, i);