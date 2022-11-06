import * as assert from "assert/strict";
import * as typeguards from "./typeguards";

type CaseKey = keyof typeof cases;
const cases = {
    undefined: undefined as undefined,
    null: null as null,
    true: true,
    false: false,
    string: "string",
    emptyString: "",
    zero: 0,
    integer: 2,
    integerNegative: -2,
    number: 3.45,
    numberNegative: -3.45,
    arrayNumbers: [1, 2, 3],
    arrayStrings: ["1", "2", "3"],
    arrayMixed: [1, "2", 3],
    object: { name: "John Doe", age: 42 },
};
function checkCases<T>(
    typeGuard: (val: unknown) => val is T,
    trueCases: CaseKey[],
) {
    for (const key in cases) {
        const want = trueCases.includes(key as CaseKey);
        it(`${key} => ${want}`, () => {
            const actual = typeGuard(cases[key as CaseKey]);
            assert.equal(actual, want);
        });
    }
}

describe("typeguards", () => {
    describe(typeguards.isUndefined.name, () =>
        checkCases(typeguards.isUndefined, ["undefined"]),
    );

    describe(typeguards.isNull.name, () =>
        checkCases(typeguards.isNull, ["null"]),
    );

    describe(typeguards.isBool.name, () =>
        checkCases(typeguards.isBool, ["true", "false"]),
    );

    describe(typeguards.isInteger.name, () =>
        checkCases(typeguards.isInteger, [
            "zero",
            "integer",
            "integerNegative",
        ]),
    );

    describe(typeguards.isNumber.name, () =>
        checkCases(typeguards.isNumber, [
            "zero",
            "integer",
            "integerNegative",
            "number",
            "numberNegative",
        ]),
    );

    describe(typeguards.isString.name, () =>
        checkCases(typeguards.isString, ["string", "emptyString"]),
    );

    describe(typeguards.isObject.name, () =>
        checkCases(typeguards.isObject, ["object"]),
    );

    describe(typeguards.isArray.name, () => {
        describe("without type guard", () =>
            checkCases(typeguards.isArray, [
                "arrayNumbers",
                "arrayStrings",
                "arrayMixed",
            ]));

        describe("with type guard", () => {
            [
                {
                    name: "all elements match guard",
                    want: true,
                    value: cases.arrayNumbers,
                    typeGuard: typeguards.isNumber,
                },
                {
                    name: "no elements match guard",
                    want: false,
                    value: cases.arrayStrings,
                    typeGuard: typeguards.isNumber,
                },
                {
                    name: "some elements do not match guard",
                    want: false,
                    value: cases.arrayMixed,
                    typeGuard: typeguards.isNumber,
                },
            ].forEach(({ name, want, value, typeGuard }) => {
                it(`${name} => ${want}`, () => {
                    const actual = typeguards.isArray(value, typeGuard);
                    assert.equal(actual, want);
                });
            });
        });
    });

    describe(typeguards.hasKey.name, () => {
        [
            {
                name: "object has key",
                want: true,
                obj: { name: "John" },
                key: "name",
                typeGuard: undefined,
            },
            {
                name: "object does not have key",
                want: false,
                obj: { name: "John" },
                key: "age",
                typeGuard: undefined,
            },
            {
                name: "object has key and type guard matches",
                want: true,
                obj: { name: "John" },
                key: "name",
                typeGuard: typeguards.isString,
            },
            {
                name: "object has key and type guard matches",
                want: false,
                obj: { name: "John" },
                key: "name",
                typeGuard: typeguards.isNumber,
            },
            {
                name: "object has key with falsy value (empty string)",
                want: true,
                obj: { name: "" },
                key: "name",
                typeGuard: undefined,
            },
            {
                name: "object has key with falsy value (0)",
                want: true,
                obj: { name: 0 },
                key: "name",
                typeGuard: undefined,
            },
            {
                name: "object has key with falsy value (null)",
                want: true,
                obj: { name: null },
                key: "name",
                typeGuard: undefined,
            },
            {
                name: "object has key with falsy value (undefined)",
                want: true,
                obj: { name: undefined },
                key: "name",
                typeGuard: undefined,
            },
        ].forEach(({ name, want, obj, key, typeGuard }) => {
            it(`${name} => ${want}`, () => {
                const actual = typeguards.hasKey(obj, key, typeGuard);
                assert.equal(actual, want);
            });
        });
    });

    describe(typeguards.isEnum.name, () => {
        enum NumberEnum {
            one,
            two,
            three,
        }

        enum StringEnum {
            one = "1",
            two = "2",
            three = "3",
        }

        const testCases: [string, any, typeguards.EnumType, boolean][] = [
            ["number enum success", 1, NumberEnum, true],
            ["number enum too high", 99, NumberEnum, false],
            ["number enum float", 1.1, NumberEnum, false],
            ["number enum key", "one", NumberEnum, false],
            ["string enum success", "1", StringEnum, true],
            ["string enum unknown", "foo", StringEnum, false],
            ["string enum key", "two", StringEnum, false],
            ["wrong value type bool", true, NumberEnum, false],
            ["wrong value type array", [0, 1], NumberEnum, false],
        ];
        testCases.forEach(([name, value, enumtype, want]) => {
            it(name, () => {
                const got = typeguards.isEnum(value, enumtype);
                assert.equal(got, want);
            });
        });
    });
});
