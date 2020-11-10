import * as assert from 'assert';
import { toBinary, toBinaryString } from '../../src/math/binary';

// -----------------------------------------------------------------------------

describe('math/binary', () => {
    it(toBinary.name, () => {
        [
            { input: [ 2 ], expected: '10' },
            { input: [ 5 ], expected: '101' },
            { input: [ 5, 5 ], expected: '00101' },
            { input: [ -1, 4 ], expected: '1111' },
            { input: [ -2, 4 ], expected: '1110' },
        ].forEach(({input, expected}) => {
            const actual = toBinary(input[0], input[1]);
            assert.strictEqual(actual, expected);
        });
    });

    it(toBinaryString.name, () => {
        [
            { input: [ 2 ], expected: [1,0] },
            { input: [ 5 ], expected: [1,0,1] },
            { input: [ 5, 5 ], expected: [0,0,1,0,1] },
            { input: [ -1, 4 ], expected: [1,1,1,1] },
            { input: [ -2, 4 ], expected: [1,1,1,0] },
        ].forEach(({input, expected}) => {
            const actual = toBinaryString(input[0], input[1]);
            assert.deepStrictEqual(actual, expected);
        });
    });
});