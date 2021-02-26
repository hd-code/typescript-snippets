import * as assert from 'assert';
// eslint-disable-next-line max-len
import { hasKey, isArray, isBool, isInteger, isNull, isNumber, isObject, isString, isUndefined } from '../src/type-guards';

// -----------------------------------------------------------------------------

type CaseKey = keyof typeof cases;
const cases = {
    undefined: undefined as undefined,
    null: null as null,
    true: true,
    false: false,
    string: 'string',
    emptyString: '',
    zero: 0,
    integer: 2,
    integerNegative: -2,
    number: 3.45,
    numberNegative: -3.45,
    arrayNumbers: [1, 2, 3],
    arrayStrings: ['1', '2', '3'],
    arrayMixed: [1, '2', 3],
    object: { name: 'John Doe', age: 42 },
};
function checkCases<T>(typeGuard: (val: unknown) => val is T, trueCases: CaseKey[]) {
    for (const key in cases) {
        const expected = trueCases.includes(key as CaseKey);
        it(key + ' – expect: ' + expected, () => {
            const actual = typeGuard(cases[key as CaseKey]);
            assert.strictEqual(actual, expected);
        });
    }
}

describe('TypeGuards', () => {
    describe(isUndefined.name, () => checkCases(isUndefined, ['undefined']));

    describe(isNull.name, () => checkCases(isNull, ['null']));

    describe(isBool.name, () => checkCases(isBool, ['true','false']));

    describe(isInteger.name, () => checkCases(isInteger, ['zero','integer','integerNegative']));

    describe(isNumber.name, () => checkCases(isNumber, ['zero','integer','integerNegative','number','numberNegative']));

    describe(isString.name, () => checkCases(isString, ['string','emptyString']));

    describe(isObject.name, () => checkCases(isObject, ['object']));

    describe(isArray.name, () => {
        describe('without type guard', () => checkCases(isArray, ['arrayNumbers','arrayStrings','arrayMixed']));

        describe('with type guard', () => {
            [
                { name: 'all elements match guard', value: cases.arrayNumbers, typeGuard: isNumber, expected: true },
                { name: 'no elements match guard', value: cases.arrayStrings, typeGuard: isNumber, expected: false },
                // eslint-disable-next-line max-len
                { name: 'some elements do not match guard', value: cases.arrayMixed, typeGuard: isNumber, expected: false },
            ].forEach(({name,value,typeGuard,expected}) => it(name, () => {
                const actual = isArray(value, typeGuard);
                assert.strictEqual(actual, expected);
            }));
        });
    });

    describe(hasKey.name, () => {
        [{
            name: 'object has key', expected: true,
            obj: {name: 'John'}, key: 'name',
        }, {
            name: 'object does not have key', expected: false,
            obj: {name: 'John'}, key: 'age',
        }, {
            name: 'object has key and type guard matches', expected: true,
            obj: {name: 'John'}, key: 'name', typeGuard: isString,
        }, {
            name: 'object has key but type guard fails', expected: false,
            obj: {name: 'John'}, key: 'name', typeGuard: isNumber,
        }, {
            name: 'object has key with falsy value (empty string)', expected: true,
            obj: {name: ''}, key: 'name',
        }, {
            name: 'object has key with falsy value (0)', expected: true,
            obj: {name: 0}, key: 'name',
        }, {
            name: 'object has key with falsy value (null)', expected: true,
            obj: {name: null}, key: 'name',
        }, {
            name: 'object has key with falsy value (undefined)', expected: true,
            obj: {name: undefined}, key: 'name',
        }].forEach(({name,expected,obj,key,typeGuard}) => {
            it(name + ' – expect: ' + expected, () => {
                const actual = hasKey(obj, key, typeGuard);
                assert.strictEqual(actual, expected);
            });
        });

        for (const key in cases) {
            if (key !== 'object') {
                it(key + ' – expect: false', () => {
                    const actual = hasKey(cases[key as CaseKey], '');
                    assert.strictEqual(actual, false);
                });
            }
        }
    });
});
