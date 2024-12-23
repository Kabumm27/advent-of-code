import { readFileSync } from "https://deno.land/std@0.109.0/node/fs.ts";

const input = readFileSync('input.txt').toString().trim();
const lines = input.split('\n');

const seeds: number[] = [];
const map: { [key: string]: { to: string, ranges: { sourceRangeStart: number, destinationRangeStart: number, length: number }[] } } = {};
 
let source = '';
let destination = '';
for (const line of lines) {
    if (!line.trim()) {
        continue;
    }

    if (line.includes(':')) {
        if (line.startsWith('seeds:')) {
            seeds.push(...line.split(':')[1].trim().split(' ').map(n => parseInt(n)));
            continue;
        }

        const [ types ] = line.trim().split(' ');
        [ source, , destination ] = types.split('-');
        continue;
    }

    // Parse maps
    if (!map[source]) {
        map[source] = {
            to: destination,
            ranges: [],
        };
    }

    const [ destinationRangeStart, sourceRangeStart, length ] = line.trim().split(' ').map(n => parseInt(n));
    map[source].ranges.push({
        sourceRangeStart: sourceRangeStart,
        destinationRangeStart: destinationRangeStart,
        length: length,
    });
}

const locations: number[] = [];
for (const seed of seeds) {
    let state = 'seed';
    let sourceValue = seed;

    while (state !== 'location') {
        const ranges = map[state].ranges;
        for (const range of ranges) {
            if (range.sourceRangeStart <= sourceValue && sourceValue < range.sourceRangeStart + range.length) {
                const delta = range.destinationRangeStart - range.sourceRangeStart;
                sourceValue += delta;
                break;
            }
        }

        state = map[state].to;
    }

    locations.push(sourceValue);
}

console.log(Math.min(...locations));
