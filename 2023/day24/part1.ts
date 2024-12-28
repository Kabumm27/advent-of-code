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

let sum = 0;
for (let i = 0; i < hailstones.length; i++) {
  for (let j = i + 1; j < hailstones.length; j++) {
    const line1 = hailstones[i];
    const line2 = hailstones[j];
    const intersection = checkLineIntersection(line1, line2);
    if (
      intersection &&
      intersection.x >= 200000000000000 && intersection.x <= 400000000000000 &&
      intersection.y >= 200000000000000 && intersection.y <= 400000000000000
    ) {
      if (
        Math.sign(intersection.x - line1.px) === Math.sign(line1.vx) &&
        Math.sign(intersection.x - line2.px) === Math.sign(line2.vx) &&
        Math.sign(intersection.y - line1.py) === Math.sign(line1.vy) &&
        Math.sign(intersection.y - line2.py) === Math.sign(line2.vy)
      ) {
        // console.log(intersection);
        sum++;
      }
    }
  }
}

console.log(sum);
