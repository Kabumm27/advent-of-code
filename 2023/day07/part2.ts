import { readFileSync } from "https://deno.land/std@0.109.0/node/fs.ts";

const input = readFileSync('input.txt').toString().trim();
const lines = input.split('\n');

function replaceCards(hand: string) {
    return hand
    .replaceAll('A', 'Z')
    .replaceAll('K', 'Y')
    .replaceAll('Q', 'X')
    .replaceAll('T', 'W')
    .replaceAll('J', '0')
}

function getHandValue(hand: string) {    
    const cardCounts: {[card: string]: number} = {};
    hand.split('').forEach((card) => {
        cardCounts[card] = (cardCounts[card] || 0) + 1;
    });

    if (cardCounts['J'] > 0 && cardCounts['J'] !== 5) {
        const js = cardCounts['J'];
        delete cardCounts['J'];
        const highestCard = Object.entries(cardCounts).reduce((prev, curr) => curr[1] > prev[1] ? curr : prev)[0];

        cardCounts[highestCard] += js;
    }

    const highestCardCnt = Math.max(...Object.values(cardCounts));
    const uniquesCnt = Object.keys(cardCounts).length;

    if (highestCardCnt === 5) return '7' + replaceCards(hand); // Five of a kind
    if (highestCardCnt === 4) return '6' + replaceCards(hand); // Four of a kind
    if (highestCardCnt === 3 && uniquesCnt === 2) return '5' + replaceCards(hand); // Full house
    if (highestCardCnt === 3) return '4' + replaceCards(hand); // Three of a kind
    if (highestCardCnt === 2 && uniquesCnt === 3) return '3' + replaceCards(hand); // Two pairs
    if (highestCardCnt === 2) return '2' + replaceCards(hand); // One pair
    return '1' + replaceCards(hand); // High card
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

let sum = 0;
for (let i = 0; i < sortedHands.length; i++) {
    const { bid } = sortedHands[i];
    sum += bid * (i + 1);
}

console.log(sum);