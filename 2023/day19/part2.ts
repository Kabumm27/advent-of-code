const text = Deno.readTextFileSync("input_sample.txt");
const lines = text.trim().split("\n").map((line) => line.trim());

type Condition = { variable: string; value: number; operator: string };

type Rule = {
  target: string;
  condition: Condition | null;
};

type GroupedConditions = {
  [key in "x" | "m" | "a" | "s"]: {
    "<=": number;
    ">=": number;
  };
};

let workflowsActive = true;
const workflows: {
  [key: string]: Rule[];
} = {};
const ratings: { [key: string]: number }[] = [];
for (const line of lines) {
  if (!line) {
    workflowsActive = false;
    continue;
  }

  if (workflowsActive) {
    const [name, rulesString] = line.split("{");
    const rules = rulesString.slice(0, -1).split(",").map((rule) => {
      if (!rule.includes(":")) {
        return { condition: null, target: rule };
      } else {
        const [conditionString, target] = rule.split(":");
        const conditionOperator = conditionString.includes("<")
          ? "<"
          : conditionString.includes(">")
          ? ">"
          : null;
        if (!conditionOperator) throw new Error("Invalid Operator");
        const [conditionVar, conditionValue] = conditionString.split(
          conditionOperator,
        );
        return {
          condition: {
            variable: conditionVar,
            operator: conditionOperator,
            value: parseInt(conditionValue),
          },
          target: target,
        };
      }
    });

    workflows[name] = rules;
  } else {
    const vars = line.replaceAll(/[{}]/g, "").split(",").reduce<
      { [key: string]: number }
    >((prev, curr) => {
      const [varName, value] = curr.split("=");
      prev[varName] = parseInt(value);
      return prev;
    }, {});

    ratings.push(vars);
  }
}

// console.log(workflows);
// console.log(ratings);

// function doWf(ratings: { [key: string]: number }, wfName: string) {
//   const rules = workflows[wfName];
//   if (!rules) return null;

//   for (const rule of rules) {
//     // console.log(rule);
//     if (!rule.condition) {
//       return rule.target;
//     }

//     const ratingValue = ratings[rule.condition.variable];
//     if (rule.condition.operator === "<") {
//       if (ratingValue < rule.condition.value) {
//         return rule.target;
//       }
//     } else {
//       if (ratingValue > rule.condition.value) {
//         return rule.target;
//       }
//     }
//   }
// }

// let sum = 0;
// for (const rating of ratings) {
//   let currentWf = "in";
//   let nextWf = doWf(rating, currentWf);
//   // console.log(nextWf);
//   while (nextWf) {
//     currentWf = nextWf;
//     nextWf = doWf(rating, nextWf);
//     // console.log(nextWf);
//   }

//   if (currentWf === "A") {
//     const objectSum = Object.values(rating).reduce(
//       (prev, curr) => prev + curr,
//       0,
//     );
//     sum += objectSum;
//   }
// }

// console.log(Object.keys(workflows).length);

// console.log(sum);
let dirty = true;
while (dirty) {
  dirty = false;
  const allAs: string[] = [];
  const allRs: string[] = [];

  for (const wfName of Object.keys(workflows)) {
    const rules = workflows[wfName];

    const hasNoA = rules.every((rule) => rule.target !== "A");
    const hasNoR = rules.every((rule) => rule.target !== "R");

    if (hasNoA && hasNoR) continue;

    const everyA = rules.every((rule) => rule.target === "A");
    const everyR = rules.every((rule) => rule.target === "R");

    if (everyA || everyR) {
      dirty = true;
      delete workflows[wfName];

      if (everyA) {
        allAs.push(wfName);
      } else {
        allRs.push(wfName);
      }
    }
  }

  for (const wfName of Object.keys(workflows)) {
    const rules = workflows[wfName];

    for (const rule of rules) {
      if (allAs.includes(rule.target)) {
        rule.target = "A";
      } else if (allRs.includes(rule.target)) {
        rule.target = "R";
      }
    }
  }
}

// console.log(workflows);
// console.log(Object.keys(workflows).length);

// Step 3: Run all paths recusivlely
function cleanupConditions(conditions: Condition[]) {
  const groupedConditions: GroupedConditions = {
    "x": { ">=": 1, "<=": 4000 },
    "m": { ">=": 1, "<=": 4000 },
    "a": { ">=": 1, "<=": 4000 },
    "s": { ">=": 1, "<=": 4000 },
  };
  for (const { variable, operator, value } of conditions) {
    const varriableName = variable as "x" | "m" | "a" | "s";
    if (operator === "<=") {
      if (value < (groupedConditions[varriableName]["<="] as number)) {
        groupedConditions[varriableName]["<="] = value;
      }
    } else {
      if (value > (groupedConditions[varriableName][">="] as number)) {
        groupedConditions[varriableName][">="] = value;
      }
    }
  }

  return groupedConditions;
}

const paths: GroupedConditions[] = [];

function runWfRecursively(
  wfName: string,
  conditions: (Condition | null)[],
  path: string[],
) {
  if (wfName === "A" || wfName === "R") {
    if (wfName === "A") {
      const groupedConditions = cleanupConditions(
        conditions.filter((conditions) => conditions) as Condition[],
      );
      // console.log([...path, wfName]);
      // console.log(groupedConditions);
      paths.push(groupedConditions);
    }
    return;
  }
  const rules = workflows[wfName];

  const localConditions: Condition[] = [];
  for (const rule of rules) {
    if (rule.condition) {
      localConditions.push(rule.condition);
      const operator = localConditions[localConditions.length - 1].operator;
      localConditions[localConditions.length - 1].operator = operator === "<"
        ? ">="
        : "<=";
    }
    runWfRecursively(rule.target, [
      ...conditions,
      ...localConditions,
      rule.condition,
    ], [...path, wfName]);
  }
}

runWfRecursively("in", [], []);

// console.log(paths.length);

// Step 4: Remove duplicates
function isPartOf(
  outerGroup: GroupedConditions,
  innerGroup: GroupedConditions,
) {
  const xIsSubGroup = innerGroup["x"]["<="] <= outerGroup["x"]["<="] &&
    innerGroup["x"][">="] >= outerGroup["x"][">="];
  const mIsSubGroup = innerGroup["m"]["<="] <= outerGroup["m"]["<="] &&
    innerGroup["m"][">="] >= outerGroup["m"][">="];
  const aIsSubGroup = innerGroup["a"]["<="] <= outerGroup["a"]["<="] &&
    innerGroup["a"][">="] >= outerGroup["a"][">="];
  const sIsSubGroup = innerGroup["s"]["<="] <= outerGroup["s"]["<="] &&
    innerGroup["s"][">="] >= outerGroup["s"][">="];

  return xIsSubGroup && mIsSubGroup && aIsSubGroup && sIsSubGroup;
}

const duplicatePaths = paths.map(() => false);
for (let i = 0; i < paths.length; i++) {
  for (let j = 0; j < paths.length; j++) {
    if (i === j) continue;

    const path1 = paths[i];
    const path2 = paths[j];

    if (isPartOf(path2, path1)) {
      duplicatePaths[i] = true;
    }
  }
}

console.log(paths.filter((_, index) => !duplicatePaths[index]));

// s 1351 - 2770              1419 * 4000 * 4000 * 4000
// s 2771 - 4000, x 1 - 4000, m 1 - 2090, a 2006 - 4000
// s 2771 - 4000, x 1416 - 4000, m 1 - 4000, a 2006 - 4000

// x              m
// 1 - 1415       1 - 2090    1415 * 2090 * 1994 * 2649
// 1416 - 4000    1 - 4000    2585 * 4000 * 1994 * 2649
