import * as assert from 'assert';
import { add, avg, dot, isVector, mag, median, mul, scale, sub, sum } from '../src/vector';

import round from '../src/round';

// -----------------------------------------------------------------------------

describe('vector', () => {
    describe(isVector.name, () => {
        [{
            name: 'normal vector', expected: true,
            input: [1, 2, 3],
        }, {
            name: 'empty vector', expected: true,
            input: [],
        }, {
            name: 'not all elements are numbers', expected: false,
            input: [1, '2', 3],
        }, {
            name: 'string', expected: false,
            input: '1,2,3',
        }, {
            name: 'null', expected: false,
            input: null,
        }, {
            name: 'no input', expected: false,
            input: undefined,
        }].forEach(({name,input,expected}) => it(name + ' – expect: ' + expected, () => {
            const actual = isVector(input);
            assert.strictEqual(actual, expected);
        }));
    });

    describe(sum.name, () => {
        [
            { input: [1, 2, 3], expected: 6 },
            { input: [0.5, 2, 5.2], expected: 7.7 },
            { input: [1, -2, 3], expected: 2 },
            { input: [], expected: 0 },
        ].forEach(({ input, expected }) => it('(' + input + ') => ' + expected, () => {
            const actual = sum(input);
            assert.strictEqual(actual, expected);
        }));
    });

    describe(avg.name, () => {
        [
            { input: [1, 2, 3], expected: 2 },
            { input: [0.5, 2, 5.2], expected: 7.7 / 3 },
            { input: [1, -2, 3], expected: 2 / 3 },
            { input: [], expected: 0 },
        ].forEach(({ input, expected }) => it('(' + input + ') => ' + expected, () => {
            const actual = avg(input);
            assert.strictEqual(actual, expected);
        }));
    });

    describe(median.name, () => {
        [
            { input: [1, 2, 3], expected: 2 },
            { input: [1, 2, 3, 4], expected: 2.5 },
            { input: [], expected: 0 },
            { input: [1, 9, 2, 8, 3, 7, 4, 6, 5], expected: 5 },
        ].forEach(({ input, expected }) => it('(' + input + ') => ' + expected, () => {
            const actual = median(input);
            assert.strictEqual(actual, expected);
        }));
    });

    describe(mag.name, () => {
        [
            { input: [1, 2, 3], expected: Math.sqrt(1 + 4 + 9) },
            { input: [0.5, 2, 5.2], expected: Math.sqrt(.25 + 4 + 27.04) },
            { input: [1, -2, 3], expected: Math.sqrt(1 + 4 + 9) },
            { input: [], expected: NaN },
        ].forEach(({ input, expected }) => it('(' + input + ') => ' + expected, () => {
            const actual = mag(input);
            assert.strictEqual(round(actual, 12), round(expected, 12));
        }));
    });

    describe(add.name, () => {
        [
            { input: [[1,2,3],[4,5,6]], expected: [5,7,9] },
            { input: [[.5,-1.3,30.3],[-.2,-2.2,-6]], expected: [.3,-3.5,24.3] },
            { input: [[1,-3],[0,0]], expected: [1,-3] },
            { input: [[0,0],[1,-3]], expected: [1,-3] },
            { input: [[1],[2]], expected: [3] },
            { input: [[1,2],[3]], expected: [] },
            { input: [[1],[2,4]], expected: [] },
            { input: [[],[1,2]], expected: [] },
            { input: [[],[]], expected: [] },
        ].forEach(({ input, expected }) => it('(' + input[0] + ') + (' + input[1] + ') => (' + expected + ')', () => {
            const actual = add(input[0], input[1]);
            assert.deepStrictEqual(actual, expected);
        }));
    });

    describe(sub.name, () => {
        [
            { input: [[1,2,3],[4,5,6]], expected: [-3,-3,-3] },
            { input: [[.5,-1.3,30.3],[-.2,-2.2,-6]], expected: [.7,0.9,36.3] },
            { input: [[1,-3],[0,0]], expected: [1,-3] },
            { input: [[0,0],[1,-3]], expected: [-1,3] },
            { input: [[1],[2]], expected: [-1] },
            { input: [[1,2],[3]], expected: [] },
            { input: [[1],[2,4]], expected: [] },
            { input: [[],[1,2]], expected: [] },
            { input: [[],[]], expected: [] },
        ].forEach(({ input, expected }) => it('(' + input[0] + ') - (' + input[1] + ') => (' + expected + ')', () => {
            const actual = sub(input[0], input[1]);
            assert.deepStrictEqual(round(actual, 5), expected);
        }));
    });

    describe(mul.name, () => {
        [
            { input: [[1,2,3],[4,5,6]], expected: [4,10,18] },
            { input: [[.5,-1.3,30.3],[-.2,-2.2,-6]], expected: [-.1,2.86,-181.8] },
            { input: [[1,-3],[0,0]], expected: [0,-0] },
            { input: [[0,0],[1,-3]], expected: [0,-0] },
            { input: [[1],[2]], expected: [2] },
            { input: [[1,2],[3]], expected: [] },
            { input: [[1],[2,4]], expected: [] },
            { input: [[],[1,2]], expected: [] },
            { input: [[],[]], expected: [] },
        ].forEach(({ input, expected }) => it('(' + input[0] + ') * (' + input[1] + ') => (' + expected + ')', () => {
            const actual = mul(input[0], input[1]);
            assert.deepStrictEqual(round(actual, 5), expected);
        }));
    });

    describe(dot.name, () => {
        [
            { input: [[1,2,3],[4,5,6]], expected: 32 },
            { input: [[.5,-1.3,30.3],[-.2,-2.2,-6]], expected: -179.04 },
            { input: [[1,-3],[0,0]], expected: 0 },
            { input: [[0,0],[1,-3]], expected: 0 },
            { input: [[1],[2]], expected: 2 },
            { input: [[1,2],[3]], expected: NaN },
            { input: [[1],[2,4]], expected: NaN },
            { input: [[],[1,2]], expected: NaN },
            { input: [[],[]], expected: NaN },
        ].forEach(({ input, expected }) => it('(' + input[0] + ') . (' + input[1] + ') => ' + expected, () => {
            const actual = dot(input[0], input[1]);
            assert.strictEqual(round(actual, 5), expected);
        }));
    });

    describe(scale.name, () => {
        [
            { input: [1, [1, 2, 3]], expected: [1, 2, 3] },
            { input: [-1, [1, 2, 3]], expected: [-1, -2, -3] },
            { input: [6.5, [1, 2, 3]], expected: [6.5, 13, 19.5] },
            { input: [0, [1, 2, 3]], expected: [0, 0, 0] },
            { input: [1, [-12, 3.3, -0.3]], expected: [-12, 3.3, -0.3] },
            { input: [-1, [-12, 3.3, -0.3]], expected: [12, -3.3, 0.3] },
            { input: [-0.5, [-12, 3.3, -0.3]], expected: [6, -1.65, 0.15] },
        ].forEach(({ input, expected }) => it(input[0] + ' * (' + input[1] + ') => (' + expected + ')', () => {
            const actual = scale(input[0] as number, input[1] as number[]);
            assert.deepStrictEqual(actual, expected);
        }));
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
