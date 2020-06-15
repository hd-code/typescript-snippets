import assert from 'assert';
import { Vector } from '../src/math';

// -----------------------------------------------------------------------------

describe('math_vector', () => {
    describe('isVector()', () => {
        it('should return true for normal vectors', () => {
            const cases = [ [1,2,3], [-4.5,4], [0], [-100], [] ];
            cases.forEach(input => assert(Vector.isVector(input)));
        });

        it('should return false if not all elements are numbers', () => {
            const cases = [ ['1',2,3], ['1','2','3'], [[1,2],[3,4]] ];
            cases.forEach(input => assert(!Vector.isVector(input)));
        });

        it('should return false for wrong data types', () => {
            const cases = [
                12.3, '123', true, null, undefined, NaN,
                { name: 'John Doe', age: 32 }
            ];
            cases.forEach(input => assert(!Vector.isVector(input)));
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
            const actual = Vector.sum(input);
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
            const actual = Vector.avg(input);
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
            const actual = Vector.median(input);
            assert.strictEqual(actual, expected);
        });
    });

    it('mag()', () => {});

    it('add()', () => {});

    it('sub()', () => {});

    it('mul()', () => {});

    it('dot()', () => {});

    it('scale()', () => {});

    it('mulMatrix()', () => {});

    it('round()', () => {});
});