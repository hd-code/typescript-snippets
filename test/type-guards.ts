import * as assert from 'assert';
import { hasKey, isArray, isBool, isInteger, isNull, isNumber, isObject, isString, isUndefined } from '../src/type-guards';

// -----------------------------------------------------------------------------

describe('TypeGuards', () => {
    type CaseKey = keyof typeof cases;
    const cases = {
        undefined: undefined,
        null: null,
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
            it(key, () => {
                const expected = trueCases.includes(key as CaseKey);
                const actual = typeGuard(cases[key as CaseKey]);
                assert.strictEqual(actual, expected);
            });
        }
    }

    describe(isUndefined.name, () => checkCases(isUndefined, ['undefined']));

    describe(isNull.name, () => checkCases(isNull, ['null']));

    describe(isBool.name, () => checkCases(isBool, ['true','false']));

    describe(isInteger.name, () => checkCases(isInteger, ['zero','integer','integerNegative']));

    describe(isNumber.name, () => checkCases(isNumber, ['zero','integer','integerNegative','number','numberNegative']));

    describe(isString.name, () => checkCases(isString, ['string','emptyString']));

    describe(isArray.name, () => {
        describe('without type guard', () => checkCases(isArray, ['arrayNumbers','arrayStrings','arrayMixed']));

        describe('with type guard', () => {
            [
                { name: 'all elements match guard', value: cases.arrayNumbers, typeGuard: isNumber, expected: true },
                { name: 'no elements match guard', value: cases.arrayStrings, typeGuard: isNumber, expected: false },
                { name: 'some elements do not match guard', value: cases.arrayMixed, typeGuard: isNumber, expected: false },
            ].forEach(({name,value,typeGuard,expected}) => it(name, () => {
                const actual = isArray(value, typeGuard);
                assert.strictEqual(actual, expected);
            }));
        });
    });

    describe(isObject.name, () => checkCases(isObject, ['object']));

    describe(hasKey.name, () => {
        [
            {
                name: 'return true when object has key',
                input: [{name: 'John'}, 'name'], expected: true
            },
            {
                name: 'return false when object does not have key',
                input: [{name: 'John'}, 'age'], expected: false
            },
            {
                name: 'return true when object has key and matching type guard',
                input: [{name: 'John'}, 'name', isString], expected: true
            },
            {
                name: 'return false when object has key but type guard fails',
                input: [{name: 'John'}, 'name', isNumber], expected: false
            },
            {
                name: 'return false when object does not have key, regardless the type guard',
                input: [{name: 'John'}, 'age', isString], expected: false
            },
        ].forEach(({name, input, expected}) => it(name, () => {
            const actual = hasKey(input[0], input[1] as string, input[2] as any); // eslint-disable-line
            assert.strictEqual(actual, expected);
        }));

        describe('should return false for none objects', () => {
            for (const key in cases) {
                if (key === 'object') {
                    continue;
                }
                it(key, () => {
                    const actual = hasKey(cases[key as CaseKey], '');
                    assert.strictEqual(actual, false);
                });
            }
        });
    });
});