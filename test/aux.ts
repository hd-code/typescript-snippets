import assert from 'assert';
import * as aux from '../src/aux';

// -----------------------------------------------------------------------------

describe('aux', () => {
    describe('dec2bin()', () => {
        it('should transform 2 to 10', () => {
            assert(aux.dec2bin(2) === '10');
        });

        it('should transform 5 to 101', () => {
            assert(aux.dec2bin(5) === '101');
        });

        it('should transform 5 to 00101 (with 5 digits)', () => {
            assert(aux.dec2bin(5, 5) === '00101');
        });

        it('should transform -1 to 1111 (with 4 digits)', () => {
            assert(aux.dec2bin(-1, 4) === '1111');
        });

        it('should transform -2 to 1110 (with 4 digits)', () => {
            assert(aux.dec2bin(-2, 4) === '1110');
        });
    });

    describe('dec2binArray()', () => {
        it('should transform 2 to [1,0]', () => {
            assert.deepStrictEqual(aux.dec2binArray(2), [1,0]);
        });

        it('should transform 5 to [1,0,1]', () => {
            assert.deepStrictEqual(aux.dec2binArray(5), [1,0,1]);
        });

        it('should transform 5 to [0,0,1,0,1] (with 5 digits)', () => {
            assert.deepStrictEqual(aux.dec2binArray(5, 5), [0,0,1,0,1]);
        });

        it('should transform -1 to [1,1,1,1] (with 4 digits)', () => {
            assert.deepStrictEqual(aux.dec2binArray(-1, 4), [1,1,1,1]);
        });

        it('should transform -2 to [1,1,1,0] (with 4 digits)', () => {
            assert.deepStrictEqual(aux.dec2binArray(-2, 4), [1,1,1,0]);
        });
    });

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

    describe('sleep()', () => {
        async function test(milliseconds: number) {
            const begin = Date.now();
            await aux.sleep(milliseconds);
            const end = Date.now();

            return end - begin;
        }

        it('should take at least 10ms to execute function with sleep(10)', (done) => {
            const ms = 10;
            test(ms).then(duration => {
                try {
                    assert(ms <= duration);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should take at least 20ms to execute function with sleep(20)', (done) => {
            const ms = 20;
            test(ms).then(duration => {
                try {
                    assert(ms <= duration);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });
    });
});