import * as assert from 'assert';
import { avg, isVector, mag, median, scale, sum } from '../../src/math/vector';

// -----------------------------------------------------------------------------

describe('vector', () => {
    describe(isVector.name, () => {
        [
            {
                name: 'should return true for a normal vector',
                input: [1, 2, 3],
                expected: true
            },
            {
                name: 'should return true for an empty vector',
                input: [],
                expected: true
            },
            {
                name: 'should return false, when not all elements are numbers',
                input: [1, '2', 3],
                expected: false
            },
            {
                name: 'should return false, when not an array',
                input: '1,2,3',
                expected: false
            },
            {
                name: 'should return false, when null',
                input: null,
                expected: false
            },
            {
                name: 'should return false, when no input',
                input: undefined,
                expected: false
            },
        ].forEach(({ name, input, expected }) => it(name, () => {
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
            { input: [0.5, 2, 5.2], expected: Math.sqrt(.25 + 4 + 27.040000000000001) },
            { input: [1, -2, 3], expected: Math.sqrt(1 + 4 + 9) },
            { input: [], expected: 0 },
        ].forEach(({ input, expected }) => it('(' + input + ') => ' + expected, () => {
            const actual = mag(input);
            assert.strictEqual(actual, expected);
        }));
    });

    // TODO: add more

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
});