import assert from 'assert';
import { Matrix } from '../src/math';

// -----------------------------------------------------------------------------

describe('math_matrix', () => {
    describe('isMatrix()', () => {
        it('should return true for normal matrices', () => {
            const testCases = [
                [[1,2,3],[4,5,6]],
                [[1,2],[4,5]],
                [[1,1],[-3,.5],[-4.6,0]],
                [[-10],[12.345]],
                [[77,-5.7,0]],
                [[]],
                [[],[]],
            ];
            testCases.forEach(input => assert(Matrix.isMatrix(input)));
        });

        it('should return false when the number of elements in the rows are not equal', () => {
            const testCases = [
                [[1,2,3],[4,5]],
                [[1],[4,5]],
                [[],[4,5]],
                [[1,1],[.5],[-4.6,0]],
                [[-10],[12.345,9999]],
                [[77,-5.7,0],[]],
            ];
            testCases.forEach(input => assert(!Matrix.isMatrix(input)));
        });

        it('should return false if not all elements are numbers', () => {
            const testCases = [
                [[1,2,'3'],[4,5,6]],
                [[1,2],[4,null]],
                [[1,],[-3,.5],[-4.6,0]],
                [[{size: -10}],[12.345]],
                [[77,-5.7,[0]]],
                [[[]]],
                [[],{}],
            ];
            testCases.forEach(input => assert(!Matrix.isMatrix(input)));
        });

        it('should return false for wrong data types', () => {
            const testCases = [
                12.3, '123', true, null, undefined, NaN,
                [1,2,3],{ name: 'John Doe', age: 32 }
            ];
            testCases.forEach(input => assert(!Matrix.isMatrix(input)));
        });
    });
    
    it('transpose()', () => {
        const testCases = [
            { input: [[1],[1]], expected: [[1,1]] },
            { input: [[1,1],[1,1]], expected: [[1,1],[1,1]] },
            { input: [[1,2],[2,1]], expected: [[1,2],[2,1]] },
            { input: [[1,2],[1,2]], expected: [[1,1],[2,2]] },
            { input: [[1,2,3],[1,2,3]], expected: [[1,1],[2,2],[3,3]] },
            { input: [[1,1],[2,2],[3,3]], expected: [[1,2,3],[1,2,3]] },
        ];
        testCases.forEach(({input, expected}, i) => {
            const actual = Matrix.transpose(input);
            assert.deepStrictEqual(actual, expected, 'at '+i);
        });
    });

    it('add()', () => {
        const testCases = [
            { input: [ [[1,2],[3,4]], [[1,2],[3,4]] ], expected: [[2,4],[6,8]] },
            { input: [ [[1,2],[3,4]], [[5,6],[7,8]] ], expected: [[6,8],[10,12]] },
            { input: [ [[-1,-2],[-3,-4]], [[5,6],[7,8]] ], expected: [[4,4],[4,4]] },
            { input: [ [[1,2],[3,4]], [[-5,-6],[-7,-8]] ], expected: [[-4,-4],[-4,-4]] },
            { input: [ [[0.5]], [[0.3]] ], expected: [[0.8]] },
            { input: [ [[0.5]], [[-0.3]] ], expected: [[0.2]] },
            { input: [ [[-0.5]], [[0.3]] ], expected: [[-0.2]] },
            { input: [ [[-0.5]], [[-0.3]] ], expected: [[-0.8]] },
        ];
        testCases.forEach(({input, expected}, i) => {
            const actual = Matrix.add(input[0], input[1]);
            assert.deepStrictEqual(actual, expected, 'at '+i);
        });
    });

    it('sub()', () => {
        const testCases = [
            { input: [ [[1,2],[3,4]], [[1,2],[3,4]] ], expected: [[0,0],[0,0]] },
            { input: [ [[1,2],[3,4]], [[5,6],[7,8]] ], expected: [[-4,-4],[-4,-4]] },
            { input: [ [[-1,-2],[-3,-4]], [[5,6],[7,8]] ], expected: [[-6,-8],[-10,-12]] },
            { input: [ [[1,2],[3,4]], [[-5,-6],[-7,-8]] ], expected: [[6,8],[10,12]] },
            { input: [ [[0.5]], [[0.3]] ], expected: [[0.2]] },
            { input: [ [[0.5]], [[-0.3]] ], expected: [[0.8]] },
            { input: [ [[-0.5]], [[0.3]] ], expected: [[-0.8]] },
            { input: [ [[-0.5]], [[-0.3]] ], expected: [[-0.2]] },
        ];
        testCases.forEach(({input, expected}, i) => {
            const actual = Matrix.sub(input[0], input[1]);
            assert.deepStrictEqual(actual, expected, 'at '+i);
        });
    });

    it('mul()', () => {
        const testCases = [
            { input: [ [[1,2],[3,4]], [[1,2],[3,4]] ], expected: [[1,4],[9,16]] },
            { input: [ [[1,2],[3,4]], [[5,6],[7,8]] ], expected: [[5,12],[21,32]] },
            { input: [ [[-1,-2],[-3,-4]], [[5,6],[7,8]] ], expected: [[-5,-12],[-21,-32]] },
            { input: [ [[1,2],[3,4]], [[-5,-6],[-7,-8]] ], expected: [[-5,-12],[-21,-32]] },
            { input: [ [[0.5]], [[0.3]] ], expected: [[0.15]] },
            { input: [ [[0.5]], [[-0.3]] ], expected: [[-0.15]] },
            { input: [ [[-0.5]], [[0.3]] ], expected: [[-0.15]] },
            { input: [ [[-0.5]], [[-0.3]] ], expected: [[0.15]] },
        ];
        testCases.forEach(({input, expected}, i) => {
            const actual = Matrix.mul(input[0], input[1]);
            assert.deepStrictEqual(actual, expected, 'at '+i);
        });
    });

    it('scale()', () => {
        const testCases = [
            { scalar: 1, mat: [[1,2,3]], expected: [[1,2,3]] },
            { scalar: 1, mat: [[1,1,1]], expected: [[1,1,1]] },
            { scalar: 0.1, mat: [[1,1,1]], expected: [[0.1,0.1,0.1]] },
            { scalar: 5, mat: [[1,1,1]], expected: [[5,5,5]] },
            { scalar: 1, mat: [[4,7,2],[3,4,8]], expected: [[4,7,2],[3,4,8]] },
            { scalar: 2, mat: [[4,7,2],[3,4,8]], expected: [[8,14,4],[6,8,16]] },
            { scalar: 1, mat: [[-2],[-3],[4]], expected: [[-2],[-3],[4]] },
            { scalar:-1, mat: [[-2],[-3],[4]], expected: [[2],[3],[-4]] },
            { scalar:-1.5, mat: [[-2],[-3],[4]], expected: [[3],[4.5],[-6]] },
            { scalar: 0.5, mat: [[-2],[-3],[4]], expected: [[-1],[-1.5],[2]] },
            { scalar: 1, mat: [[1.5,0],[1.5,1.4]], expected: [[1.5,0],[1.5,1.4]] },
            { scalar: 0, mat: [[1.5,0],[1.5,1.4]], expected: [[0,0],[0,0]] },
            { scalar: 1, mat: [[-0.3,-0.4]], expected: [[-0.3,-0.4]] },
            { scalar:-4, mat: [[-0.3,-0.4]], expected: [[1.2,1.6]] },
        ];
        testCases.forEach(({scalar, mat, expected}, i) => {
            const actual = Matrix.scale(scalar, mat);
            assert.deepStrictEqual(actual, expected, 'at '+i);
        });
    });

    it('mulVector()', () => {
        const testCases = [
            { mat: [[1,3],[2,4]], vec: [1,1], expected: [4,6] },
            { mat: [[1,3],[2,4]], vec: [1,2], expected: [7,10] },
            { mat: [[1,4,7],[2,5,8],[3,6,9]], vec: [1,1,1], expected: [12,15,18] },
            { mat: [[1,4,7],[2,5,8],[3,6,9]], vec: [2,0.5,-1], expected: [-3,-1.5,0] },
            { mat: [[1],[2],[3]], vec: [1], expected: [1,2,3] },
            { mat: [[1],[2],[3]], vec: [0.5], expected: [0.5,1,1.5] },
            { mat: [[1],[2],[3]], vec: [-2], expected: [-2,-4,-6] },
            { mat: [[-0.5,-2,-5]], vec: [1,2,3], expected: [-19.5] },
        ];
        testCases.forEach(({mat,vec,expected}, i) => {
            const actual = Matrix.mulVector(mat, vec);
            assert.deepStrictEqual(actual, expected, 'at '+i);
        });
    });

    it('round()', () => {
        const testCases = [
            { mat: [[1,2,3],[4,5,6]], prec: undefined, expected: [[1,2,3],[4,5,6]] },
            { mat: [[1,2,3],[4,5,6]], prec: 0, expected: [[1,2,3],[4,5,6]] },
            { mat: [[1,2,3],[4,5,6]], prec: 2, expected: [[1,2,3],[4,5,6]] },
            { mat: [[1,2,3],[4,5,6]], prec:-1, expected: [[0,0,0],[0,10,10]] },

            { mat: [[123.456, 987.543]], prec: undefined, expected: [[123, 988]] },
            { mat: [[123.456, 987.543]], prec: 0, expected: [[123, 988]] },
            { mat: [[123.456, 987.543]], prec: 2, expected: [[123.46, 987.54]] },
            { mat: [[123.456, 987.543]], prec:-2, expected: [[100, 1000]] },

            { mat: [[1], [-987.543]], prec: undefined, expected: [[1], [-988]] },
            { mat: [[1], [-987.543]], prec: 0, expected: [[1], [-988]] },
            { mat: [[1], [-987.543]], prec: 2, expected: [[1], [-987.54]] },
            { mat: [[1], [-987.543]], prec:-2, expected: [[0], [-1000]] },
        ];
        testCases.forEach(({mat, prec, expected}) => {
            const actual = Matrix.round(mat, prec);
            assert.deepStrictEqual(actual, expected);
        });
    });
});