import { strictEqual as equal } from "assert";
import {
  hasKey,
  isArray,
  isBool,
  isInteger,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from "type-guards";

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
      equal(actual, want);
    });
  }
}

describe("TypeGuards", () => {
  describe(isUndefined.name, () => checkCases(isUndefined, ["undefined"]));

  describe(isNull.name, () => checkCases(isNull, ["null"]));

  describe(isBool.name, () => checkCases(isBool, ["true", "false"]));

  describe(isInteger.name, () =>
    checkCases(isInteger, ["zero", "integer", "integerNegative"]),
  );

  describe(isNumber.name, () =>
    checkCases(isNumber, [
      "zero",
      "integer",
      "integerNegative",
      "number",
      "numberNegative",
    ]),
  );

  describe(isString.name, () =>
    checkCases(isString, ["string", "emptyString"]),
  );

  describe(isObject.name, () => checkCases(isObject, ["object"]));

  describe(isArray.name, () => {
    describe("without type guard", () =>
      checkCases(isArray, ["arrayNumbers", "arrayStrings", "arrayMixed"]));

    describe("with type guard", () => {
      [
        {
          name: "all elements match guard",
          want: true,
          value: cases.arrayNumbers,
          typeGuard: isNumber,
        },
        {
          name: "no elements match guard",
          want: false,
          value: cases.arrayStrings,
          typeGuard: isNumber,
        },
        {
          name: "some elements do not match guard",
          want: false,
          value: cases.arrayMixed,
          typeGuard: isNumber,
        },
      ].forEach(({ name, want, value, typeGuard }) => {
        it(`${name} => ${want}`, () => {
          const actual = isArray(value, typeGuard);
          equal(actual, want);
        });
      });
    });
  });

  describe(hasKey.name, () => {
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
        typeGuard: isString,
      },
      {
        name: "object has key and type guard matches",
        want: false,
        obj: { name: "John" },
        key: "name",
        typeGuard: isNumber,
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
        const actual = hasKey(obj, key, typeGuard);
        equal(actual, want);
      });
    });
  });
});
