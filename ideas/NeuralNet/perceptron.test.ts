import * as assert from "assert/strict";
import * as p from "./perceptron";

// -----------------------------------------------------------------------------

const cases = [
    {
        name: "AND perceptron",
        learningRate: 0.1,
        perceptron: { bias: -0.5, weights: [1.2, 0.3] },
        data: [
            {
                input: [0, 0],
                expected: 0,
                result: 0,
                error: 0,
                deltaW: [0, 0],
                deltaB: 0,
            },
            {
                input: [0, 1],
                expected: 0,
                result: 0,
                error: 0,
                deltaW: [0, 0],
                deltaB: 0,
            },
            {
                input: [1, 0],
                expected: 0,
                result: 1,
                error: -1,
                deltaW: [-1, 0],
                deltaB: -1,
            },
            {
                input: [1, 1],
                expected: 1,
                result: 1,
                error: 0,
                deltaW: [0, 0],
                deltaB: 0,
            },
        ],
    },
    {
        name: "NOR perceptron",
        learningRate: 0.1,
        perceptron: { bias: -0.5, weights: [1.2, 0.3] },
        data: [
            {
                input: [0, 0],
                expected: 1,
                result: 0,
                error: 1,
                deltaW: [0, 0],
                deltaB: 1,
            },
            {
                input: [0, 1],
                expected: 0,
                result: 0,
                error: 0,
                deltaW: [0, 0],
                deltaB: 0,
            },
            {
                input: [1, 0],
                expected: 0,
                result: 1,
                error: -1,
                deltaW: [-1, 0],
                deltaB: -1,
            },
            {
                input: [1, 1],
                expected: 0,
                result: 1,
                error: -1,
                deltaW: [-1, -1],
                deltaB: -1,
            },
        ],
    },
    {
        name: "only middle value perceptron",
        learningRate: 0.1,
        perceptron: { bias: 0, weights: [-0.7, 0.2, 0.4] },
        data: [
            {
                input: [0, 0, 0],
                expected: 0,
                result: 1,
                error: -1,
                deltaW: [0, 0, 0],
                deltaB: -1,
            },
            {
                input: [0, 0, 1],
                expected: 0,
                result: 1,
                error: -1,
                deltaW: [0, 0, -1],
                deltaB: -1,
            },
            {
                input: [0, 1, 0],
                expected: 1,
                result: 1,
                error: 0,
                deltaW: [0, 0, 0],
                deltaB: 0,
            },
            {
                input: [0, 1, 1],
                expected: 1,
                result: 1,
                error: 0,
                deltaW: [0, 0, 0],
                deltaB: 0,
            },
            {
                input: [1, 0, 0],
                expected: 0,
                result: 0,
                error: 0,
                deltaW: [0, 0, 0],
                deltaB: 0,
            },
            {
                input: [1, 0, 1],
                expected: 0,
                result: 0,
                error: 0,
                deltaW: [0, 0, 0],
                deltaB: 0,
            },
            {
                input: [1, 1, 0],
                expected: 1,
                result: 0,
                error: 1,
                deltaW: [1, 1, 0],
                deltaB: 1,
            },
            {
                input: [1, 1, 1],
                expected: 1,
                result: 0,
                error: 1,
                deltaW: [1, 1, 1],
                deltaB: 1,
            },
        ],
    },
];

describe("Perceptron", () => {
    describe(p.isPerceptron.name + "()", () => {
        [
            {
                name: "normal perceptron",
                expected: true,
                perceptron: { bias: 0.5, weights: [0.3, 0.6] },
            },
            {
                name: "bias missing",
                expected: false,
                perceptron: { weights: [0.3, 0.6] },
            },
            {
                name: "bias not a number",
                expected: false,
                perceptron: { bias: "0.5", weights: [0.3, 0.6] },
            },
            {
                name: "weights missing",
                expected: false,
                perceptron: { bias: 0.5 },
            },
            {
                name: "weights no vector",
                expected: false,
                perceptron: { bias: 0.5, weights: 0.3 },
            },
        ].forEach(({ name, perceptron, expected }) => {
            it(name + " should return " + expected, () => {
                const actual = p.isPerceptron(perceptron);
                assert.strictEqual(actual, expected);
            });
        });

        ["string", -90, 2.5, 99999, [], {}, true].forEach((value) => {
            it(value + " should return false", () => {
                assert.ok(!p.isPerceptron(value));
            });
        });
    });

    describe(p.calc.name + "()", () =>
        cases.forEach(({ name, perceptron, data }) => {
            it(name, () =>
                data.forEach(({ input, result: expected }) => {
                    assert.strictEqual(
                        p.calc(perceptron, input),
                        expected,
                        "failed for " + input,
                    );
                }),
            );
        }),
    );

    describe(p.calcBatch.name + "()", () =>
        cases.forEach(({ name, perceptron, data }) => {
            it(name, () => {
                const input = data.map((d) => d.input);
                const expected = data.map((d) => d.result);
                const actual = p.calcBatch(perceptron, input);
                assert.deepStrictEqual(actual, expected);
            });
        }),
    );

    describe(p.train.name + "()", () =>
        cases.forEach(({ name, learningRate, perceptron, data }) => {
            it(name, () =>
                data.forEach((d) => {
                    const expected = {
                        bias: perceptron.bias + learningRate * d.deltaB,
                        weights: perceptron.weights.map(
                            (w, i) => w + learningRate * d.deltaW[i],
                        ),
                    };
                    const actual = p.train(
                        perceptron,
                        d.input,
                        d.expected,
                        learningRate,
                    );
                    assert.deepStrictEqual(actual, expected);
                }),
            );
        }),
    );

    describe(p.trainBatch.name + "()", () =>
        cases.forEach(({ name, learningRate, perceptron, data }) => {
            it(name, () => {
                const deltaB =
                    data.reduce((sum, d) => sum + d.deltaB, 0) / data.length;
                const deltaW = data[0].deltaW.map(
                    (_, i) =>
                        data.reduce((sum, d) => sum + d.deltaW[i], 0) /
                        data.length,
                );
                const expected = {
                    bias: perceptron.bias + learningRate * deltaB,
                    weights: perceptron.weights.map(
                        (w, i) => w + learningRate * deltaW[i],
                    ),
                };

                const input = data.map((d) => d.input);
                const expOutput = data.map((d) => d.expected);
                const actual = p.trainBatch(
                    perceptron,
                    input,
                    expOutput,
                    learningRate,
                );

                assert.deepStrictEqual(actual, expected);
            });
        }),
    );
});
