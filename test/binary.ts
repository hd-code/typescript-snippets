import * as assert from 'assert';
import { toBinary, toBinaryString } from '../src/binary';

// -----------------------------------------------------------------------------

const cases = [
    { input: [ 2 ], expStr: '10', expArr: [1,0] },
    { input: [ 5 ], expStr: '101', expArr: [1,0,1] },
    { input: [ 5.5 ], expStr: '101', expArr: [1,0,1] },
    { input: [ 7.2 ], expStr: '111', expArr: [1,1,1] },
    { input: [ 5, 5 ], expStr: '00101', expArr: [0,0,1,0,1] },
    { input: [ -1, 4 ], expStr: '1111', expArr: [1,1,1,1] },
    { input: [ -2, 4 ], expStr: '1110', expArr: [1,1,1,0] },
    { input: [ 20, 4 ], expStr: '0100', expArr: [0,1,0,0] },
    { input: [ 2, 0 ], expStr: '', expArr: [] },
    { input: [ 2, -1 ], expStr: '', expArr: [] },
    { input: [ 2, 1.7 ], expStr: '0', expArr: [0] },
    { input: [ 2, 2.7 ], expStr: '10', expArr: [1,0] },
    { input: [ 2, 3.7 ], expStr: '010', expArr: [0,1,0] },
];

describe('binary', () => {
    describe(toBinary.name, () => cases.forEach(({input,expArr}) => {
        it(input[0] + ' with ' + input[1] + ' digits => (' + expArr + ')', () => {
            const actual = toBinary(input[0], input[1]);
            assert.deepStrictEqual(actual, expArr);
        });
    }));

    describe(toBinaryString.name, () => cases.forEach(({input,expStr}) => {
        it(input[0] + ' with ' + input[1] + ' digits => ' + expStr, () => {
            const actual = toBinaryString(input[0], input[1]);
            assert.strictEqual(actual, expStr);
        });
    }));
});