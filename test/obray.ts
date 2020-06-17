import assert from 'assert';
import * as obray from '../src/obray';

// -----------------------------------------------------------------------------

describe('obray', () => {
    const isNumber: (x: any) => any = x => typeof x === 'number';
    const isString: (x: any) => any = x => typeof x === 'string';

    describe('clone()', () => {
        it('should clone primitive types (number,string,null,undefined)', () => {
            const testData = [1,'text',null,undefined];
            testData.forEach(data => assert.strictEqual(obray.clone(data), data));
        });

        it('should clone array of numbers – arrays should be independant now', () => {
            const testData = [1,2,3,4];
            const actual = obray.clone(testData);
            assert.deepStrictEqual(actual, testData);
            actual[0] = 0;
            assert.notDeepStrictEqual(actual, testData);
        });

        it('should clone array of array of numbers – nested arrays are not independant!', () => {
            const testData = [[1,2],[3,4]];
            const actual = obray.clone(testData);
            assert.deepStrictEqual(actual, testData);
            actual[0][0] = 0;
            assert.deepStrictEqual(actual, testData);
        });

        it('should clone object of primitive values – objects should be independent now', () => {
            const testData = { name: 'John Doe', age: 42 };
            const actual = obray.clone(testData);
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
            const actual = obray.clone(testData);
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
            class CTest { getValue() { return 1; } }
            const testData = new CTest;
            const actual = obray.clone(testData);
            assert.notDeepStrictEqual(actual, testData);
        });
    });

    describe('deepClone()', () => {
        it('should clone primitive types (number,string,null,undefined)', () => {
            const testData = [1,'text',null,undefined];
            testData.forEach(data => assert.strictEqual(obray.clone(data), data));
        });

        it('should clone array of numbers – arrays should be independant now', () => {
            const testData = [1,2,3,4];
            const actual = obray.deepClone(testData);
            assert.deepStrictEqual(actual, testData);
            actual[0] = 0;
            assert.notDeepStrictEqual(actual, testData);
        });

        it('should clone array of array of numbers – arrays should be independant now', () => {
            const testData = [[1,2],[3,4]];
            const actual = obray.deepClone(testData);
            assert.deepStrictEqual(actual, testData);
            actual[0][0] = 0;
            assert.notDeepStrictEqual(actual, testData);
        });

        it('should clone object of primitive values – objects should be independent now', () => {
            const testData = { name: 'John Doe', age: 42 };
            const actual = obray.deepClone(testData);
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
            const actual = obray.deepClone(testData);
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
            class CTest { getValue() { return 1; } }
            const testData = new CTest;
            const actual = obray.deepClone(testData);
            assert.notDeepStrictEqual(actual, testData);
        });
    });

    it('flattenArray()', () => {
        const testData = [
            { input: [ [1,2], [3,4], [5,6] ], expected: [1,2,3,4,5,6] },
            { input: [ [2,1], [4,3], [6,5] ], expected: [2,1,4,3,6,5] },
            { input: [ [1,2,3,4,5,6] ], expected: [1,2,3,4,5,6] },
            { input: [ [[1,2], [3,4]], [5,6]], expected: [ [1,2],[3,4],5,6 ] },
            { input: [ [1,2], ['H','D'], [null,6] ], expected: [1,2,'H','D',null,6] },
        ];
        testData.forEach(({input,expected}) => {
            const actual = obray.flattenArray(input as any);
            assert.deepStrictEqual(actual, expected);
        });
    });

    it('getPermutations()', () => {
        const testCases = [
            { arr: [1,2,3], rm: undefined, expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] },
            { arr: [1,2,3], rm: false, expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] },
            { arr: [1,2,3], rm: true, expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] },
            { arr: [1,1,3], rm: undefined, expected: [[1,1,3],[1,3,1],[1,1,3],[1,3,1],[3,1,1],[3,1,1]] },
            { arr: [1,1,3], rm: false, expected: [[1,1,3],[1,3,1],[1,1,3],[1,3,1],[3,1,1],[3,1,1]] },
            { arr: [1,1,3], rm: true, expected: [[1,1,3],[1,3,1],[3,1,1]] },
            { arr: [1,'a'], rm: undefined, expected: [[1,'a'],['a',1]] },
            { arr: ['a','a',3], rm: undefined,
                expected: [['a','a',3],['a',3,'a'],['a','a',3],['a',3,'a'],[3,'a','a'],[3,'a','a']] },
            { arr: ['a','a',3], rm: false,
                expected: [['a','a',3],['a',3,'a'],['a','a',3],['a',3,'a'],[3,'a','a'],[3,'a','a']] },
            { arr: ['a','a',3], rm: true, expected: [['a','a',3],['a',3,'a'],[3,'a','a']] },
        ];
        testCases.forEach(({arr,rm,expected}, i) => {
            const actual = obray.getPermutations(arr, rm);
            assert.deepStrictEqual(actual, expected, 'at '+i);
        });
    });

    describe('hasKey()', () => {
        it('should return true when an object has a given key and no type guard is used', () => {
            const testData = [
                { key: 'name', obj: { name: 'John Doe', age: 42 } },
                { key: 'age', obj: { name: 'John Doe', age: 42 } },
                { key: 'form', obj: { form: 'Name,E-Mail' } },
                { key: 'z', obj: { x: 3, y: 22, z: 10 } },
            ];
            testData.forEach(({obj,key}) => assert(obray.hasKey(obj,key)));
        });

        it('should return false when an object does not have the given key even when no type guard is used', () => {
            const testData = [
                { key: 'form', obj: { name: 'John Doe', age: 42 } },
                { key: 'page', obj: { name: 'John Doe', age: 42 } },
                { key: 'name', obj: { form: 'Name,E-Mail' } },
                { key: 'a', obj: { x: 3, y: 22, z: 10 } },
            ];
            testData.forEach(({obj,key}) => assert(!obray.hasKey(obj,key)));
        });

        it('should return true when an object has a given key and the type guard is also satisfied', () => {
            const testData = [
                { key: 'name', func: isString, obj: { name: 'John Doe', age: 42 } },
                { key: 'age', func: isNumber, obj: { name: 'John Doe', age: 42 } },
                { key: 'form', func: isString, obj: { form: 'Name,E-Mail' } },
                { key: 'z', func: isNumber, obj: { x: 3, y: 22, z: 10 } },
            ];
            testData.forEach(({obj,key,func}) => assert(obray.hasKey(obj,key,func as any)));
        });

        it('should return true when an object has a given key but the type guard fails', () => {
            const testData = [
                { key: 'name', func: isNumber, obj: { name: 'John Doe', age: 42 } },
                { key: 'age', func: isString, obj: { name: 'John Doe', age: 42 } },
                { key: 'form', func: isNumber, obj: { form: 'Name,E-Mail' } },
                { key: 'z', func: isString, obj: { x: 3, y: 22, z: 10 } },
            ];
            testData.forEach(({obj,key,func}) => assert(!obray.hasKey(obj,key,func as any)));
        });



        it('should return true for class instances', () => {
            class CTest { print() { console.log('hello world'); } };
            const testData = [ new Date, new Error, new CTest ];
            testData.forEach(input => assert(obray.isObject(input)));
        });

        it('should return false for null and arrays', () => {
            const testData = [ null, [1,2,3], ['1','2','3'], [true], [3,3,3] ];
            testData.forEach(input => assert(!obray.isObject(input)));
        });

        it('should return false for any basic data types', () => {
            const testData = [ undefined, 12, -1, 0.5, -3.44, NaN, '', 'hello', true, false ];
            testData.forEach(input => assert(!obray.isObject(input)));
        });



        // check(arr => tg.hasKey(arr, 1), ['string', 'arrayNum', 'arrayString', 'arrayArrayNum']);
        // check(obj => tg.hasKey(obj, 'firstname'), ['object']);
        // check(obj => tg.hasKey(obj, 'lastname'), ['object']);
        // check(obj => tg.hasKey(obj, 'age'), ['object']);
        // check(obj => tg.hasKey(obj, 'hobbies'), ['object']);
        // check(obj => tg.hasKey(obj, 'FgtGatFzhsbZ778Hsgghz'), []);
    });

    describe('isArray()', () => {
        it('should return true for any kind of array when no type guard is used', () => {
            const testData = [
                [1,2,3], [], ['1','2','3'], [[1,2],[3,4]], [undefined], [null,null]
            ];
            testData.forEach(input => assert(obray.isArray(input)));
        });

        it('should return true for any kind of array when the type guard is satisfied', () => {
            const testData = [
                { func: isNumber, arr: [1,2,3] },
                { func: isNumber, arr: [] },
                { func: isString, arr: ['1','2','3'] },
            ];
            testData.forEach(({arr,func}) => assert(obray.isArray(arr,func as any)));
        });

        it('should return false for any kind of array when the type guard fails', () => {
            const testData = [
                { func: isString, arr: [1,2,3] },
                { func: isNumber, arr: ['1','2','3'] },
                { func: isNumber, arr: [undefined] },
                { func: isNumber, arr: [null,null] },
                { func: isNumber, arr: [[1,2],[3,4]] },
            ];
            testData.forEach(({arr,func}) => assert(!obray.isArray(arr,func as any)));
        });

        it('should return false for any kind of array when the type guard fails even just for one element', () => {
            const testData = [
                { func: isNumber, arr: ['1',2,3] },
                { func: isNumber, arr: [1,'2',3] },
                { func: isNumber, arr: [1,2,'3'] },
            ];
            testData.forEach(({arr,func}) => assert(!obray.isArray(arr,func as any)));
        });

        it('should return false for objects and class instances', () => {
            class CTest { print() { console.log('hello world'); } };
            const testData = [ new Date, new Error, new CTest ];
            testData.forEach(input => assert(!obray.isArray(input)));
        });

        it('should return false for any basic data types', () => {
            const testData = [ undefined, null, 12, -1, 0.5, -3.44, NaN, '', 'hello', true, false ];
            testData.forEach(input => assert(!obray.isArray(input)));
        });
    });

    describe('isInArray()', () => {
        it('should return true if an item to be found, is found in the array', () => {
            const testData: { data:any[], func:(p:any)=>boolean }[] = [
                { data: [1,2,3,4,5,6], func: num => num === 5 },
                { data: [1,2,3,4,5,6], func: num => num === 1 },
                { data: [1,2,3,4,5,6], func: num => num === 6 },
                { data: ['a','b','c'], func: num => num === 'b' },
                { data: ['a','b','c', ''], func: num => num === '' },
            ];
            testData.forEach(testData => assert(obray.isInArray(testData.data, testData.func)));
        });

        it('should return false if an item to be found, is not found in the array', () => {
            const testData: { data:any[], func:(p:any)=>boolean }[] = [
                { data: [1,2,3,4,5,6], func: num => num === 50 },
                { data: [1,2,3,4,5,6], func: num => num === 0 },
                { data: [1,2,3,4,5,6], func: num => num === 'a' },
                { data: ['a','b','c'], func: num => num === 5 },
                { data: ['a','b','c'], func: num => num === '5' },
                { data: ['a','b','c', ''], func: num => num === ' ' },
            ];
            testData.forEach(testData => assert(!obray.isInArray(testData.data, testData.func)));
        });
    });

    describe('isObject()', () => {
        it('should return true for any kind of basic object', () => {
            const testData = [
                {}, { name: 'John', age: 42 },
                { say: () => 'Hello World', x: 3 },
                { time: new Date, elements: [20,30,40] },
            ];
            testData.forEach(input => assert(obray.isObject(input)));
        });

        it('should return true for class instances', () => {
            class CTest { print() { console.log('hello world'); } };
            const testData = [ new Date, new Error, new CTest ];
            testData.forEach(input => assert(obray.isObject(input)));
        });

        it('should return false for null and arrays', () => {
            const testData = [ null, [1,2,3], ['1','2','3'], [true], [3,3,3] ];
            testData.forEach(input => assert(!obray.isObject(input)));
        });

        it('should return false for any basic data types', () => {
            const testData = [ undefined, 12, -1, 0.5, -3.44, NaN, '', 'hello', true, false ];
            testData.forEach(input => assert(!obray.isObject(input)));
        });
    });
});