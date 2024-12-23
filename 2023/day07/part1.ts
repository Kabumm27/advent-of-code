import { readFileSync } from "https://deno.land/std@0.109.0/node/fs.ts";

const input = readFileSync('input.txt').toString().trim();
const lines = input.split('\n');

function replaceCards(hand: string) {
    return hand
    .replaceAll('A', 'Z')
    .replaceAll('K', 'Y')
    .replaceAll('Q', 'X')
    .replaceAll('J', 'W')
    .replaceAll('T', 'V')
}

function getHandValue(hand: string) {
    const cardSet = new Set(hand.split(''));
    if (cardSet.size === 1) {
        // 5 of a kind
        return '6' + replaceCards(hand);
    } else if (cardSet.size === 2) {
        const firstVal = cardSet.values().next().value;
        const count = hand.split(firstVal).length - 1;
        if (count === 2 || count === 3) {
            // Full house
            return '4' + replaceCards(hand);
        }
        else {
            // 4 of a kind
            return '5' + replaceCards(hand);
        } 
    } else if (cardSet.size === 3) {
        const counts = [];
        for (const val of cardSet.values()) {
            counts.push(hand.split(val).length - 1);
        }

        if (counts.includes(3)) {
            // 3 of a kind
            return '3' + replaceCards(hand);
        }
        else {
            // 2 pairs
            return '2' + replaceCards(hand);
        }
    } else if (cardSet.size === 4) {
        // 1 pair
        return '1' + replaceCards(hand);
    } else {
        // High card
        return '0' + replaceCards(hand);
    }
}


const hands: { hand: string; value: string; bid: number; }[] = [];
for (const line of lines) {
    const [hand, bid] = line.split(' ');
    hands.push({
        hand: hand,
        value: getHandValue(hand),
        bid: parseInt(bid),
    })
}

const sortedHands = hands.sort((a, b) => a.value > b.value ? 1 : -1);

// console.log(hands)
// console.log(sortedHands)

let sum = 0;
for (let i = 0; i < sortedHands.length; i++) {
    const { bid } = sortedHands[i];
    sum += bid * (i + 1);
}

console.log(sum);