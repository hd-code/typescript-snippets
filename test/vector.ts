import {
  add,
  avg,
  div,
  dot,
  isVector,
  mag,
  median,
  mul,
  mulMatrix,
  quickselect,
  scale,
  sub,
  sum,
} from "vector";
import round from "round";

// -----------------------------------------------------------------------------

describe("vector", () => {
  describe(isVector.name, () => {
    it.each([
      [[1, 2, 3], true],
      [[], true],
      [[1, "2", 3], false],
      ["1,2,3", false],
      [null, false],
      [undefined, false],
    ])("%j => %j", (input, expected) => {
      const actual = isVector(input);
      expect(actual).toBe(expected);
    });
  });

  // ---------------------------------------------------------------------------

  const data = [
    { vec1: [], vec2: [], add: [], sub: [], mul: [], div: [] },
    { vec1: [1], vec2: [2], add: [3], sub: [-1], mul: [2], div: [0.5] },
    {
      vec1: [12, 4],
      vec2: [6, 3],
      add: [18, 7],
      sub: [6, 1],
      mul: [72, 12],
      div: [2, 4 / 3],
    },
    { vec1: [1, 2], vec2: [3], add: [], sub: [], mul: [], div: [] },
    { vec1: [1], vec2: [2, 3], add: [], sub: [], mul: [], div: [] },
  ];

  [add, sub, mul, div].forEach((func) => {
    const name = func.name as keyof typeof data[0];
    describe(name, () => {
      data.forEach((d) => {
        const expected = d[name];
        it(`[${d.vec1}] ${name} [${d.vec2}] = [${expected}]`, () => {
          const actual = func(d.vec1, d.vec2);
          expect(actual).toEqual(expected);
        });
      });
    });
  });

  // ---------------------------------------------------------------------------

  describe(scale.name, () => {
    it.each([
      [1, [1, 2, 3], [1, 2, 3]],
      [0, [1, 2, 3], [0, 0, 0]],
      [-1, [1, 2, 3], [-1, -2, -3]],
      [6.5, [1, 2, 3], [6.5, 13, 19.5]],
      [-0.5, [-12, 3.3, -0.3], [6, -1.65, 0.15]],
    ])("%d * %j => %j", (scalar, vector, expected) => {
      const actual = scale(scalar, vector);
      expect(actual).toEqual(expected);
    });
  });

  describe(dot.name, () => {
    it.each([
      [[1, 2, 3], [4, 5, 6], 32],
      [[0.5, -1.3, 30.3], [-0.2, -2.2, -6], -179.04000000000002],
      [[1, -3], [0, 0], 0],
      [[0, 0], [1, -3], 0],
      [[1], [2], 2],
      [[1, 2], [3], NaN],
      [[], [1], NaN],
      [[], [], NaN],
    ])("", (vec1, vec2, expected) => {
      const actual = dot(vec1, vec2);
      expect(actual).toBe(expected);
    });
  });

  describe(mulMatrix.name, () => {
    it.each([
      [[1], [[1, 2, 3]], [1, 2, 3]],
      [
        [1, 2, 3],
        [
          [1, 2],
          [3, 4],
          [5, 6],
        ],
        [22, 28],
      ],
      [
        [-3.2, 2.2],
        [
          [1, 3],
          [2, 3],
        ],
        [1.2000000000000002, -3.000000000000001],
      ],
      [[1, 2], [[1, 2, 3]], []],
      [[1], [[1], [2], [3]], []],
    ])("", (vector, matrix, expected) => {
      const actual = mulMatrix(vector, matrix);
      expect(actual).toEqual(expected);
    });
  });

  // ---------------------------------------------------------------------------

  describe(avg.name, () => {
    it.each([
      [[1, 2, 3], 2],
      [[0.5, 2, 5.2], 7.7 / 3],
      [[1, -2, 3], 2 / 3],
      [[], 0],
    ])("%j => %j", (input, expected) => {
      const actual = avg(input);
      expect(actual).toBe(expected);
    });
  });

  describe(mag.name, () => {
    it.each([
      [[1, 2, 3], Math.sqrt(1 + 4 + 9)],
      [[0.5, 2, 5.2], Math.sqrt(0.25 + 4 + 27.04)],
      [[1, -2, 3], Math.sqrt(1 + 4 + 9)],
      [[], NaN],
    ])("%j => %j", (input, expected) => {
      const actual = mag(input);
      expect(round(actual, 12)).toBe(round(expected, 12));
    });
  });

  describe(median.name, () => {
    it.each([
      [[], 0],
      [[1], 1],
      [[1, 2], 1.5],
      [[2, 1], 1.5],
      [[1, 2, 3], 2],
      [[1, 3, 2], 2],
      [[1, 2, 3, 4], 2.5],
      [[4, 3, 2, 1], 2.5],
      [[3, 1, 4, 2], 2.5],
      [[1, 9, 2, 8, 3, 7, 4, 6, 5], 5],
    ])("%j => %d", (input, expected) => {
      const actual = median(input);
      expect(actual).toBe(expected);
    });
  });

  describe(quickselect.name, () => {
    it.each([
      [0, [], 0],
      [2, [], 0],
      [0, [1], 1],
      [2, [1], 1],
      [0, [1, 2], 1],
      [0, [2, 1], 1],
      [1, [1, 2], 2],
      [1, [2, 1], 2],
      [0, [1, 9, 2, 8, 3, 7, 4, 6, 5], 1],
      [4, [1, 9, 2, 8, 3, 7, 4, 6, 5], 5],
      [4.2, [1, 9, 2, 8, 3, 7, 4, 6, 5], 5],
      [4.7, [1, 9, 2, 8, 3, 7, 4, 6, 5], 5],
      [-2, [1, 9, 2, 8, 3, 7, 4, 6, 5], 1],
      [12, [1, 9, 2, 8, 3, 7, 4, 6, 5], 9],
    ])("select %d from %j => %d", (index, vector, expected) => {
      const actual = quickselect(vector, index);
      expect(actual).toBe(expected);
    });
  });

  describe(sum.name, () => {
    it.each([
      [[1, 2, 3], 6],
      [[0.5, 2, 5.2], 7.7],
      [[1, -2, 3], 2],
      [[], 0],
    ])("%j => %d", (input, expected) => {
      const actual = sum(input);
      expect(actual).toBe(expected);
    });
  });
});
