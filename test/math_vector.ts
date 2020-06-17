import assert from 'assert';
import { Vector } from '../src/math';

// -----------------------------------------------------------------------------

describe('math_vector', () => {
    describe('isVector()', () => {
        it('should return true for normal vectors', () => {
            const testCases = [ [1,2,3], [-4.5,4], [0], [-100], [] ];
            testCases.forEach(input => assert(Vector.isVector(input)));
        });

        it('should return false if not all elements are numbers', () => {
            const testCases = [ ['1',2,3], ['1','2','3'], [[1,2],[3,4]] ];
            testCases.forEach(input => assert(!Vector.isVector(input)));
        });

        it('should return false for wrong data types', () => {
            const testCases = [
                12.3, '123', true, null, undefined, NaN,
                { name: 'John Doe', age: 32 }
            ];
            testCases.forEach(input => assert(!Vector.isVector(input)));
        });
    });

    it('sum()', () => {
        const testCases = [
            { input: [1,2,3], expected: 6 },
            { input: [1,1,1], expected: 3 },
            { input: [4,7,2,3,4], expected: 20 },
            { input: [-2,-3,4], expected: -1 },
            { input: [1.5,1.5,1.4], expected: 4.4 },
            { input: [-0.3,-0.4], expected: -0.7 },
        ];
        testCases.forEach(({input, expected}) => {
            const actual = Vector.sum(input);
            assert.strictEqual(actual, expected);
        });
    });

    it('avg()', () => {
        const testCases = [
            { input: [1,2,3], expected: 2 },
            { input: [1,1,1], expected: 1 },
            { input: [4,7,2,3,4], expected: 4 },
            { input: [-2,-3,4], expected: -1/3 },
            { input: [1.5,1.5,1.4], expected: 4.4/3 },
            { input: [-0.3,-0.4], expected: -0.35 },
        ];
        testCases.forEach(({input, expected}) => {
            const actual = Vector.avg(input);
            assert.strictEqual(actual, expected);
        });
    });

    it('median()', () => {
        const testCases = [
            { input: [1,2,3], expected: 2 },
            { input: [1,1,1], expected: 1 },
            { input: [4,7,2,3,4], expected: 4 },
            { input: [-2,-3,4], expected: -2 },
            { input: [1.5,1.5,1.4], expected: 1.5 },
            { input: [-0.3,-0.4], expected: -0.35 },
        ];
        testCases.forEach(({input, expected}) => {
            const actual = Vector.median(input);
            assert.strictEqual(actual, expected);
        });
    });

    it('mag()', () => {
        const testCases = [
            { input: [1,2,3], expected: Math.sqrt(14) },
            { input: [1,1,1], expected: Math.sqrt(3) },
            { input: [4,7,2,3,4], expected: Math.sqrt(94) },
            { input: [-2,-3,4], expected: Math.sqrt(29) },
            { input: [1.5,1.5,1.4], expected: Math.sqrt(6.46) },
            { input: [-0.3,-0.4], expected: 0.5 },
        ];
        testCases.forEach(({input, expected}, i) => {
            const actual = Vector.mag(input);
            assert.strictEqual(actual, expected, 'at '+i);
        });
    });

    it('add()', () => {
        const testCases = [
            { input: [ [1,2,3],[4,5,6] ], expected: [5,7,9] },
            { input: [ [-1,-2,-3],[4,5,6] ], expected: [3,3,3] },
            { input: [ [1,2,3],[-4,-5,-6] ], expected: [-3,-3,-3] },
            { input: [ [0.5],[0.3] ], expected: [0.8] },
            { input: [ [0.5],[-0.3] ], expected: [0.2] },
            { input: [ [-0.5],[0.3] ], expected: [-0.2] },
        ];
        testCases.forEach(({input, expected}, i) => {
            const actual = Vector.add(input[0], input[1]);
            assert.deepStrictEqual(actual, expected, 'at '+i);
        });
    });

    it('sub()', () => {
        const testCases = [
            { input: [ [1,2,3],[4,5,6] ], expected: [-3,-3,-3] },
            { input: [ [-1,-2,-3],[4,5,6] ], expected: [-5,-7,-9] },
            { input: [ [1,2,3],[-4,-5,-6] ], expected: [5,7,9] },
            { input: [ [0.5],[0.3] ], expected: [0.2] },
            { input: [ [0.5],[-0.3] ], expected: [0.8] },
            { input: [ [-0.5],[0.3] ], expected: [-0.8] },
        ];
        testCases.forEach(({input, expected}, i) => {
            const actual = Vector.sub(input[0], input[1]);
            assert.deepStrictEqual(actual, expected, 'at '+i);
        });
    });

    it('mul()', () => {
        const testCases = [
            { input: [ [1,2,3],[4,5,6] ], expected: [4,10,18] },
            { input: [ [-1,-2,-3],[4,5,6] ], expected: [-4,-10,-18] },
            { input: [ [1,2,3],[-4,-5,-6] ], expected: [-4,-10,-18] },
            { input: [ [0.5],[0.3] ], expected: [0.15] },
            { input: [ [0.5],[-0.3] ], expected: [-0.15] },
            { input: [ [-0.5],[0.3] ], expected: [-0.15] },
        ];
        testCases.forEach(({input, expected}, i) => {
            const actual = Vector.mul(input[0], input[1]);
            assert.deepStrictEqual(actual, expected, 'at '+i);
        });
    });

    it('dot()', () => {
        const testCases = [
            { input: [ [1,2,3],[4,5,6] ], expected: 32 },
            { input: [ [-1,-2,-3],[4,5,6] ], expected: -32 },
            { input: [ [1,2,3],[-4,-5,-6] ], expected: -32 },
            { input: [ [0.5],[0.3] ], expected: 0.15 },
            { input: [ [0.5],[-0.3] ], expected: -0.15 },
            { input: [ [-0.5],[0.3] ], expected: -0.15 },
        ];
        testCases.forEach(({input, expected}, i) => {
            const actual = Vector.dot(input[0], input[1]);
            assert.strictEqual(actual, expected, 'at '+i);
        });
    });

    it('scale()', () => {
        const testCases = [
            { scalar: 1, vec: [1,2,3], expected: [1,2,3] },
            { scalar: 1, vec: [1,1,1], expected: [1,1,1] },
            { scalar: 0.1, vec: [1,1,1], expected: [0.1,0.1,0.1] },
            { scalar: 5, vec: [1,1,1], expected: [5,5,5] },
            { scalar: 1, vec: [4,7,2,3,4], expected: [4,7,2,3,4] },
            { scalar: 2, vec: [4,7,2,3,4], expected: [8,14,4,6,8] },
            { scalar: 1, vec: [-2,-3,4], expected: [-2,-3,4] },
            { scalar:-1, vec: [-2,-3,4], expected: [2,3,-4] },
            { scalar:-1.5, vec: [-2,-3,4], expected: [3,4.5,-6] },
            { scalar: 0.5, vec: [-2,-3,4], expected: [-1,-1.5,2] },
            { scalar: 1, vec: [1.5,1.5,1.4], expected: [1.5,1.5,1.4] },
            { scalar: 1, vec: [-0.3,-0.4], expected: [-0.3,-0.4] },
            { scalar:-4, vec: [-0.3,-0.4], expected: [1.2,1.6] },
        ];
        testCases.forEach(({scalar, vec, expected}, i) => {
            const actual = Vector.scale(scalar, vec);
            assert.deepStrictEqual(actual, expected, 'at '+i);
        });
    });

    it('mulMatrix()', () => {
        const testCases = [
            { vec: [1,1], mat: [[1,2],[3,4]], expected: [4,6] },
            { vec: [1,2], mat: [[1,2],[3,4]], expected: [7,10] },
            { vec: [1,1,1], mat: [[1,2,3],[4,5,6],[7,8,9]], expected: [12,15,18] },
            { vec: [2,0.5,-1], mat: [[1,2,3],[4,5,6],[7,8,9]], expected: [-3,-1.5,0] },
            { vec: [1], mat: [[1,2,3]], expected: [1,2,3] },
            { vec: [0.5], mat: [[1,2,3]], expected: [0.5,1,1.5] },
            { vec: [-2], mat: [[1,2,3]], expected: [-2,-4,-6] },
            { vec: [1,2,3], mat: [[-0.5],[-2],[-5]], expected: [-19.5] },
        ];
        testCases.forEach(({vec,mat,expected}, i) => {
            const actual = Vector.mulMatrix(vec, mat);
            assert.deepStrictEqual(actual, expected, 'at '+i);
        });
    });

    it('round()', () => {
        const testCases = [
            { vec: [1,2,3], prec: undefined, expected: [1,2,3] },
            { vec: [1,2,3], prec: 0, expected: [1,2,3] },
            { vec: [1,2,3], prec: 2, expected: [1,2,3] },
            { vec: [1,2,3], prec: -1, expected: [0,0,0] },

            { vec: [123.456, 987.543], prec: undefined, expected: [123, 988] },
            { vec: [123.456, 987.543], prec: 0, expected: [123, 988] },
            { vec: [123.456, 987.543], prec: 2, expected: [123.46, 987.54] },
            { vec: [123.456, 987.543], prec:-2, expected: [100, 1000] },

            { vec: [1, -987.543], prec: undefined, expected: [1, -988] },
            { vec: [1, -987.543], prec: 0, expected: [1, -988] },
            { vec: [1, -987.543], prec: 2, expected: [1, -987.54] },
            { vec: [1, -987.543], prec:-2, expected: [0, -1000] },
        ];
        testCases.forEach(({vec, prec, expected}) => {
            const actual = Vector.round(vec, prec);
            assert.deepStrictEqual(actual, expected);
        });
    });
});