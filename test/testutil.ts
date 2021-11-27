import { testFunc } from "testutil";

// -----------------------------------------------------------------------------

function add(x: number, y: number): number {
  return x + y;
}

function mul(x: number, y: number): number {
  return x * y;
}

function noop<T>(value: T): T {
  return value;
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

  const cases = [
    1,
    "Hello World",
    "A very very very very long string",
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    { name: "John Doe", age: 25 },
    { name: "very very long", age: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    { "A very very long key": "A very very long value", age: 25 },
  ].map(<T>(c: T) => [[c], c] as [[T], T]);

  testFunc(noop, cases);
});
