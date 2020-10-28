import * as assert from 'assert';
import { describe } from 'mocha';
import { isUndefined, isNull, isBool, isInteger, isNumber, isString, isArray, isObject, hasKey } from '../src/type-guards';

// -----------------------------------------------------------------------------

describe('TypeGuards', () => {
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
    function checkCases<T>(typeGuard: (val: unknown) => val is T, trueCases: (keyof typeof cases)[]) {
        for (const key in cases) {
            it(key, () => {
                const shouldBeTrue = trueCases.includes(key as keyof typeof cases);
                assert.strictEqual(typeGuard(cases[key as keyof typeof cases]), shouldBeTrue);
            });
        }
    }

    describe(isUndefined.name+'()', () => checkCases(isUndefined, ['undefined']));

    describe(isNull.name+'()', () => checkCases(isNull, ['null']));

    describe(isBool.name+'()', () => checkCases(isBool, ['true','false']));

    describe(isInteger.name+'()', () => checkCases(isInteger, ['zero','integer','integerNegative']));

    describe(isNumber.name+'()', () => checkCases(isNumber, ['zero','integer','integerNegative','number','numberNegative']));

    describe(isString.name+'()', () => checkCases(isString, ['string','emptyString']));

    describe(isArray.name+'()', () => {
        describe('check without type guard', () => checkCases(isArray, ['arrayNumbers','arrayStrings','arrayMixed']));

        describe('check with type guard', () => {
            [
                { name: 'all elements match guard', value: cases.arrayNumbers, typeGuard: isNumber, expected: true },
                { name: 'no elements match guard', value: cases.arrayStrings, typeGuard: isNumber, expected: false },
                { name: 'some elements do not match guard', value: cases.arrayMixed, typeGuard: isNumber, expected: false },
            ].forEach(({name,value,typeGuard,expected}) => {
                it(name, () => {
                    const actual = isArray(value, typeGuard);
                    assert.strictEqual(actual, expected);
                });
            });
        });
    });

    describe(isObject.name+'()', () => checkCases(isObject, ['object']));

    describe(hasKey.name+'()', () => {
        // TODO: add more
        describe('should return false for none objects', () => {
            for (const key in cases) {
                if (key === 'object') {
                    continue;
                }
                it(key, () => {
                    const actual = hasKey(cases[key as keyof typeof cases], '');
                    assert.strictEqual(actual, false);
                });
            }
        });
    });
});