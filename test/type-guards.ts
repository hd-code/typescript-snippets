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
            const shouldBeTrue = trueCases.includes(key as CaseKey);
            assert.strictEqual(typeGuard(cases[key as CaseKey]), shouldBeTrue, 'failed for case: ' + key);
        }
    }

    it(isUndefined.name, () => checkCases(isUndefined, ['undefined']));

    it(isNull.name, () => checkCases(isNull, ['null']));

    it(isBool.name, () => checkCases(isBool, ['true','false']));

    it(isInteger.name, () => checkCases(isInteger, ['zero','integer','integerNegative']));

    it(isNumber.name, () => checkCases(isNumber, ['zero','integer','integerNegative','number','numberNegative']));

    it(isString.name, () => checkCases(isString, ['string','emptyString']));

    describe(isArray.name, () => {
        it('check without type guard', () => checkCases(isArray, ['arrayNumbers','arrayStrings','arrayMixed']));

        describe('check with type guard', () => {
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

    it(isObject.name, () => checkCases(isObject, ['object']));

    describe(hasKey.name, () => {
        // TODO: add more
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