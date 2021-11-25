import * as Vector from "../../src/vector";

// -----------------------------------------------------------------------------

export enum Activation {
  sigmoid,
  tanh,
  hardTanh,
  linear,
  rectifiedLinear,
  leakyRectifiedLinear,
  softplus,
  softmax,
}

export function isActivation(activation: unknown): activation is Activation {
  return typeof activation === "number" && Activation[activation] !== undefined;
}

// -----------------------------------------------------------------------------

export function calcActivation(
  input: number[],
  activation = Activation.sigmoid,
): number[] {
  const func = functions[activation]?.func;
  return func ? applyFunc(input, func) : softmax(input);
}

export function calcActivationDerivative(
  input: number[],
  activation = Activation.sigmoid,
): number[] {
  const func = functions[activation]?.deriv;
  return func ? applyFunc(input, func) : softmaxDeriv(input);
}

// -----------------------------------------------------------------------------

function applyFunc(input: number[], func: (input: number) => number): number[] {
  const result = [];
  for (let i = 0, ie = input.length; i < ie; i++) {
    result.push(func(input[i]));
  }
  return result;
}

// -----------------------------------------------------------------------------

interface Func {
  func: (x: number) => number;
  deriv: (x: number) => number;
}
const functions: { [act in Activation]?: Func } = {
  [Activation.sigmoid]: {
    func: sigmoid,
    deriv: (x) => {
      const sig = sigmoid(x);
      return sig * (1 - sig);
    },
  },

  [Activation.tanh]: {
    func: (x) => {
      const exp = Math.exp(x);
      const exn = Math.exp(-x);
      return (exp - exn) / (exp + exn);
    },
    deriv: (x) => {
      const exp = Math.exp(x);
      const exn = Math.exp(-x);
      const tanh = (exp - exn) / (exp + exn);
      return 1 - tanh ** 2;
    },
  },

  [Activation.hardTanh]: {
    func: (x) => Math.max(-1, Math.min(x, 1)),
    deriv: (x) => (-1 < x && x < 1 ? 1 : 0),
  },

  [Activation.linear]: {
    func: (x) => x,
    deriv: () => 1,
  },

  [Activation.rectifiedLinear]: {
    func: (x) => Math.max(0, x),
    deriv: (x) => (x > 0 ? 1 : 0),
  },

  [Activation.leakyRectifiedLinear]: {
    func: (x) => Math.max(0.01 * x, x),
    deriv: (x) => (x > 0 ? 1 : 0.01),
  },

  [Activation.softplus]: {
    func: (x) => Math.log(1 + Math.exp(x)),
    deriv: (x) => 1 / (1 + Math.exp(-x)),
  },
};

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

function softmax(input: number[]): number[] {
  const exp = input.map((x) => Math.exp(x));
  const sum = Vector.sum(exp);
  return exp.map((x) => x / sum);
}

function softmaxDeriv(input: number[]): number[] {
  const sm = softmax(input);
  return sm.map((sm) => sm * (1 - sm));
}
