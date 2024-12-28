const text = Deno.readTextFileSync("input.txt");
const lines = text.trim().split("\n").map((line) => line.trim());

type Condition = {
  variable: "x" | "m" | "a" | "s";
  operator: ">" | "<";
  value: number;
};

type Rule = {
  target: string;
  condition: Condition | null;
};

type Range = {
  [key in "x" | "m" | "a" | "s"]: {
    "<": number;
    ">": number;
  };
};

function copyRange(range: Range) {
  return {
    x: {
      "<": range.x["<"],
      ">": range.x[">"],
    },
    m: {
      "<": range.m["<"],
      ">": range.m[">"],
    },
    a: {
      "<": range.a["<"],
      ">": range.a[">"],
    },
    s: {
      "<": range.s["<"],
      ">": range.s[">"],
    },
  };
}

const workflows: { [key: string]: Rule[] } = {};
for (const line of lines) {
  if (!line) {
    break;
  }

  const [name, rulesString] = line.split("{");
  workflows[name] = rulesString.slice(0, -1).split(",").map((rule) => {
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
          variable: conditionVar as "x" | "m" | "a" | "s",
          operator: conditionOperator,
          value: parseInt(conditionValue),
        },
        target: target,
      };
    }
  });
}

function countRangeOptions(range: Range) {
  let result = 1;
  for (const v of ["x", "m", "a", "s"] as ("x" | "m" | "a" | "s")[]) {
    result *= range[v]["<"] - range[v][">"] - 1;
  }

  return result;
}

let sum = 0;
function runWfRecursively(wfName: string, range: Range) {
  if (wfName === "A" || wfName === "R") {
    if (wfName === "A") {
      // console.log(range);
      sum += countRangeOptions(range);
    }
    return;
  }

  const rules = workflows[wfName];

  for (const rule of rules) {
    const rangeCopy = copyRange(range);
    if (rule.condition) {
      const operator = rule.condition.operator;
      rangeCopy[rule.condition.variable][operator] = rule.condition.value;

      if (operator === "<") {
        range[rule.condition.variable][">"] = rule.condition.value - 1;
      } else {
        range[rule.condition.variable]["<"] = rule.condition.value + 1;
      }
    }

    runWfRecursively(rule.target, rangeCopy);
  }
}

const range: Range = {
  "x": { ">": 0, "<": 4001 },
  "m": { ">": 0, "<": 4001 },
  "a": { ">": 0, "<": 4001 },
  "s": { ">": 0, "<": 4001 },
};
runWfRecursively("in", range);

console.log(sum);
