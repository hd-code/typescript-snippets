import * as assert from "assert";

// -----------------------------------------------------------------------------

type TestFunc = (...args: any[]) => any;

export function testFunc(fn: TestFunc, cases: TestCaseMap): void;
export function testFunc(fn: TestFunc, cases: TestCase[]): void;
export function testFunc(fn: TestFunc, cases: TestCaseMap | TestCase[]) {
  const testCases = cases instanceof Array ? toCaseMap(cases) : cases;

  describe(fn.name, () => {
    for (const name in testCases) {
      const args = testCases[name].args || [];
      const want = testCases[name].want;
      const errMsg = testCases[name].errMsg;

      it(name, () => {
        const got = fn(...args);
        if (typeof got === "object") {
          assert.deepStrictEqual(got, want, errMsg);
        } else {
          assert.strictEqual(got, want, errMsg);
        }
      });
    }
  });
}

// -----------------------------------------------------------------------------

export type TestCase = {
  args?: any[];
  want: any;
  errMsg?: string;
};

export type TestCaseMap = { [name: string]: TestCase };

function toCaseMap(cases: TestCase[]): TestCaseMap {
  let result: TestCaseMap = {};
  cases.forEach((testCase) => {
    const name = getName(testCase);
    result[name] = testCase;
  });
  return result;
}

// -----------------------------------------------------------------------------

function getName(testCase: TestCase): string {
  const args = testCase.args?.map(toString).join(", ") || "";
  return `(${args}) => ${toString(testCase.want)}`;
}

const maxStrLen = 10;

function toString<T>(value: T): string {
  const valueSting = "" + value;
  const result =
    valueSting.length > maxStrLen
      ? valueSting.slice(0, maxStrLen) + "…"
      : valueSting;
  return value instanceof Array ? `[${result}]` : result;
}
