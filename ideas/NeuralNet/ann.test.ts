import * as Matrix from "../matrix";
import round from "../round";
import * as Vector from "../vector";
import { Activation } from "./activation";
import * as ANN from "./ann";
import * as e from "./error";
import * as assert from "assert/strict";

// -----------------------------------------------------------------------------

interface Case {
    name: string;
    learningRate: number;
    errorFunc: e.Error;
    ann: ANN.ANN;
    data: {
        input: number[];
        target: number[];
        error: number[];
        layers: {
            weighted: number[];
            biased: number[];
            activated: number[];
            actiDeriv: number[];
            deltaB: number[];
            deltaW: number[][];
        }[];
    }[];
}
const cases: Case[] = [
    {
        name: "one layer, AND",
        learningRate: 0.1,
        errorFunc: e.Error.meanSquared,
        ann: [
            {
                activation: Activation.rectifiedLinear,
                bias: [-0.5],
                weights: [[1.2, 0.3]],
            },
        ],
        data: [
            {
                input: [0, 0],
                target: [0],
                error: [0],
                layers: [
                    {
                        weighted: [0],
                        biased: [-0.5],
                        activated: [0],
                        actiDeriv: [0],
                        deltaB: [0],
                        deltaW: [[0, 0]],
                    },
                ],
            },
            {
                input: [0, 1],
                target: [0],
                error: [0],
                layers: [
                    {
                        weighted: [0.3],
                        biased: [-0.2],
                        activated: [0],
                        actiDeriv: [0],
                        deltaB: [0],
                        deltaW: [[0, 0]],
                    },
                ],
            },
            {
                // TODO: look into error
                input: [1, 0],
                target: [0],
                error: [0.7],
                layers: [
                    {
                        weighted: [1.2],
                        biased: [0.7],
                        activated: [0.7],
                        actiDeriv: [1],
                        deltaB: [-0.35],
                        deltaW: [[0.84, 0]],
                    },
                ],
            },
            {
                input: [1, 1],
                target: [1],
                error: [0],
                layers: [
                    {
                        weighted: [1.5],
                        biased: [1],
                        activated: [1],
                        actiDeriv: [0],
                        deltaB: [0],
                        deltaW: [[0, 0]],
                    },
                ],
            },
        ],
    },
    {
        name: "one layer, AND + NOR",
        learningRate: 0.1,
        errorFunc: e.Error.meanSquared,
        ann: [
            {
                activation: Activation.rectifiedLinear,
                bias: [-0.5, 0.7],
                weights: [
                    [1.2, 0.3],
                    [-0.8, 0.5],
                ],
            },
        ],
        data: [
            {
                input: [0, 0],
                target: [0, 1],
                error: [0, -0.3],
                layers: [
                    {
                        weighted: [0, 0],
                        biased: [-0.5, 0.7],
                        activated: [0, 0.7],
                        actiDeriv: [0, 1],
                        deltaB: [0, -0.3],
                        deltaW: [
                            [0, 0],
                            [0, 0],
                        ],
                    },
                ],
            },
            {
                input: [0, 1],
                target: [0, 0],
                error: [0, 1.2],
                layers: [
                    {
                        weighted: [0.3, 0.5],
                        biased: [-0.2, 1.2],
                        activated: [0, 1.2],
                        actiDeriv: [0, 1],
                        deltaB: [0, 1.2],
                        deltaW: [
                            [0, 0],
                            [0, 1.2],
                        ],
                    },
                ],
            },
            {
                input: [1, 0],
                target: [0, 0],
                error: [0.7, 0],
                layers: [
                    {
                        weighted: [1.2, -0.8],
                        biased: [0.7, -0.1],
                        activated: [0.7, 0],
                        actiDeriv: [1, 0],
                        deltaB: [0.7, 0],
                        deltaW: [
                            [0.7, 0],
                            [0, 0],
                        ],
                    },
                ],
            },
            {
                // TODO: look into error
                input: [1, 1],
                target: [1, 1],
                error: [0, 0.6],
                layers: [
                    {
                        weighted: [1.5, -0.3],
                        biased: [1, 0.4],
                        activated: [1, 0.4],
                        actiDeriv: [1, 1],
                        deltaB: [0, 0.6],
                        deltaW: [
                            [0, 0],
                            [0.6, 0.6],
                        ],
                    },
                ],
            },
        ],
    },
];

describe("ANN", () => {
    describe(ANN.isANN.name, () => {
        [
            {
                name: "normal net, constant number of neurons",
                expected: true,
                ann: [
                    {
                        activation: Activation.sigmoid,
                        bias: [0.5, 0.8],
                        weights: [
                            [0.3, 0.6],
                            [0.4, 0.3],
                        ],
                    },
                    {
                        activation: Activation.rectifiedLinear,
                        bias: [0.5, 0.8],
                        weights: [
                            [0.3, 0.6],
                            [0.4, 0.3],
                        ],
                    },
                ],
            },
            {
                name: "normal net, num of neurons changes",
                expected: true,
                ann: [
                    {
                        activation: Activation.sigmoid,
                        bias: [0.5],
                        weights: [[0.3, 0.6]], // 2 inputs, 1 output
                    },
                    {
                        activation: Activation.sigmoid,
                        bias: [0.5, 0.8, 0.2],
                        weights: [[0.3], [0.4], [0.7]], // 1 input, 3 output
                    },
                    {
                        activation: Activation.rectifiedLinear,
                        bias: [0.5, 0.8],
                        weights: [
                            [0.3, 0.6, 0.1],
                            [0.4, 0.3, -0.4],
                        ], // 3 input, 2 output
                    },
                ],
            },
            {
                name: "empty net",
                expected: false,
                ann: [],
            },
            {
                name: "activation is missing in one of the layers",
                expected: false,
                ann: [
                    {
                        activation: Activation.sigmoid,
                        bias: [0.5, 0.8],
                        weights: [
                            [0.3, 0.6],
                            [0.4, 0.3],
                        ],
                    },
                    {
                        bias: [0.5, 0.8],
                        weights: [
                            [0.3, 0.6],
                            [0.4, 0.3],
                        ],
                    },
                ],
            },
            {
                name: "bias is missing in one of the layers",
                expected: false,
                ann: [
                    {
                        activation: Activation.sigmoid,
                        weights: [
                            [0.3, 0.6],
                            [0.4, 0.3],
                        ],
                    },
                    {
                        activation: Activation.rectifiedLinear,
                        bias: [0.5, 0.8],
                        weights: [
                            [0.3, 0.6],
                            [0.4, 0.3],
                        ],
                    },
                ],
            },
            {
                name: "weights are missing in one of the layers",
                expected: false,
                ann: [
                    {
                        activation: Activation.sigmoid,
                        bias: [0.5, 0.8],
                        weights: [
                            [0.3, 0.6],
                            [0.4, 0.3],
                        ],
                    },
                    {
                        activation: Activation.rectifiedLinear,
                        bias: [0.5, 0.8],
                    },
                ],
            },
            {
                name: "weights in one layer are not a matrix",
                expected: false,
                ann: [
                    {
                        activation: Activation.sigmoid,
                        bias: [0.5, 0.8],
                        weights: [
                            [0.3, 0.6],
                            [0.4, 0.3],
                        ],
                    },
                    {
                        activation: Activation.rectifiedLinear,
                        bias: [0.5, 0.8],
                        weights: [[0.3, 0.6], [0.3]],
                    },
                ],
            },
            {
                name: "first layer has more outputs than second inputs",
                expected: false,
                ann: [
                    {
                        activation: Activation.sigmoid,
                        bias: [0.5, 0.8],
                        weights: [
                            [0.3, 0.6],
                            [0.4, 0.3],
                        ],
                    },
                    {
                        activation: Activation.rectifiedLinear,
                        bias: [0.5, 0.8],
                        weights: [[0.3], [0.4]],
                    },
                ],
            },
            {
                name: "one layers bias and weights specify different number of outputs",
                expected: false,
                ann: [
                    {
                        activation: Activation.sigmoid,
                        bias: [0.5],
                        weights: [
                            [0.3, 0.6],
                            [0.4, 0.3],
                        ],
                    },
                ],
            },
        ].forEach(({ name, ann, expected }) =>
            it(name + " should return " + expected, () => {
                const actual = ANN.isANN(ann);
                assert.strictEqual(actual, expected);
            })
        );

        ["string", -90, 2.5, 99999, {}, true].forEach((value) => {
            it(value + " should return false", () => {
                assert.ok(!ANN.isANN(value));
            });
        });
    });

    it(ANN.init.name);

    describe(ANN.calc.name, () =>
        cases.forEach((c) =>
            it(c.name, () => {
                for (let i = 0, ie = c.data.length; i < ie; i++) {
                    const d = c.data[i];

                    const _actual = ANN.calc(c.ann, d.input);
                    const actual = round(_actual, 5);

                    const expected = d.layers[d.layers.length - 1].activated;
                    assert.deepStrictEqual(
                        actual,
                        expected,
                        "failed on input: " + d.input
                    );
                }
            })
        )
    );

    describe(ANN.calcBatch.name, () =>
        cases.forEach((c) =>
            it(c.name, () => {
                const input = c.data.map((d) => d.input);
                const expected = c.data.map(
                    (d) => d.layers[d.layers.length - 1].activated
                );

                const _actual = ANN.calcBatch(c.ann, input);
                const actual = round(_actual, 5);

                assert.deepStrictEqual(actual, expected);
            })
        )
    );

    // TODO: validate test data in study
    xdescribe(ANN.train.name, () =>
        cases.forEach((c) =>
            it(c.name, () => {
                for (let i = 0, ie = c.data.length; i < ie; i++) {
                    const d = c.data[i];

                    const expected = c.ann.map((layer, i) => ({
                        activation: layer.activation,
                        bias: Vector.sub(
                            layer.bias,
                            Vector.scale(c.learningRate, d.layers[i].deltaB)
                        ),
                        weights: Matrix.sub(
                            layer.weights,
                            Matrix.scale(c.learningRate, d.layers[i].deltaW)
                        ),
                    }));
                    const actual = ANN.train(
                        c.ann,
                        d.input,
                        d.target,
                        c.errorFunc,
                        c.learningRate
                    );

                    assert.deepStrictEqual(
                        actual,
                        expected,
                        "failed on input: " + d.input
                    );
                }
            })
        )
    );
});
