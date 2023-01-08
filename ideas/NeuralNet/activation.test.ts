import * as assert from "assert/strict";
import { round } from "../../snippets/round";
import * as a from "./activation";

// -----------------------------------------------------------------------------

const precision = 8; // digits after comma

const cases = [
    {
        act: a.Activation.sigmoid,
        input: [-10, -1, -0.5, 0, 0.5, 1, 10],
        output: [
            0.0000453979, 0.26894142, 0.37754067, 0.5, 0.62245933, 0.73105858,
            0.9999546,
        ],
        deriv: [
            0.0000453958, 0.19661193, 0.23500371, 0.25, 0.23500371, 0.19661193,
            0.0000453958,
        ],
    },
    {
        act: a.Activation.tanh,
        input: [-10, -1, -0.5, 0, 0.5, 1, 10],
        output: [-1, -0.76159416, -0.46211716, 0, 0.46211716, 0.76159416, 1],
        deriv: [1e-8, 0.41997434, 0.78644773, 1, 0.78644773, 0.41997434, 1e-8],
    },
    {
        act: a.Activation.hardTanh,
        input: [-10, -1, -0.5, 0, 0.5, 1, 10],
        output: [-1, -1, -0.5, 0, 0.5, 1, 1],
        deriv: [0, 0, 1, 1, 1, 0, 0],
    },
    {
        act: a.Activation.linear,
        input: [-10, -1, -0.5, 0, 0.5, 1, 10],
        output: [-10, -1, -0.5, 0, 0.5, 1, 10],
        deriv: [1, 1, 1, 1, 1, 1, 1],
    },
    {
        act: a.Activation.rectifiedLinear,
        input: [-10, -1, -0.5, 0, 0.5, 1, 10],
        output: [0, 0, 0, 0, 0.5, 1, 10],
        deriv: [0, 0, 0, 0, 1, 1, 1],
    },
    {
        act: a.Activation.leakyRectifiedLinear,
        input: [-10, -1, -0.5, 0, 0.5, 1, 10],
        output: [-0.1, -0.01, -0.005, 0, 0.5, 1, 10],
        deriv: [0.01, 0.01, 0.01, 0.01, 1, 1, 1],
    },
    {
        act: a.Activation.softplus,
        input: [-10, -1, -0.5, 0, 0.5, 1, 10],
        output: [
            4.54e-5, 0.31326169, 0.47407698, 0.69314718, 0.97407698, 1.31326169,
            10.0000454,
        ],
        deriv: [
            4.54e-5, 0.26894142, 0.37754067, 0.5, 0.62245933, 0.73105858,
            0.9999546,
        ],
    },
    {
        act: a.Activation.softmax,
        input: [-10, -1, -0.5, 0, 0.5, 1, 10],
        output: [
            0, 0.0000167, 0.00002753, 0.00004539, 0.00007483, 0.00012337,
            0.99971218,
        ],
        deriv: [
            0, 0.0000167, 0.00002753, 0.00004538, 0.00007482, 0.00012336,
            0.00028774,
        ],
    },
    {
        act: a.Activation.softmax,
        input: [1, 2, 3, 4],
        output: [0.0320586, 0.08714432, 0.23688282, 0.64391426],
        deriv: [0.03103085, 0.07955019, 0.18076935, 0.22928869],
    },
    {
        act: a.Activation.softmax,
        input: [1, 1, 1, 1],
        output: [0.25, 0.25, 0.25, 0.25],
        deriv: [0.1875, 0.1875, 0.1875, 0.1875],
    },
];

describe("Activation", () => {
    describe(a.isActivation.name + "()", () => {
        for (const key in a.Activation) {
            const value = a.Activation[key];
            if (typeof value === "number") {
                it(a.Activation[value] + " should return true", () => {
                    assert.ok(a.isActivation(value));
                });
            }
        }

        ["string", -90, 2.5, 99999, [], {}, true].forEach((value) => {
            it(value + " should return false", () => {
                assert.ok(!a.isActivation(value));
            });
        });
    });

    describe(a.calc.name + "()", () =>
        cases.forEach(({ act, input, output }) => {
            it(a.Activation[act] + " with input: " + input, () => {
                const _actual = a.calc(input, act);
                const actual = round(_actual, precision);
                const expected = round(output, precision);
                assert.deepStrictEqual(actual, expected);
            });
        }),
    );

    describe(a.diff.name + "()", () =>
        cases.forEach(({ act, input, deriv }) => {
            it(a.Activation[act] + " with input: " + input, () => {
                const _actual = a.diff(input, act);
                const actual = round(_actual, precision);
                const expected = round(deriv, precision);
                assert.deepStrictEqual(actual, expected);
            });
        }),
    );
});
