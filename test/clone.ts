import * as assert from 'assert';
import { clone, deepClone } from '../src/clone';

// -----------------------------------------------------------------------------

describe('clone', () => {
    describe(clone.name + '()', () => {
        it('should clone primitive types (number,string,null,undefined)', () => {
            const testData = [1,'text',null,undefined];
            testData.forEach(data => assert.strictEqual(clone(data), data));
        });

        it('should clone array of numbers – arrays should be independant now', () => {
            const testData = [1,2,3,4];
            const actual = clone(testData);
            assert.deepStrictEqual(actual, testData);
            actual[0] = 0;
            assert.notDeepStrictEqual(actual, testData);
        });

        it('should clone array of array of numbers – nested arrays are not independant!', () => {
            const testData = [[1,2],[3,4]];
            const actual = clone(testData);
            assert.deepStrictEqual(actual, testData);
            actual[0][0] = 0;
            assert.deepStrictEqual(actual, testData);
        });

        it('should clone object of primitive values – objects should be independent now', () => {
            const testData = { name: 'John Doe', age: 42 };
            const actual = clone(testData);
            assert.deepStrictEqual(actual, testData);
            actual.age = 0;
            assert.notDeepStrictEqual(actual, testData);
        });

        it('should clone complex object with string, number, array, object, function – nested elements are not independant', () => {
            const testData = {
                name: 'John Doe',
                age: 42,
                hobbies: ['poker','baccarat'],
                phone: { company: 'Apple', model: 'iPhone SE' },
                greet: () => 'Hello World'
            };
            const actual = clone(testData);
            assert.deepStrictEqual(actual, testData);

            actual.age = 0;
            assert.notDeepStrictEqual(actual, testData);
            actual.age = 42,

            actual.hobbies[0] = 'roulette';
            assert.deepStrictEqual(actual, testData);
            actual.hobbies[0] = 'poker';

            actual.phone.company = 'Samsung';
            assert.deepStrictEqual(actual, testData);
            actual.phone.company = 'Apple';
        });

        it('should not be able to correctly clone classes', () => {
            class CTest {
                getValue() {
                    return 1;
                }
            }
            const testData = new CTest;
            const actual = clone(testData);
            assert.notDeepStrictEqual(actual, testData);
        });
    });

    describe(deepClone.name + '()', () => {
        it('should clone primitive types (number,string,null,undefined)', () => {
            const testData = [1,'text',null,undefined];
            testData.forEach(data => assert.strictEqual(deepClone(data), data));
        });

        it('should clone array of numbers – arrays should be independant now', () => {
            const testData = [1,2,3,4];
            const actual = deepClone(testData);
            assert.deepStrictEqual(actual, testData);
            actual[0] = 0;
            assert.notDeepStrictEqual(actual, testData);
        });

        it('should clone array of array of numbers – arrays should be independant now', () => {
            const testData = [[1,2],[3,4]];
            const actual = deepClone(testData);
            assert.deepStrictEqual(actual, testData);
            actual[0][0] = 0;
            assert.notDeepStrictEqual(actual, testData);
        });

        it('should clone object of primitive values – objects should be independent now', () => {
            const testData = { name: 'John Doe', age: 42 };
            const actual = deepClone(testData);
            assert.deepStrictEqual(actual, testData);
            actual.age = 0;
            assert.notDeepStrictEqual(actual, testData);
        });

        it('should clone complex object with string, number, array, object, function – objects should be independent now', () => {
            const testData = {
                name: 'John Doe',
                age: 42,
                hobbies: ['poker','baccarat'],
                phone: { company: 'Apple', model: 'iPhone SE' },
                greet: () => 'Hello World'
            };
            const actual = deepClone(testData);
            assert.deepStrictEqual(actual, testData);

            actual.age = 0;
            assert.notDeepStrictEqual(actual, testData);
            actual.age = 42,

            actual.hobbies[0] = 'roulette';
            assert.notDeepStrictEqual(actual, testData);
            actual.hobbies[0] = 'poker';

            actual.phone.company = 'Samsung';
            assert.notDeepStrictEqual(actual, testData);
            actual.phone.company = 'Apple';
        });

        it('should not be able to correctly clone classes', () => {
            class CTest {
                getValue() {
                    return 1;
                }
            }
            const testData = new CTest;
            const actual = deepClone(testData);
            assert.notDeepStrictEqual(actual, testData);
        });
    });
});