import * as assert from 'assert';
import { isMatrix } from '../../src/math/matrix';

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
});