/*! testutil v0.0.1 | MIT | https://github.com/hd-code/web-snippets */

/**
 * @file
 * This file contains helpful functions for testing. It is compatible Mocha and
 * Jest.
 */

import * as assert from "assert";

// -----------------------------------------------------------------------------

/**
 * Tests a pure function against a list of test cases. Pure functions have no
 * side effects and their return value only depends on the input parameters.
 * @param fn The function to be tested.
 * @param cases An array of test cases. A test case is a tuple with two entries.
 * The first are the params (as an array) and the second is the expected return
 * value.
 */
export function testFunc<Args extends any[], Return>(
  fn: (...args: Args) => Return,
  cases: [Args, Return][],
): void;
/**
 * Tests a pure function against a list of test cases. Pure functions have no
 * side effects and their return value only depends on the input parameters.
 * @param fn The function to be tested.
 * @param cases A map of named test cases. The key is the name of the case. The
 * value is a tuple with two entries. The first are the params (as an array) and
 * the second is the expected return value.
 */
export function testFunc<Args extends any[], Return>(
  fn: (...args: Args) => Return,
  cases: { [name: string]: [Args, Return] },
): void;
export function testFunc<Args extends any[], Return>(
  fn: (...args: Args) => Return,
  cases: { [name: string]: [Args, Return] } | [Args, Return][],
) {
  const testCases = cases instanceof Array ? toCaseMap(cases) : cases;

  describe(fn.name, () => {
    for (const name in testCases) {
      const args = testCases[name][0];
      const want = testCases[name][1];

      it(name, () => {
        const got = fn(...args);
        if (typeof got === "object") {
          assert.deepStrictEqual(got, want);
        } else {
          assert.strictEqual(got, want);
        }
      });
    }
  });
}

// -----------------------------------------------------------------------------

function toCaseMap<Args extends any[], Return>(
  cases: [Args, Return][],
): { [name: string]: [Args, Return] } {
  let result: { [name: string]: [Args, Return] } = {};
  cases.forEach((testCase) => {
    const name = getName(testCase);
    result[name] = testCase;
  });
  return result;
}

// -----------------------------------------------------------------------------

function getName<Args extends any[], Return>(testCase: [Args, Return]): string {
  const args = testCase[0]?.map(toString).join(", ") || "";
  return `(${args}) => ${toString(testCase[1])}`;
}

const maxStringLen = 10;

function toString<T>(value: T): string {
  if (value instanceof Array) {
    const string = value.map(toString).join(",");
    return `[${clipString(string, maxStringLen - 2)}]`;
  }

  return clipString("" + value, maxStringLen);
}

function clipString(string: string, maxLen: number): string {
  return string.length <= maxLen ? string : string.slice(0, maxLen - 1) + "…";
}
