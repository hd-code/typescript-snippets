import round from "round";
import { testFunc, TestCase } from "./testutil";

const precisions = [undefined, 0, 2, -2];
const mapping = [
  { number: 0, expected: [0, 0, 0, 0] },
  { number: 3, expected: [3, 3, 3, 0] },
  { number: -3, expected: [-3, -3, -3, -0] },
  { number: 123.456, expected: [123, 123, 123.46, 100] },
  { number: -123.456, expected: [-123, -123, -123.46, -100] },
  { number: 654.321, expected: [654, 654, 654.32, 700] },
  { number: -654.321, expected: [-654, -654, -654.32, -700] },
];

let cases: TestCase[] = [];

precisions.forEach((precision, i) => {
  let values: number[] = [];
  let want: number[] = [];

  mapping.forEach((mapping) => {
    // single values
    cases.push({
      args: [mapping.number, precision],
      want: mapping.expected[i],
    });

    values.push(mapping.number);
    want.push(mapping.expected[i]);
  });

  // vector
  cases.push({
    args: [values, precision],
    want,
  });

  // matrix
  cases.push({
    args: [[values, values], precision],
    want: [want, want],
  });
});

describe("round", () => {
  testFunc(round, cases);
});
