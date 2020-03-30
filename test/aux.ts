import assert from 'assert';
import * as aux from '../src/aux';

// -----------------------------------------------------------------------------

describe('aux', () => {
    describe('deepClone()', () => {
        it('should clone several data types except undefined, classes and objects with functions', () => {
            const data = [null, 20.5, 'string', [1,2,3], {name: 'John', age: 21}];
            data.forEach(data => assert.deepStrictEqual(data, aux.deepClone(data)));
        });

        it('should not be able to clone classes and objects with functions', () => {
            const data = [new Date(), {name: 'John', age: 21, greet: () => 'Hello World'}];
            data.forEach(data => assert.notDeepStrictEqual(aux.deepClone(data), data));
        });
    });

    describe('flattenArray()', () => {
        it('should flatten multi-dimensional arrays correctly', () => {
            const testData = [
                { data: [ [1,2], [3,4], [5,6] ], expected: [1,2,3,4,5,6] },
                { data: [ [2,1], [4,3], [6,5] ], expected: [2,1,4,3,6,5] },
                { data: [ [1,2,3,4,5,6] ], expected: [1,2,3,4,5,6] },
                { data: [ [[1,2], [3,4]], [5,6]], expected: [ [1,2],[3,4],5,6 ] },
                { data: [ [1,2], ['H','D'], [null,6] ], expected: [1,2,'H','D',null,6] },
            ];
            testData.forEach(data => assert.deepStrictEqual(aux.flattenArray(data.data as any), data.expected));
        });
    });

    describe('isInArray()', () => {
        it('should return true if an item to be found, is found in the array', () => {
            const testData: {data:any[], func:(p:any)=>boolean}[] = [
                { data: [1,2,3,4,5,6], func: num => num === 5 },
                { data: [1,2,3,4,5,6], func: num => num === 1 },
                { data: [1,2,3,4,5,6], func: num => num === 6 },
                { data: ['a','b','c'], func: num => num === 'b' },
                { data: ['a','b','c', ''], func: num => num === '' },
            ];
            testData.forEach(testData => assert(aux.isInArray(testData.data, testData.func)));
        });

        it('should return false if an item to be found, is not found in the array', () => {
            const testData: {data:any[], func:(p:any)=>boolean}[] = [
                { data: [1,2,3,4,5,6], func: num => num === 50 },
                { data: [1,2,3,4,5,6], func: num => num === 0 },
                { data: [1,2,3,4,5,6], func: num => num === 'a' },
                { data: ['a','b','c'], func: num => num === 5 },
                { data: ['a','b','c'], func: num => num === '5' },
                { data: ['a','b','c', ''], func: num => num === ' ' },
            ];
            testData.forEach(testData => assert(!aux.isInArray(testData.data, testData.func)));
        });
    });
});