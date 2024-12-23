import { readFileSync } from "https://deno.land/std@0.109.0/node/fs.ts";

const input = readFileSync('input.txt').toString().trim();
const lines = input.split('\n');

const scratchCards: {[key: string]: number} = {};
for (const line of lines) {
    const cleanedLine = line.trim().replaceAll(/ +(?= )/g,'');
    const [ cardString, numbers ] = cleanedLine.split(':');
    const [_, card] = cardString.trim().split(' ');
    const cardNumber = parseInt(card);
    const [ winning, picked ] = numbers.split('|');
    const winningNumbers = winning.trim().split(' ').map(nr => parseInt(nr));
    const pickedNumbers = picked.trim().split(' ').map(nr => parseInt(nr));

    if (!scratchCards[cardNumber]) {
        scratchCards[cardNumber] = 1;
    }
    else {
        scratchCards[cardNumber] += 1;
    }

    const winningNumbersMap: { [key: number]: 1 | undefined } = {};
    for (const wnr of winningNumbers) {
        winningNumbersMap[wnr] = 1;
    }

    const count = pickedNumbers.filter(nr => winningNumbersMap[nr]).length;
    for (let i = 1; i <= count; i++) {
        const index = cardNumber + i;
        if (!scratchCards[index]) {
            scratchCards[index] = 1 * scratchCards[cardNumber];
        }
        else {
            scratchCards[index] += 1 * scratchCards[cardNumber];
        }
    }
}

let sum = 0;
for (const key in scratchCards) {
    sum += scratchCards[key]
}

console.log(sum);