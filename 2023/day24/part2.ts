const text = Deno.readTextFileSync("input.txt");
const lines = text.trim().split("\n").map((line) => line.trim());

type Hailstone = {
  px: number;
  py: number;
  pz: number;
  vx: number;
  vy: number;
  vz: number;
};

const hailstones: Hailstone[] = [];
for (const line of lines) {
  const [pos, vel] = line.split("@");
  const [px, py, pz] = pos.split(",").map((s) => parseInt(s.trim()));
  const [vx, vy, vz] = vel.split(",").map((s) => parseInt(s.trim()));
  hailstones.push({ px, py, pz, vx, vy, vz });
}

// console.log(hailstones);

function checkLineIntersection(line1: Hailstone, line2: Hailstone) {
  const denominator = line2.vy * line1.vx - line2.vx * line1.vy;
  if (denominator == 0) {
    return null;
  }

  let a = line1.py - line2.py;
  let b = line1.px - line2.px;
  const numerator1 = line2.vx * a - line2.vy * b;
  const numerator2 = line1.vx * a - line1.vy * b;
  a = numerator1 / denominator;
  b = numerator2 / denominator;

  return {
    x: line1.px + (a * line1.vx),
    y: line1.py + (a * line1.vy),
  };
}

function f(hailstone: Hailstone, t: number) {
  return {
    x: hailstone.px + (t * hailstone.vx),
    y: hailstone.py + (t * hailstone.vy),
    z: hailstone.pz + (t * hailstone.vz),
  };
}

// Gesucht: px, py, pz, vx, vy, vz
let firstAvg = 0;
let lastAvg = -1;
for (let t = 0; t < 1000_000_000; t++) {
  let pairs = 0;
  const distances: number[] = [];
  for (let i = 0; i < hailstones.length; i++) {
    for (let j = i + 1; j < hailstones.length; j++) {
      const stone1 = f(hailstones[i], t);
      const stone2 = f(hailstones[j], t);
      const distance = Math.pow(stone1.x - stone2.x, 2) +
        Math.pow(stone1.y - stone2.y, 2) + Math.pow(stone1.z - stone2.z, 2);
      distances.push(distance);
      pairs++;
    }
  }

  const avg = distances[Math.floor(pairs / 2)];
  if (firstAvg === 0) {
    firstAvg = avg;
  }

  if (avg > lastAvg) {
    console.log(
      t.toString().padStart(3, "0"),
      firstAvg - avg,
    );
  }

  lastAvg = avg;
}
