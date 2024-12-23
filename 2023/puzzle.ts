const input = [
  [31, 41, 44, 13, 41, 39, 44, 49, 49, 17, 11, 27, 26, 23, 5],
  [44, 30, 48, 29, 24, 37, 28, 12, 22, 19, 25, 13, 34, 17, 40],
  [35, 37, 36, 15, 41, 1, 9, 26, 10, 50, 10, 13, 41, 4, 45],
  [29, 28, 37, 25, 18, 43, 14, 10, 38, 37, 40, 35, 28, 16, 29],
  [12, 21, 38, 20, 30, 41, 34, 48, 27, 41, 7, 2, 16, 30, 22],
  [23, 23, 1, 50, 33, 35, 40, 3, 18, 35, 32, 19, 19, 49, 32],
  [46, 30, 46, 46, 40, 46, 40, 34, 46, 41, 41, 17, 3, 7, 50],
  [27, 24, 38, 15, 19, 34, 37, 13, 6, 1, 2, 31, 5, 16, 29],
  [3, 47, 42, 47, 10, 20, 21, 49, 34, 31, 18, 34, 3, 8, 9],
  [40, 46, 13, 43, 34, 34, 35, 19, 38, 8, 26, 50, 38, 21, 43],
  [10, 37, 50, 8, 19, 5, 7, 46, 48, 4, 47, 50, 14, 15, 50],
  [11, 43, 16, 10, 32, 35, 9, 39, 18, 46, 7, 44, 45, 9, 37],
];

let direction: "U" | "D" | "L" | "R" = "R";
let x = 0;
let y = 0;
let offset = 0;
const size = input[0].length * input.length;
const result: number[] = [input[y][x]];
while (result.length < size) {
  if (direction === "U") {
    y--;
    if (y === 0 + offset) {
      direction = "R";
    }
  } else if (direction === "D") {
    y++;
    if (y === input.length - offset - 1) {
      direction = "L";
    }
  } else if (direction === "L") {
    x--;
    if (x === 0 + offset) {
      direction = "U";
      offset++;
    }
  } else if (direction === "R") {
    x++;
    if (x === input[0].length - offset - 1) {
      direction = "D";
    }
  }

  result.push(input[y][x]);
}

console.log('[' + result.join(', ') + ']');
