import assert from 'assert';
import * as math from '../src/math';

// -----------------------------------------------------------------------------

describe('math', () => {
    it('add()', () => {
        const testCases = [
            { input: [ 1, 1 ], expected: 2 },
            { input: [ 1, -1 ], expected: 0 },
            { input: [ 10, 3 ], expected: 13 },
            { input: [ 3, 10 ], expected: 13 },
            { input: [ 1.5, 1 ], expected: 2.5 },
            { input: [ 1, -6.4 ], expected: -5.4 },
        ];
        testCases.forEach(({input, expected}) => {
            const actual = math.add(input[0], input[1]);
            assert.strictEqual(actual, expected);
        });
    });

    it('sub()', () => {
        const testCases = [
            { input: [ 1, 1 ], expected: 0 },
            { input: [ 1, -1 ], expected: 2 },
            { input: [ 10, 3 ], expected: 7 },
            { input: [ 3, 10 ], expected: -7 },
            { input: [ 1.5, 1 ], expected: 0.5 },
            { input: [ 1, -6.4 ], expected: 7.4 },
        ];
        testCases.forEach(({input, expected}) => {
            const actual = math.sub(input[0], input[1]);
            assert.strictEqual(actual, expected);
        });
    });

    it('mul()', () => {
        const testCases = [
            { input: [ 1, 1 ], expected: 1 },
            { input: [ 1, -1 ], expected: -1 },
            { input: [ 10, 3 ], expected: 30 },
            { input: [ 3, 10 ], expected: 30 },
            { input: [ 1.5, 1 ], expected: 1.5 },
            { input: [ 1, -6.4 ], expected: -6.4 },
        ];
        testCases.forEach(({input, expected}) => {
            const actual = math.mul(input[0], input[1]);
            assert.strictEqual(actual, expected);
        });
    });

    it('div()', () => {
        const testCases = [
            { input: [ 1, 1 ], expected: 1 },
            { input: [ 1, -1 ], expected: -1 },
            { input: [ 10, 3 ], expected: 10/3 },
            { input: [ 3, 10 ], expected: 0.3 },
            { input: [ 1.5, 1 ], expected: 1.5 },
            { input: [ 1, -6.4 ], expected: -0.15625 },
        ];
        testCases.forEach(({input, expected}) => {
            const actual = math.div(input[0], input[1]);
            assert.strictEqual(actual, expected);
        });
    });

    it('mod()', () => {
        const testCases = [
            { input: [ 1, 1 ], expected: 0 },
            { input: [ 1, -1 ], expected: 0 },
            { input: [ 10, 3 ], expected: 1 },
            { input: [ 3, 10 ], expected: 3 },
            { input: [ 1.5, 1 ], expected: 0.5 },
            { input: [ 1, -6.4 ], expected: 1 },
        ];
        testCases.forEach(({input, expected}) => {
            const actual = math.mod(input[0], input[1]);
            assert.strictEqual(actual, expected);
        });
    });

    it('round()', () => {
        const testCases = [
            { num: 2, prec: undefined, expected: 2 },
            { num: 2, prec: 0, expected: 2 },
            { num: 2, prec: 2, expected: 2 },
            { num: 2, prec:-1, expected: 0 },
            { num: 123.456, prec: undefined, expected: 123 },
            { num: 123.456, prec: 0, expected: 123 },
            { num: 123.456, prec: 2, expected: 123.46 },
            { num: 123.456, prec:-2, expected: 100 },
            { num:-98.76, prec: undefined, expected: -99 },
            { num:-98.76, prec: 0, expected: -99 },
            { num:-98.76, prec: 1, expected: -98.8 },
            { num:-98.76, prec:-1, expected: -100 },
        ];
        testCases.forEach(({num,prec,expected}) => {
            const actual = math.round(num,prec);
            assert.strictEqual(actual, expected);
        });
    });

    it('dec2bin()', () => {
        const testCases = [
            { input: [ 2 ], expected: '10' },
            { input: [ 5 ], expected: '101' },
            { input: [ 5, 5 ], expected: '00101' },
            { input: [ -1, 4 ], expected: '1111' },
            { input: [ -2, 4 ], expected: '1110' },
        ];
        testCases.forEach(({input, expected}) => {
            const actual = math.dec2bin(input[0], input[1]);
            assert.strictEqual(actual, expected);
        });
    });

    it('dec2binArray()', () => {
        const testCases = [
            { input: [ 2 ], expected: [1,0] },
            { input: [ 5 ], expected: [1,0,1] },
            { input: [ 5, 5 ], expected: [0,0,1,0,1] },
            { input: [ -1, 4 ], expected: [1,1,1,1] },
            { input: [ -2, 4 ], expected: [1,1,1,0] },
        ];
        testCases.forEach(({input, expected}) => {
            const actual = math.dec2binArray(input[0], input[1]);
            assert.deepStrictEqual(actual, expected);
        });
    });
});