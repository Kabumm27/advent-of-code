import { readFileSync } from "https://deno.land/std@0.109.0/node/fs.ts";

const input = readFileSync('input.txt').toString().trim();
// const input = `two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen`

const lines = input.split('\n');

const numberStrings = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

function numberStringIndexToNumber(index: number) {
    const offset = index <= 9 ? 0 : 9;
    return index - offset;
}

let sum = 0;
for (const line of lines) {
    const firstIndizes = numberStrings.map(str => line.indexOf(str));
    const min = Math.min(...firstIndizes.filter(index => index >= 0));
    const first = numberStringIndexToNumber(firstIndizes.indexOf(min));

    const lastIndizes = numberStrings.map(str => line.lastIndexOf(str));
    const max = Math.max(...lastIndizes);
    const last = numberStringIndexToNumber(lastIndizes.indexOf(max));

    sum += first * 10 + last;
}

console.log(sum);