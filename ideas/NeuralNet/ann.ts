import { hasKey, isArray } from "../../snippets/typeguards";
import * as Matrix from "../matrix";
import { getFloat } from "../random";
import * as Vector from "../vector";
import * as a from "./activation";
import * as e from "./error";

// -----------------------------------------------------------------------------

export type ANN = Layer[];

interface Layer {
    activation: a.Activation;
    bias: number[];
    weights: number[][]; // [output][input]
}

export function isANN(ann: unknown): ann is ANN {
    if (!isArray(ann, isLayer) || ann.length === 0) {
        return false;
    }
    for (let i = 1, ie = ann.length; i < ie; i++) {
        const numOfOutputs = ann[i - 1].weights.length;
        const numOfInputs = ann[i].weights[0].length;
        if (numOfOutputs !== numOfInputs) {
            return false;
        }
    }
    return true;
}

function isLayer(layer: unknown): layer is Layer {
    return (
        hasKey(layer, "activation", a.isActivation) &&
        hasKey(layer, "bias", Vector.isVector) &&
        hasKey(layer, "weights", Matrix.isMatrix) &&
        (layer as Layer).bias.length === (layer as Layer).weights.length
    );
}

// -----------------------------------------------------------------------------

export interface LayerConfig {
    activation: a.Activation;
    numOfNeurons: number;
}

export function init(numOfInputs: number, ...layers: LayerConfig[]): ANN {
    const numOfNeurons = [
        numOfInputs,
        ...layers.map((layer) => layer.numOfNeurons),
    ];
    return layers.map(({ activation }, i) =>
        makeLayer(numOfNeurons[i], numOfNeurons[i + 1], activation)
    );
}

function makeLayer(
    numOfInputs: number,
    numOfOutputs: number,
    activation: a.Activation
): Layer {
    const bias = [...Array(numOfOutputs)].map(() => getFloat(-1, 1));
    const weights = [...Array(numOfOutputs)].map(() =>
        [...Array(numOfInputs)].map(() => getFloat(-1, 1))
    );
    return { activation, bias, weights };
}

// -----------------------------------------------------------------------------

export function calc(ann: ANN, input: number[]): number[] {
    let result = [...input];
    for (let i = 0, ie = ann.length; i < ie; i++) {
        result = calcLayer(ann[i], result);
    }
    return result;
}

export function calcBatch(ann: ANN, input: number[][]): number[][] {
    const result: number[][] = [];
    for (let i = 0, ie = input.length; i < ie; i++) {
        result.push(calc(ann, input[i]));
    }
    return result;
}

function calcLayer(layer: Layer, input: number[]): number[] {
    const weighted = Matrix.mulVector(layer.weights, input);
    const biased = Vector.add(layer.bias, weighted);
    return a.calc(biased, layer.activation);
}

// -----------------------------------------------------------------------------

export function train(
    ann: ANN,
    input: number[],
    expected: number[],
    errorFunc: e.Error,
    learnRate: number
): ANN {
    const delta = calcDelta(ann, input, expected, errorFunc);
    return applyDelta(ann, delta, learnRate);
}

export function trainBatch(
    ann: ANN,
    input: number[][],
    expected: number[][],
    errorFunc: e.Error,
    learnRate: number
): ANN {
    const deltas: Delta[] = [];
    for (let i = 0, ie = input.length; i < ie; i++) {
        deltas.push(calcDelta(ann, input[i], expected[i], errorFunc));
    }
    const delta = avgDeltas(deltas);
    return applyDelta(ann, delta, learnRate);
}

type Delta = DeltaLayer[];

interface DeltaLayer {
    bias: number[];
    weights: number[][]; // [output][input]
}

function applyDelta(ann: ANN, delta: Delta, learnRate: number): ANN {
    return ann.map((_, i) => applyDeltaLayer(ann[i], delta[i], learnRate));
}

function applyDeltaLayer(
    layer: Layer,
    delta: DeltaLayer,
    learnRate: number
): Layer {
    return {
        activation: layer.activation,
        bias: Vector.sub(layer.bias, Vector.scale(learnRate, delta.bias)),
        weights: Matrix.sub(
            layer.weights,
            Matrix.scale(learnRate, delta.weights)
        ),
    };
}

// TODO
function avgDeltas(deltas: Delta[]): Delta {
    return deltas[0];
}

function calcDelta(
    ann: ANN,
    input: number[],
    expected: number[],
    errorFunc: e.Error
): Delta {
    const { actDeriv, inOutputs } = forwardPass(ann, input);

    // backpropagation
    const errGradient = e.diff(
        inOutputs[inOutputs.length - 1],
        expected,
        errorFunc
    );

    const deltaB = [Vector.mul(errGradient, actDeriv[actDeriv.length - 1])];
    const deltaW = [calcDeltaW(deltaB[0], inOutputs[inOutputs.length - 2])];

    for (let i = ann.length - 1; i > 0; i--) {
        deltaB.unshift(
            Vector.mul(
                Vector.mulMatrix(deltaB[0], Matrix.transpose(ann[i].weights)),
                actDeriv[i - 1]
            )
        );
        deltaW.unshift(calcDeltaW(deltaB[0], inOutputs[i - 1]));
    }

    const result: { bias: number[]; weights: number[][] }[] = [];
    for (let i = 0, ie = deltaB.length; i < ie; i++) {
        result.push({ bias: deltaB[i], weights: deltaW[i] });
    }
    return result;
}

function forwardPass(
    ann: ANN,
    input: number[]
): { actDeriv: number[][]; inOutputs: number[][] } {
    const actDeriv: number[][] = [];
    const inOutputs = [input];
    for (let i = 0, ie = ann.length; i < ie; i++) {
        const layer = ann[i];
        const weighted = Matrix.mulVector(layer.weights, inOutputs[i]);
        const biased = Vector.add(layer.bias, weighted);
        actDeriv.push(a.diff(biased, layer.activation));
        inOutputs.push(a.calc(biased, layer.activation));
    }
    return { actDeriv, inOutputs };
}

function calcDeltaW(deltaB: number[], input: number[]): number[][] {
    return deltaB.map((out) => input.map((inp) => out * inp));
}
