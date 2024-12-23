import { readFileSync } from "https://deno.land/std@0.109.0/node/fs.ts";

const input = readFileSync('input.txt').toString().trim();
const lines = input.split('\n');

const limits = { red: 12, green: 13, blue: 14 };

let sum = 0;
for (const line of lines) {
    const [ gameIdString, gameString ] = line.split(':');
    let valid = true;

    const games = gameString.trim().split(';');
    for (const game of games) {
        const cubes = game.split(',');
        for (const cube of cubes) {
            const [ count, color ] = cube.trim().split(' ');
            if (parseInt(count) > limits[color as 'red' | 'green' | 'blue']) {
                valid = false;
                break;
            }
        }

        if (!valid) {
            break;
        }
    }

    if (valid) {
        const [ _, id ] = gameIdString.trim().split(' ');
        sum += parseInt(id);
    }
}

console.log(sum);
