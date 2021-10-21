import { testFunc } from "testutil";

// -----------------------------------------------------------------------------

function add(x: number, y: number): number {
  return x + y;
}

function mul(x: number, y: number): number {
  return x * y;
}

describe("testutil", () => {
  testFunc(add, [
    [[1, 2], 3],
    [[1, 1], 2],
    [[0, 5], 5],
    [[34, 12], 46],
  ]);

  testFunc(mul, {
    named: [[1, 2], 2],
    cases: [[1, 1], 1],
    should: [[0, 5], 0],
    "work too": [[34, 12], 34 * 12],
  });
});
