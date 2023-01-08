import * as assert from "assert/strict";
import { round } from "../../snippets/round";
import * as e from "./error";

// -----------------------------------------------------------------------------

const cases = [
    {
        errorFunc: e.Error.absolute,
        actual: [1, 1, 1],
        expected: [0, 1, 2],
        errorDeriv: [1, 0, -1],
        error: 2,
    },
    {
        errorFunc: e.Error.absolute,
        actual: [-0.5, -0.2, 0, 0.2, 0.5],
        expected: [0, 0, 0, 0, 0],
        errorDeriv: [-1, -1, 0, 1, 1],
        error: 1.4,
    },
    {
        errorFunc: e.Error.meanAbsolute,
        actual: [1, 1, 1],
        expected: [0, 1, 2],
        errorDeriv: [1 / 3, 0, -1 / 3],
        error: 2 / 3,
    },
    {
        errorFunc: e.Error.meanAbsolute,
        actual: [-0.5, -0.2, 0, 0.2, 0.5],
        expected: [0, 0, 0, 0, 0],
        errorDeriv: [-1 / 5, -1 / 5, 0, 1 / 5, 1 / 5],
        error: 1.4 / 5,
    },
    {
        errorFunc: e.Error.squared,
        actual: [1, 1, 1],
        expected: [0, 1, 2],
        errorDeriv: [2, 0, -2],
        error: 2,
    },
    {
        errorFunc: e.Error.squared,
        actual: [-0.5, -0.2, 0, 0.2, 0.5],
        expected: [0, 0, 0, 0, 0],
        errorDeriv: [-1, -0.4, 0, 0.4, 1],
        error: 0.58,
    },
    {
        errorFunc: e.Error.meanSquared,
        actual: [1, 1, 1],
        expected: [0, 1, 2],
        errorDeriv: [2 / 3, 0, -2 / 3],
        error: 2 / 3,
    },
    {
        errorFunc: e.Error.meanSquared,
        actual: [-0.5, -0.2, 0, 0.2, 0.5],
        expected: [0, 0, 0, 0, 0],
        errorDeriv: [-0.2, -0.08, 0, 0.08, 0.2],
        error: 0.116,
    },
];

describe("Error", () => {
    describe(e.isError.name + "()", () => {
        for (const key in e.Error) {
            const value = e.Error[key];
            if (typeof value === "number") {
                it(e.Error[value] + " should return true", () => {
                    assert.ok(e.isError(value));
                });
            }
        }

        ["string", -90, 2.5, 99999, [], {}, true].forEach((value) => {
            it(value + " should return false", () => {
                assert.ok(!e.isError(value));
            });
        });
    });

    describe(e.calc.name + "()", () =>
        cases.forEach((c) => {
            it(
                e.Error[c.errorFunc] +
                    " error with actual: " +
                    c.actual +
                    " and expected: " +
                    c.expected,
                () => {
                    const _actual = e.calc(c.actual, c.expected, c.errorFunc);
                    const actual = round(_actual, 8);
                    const expected = round(c.error, 8);
                    assert.strictEqual(actual, expected);
                },
            );
        }),
    );

    describe(e.diff.name + "()", () =>
        cases.forEach((c) => {
            it(
                e.Error[c.errorFunc] +
                    " error with actual: " +
                    c.actual +
                    " and expected: " +
                    c.expected,
                () => {
                    const actual = e.diff(c.actual, c.expected, c.errorFunc);
                    assert.deepStrictEqual(actual, c.errorDeriv);
                },
            );
        }),
    );
});
