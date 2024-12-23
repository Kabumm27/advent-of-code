import { readFileSync } from "https://deno.land/std@0.109.0/node/fs.ts";

const input = readFileSync('input.txt').toString().trim();
const lines = input.split('\n');

let sum = 0;
for (const line of lines) {
    const cleanedLine = line.trim().replaceAll(/ +(?= )/g,'');
    const [ _card, numbers ] = cleanedLine.split(':');
    const [ winning, picked ] = numbers.split('|');
    const winningNumbers = winning.trim().split(' ').map(nr => parseInt(nr));
    const pickedNumbers = picked.trim().split(' ').map(nr => parseInt(nr));

    const winningNumbersMap: { [key: number]: 1 | undefined } = {};
    for (const wnr of winningNumbers) {
        winningNumbersMap[wnr] = 1;
    }

    const count = pickedNumbers.filter(nr => winningNumbersMap[nr]).length;
    // console.log(winningNumbers, pickedNumbers, count)
    if (count > 0) {
        sum += Math.pow(2, count - 1);
    }
}

console.log(sum);