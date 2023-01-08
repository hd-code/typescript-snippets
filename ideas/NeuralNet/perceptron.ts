import * as Vector from "../vector";
import { float } from "../../snippets/random";
import { hasKey, isNumber } from "../../snippets/typeguards";

// -----------------------------------------------------------------------------

export interface Perceptron {
    bias: number;
    weights: number[];
}

export function isPerceptron(p: unknown): p is Perceptron {
    return hasKey(p, "bias", isNumber) && hasKey(p, "weights", Vector.isVector);
}

// -----------------------------------------------------------------------------

export function init(numOfInputs: number): Perceptron {
    return {
        bias: float(),
        weights: getRandomVector(numOfInputs),
    };
}

function getRandomVector(length: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < length; i++) {
        result.push(float(-1, 1));
    }
    return result;
}

// -----------------------------------------------------------------------------

export function calc(p: Perceptron, input: number[]): number {
    const tmp = Vector.dot(p.weights, input) + p.bias;
    return binary(tmp);
}

export function calcBatch(p: Perceptron, input: number[][]): number[] {
    const result: number[] = [];
    for (let i = 0, ie = input.length; i < ie; i++) {
        result.push(calc(p, input[i]));
    }
    return result;
}

function binary(input: number): number {
    return input >= 0 ? 1 : 0;
}

// -----------------------------------------------------------------------------

export function train(
    p: Perceptron,
    input: number[],
    expected: number,
    learnRate: number,
): Perceptron {
    const delta = calcDelta(p, input, expected);
    return applyDelta(p, delta, learnRate);
}

export function trainBatch(
    p: Perceptron,
    input: number[][],
    expected: number[],
    learnRate: number,
): Perceptron {
    const deltas: Delta[] = [];
    for (let i = 0, ie = input.length; i < ie; i++) {
        deltas.push(calcDelta(p, input[i], expected[i]));
    }
    const delta = avgDeltas(deltas);
    return applyDelta(p, delta, learnRate);
}

interface Delta {
    bias: number;
    weights: number[];
}

function applyDelta(
    p: Perceptron,
    delta: Delta,
    learnRate: number,
): Perceptron {
    return {
        bias: p.bias + learnRate * delta.bias,
        weights: Vector.add(p.weights, Vector.scale(learnRate, delta.weights)),
    };
}

function avgDeltas(deltas: Delta[]): Delta {
    const len = deltas.length;
    return {
        bias: deltas.reduce((sum, delta) => sum + delta.bias, 0) / len,
        weights: deltas[0].weights.map(
            (_, i) =>
                deltas.reduce((sum, delta) => sum + delta.weights[i], 0) / len,
        ),
    };
}

function calcDelta(p: Perceptron, input: number[], expected: number): Delta {
    const error = expected - calc(p, input);
    return {
        bias: error,
        weights: Vector.scale(error, input),
    };
}
