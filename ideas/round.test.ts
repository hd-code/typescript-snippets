import round from "./round";
import { testFunc } from "./testutil";

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

type Struct = number | number[] | number[][];

const cases: [[Struct, number | undefined], Struct][] = [];

precisions.forEach((precision, i) => {
    const values: number[] = [];
    const want: number[] = [];

    mapping.forEach((mapping) => {
        // single values
        cases.push([[mapping.number, precision], mapping.expected[i]]);

        values.push(mapping.number);
        want.push(mapping.expected[i]);
    });

    // vector
    cases.push([[values, precision], want]);

    // matrix
    cases.push([
        [[values, values], precision],
        [want, want],
    ]);
});

describe("round", () => {
    testFunc(round, cases);
});
