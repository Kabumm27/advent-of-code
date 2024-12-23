import { readFileSync } from "https://deno.land/std@0.109.0/node/fs.ts";

const input = readFileSync('input.txt').toString().trim();
const lines = input.split('\n');

const seeds: { start: number; length: number; }[] = [];
const map: { [key: string]: { to: string, ranges: { sourceRangeStart: number, destinationRangeStart: number, length: number }[] } } = {};
 
let source = '';
let destination = '';
for (const line of lines) {
    if (!line.trim()) {
        continue;
    }

    if (line.includes(':')) {
        if (line.startsWith('seeds:')) {
            const numbers = line.split(':')[1].trim().split(' ').map(n => parseInt(n));
            for (let i = 0; i < numbers.length; i += 2) {
                seeds.push({
                    start: numbers[i],
                    length: numbers[i + 1],
                })
            }
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
for (const { start, length } of seeds) {
    let state = 'seed';
    // let sourceValue = seed;
    let seedStart = start;
    let intermediateRanges: { start: number; length: number; }[] = [];

    while (state !== 'location') {
        const ranges = map[state].ranges;
        for (const range of ranges) {
            let end = 0;
            const rangeEnd = range.sourceRangeStart + range.length;
            if (range.sourceRangeStart <= start && start < rangeEnd) {
                const delta = range.destinationRangeStart - range.sourceRangeStart;
                sourceValue += delta;
                
                if (start + length <= rangeEnd) {
                    end = start + length;
                }
                else {
                    end = rangeEnd;
                }
                break;
            }
        }

        state = map[state].to;
    }

    locations.push(sourceValue);
}

console.log(Math.min(...locations));
