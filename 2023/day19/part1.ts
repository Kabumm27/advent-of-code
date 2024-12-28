const text = Deno.readTextFileSync("input.txt");
const lines = text.trim().split("\n").map((line) => line.trim());

let workflowsActive = true;
const workflows: {
  [key: string]: {
    target: string;
    condition: null | { variable: string; value: number; operator: string };
  }[];
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

function doWf(ratings: { [key: string]: number }, wfName: string) {
  const rules = workflows[wfName];
  if (!rules) return null;

  for (const rule of rules) {
    // console.log(rule);
    if (!rule.condition) {
      return rule.target;
    }

    const ratingValue = ratings[rule.condition.variable];
    if (rule.condition.operator === "<") {
      if (ratingValue < rule.condition.value) {
        return rule.target;
      }
    } else {
      if (ratingValue > rule.condition.value) {
        return rule.target;
      }
    }
  }
}

let sum = 0;
for (const rating of ratings) {
  let currentWf = "in";
  let nextWf = doWf(rating, currentWf);
  // console.log(nextWf);
  while (nextWf) {
    currentWf = nextWf;
    nextWf = doWf(rating, nextWf);
    // console.log(nextWf);
  }

  if (currentWf === "A") {
    const objectSum = Object.values(rating).reduce(
      (prev, curr) => prev + curr,
      0,
    );
    sum += objectSum;
  }
}

console.log(sum);
