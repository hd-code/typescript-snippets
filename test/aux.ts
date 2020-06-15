import assert from 'assert';
import * as aux from '../src/aux';

// -----------------------------------------------------------------------------

describe('aux', () => {
    describe('clone()', () => {
        it('should clone primitive types (number,string,null,undefined)', () => {
            const DATA = [1,'text',null,undefined];
            DATA.forEach(data => assert.strictEqual(aux.clone(data), data));
        });

        it('should clone array of numbers – arrays should be independant now', () => {
            const DATA = [1,2,3,4];
            const actual = aux.clone(DATA);
            assert.deepStrictEqual(actual, DATA);
            actual[0] = 0;
            assert.notDeepStrictEqual(actual, DATA);
        });

        it('should clone array of array of numbers – nested arrays are not independant!', () => {
            const DATA = [[1,2],[3,4]];
            const actual = aux.clone(DATA);
            assert.deepStrictEqual(actual, DATA);
            actual[0][0] = 0;
            assert.deepStrictEqual(actual, DATA);
        });

        it('should clone object of primitive values – objects should be independent now', () => {
            const DATA = { name: 'John Doe', age: 42 };
            const actual = aux.clone(DATA);
            assert.deepStrictEqual(actual, DATA);
            actual.age = 0;
            assert.notDeepStrictEqual(actual, DATA);
        });

        it('should clone complex object with string, number, array, object, function – nested elements are not independant', () => {
            const DATA = {
                name: 'John Doe',
                age: 42,
                hobbies: ['poker','baccarat'],
                phone: { company: 'Apple', model: 'iPhone SE' },
                greet: () => 'Hello World'
            };
            const actual = aux.clone(DATA);
            assert.deepStrictEqual(actual, DATA);

            actual.age = 0;
            assert.notDeepStrictEqual(actual, DATA);
            actual.age = 42,

            actual.hobbies[0] = 'roulette';
            assert.deepStrictEqual(actual, DATA);
            actual.hobbies[0] = 'poker';

            actual.phone.company = 'Samsung';
            assert.deepStrictEqual(actual, DATA);
            actual.phone.company = 'Apple';
        });

        it('should not be able to correctly clone classes', () => {
            class CTest { getValue() { return 1; } }
            const DATA = new CTest;
            const actual = aux.clone(DATA);
            assert.notDeepStrictEqual(actual, DATA);
        });
    });

    describe('deepClone()', () => {
        it('should clone primitive types (number,string,null,undefined)', () => {
            const DATA = [1,'text',null,undefined];
            DATA.forEach(data => assert.strictEqual(aux.deepClone(data), data));
        });

        it('should clone array of numbers – arrays should be independant now', () => {
            const DATA = [1,2,3,4];
            const actual = aux.deepClone(DATA);
            assert.deepStrictEqual(actual, DATA);
            actual[0] = 0;
            assert.notDeepStrictEqual(actual, DATA);
        });

        it('should clone array of array of numbers – arrays should be independant now', () => {
            const DATA = [[1,2],[3,4]];
            const actual = aux.deepClone(DATA);
            assert.deepStrictEqual(actual, DATA);
            actual[0][0] = 0;
            assert.notDeepStrictEqual(actual, DATA);
        });

        it('should clone object of primitive values – objects should be independent now', () => {
            const DATA = { name: 'John Doe', age: 42 };
            const actual = aux.deepClone(DATA);
            assert.deepStrictEqual(actual, DATA);
            actual.age = 0;
            assert.notDeepStrictEqual(actual, DATA);
        });

        it('should clone complex object with string, number, array, object, function – objects should be independent now', () => {
            const DATA = {
                name: 'John Doe',
                age: 42,
                hobbies: ['poker','baccarat'],
                phone: { company: 'Apple', model: 'iPhone SE' },
                greet: () => 'Hello World'
            };
            const actual = aux.deepClone(DATA);
            assert.deepStrictEqual(actual, DATA);

            actual.age = 0;
            assert.notDeepStrictEqual(actual, DATA);
            actual.age = 42,

            actual.hobbies[0] = 'roulette';
            assert.notDeepStrictEqual(actual, DATA);
            actual.hobbies[0] = 'poker';

            actual.phone.company = 'Samsung';
            assert.notDeepStrictEqual(actual, DATA);
            actual.phone.company = 'Apple';
        });

        it('should not be able to correctly clone classes', () => {
            class CTest { getValue() { return 1; } }
            const DATA = new CTest;
            const actual = aux.deepClone(DATA);
            assert.notDeepStrictEqual(actual, DATA);
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