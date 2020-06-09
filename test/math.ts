import assert from 'assert';
import * as math from '../src/math';

// -----------------------------------------------------------------------------

describe('math', () => {
    it('add()', () => {
        const cases = [
            { input: [   1,    1 ], expected:    2 },
            { input: [   1,   -1 ], expected:    0 },
            { input: [  10,    3 ], expected:   13 },
            { input: [   3,   10 ], expected:   13 },
            { input: [ 1.5,    1 ], expected:  2.5 },
            { input: [   1, -6.4 ], expected: -5.4 },
        ];

        cases.forEach(({input, expected}) => {
            const actual = math.add(input[0], input[1]);
            assert.strictEqual(actual, expected);
        });
    });

    it('sub()', () => {
        const cases = [
            { input: [   1,    1 ], expected:    0 },
            { input: [   1,   -1 ], expected:    2 },
            { input: [  10,    3 ], expected:    7 },
            { input: [   3,   10 ], expected:   -7 },
            { input: [ 1.5,    1 ], expected:  0.5 },
            { input: [   1, -6.4 ], expected:  7.4 },
        ];

        cases.forEach(({input, expected}) => {
            const actual = math.sub(input[0], input[1]);
            assert.strictEqual(actual, expected);
        });
    });

    it('mul()', () => {
        const cases = [
            { input: [   1,    1 ], expected:    1 },
            { input: [   1,   -1 ], expected:   -1 },
            { input: [  10,    3 ], expected:   30 },
            { input: [   3,   10 ], expected:   30 },
            { input: [ 1.5,    1 ], expected:  1.5 },
            { input: [   1, -6.4 ], expected: -6.4 },
        ];

        cases.forEach(({input, expected}) => {
            const actual = math.mul(input[0], input[1]);
            assert.strictEqual(actual, expected);
        });
    });

    it('div()', () => {
        const cases = [
            { input: [   1,    1 ], expected:    1 },
            { input: [   1,   -1 ], expected:   -1 },
            { input: [  10,    3 ], expected: 10/3 },
            { input: [   3,   10 ], expected:  0.3 },
            { input: [ 1.5,    1 ], expected:  1.5 },
            { input: [   1, -6.4 ], expected: -0.15625 },
        ];

        cases.forEach(({input, expected}) => {
            const actual = math.div(input[0], input[1]);
            assert.strictEqual(actual, expected);
        });
    });

    it('mod()', () => {
        const cases = [
            { input: [   1,    1 ], expected:    0 },
            { input: [   1,   -1 ], expected:    0 },
            { input: [  10,    3 ], expected:    1 },
            { input: [   3,   10 ], expected:    3 },
            { input: [ 1.5,    1 ], expected:  0.5 },
            { input: [   1, -6.4 ], expected:    1 },
        ];

        cases.forEach(({input, expected}) => {
            const actual = math.mod(input[0], input[1]);
            assert.strictEqual(actual, expected);
        });
    });

    it('sum()', () => {
        const cases = [
            { input: [1,2,3], expected: 6 },
            { input: [1,1,1], expected: 3 },
            { input: [4,7,2,3,4], expected: 20 },
            { input: [-2,-3,4], expected: -1 },
            { input: [1.5,1.5,1.4], expected: 4.4 },
            { input: [-0.3,-0.4], expected: -0.7 },
        ];

        cases.forEach(({input, expected}) => {
            const actual = math.sum(input);
            assert.strictEqual(actual, expected);
        });
    });

    it('avg()', () => {
        const cases = [
            { input: [1,2,3], expected: 2 },
            { input: [1,1,1], expected: 1 },
            { input: [4,7,2,3,4], expected: 4 },
            { input: [-2,-3,4], expected: -1/3 },
            { input: [1.5,1.5,1.4], expected: 4.4/3 },
            { input: [-0.3,-0.4], expected: -0.35 },
        ];

        cases.forEach(({input, expected}) => {
            const actual = math.avg(input);
            assert.strictEqual(actual, expected);
        });
    });

    it('median()', () => {
        const cases = [
            { input: [1,2,3], expected: 2 },
            { input: [1,1,1], expected: 1 },
            { input: [4,7,2,3,4], expected: 4 },
            { input: [-2,-3,4], expected: -2 },
            { input: [1.5,1.5,1.4], expected: 1.5 },
            { input: [-0.3,-0.4], expected: -0.35 },
        ];

        cases.forEach(({input, expected}) => {
            const actual = math.median(input);
            assert.strictEqual(actual, expected);
        });
    });
});