const text = Deno.readTextFileSync("input.txt");
const lines = text.trim().split("\n").map((line) => line.trim());

const universeSize = [lines[0].length, lines.length];
const galaxies: [number, number][] = [];
for (const [y, line] of lines.entries()) {
  const row = line.split("");
  for (const [x, cell] of row.entries()) {
    if (cell === "#") {
      galaxies.push([x, y]);
    }
  }
}

// console.log(universeSize);
// console.log(galaxies);

// Step 2: Expand universe
const rows = new Array(universeSize[0]).fill(true);
const cols = new Array(universeSize[1]).fill(true);

for (const [x, y] of galaxies) {
  rows[y] = false;
  cols[x] = false;
}

const expandRows = rows.map((row, index) => row ? index : -1).filter((row) =>
  row >= 0
);
const expandCols = cols.map((col, index) => col ? index : -1).filter((col) =>
  col >= 0
);

for (const galaxy of galaxies) {
  const [x, y] = galaxy;
  const offsetX = expandCols.filter((colIndex) => colIndex <= x).length;
  const offsetY = expandRows.filter((rowIndex) => rowIndex <= y).length;

  galaxy[0] = x + offsetX;
  galaxy[1] = y + offsetY;
}

// console.log(galaxies);

// Step 3: Calculate distances
let sum = 0;
for (let i = 0; i < galaxies.length; i++) {
  for (let j = i + 1; j < galaxies.length; j++) {
    const gal1 = galaxies[i];
    const gal2 = galaxies[j];

    const distance = Math.abs(gal1[0] - gal2[0]) + Math.abs(gal1[1] - gal2[1]);
    sum += distance;
  }
}

console.log(sum);
