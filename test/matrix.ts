// FIXME: port tests
/*
import {
  add,
  div,
  dot,
  flatten,
  isMatrix,
  mul,
  mulVector,
  scale,
  sub,
  transpose,
} from "matrix";

// -----------------------------------------------------------------------------

describe("math/matrix", () => {
  describe(isMatrix.name, () => {
    it.each([
      [[], true],
      [[[]], true],
      [
        [
          [1, 2],
          [3, 4],
        ],
        true,
      ],
      [
        [
          [1, 2],
          [null, 4],
        ],
        false,
      ],
      [
        [
          [1, "2"],
          [3, 4],
        ],
        false,
      ],
      [[[1], [3, 4]], false],
      [
        [
          [1, 2, 3],
          [4, 5, 6],
        ],
        true,
      ],
      [
        [
          [1, 2, 3],
          [4, 6],
        ],
        false,
      ],
      [[[1, 2, 3]], true],
      [[1, 2, 3], false],
      [123, false],
      ["123", false],
      [{}, false],
    ])("%j => %j", (input, expected) => {
      const actual = isMatrix(input);
      expect(actual).toBe(expected);
    });
  });

  // ---------------------------------------------------------------------------

  const data = [
    { mat1: [], mat2: [], add: [], sub: [], mul: [], div: [] },
    {
      mat1: [[1]],
      mat2: [[2]],
      add: [[3]],
      sub: [[-1]],
      mul: [[2]],
      div: [[0.5]],
    },
    {
      mat1: [[12, 4]],
      mat2: [[6, 3]],
      add: [[18, 7]],
      sub: [[6, 1]],
      mul: [[72, 12]],
      div: [[2, 4 / 3]],
    },
    {
      mat1: [[12], [4]],
      mat2: [[6], [3]],
      add: [[18], [7]],
      sub: [[6], [1]],
      mul: [[72], [12]],
      div: [[2], [4 / 3]],
    },
    { mat1: [[1, 2]], mat2: [[3]], add: [], sub: [], mul: [], div: [] },
    { mat1: [[1]], mat2: [[2, 3]], add: [], sub: [], mul: [], div: [] },
    { mat1: [[1], [2]], mat2: [[3, 4]], add: [], sub: [], mul: [], div: [] },
  ];

  [add, sub, mul, div].forEach((func) => {
    const name = func.name as keyof typeof data[0];
    describe(name, () => {
      data.forEach((d) => {
        const expected = d[name];
        it(`[${d.mat1}] ${name} [${d.mat2}] = [${expected}]`, () => {
          const actual = func(d.mat1, d.mat2);
          expect(actual).toEqual(expected);
        });
      });
    });
  });

  // ---------------------------------------------------------------------------

  describe(scale.name, () => {
    it.each([
      [
        0,
        [
          [1, 2],
          [3, 4],
          [5, 6],
        ],
        [
          [0, 0],
          [0, 0],
          [0, 0],
        ],
      ],
      [
        0.5,
        [
          [1, 2],
          [3, 4],
          [5, 6],
        ],
        [
          [0.5, 1],
          [1.5, 2],
          [2.5, 3],
        ],
      ],
      [
        1,
        [
          [1, 2],
          [3, 4],
          [5, 6],
        ],
        [
          [1, 2],
          [3, 4],
          [5, 6],
        ],
      ],
      [
        -0.5,
        [
          [1, 2],
          [3, 4],
          [5, 6],
        ],
        [
          [-0.5, -1],
          [-1.5, -2],
          [-2.5, -3],
        ],
      ],
      [
        3,
        [
          [1, 2],
          [3, 4],
          [5, 6],
        ],
        [
          [3, 6],
          [9, 12],
          [15, 18],
        ],
      ],
      [
        2,
        [
          [1, 2, 3],
          [4, 5, 6],
        ],
        [
          [2, 4, 6],
          [8, 10, 12],
        ],
      ],
      [-3, [[1, 2, 3, 4, 5, 6]], [[-3, -6, -9, -12, -15, -18]]],
      [0, [], []],
      [1, [], []],
      [0.5, [], []],
      [0, [[], []], [[], []]],
      [1, [[], []], [[], []]],
      [0.5, [[], []], [[], []]],
    ])("%d * %j = %j", (scalar, matrix, expected) => {
      const actual = scale(scalar, matrix);
      expect(actual).toEqual(expected);
    });
  });

  describe(mulVector.name, () => {
    it.each([
      [
        [
          [1, 2, 3],
          [4, 5, 6],
        ],
        [2, 4, 6],
        [28, 64],
      ],
      [[[1, 2, 3]], [0.5, 2, 1], [7.5]],
      [
        [
          [1, 2, 3],
          [4, 5, 6],
        ],
        [1, 1, 1],
        [6, 15],
      ],
      [
        [
          [1, 2],
          [3, 4],
          [5, 6],
        ],
        [2, 4, 6],
        [],
      ],
      [
        [
          [1, 2],
          [3, 4],
          [5, 6],
        ],
        [2],
        [],
      ],
    ])("%j * %j => %j", (matrix, vector, expected) => {
      const actual = mulVector(matrix, vector);
      expect(actual).toEqual(expected);
    });
  });

  it.todo(dot.name);

  // ---------------------------------------------------------------------------

  describe(flatten.name, () => {
    it.each([
      [
        [
          [1, 2],
          [3, 4],
        ],
        [1, 2, 3, 4],
      ],
      [
        [
          [1, 2],
          [3, 4],
          [5, 6],
        ],
        [1, 2, 3, 4, 5, 6],
      ],
      [
        [[1], [2], [3], [4]],
        [1, 2, 3, 4],
      ],
      [[], []],
      [[[], []], []],
    ])("%j => %j", (input, expected) => {
      const actual = flatten(input);
      expect(actual).toEqual(expected);
    });
  });

  describe(transpose.name, () => {
    it.each([
      [
        [
          [1, 2],
          [3, 4],
          [5, 6],
        ],
        [
          [1, 3, 5],
          [2, 4, 6],
        ],
      ],
      [
        [
          [1, 2, 3],
          [4, 5, 6],
        ],
        [
          [1, 4],
          [2, 5],
          [3, 6],
        ],
      ],
      [[[1], [2], [3], [4]], [[1, 2, 3, 4]]],
      [[[1, 2, 3, 4]], [[1], [2], [3], [4]]],
      [[], []],
      [[[], []], []],
    ])("%j => %j", (input, expected) => {
      const actual = transpose(input);
      expect(actual).toEqual(expected);
    });
  });
});
// */
