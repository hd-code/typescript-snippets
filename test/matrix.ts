import * as assert from 'assert';
import { add, dot, flatten, isMatrix, mul, mulVector, scale, sub, transpose } from '../src/matrix';

// -----------------------------------------------------------------------------

describe('math/matrix', () => {
    describe(isMatrix.name, () => {
        [{
            name: '0x0 matrix', expected: true,
            input: [],
        }, {
            name: '1x0 matrix', expected: true,
            input: [[]],
        }, {
            name: '2x2 matrix', expected: true,
            input: [ [1,2], [3,4] ],
        }, {
            name: '2x3 matrix', expected: true,
            input: [ [1,2,3], [4,5,6] ],
        }, {
            name: '1x3 matrix', expected: true,
            input: [ [1,2,3] ],
        }, {
            name: 'not all rows have same length', expected: false,
            input: [ [1,2,3], [4,5] ],
        }, {
            name: 'not all elements are numbers', expected: false,
            input: [ [1,2], ['3',4] ],
        }, {
            name: 'just a vector', expected: false,
            input: [1,2,3],
        }, {
            name: 'number', expected: false,
            input: 123,
        }, {
            name: 'string', expected: false,
            input: '123',
        }].forEach(({name, input, expected}) => it (name + ' – expect: ' + expected, () => {
            const actual = isMatrix(input);
            assert.strictEqual(actual, expected);
        }));
    });

    it('det – not implemented yet');

    describe(flatten.name, () => {
        [
            { input: [[1,2],[3,4],[5,6]], expected: [1,2,3,4,5,6] },
            { input: [[1,2,3],[4,5,6]], expected: [1,2,3,4,5,6] },
            { input: [[1,2,3,4,5,6]], expected: [1,2,3,4,5,6] },
            { input: [[1],[2],[3],[4],[5],[6]], expected: [1,2,3,4,5,6] },
            { input: [], expected: [] },
            { input: [[],[]], expected: [] },
        ].forEach(({ input, expected }) => {
            it(JSON.stringify(input) + ' => ' + JSON.stringify(expected), () => {
                const actual = flatten(input);
                assert.deepStrictEqual(actual, expected);
            });
        });
    });

    describe(transpose.name, () => {
        [
            { input: [[1,2],[3,4],[5,6]], expected: [[1,3,5],[2,4,6]] },
            { input: [[1,2,3],[4,5,6]], expected: [[1,4],[2,5],[3,6]] },
            { input: [[1,2,3,4,5,6]], expected: [[1],[2],[3],[4],[5],[6]] },
            { input: [[1],[2],[3],[4],[5],[6]], expected: [[1,2,3,4,5,6]] },
            { input: [], expected: [] },
            { input: [[],[]], expected: [] },
        ].forEach(({ input, expected }) => {
            it(JSON.stringify(input) + ' => ' + JSON.stringify(expected), () => {
                const actual = transpose(input);
                assert.deepStrictEqual(actual, expected);
            });
        });
    });

    it(add.name);

    it(sub.name);

    it(mul.name);

    it(dot.name);

    describe(scale.name, () => {
        [
            { scalar: 0, matrix: [[1,2],[3,4],[5,6]], expected: [[0,0],[0,0],[0,0]] },
            { scalar:.5, matrix: [[1,2],[3,4],[5,6]], expected: [[.5,1],[1.5,2],[2.5,3]] },
            { scalar: 1, matrix: [[1,2],[3,4],[5,6]], expected: [[1,2],[3,4],[5,6]] },
            { scalar:-.5,matrix: [[1,2],[3,4],[5,6]], expected: [[-.5,-1],[-1.5,-2],[-2.5,-3]] },
            { scalar: 3, matrix: [[1,2],[3,4],[5,6]], expected: [[3,6],[9,12],[15,18]] },
            { scalar: 2, matrix: [[1,2,3],[4,5,6]], expected: [[2,4,6],[8,10,12]] },
            { scalar: -3, matrix: [[1,2,3,4,5,6]], expected: [[-3,-6,-9,-12,-15,-18]] },
            { scalar: 0, matrix: [], expected: [] },
            { scalar: 1, matrix: [], expected: [] },
            { scalar: .5, matrix: [], expected: [] },
            { scalar: 0, matrix: [[],[]], expected: [[],[]] },
            { scalar: 1, matrix: [[],[]], expected: [[],[]] },
            { scalar: .5, matrix: [[],[]], expected: [[],[]] },
        ].forEach(({ scalar, matrix, expected }) => {
            it(scalar + ' * ' + JSON.stringify(matrix) + ' = ' + JSON.stringify(expected), () => {
                const actual = scale(scalar, matrix);
                assert.deepStrictEqual(actual, expected);
            });
        });
    });

    describe(mulVector.name, () => {
        [
            { matrix: [[1,2,3],[4,5,6]], vector: [2,4,6], expected: [28,64] },
            { matrix: [[1,2,3]], vector: [.5,2,1], expected: [7.5] },
            { matrix: [[1,2,3],[4,5,6]], vector: [1,1,1], expected: [6,15] },
            { matrix: [[1,2],[3,4],[5,6]], vector: [2,4], expected: [10,22,34] },
            { matrix: [[1,2],[3,4],[5,6]], vector: [2,4,6], expected: [] },
            { matrix: [[1,2],[3,4],[5,6]], vector: [2], expected: [] },
        ].forEach(({ matrix, vector, expected }) => {
            it(JSON.stringify(matrix) + ' * ' + JSON.stringify(vector) + ' = ' + JSON.stringify(expected), () => {
                const actual = mulVector(matrix, vector);
                assert.deepStrictEqual(actual, expected);
            });
        });
    });
});