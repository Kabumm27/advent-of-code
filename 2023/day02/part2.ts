import { readFileSync } from "https://deno.land/std@0.109.0/node/fs.ts";

const input = readFileSync('input.txt').toString().trim();
const lines = input.split('\n');

// const limits = { red: 12, green: 13, blue: 14 };

let sum = 0;
for (const line of lines) {
    const [ gameIdString, gameString ] = line.split(':');
    const max = { red: 0, green: 0, blue: 0 };

    const games = gameString.trim().split(';');
    for (const game of games) {
        const cubes = game.split(',');
        for (const cube of cubes) {
            const [ count, color ] = cube.trim().split(' ');
            const cleanColor = color as 'red' | 'green' | 'blue';
            max[cleanColor] = Math.max(max[cleanColor], parseInt(count));
        }
    }

        
        sum += max['red'] * max['green'] * max['blue'];
}

console.log(sum);
