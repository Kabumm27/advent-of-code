const stream = Deno.readTextFileSync("input.txt");
const data = stream.replaceAll("\r", "").replace(/\n$/, "").split("\n");

const R = (m) =>
  m.reduce((a, v, k) => (v.indexOf("#") == -1 ? a.concat(k) : a), []);

const T = (m) =>
  m[0].split("").map((_, k) => ((k) => m.map((u) => u[k]).join(""))(k));

const G = (m) =>
  m.map((v) => v.split("").reduce((a, v, k) => v == "#" ? a.concat(k) : a, []))
    .map((v, r) => v.map((c, _) => [r, c])).flat();

const L = (a, v) => a.reduce((c, t) => t < v ? ++c : c, 0);

const D = (a, b, f, rs, cs) =>
  (Math.abs(L(rs, a[0]) - L(rs, b[0])) +
      Math.abs(L(cs, a[1]) - L(cs, b[1]))) * (f - 1) +
  Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

const A = (g, f, rs, cs) =>
  g.reduce((s, x) => s + g.reduce((ss, y) => ss + D(x, y, f, rs, cs), 0), 0) /
  2;

const Day11 = (m) => [2, 1000000].map((f) => A(G(m), f, R(m), R(T(m))));

console.log(Day11(data));
