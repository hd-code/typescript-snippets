const tg = require('../build/typeguards');
const assert = require('assert');

// -----------------------------------------------------------------------------

describe(__filename, () => {
    const testData = {
        undefined: undefined,
        null: null,
        boolean: false,
        number: 12.5,
        numberZero: 0,
        numberInt: 2,
        string: 'Hello World',
        stringEmpty: '',
        date: new Date(),
        arrayNum: [1, 2, 3],
        arrayString: ['Hello', 'World'],
        arrayArrayNum: [[1,2,3], [4,5,6]],
        object: {
            firstname: 'John',
            lastname: 'Doe',
            age: 30,
            hobbies: ['music', 'reading'],
        },
    };
    
    /**
     * @param {(p: any) => boolean} func 
     * @param {PropertyKey[]} trueProperties 
     */
    function check(func, trueProperties) {
        for (const key in testData) {
            const shouldBeTrue = trueProperties.includes(key);
            assert.ok(shouldBeTrue ? func(testData[key]) : !func(testData[key]));
        }
    }

    it('isNull()', () => {
        check(tg.isNull, ['null']);
    });
    it('isBool()', () => {
        check(tg.isBool, ['boolean']);
    });
    it('isNumber()', () => {
        check(tg.isNumber, ['number', 'numberZero', 'numberInt']);
    });
    it('isInteger()', () => {
        check(tg.isInteger, ['numberZero', 'numberInt']);
    });
    it('isString()', () => {
        check(tg.isString, ['string', 'stringEmpty']);
    });
    it('isDate()', () => {
        check(tg.isDate, ['date']);
    });
    it('isArray()', () => {
        check(tg.isArray, ['arrayNum', 'arrayString', 'arrayArrayNum']);
    });
    it('isArray() with type guard', () => {
        check(val => tg.isArray(val, tg.isNumber), ['arrayNum']);
        check(val => tg.isArray(val, tg.isString), ['arrayString']);
        check(val => tg.isArray(val, row => tg.isArray(row, tg.isNumber)), ['arrayArrayNum']);
    });
    it('isObject()', () => {
        check(tg.isObject, ['date', 'object']);
    });
    it('hasKey()', () => {
        check(obj => tg.hasKey(obj, 'firstname'), ['object']);
        check(obj => tg.hasKey(obj, 'lastname'), ['object']);
        check(obj => tg.hasKey(obj, 'age'), ['object']);
        check(obj => tg.hasKey(obj, 'hobbies'), ['object']);
        check(obj => tg.hasKey(obj, 'FgtGatFzhsbZ778Hsgghz'), []);
    });
    it('hasKey() with type guard', () => {
        check(obj => tg.hasKey(obj, 'firstname', tg.isString), ['object']);
        check(obj => tg.hasKey(obj, 'firstname', tg.isNumber), []);
        check(obj => tg.hasKey(obj, 'lastname', tg.isString), ['object']);
        check(obj => tg.hasKey(obj, 'age', tg.isNumber), ['object']);
        check(obj => tg.hasKey(obj, 'hobbies', tg.isArray), ['object']);
        check(obj => tg.hasKey(obj, 'FgtGatFzhsbZ778Hsgghz', tg.isBool), []);
    });
});