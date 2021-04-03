import { add, avg, dot, isVector, mag, median, mul, quickselect, scale, sub, sum } from 'vector';
import round from 'round';

// -----------------------------------------------------------------------------

describe('vector', () => {
    describe(isVector.name, () => {
        it.each([
            [[1, 2, 3], true],
            [[], true],
            [[1, '2', 3], false],
            ['1,2,3', false],
            [null, false],
            [undefined, false],
        ])('%j => %j', (input, expected) => {
            const actual = isVector(input);
            expect(actual).toBe(expected);
        });
    });

    // -------------------------------------------------------------------------

    describe(avg.name, () => {
        it.each([
            [[1, 2, 3], 2],
            [[0.5, 2, 5.2], 7.7 / 3],
            [[1, -2, 3], 2 / 3],
            [[], 0],
        ])('%j => %j', (input, expected) => {
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
        ])('%j => %j', (input, expected) => {
            const actual = mag(input);
            expect(round(actual, 12)).toBe(round(expected, 12));
        });
    });

    describe(median.name, () => {
        [
            { input: [], expected: 0 },
            { input: [1], expected: 1 },
            { input: [1, 2], expected: 1.5 },
            { input: [2, 1], expected: 1.5 },
            { input: [1, 2, 3], expected: 2 },
            { input: [1, 3, 2], expected: 2 },
            { input: [1, 2, 3, 4], expected: 2.5 },
            { input: [4, 3, 2, 1], expected: 2.5 },
            { input: [3, 1, 4, 2], expected: 2.5 },
            { input: [1, 9, 2, 8, 3, 7, 4, 6, 5], expected: 5 },
        ].forEach(({ input, expected }) =>
            it('(' + input + ') => ' + expected, () => {
                const actual = median(input);
                expect(actual).toBe(expected);
            }),
        );
    });

    describe(quickselect.name, () => {
        [
            { vector: [], index: 0, expected: 0 },
            { vector: [], index: 2, expected: 0 },
            { vector: [1], index: 0, expected: 1 },
            { vector: [1], index: 2, expected: 1 },
            { vector: [1, 2], index: 0, expected: 1 },
            { vector: [2, 1], index: 0, expected: 1 },
            { vector: [1, 2], index: 1, expected: 2 },
            { vector: [2, 1], index: 1, expected: 2 },
            { vector: [1, 2], index: 4, expected: 2 },
            { vector: [2, 1], index: -1, expected: 1 },
            { vector: [1, 2, 3], index: 0, expected: 1 },
            { vector: [1, 3, 2], index: 0, expected: 1 },
            { vector: [3, 1, 2], index: 0, expected: 1 },
            { vector: [1, 2, 3], index: 1, expected: 2 },
            { vector: [1, 3, 2], index: 1, expected: 2 },
            { vector: [3, 1, 2], index: 1, expected: 2 },
            { vector: [1, 2, 3], index: 2, expected: 3 },
            { vector: [1, 3, 2], index: 2, expected: 3 },
            { vector: [3, 1, 2], index: 2, expected: 3 },
            { vector: [1, 9, 2, 8, 3, 7, 4, 6, 5], index: 0, expected: 1 },
            { vector: [1, 9, 2, 8, 3, 7, 4, 6, 5], index: 4, expected: 5 },
            { vector: [1, 9, 2, 8, 3, 7, 4, 6, 5], index: 4.2, expected: 5 },
            { vector: [1, 9, 2, 8, 3, 7, 4, 6, 5], index: 4.7, expected: 5 },
            { vector: [1, 9, 2, 8, 3, 7, 4, 6, 5], index: 7, expected: 8 },
            { vector: [1, 9, 2, 8, 3, 7, 4, 6, 5], index: -2, expected: 1 },
            { vector: [1, 9, 2, 8, 3, 7, 4, 6, 5], index: 12, expected: 9 },
        ].forEach(({ vector, index, expected }) =>
            it(`select ${index} from (${vector}) => ${expected}`, () => {
                const actual = quickselect(vector, index);
                expect(actual).toBe(expected);
            }),
        );
    });

    describe(sum.name, () => {
        it.each([
            [[1, 2, 3], 6],
            [[0.5, 2, 5.2], 7.7],
            [[1, -2, 3], 2],
            [[], 0],
        ])('%j => %j', (input, expected) => {
            const actual = sum(input);
            expect(actual).toBe(expected);
        });
    });

    // -------------------------------------------------------------------------

    describe(add.name, () => {
        [
            {
                input: [
                    [1, 2, 3],
                    [4, 5, 6],
                ],
                expected: [5, 7, 9],
            },
            {
                input: [
                    [0.5, -1.3, 30.3],
                    [-0.2, -2.2, -6],
                ],
                expected: [0.3, -3.5, 24.3],
            },
            {
                input: [
                    [1, -3],
                    [0, 0],
                ],
                expected: [1, -3],
            },
            {
                input: [
                    [0, 0],
                    [1, -3],
                ],
                expected: [1, -3],
            },
            { input: [[1], [2]], expected: [3] },
            { input: [[1, 2], [3]], expected: [] },
            { input: [[1], [2, 4]], expected: [] },
            { input: [[], [1, 2]], expected: [] },
            { input: [[], []], expected: [] },
        ].forEach(({ input, expected }) =>
            it('(' + input[0] + ') + (' + input[1] + ') => (' + expected + ')', () => {
                const actual = add(input[0] as number[], input[1] as number[]);
                expect(actual).toEqual(expected);
            }),
        );
    });

    describe(sub.name, () => {
        [
            {
                input: [
                    [1, 2, 3],
                    [4, 5, 6],
                ],
                expected: [-3, -3, -3],
            },
            {
                input: [
                    [0.5, -1.3, 30.3],
                    [-0.2, -2.2, -6],
                ],
                expected: [0.7, 0.9, 36.3],
            },
            {
                input: [
                    [1, -3],
                    [0, 0],
                ],
                expected: [1, -3],
            },
            {
                input: [
                    [0, 0],
                    [1, -3],
                ],
                expected: [-1, 3],
            },
            { input: [[1], [2]], expected: [-1] },
            { input: [[1, 2], [3]], expected: [] },
            { input: [[1], [2, 4]], expected: [] },
            { input: [[], [1, 2]], expected: [] },
            { input: [[], []], expected: [] },
        ].forEach(({ input, expected }) =>
            it('(' + input[0] + ') - (' + input[1] + ') => (' + expected + ')', () => {
                const actual = sub(input[0] as number[], input[1] as number[]);
                expect(round(actual, 5)).toEqual(expected);
            }),
        );
    });

    describe(mul.name, () => {
        [
            {
                input: [
                    [1, 2, 3],
                    [4, 5, 6],
                ],
                expected: [4, 10, 18],
            },
            {
                input: [
                    [0.5, -1.3, 30.3],
                    [-0.2, -2.2, -6],
                ],
                expected: [-0.1, 2.86, -181.8],
            },
            {
                input: [
                    [1, -3],
                    [0, 0],
                ],
                expected: [0, -0],
            },
            {
                input: [
                    [0, 0],
                    [1, -3],
                ],
                expected: [0, -0],
            },
            { input: [[1], [2]], expected: [2] },
            { input: [[1, 2], [3]], expected: [] },
            { input: [[1], [2, 4]], expected: [] },
            { input: [[], [1, 2]], expected: [] },
            { input: [[], []], expected: [] },
        ].forEach(({ input, expected }) =>
            it('(' + input[0] + ') * (' + input[1] + ') => (' + expected + ')', () => {
                const actual = mul(input[0] as number[], input[1] as number[]);
                expect(round(actual, 5)).toEqual(expected);
            }),
        );
    });

    describe(dot.name, () => {
        [
            {
                input: [
                    [1, 2, 3],
                    [4, 5, 6],
                ],
                expected: 32,
            },
            {
                input: [
                    [0.5, -1.3, 30.3],
                    [-0.2, -2.2, -6],
                ],
                expected: -179.04,
            },
            {
                input: [
                    [1, -3],
                    [0, 0],
                ],
                expected: 0,
            },
            {
                input: [
                    [0, 0],
                    [1, -3],
                ],
                expected: 0,
            },
            { input: [[1], [2]], expected: 2 },
            { input: [[1, 2], [3]], expected: NaN },
            { input: [[1], [2, 4]], expected: NaN },
            { input: [[], [1, 2]], expected: NaN },
            { input: [[], []], expected: NaN },
        ].forEach(({ input, expected }) =>
            it('(' + input[0] + ') . (' + input[1] + ') => ' + expected, () => {
                const actual = dot(input[0] as number[], input[1] as number[]);
                expect(round(actual, 5)).toEqual(expected);
            }),
        );
    });

    // -------------------------------------------------------------------------

    describe(scale.name, () => {
        [
            { input: [1, [1, 2, 3]], expected: [1, 2, 3] },
            { input: [-1, [1, 2, 3]], expected: [-1, -2, -3] },
            { input: [6.5, [1, 2, 3]], expected: [6.5, 13, 19.5] },
            { input: [0, [1, 2, 3]], expected: [0, 0, 0] },
            { input: [1, [-12, 3.3, -0.3]], expected: [-12, 3.3, -0.3] },
            { input: [-1, [-12, 3.3, -0.3]], expected: [12, -3.3, 0.3] },
            { input: [-0.5, [-12, 3.3, -0.3]], expected: [6, -1.65, 0.15] },
        ].forEach(({ input, expected }) =>
            it(input[0] + ' * (' + input[1] + ') => (' + expected + ')', () => {
                const actual = scale(input[0] as number, input[1] as number[]);
                expect(actual).toEqual(expected);
            }),
        );
    });

    // TODO:
    // describe(mulMatrix.name, () => {
    //     [
    //         { input: [[1,2,3],[4,5,6]], expected: 32 },
    //         { input: [[.5,-1.3,30.3],[-.2,-2.2,-6]], expected: -179.04 },
    //         { input: [[1,-3],[0,0]], expected: 0 },
    //         { input: [[0,0],[1,-3]], expected: 0 },
    //         { input: [[1],[2]], expected: 2 },
    //         { input: [[1,2],[3]], expected: NaN },
    //         { input: [[1],[2,4]], expected: NaN },
    //         { input: [[],[1,2]], expected: NaN },
    //         { input: [[],[]], expected: NaN },
    //     ].forEach(({ input, expected }) => it('(' + input[0] + ') . (' + input[1] + ') => ' + expected, () => {
    //         const actual = mulMatrix(input[0], input[1]);
    //         assert.strictEqual(actual, expected);
    //     }));
    // });
});
