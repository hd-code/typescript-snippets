import * as assert from 'assert';
import { avg, isVector, mag, median, sum } from '../../src/math/vector';

// -----------------------------------------------------------------------------

describe('vector', () => {
    describe(isVector.name, () => {
        [
            {
                name: 'should return true for a normal vector',
                input: [1,2,3],
                expected: true
            },
            {
                name: 'should return true for an empty vector',
                input: [],
                expected: true
            },
            {
                name: 'should return false, when not all elements are numbers',
                input: [1,'2',3],
                expected: false
            },
            {
                name: 'should return false, when not an array',
                input: '1,2,3',
                expected: false
            },
            {
                name: 'should return false, when null',
                input: null,
                expected: false
            },
            {
                name: 'should return false, when no input',
                input: undefined,
                expected: false
            },
        ].forEach(({name, input, expected}) => {
            it(name, () => {
                const actual = isVector(input);
                assert.strictEqual(actual, expected);
            });
        });
    });

    describe(sum.name, () => {
        [
            {
                name: 'should sum normal vector',
                input: [1,2,3],
                expected: 6
            },
            {
                name: 'should sum vector with decimals',
                input: [0.5, 2, 5.2],
                expected: 7.7
            },
            {
                name: 'should sum vector with negative numbers',
                input: [1,-2,3],
                expected: 2
            },
            {
                name: 'should return 0, when vector is empty',
                input: [],
                expected: 0
            },
        ].forEach(({name, input, expected}) => {
            it(name, () => {
                const actual = sum(input);
                assert.strictEqual(actual, expected);
            });
        });
    });

    describe(avg.name, () => {
        [
            {
                name: 'should avg normal vector',
                input: [1,2,3],
                expected: 2
            },
            {
                name: 'should avg vector with decimals',
                input: [0.5, 2, 5.2],
                expected: 7.7 / 3
            },
            {
                name: 'should avg vector with negative numbers',
                input: [1,-2,3],
                expected: 2 / 3
            },
            {
                name: 'should return 0, when vector is empty',
                input: [],
                expected: 0
            },
        ].forEach(({name, input, expected}) => {
            it(name, () => {
                const actual = avg(input);
                assert.strictEqual(actual, expected);
            });
        });
    });

    describe(median.name, () => {
        [
            {
                name: 'should return middle element when odd length',
                input: [1,2,3],
                expected: 2
            },
            {
                name: 'should return avg of middle elements when even length',
                input: [1,2,3,4],
                expected: 2.5
            },
            {
                name: 'should return 0 when no elements',
                input: [],
                expected: 0
            },
            {
                name: 'should return median when unordered',
                input: [1,9,2,8,3,7,4,6,5],
                expected: 5
            },
        ].forEach(({name, input, expected}) => {
            it(name, () => {
                const actual = median(input);
                assert.strictEqual(actual, expected);
            });
        });
    });

    xdescribe(mag.name, () => {
        [
            {
                name: 'should return 1 for entity vector',
                input: [0,1,0],
                expected: 1
            },
            {
                name: 'should return 1 for standard 2d vector with 45 degree',
                input: [ Math.sin(Math.PI / 4), Math.sin(Math.PI / 4) ],
                expected: 1
            },
            {
                name: 'should return 1 for standard 2d vector with 225 degree',
                input: [ Math.sin(5 * Math.PI / 4), Math.sin(5 * Math.PI / 4) ],
                expected: 1
            },
        ].forEach(({name, input, expected}) => {
            it(name, () => {
                const actual = mag(input);
                assert.strictEqual(actual, expected);
            });
        });
    });

    // TODO: add more
});