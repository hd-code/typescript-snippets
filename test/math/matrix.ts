import * as assert from 'assert';
import { isMatrix } from '../../src/math/matrix';

// -----------------------------------------------------------------------------

describe('math/matrix', () => {
    describe(isMatrix.name, () => {
        [
            {
                name: '0x0 matrix',
                input: [],
                expected: true,
            },
            {
                name: '1x0 matrix',
                input: [[]],
                expected: true,
            },
            {
                name: '2x2 matrix',
                input: [ [1,2], [3,4] ],
                expected: true,
            },
            {
                name: '2x3 matrix',
                input: [ [1,2,3], [4,5,6] ],
                expected: true,
            },
            {
                name: '1x3 matrix',
                input: [ [1,2,3] ],
                expected: true,
            },
            {
                name: 'not all rows have same length',
                input: [ [1,2,3], [4,5] ],
                expected: false,
            },
            {
                name: 'not all elements are numbers',
                input: [ [1,2], ['3',4] ],
                expected: false,
            },
            {
                name: 'just a vector',
                input: [1,2,3],
                expected: false,
            },
            {
                name: 'number',
                input: 123,
                expected: false,
            },
            {
                name: 'string',
                input: '123',
                expected: false,
            },
        ].forEach(({name, input, expected}) => it (name, () => {
            const actual = isMatrix(input);
            assert.strictEqual(actual, expected);
        }));
    });
});