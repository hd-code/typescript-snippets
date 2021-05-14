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

// -----------------------------------------------------------------------------

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
    const expected = trueCases.includes(key as CaseKey);
    it(key + " – expect: " + expected, () => {
      const actual = typeGuard(cases[key as CaseKey]);
      expect(actual).toBe(expected);
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
      it.each([
        ["all elements match guard", true, cases.arrayNumbers, isNumber],
        ["no elements match guard", false, cases.arrayStrings, isNumber],
        ["some elements do not match guard", false, cases.arrayMixed, isNumber],
      ])("%s => %j", (_, expected, value, typeGuard) => {
        const actual = isArray(value, typeGuard);
        expect(actual).toBe(expected);
      });
    });
  });

  describe(hasKey.name, () => {
    it.each([
      ["object has key", true, { name: "John" }, "name", undefined],
      ["object does not have key", false, { name: "John" }, "age", undefined],
      [
        "object has key and type guard matches",
        true,
        { name: "John" },
        "name",
        isString,
      ],
      [
        "object has key but type guard fails",
        false,
        { name: "John" },
        "name",
        isNumber,
      ],
      [
        "object has key with falsy value (empty string)",
        true,
        { name: "" },
        "name",
        undefined,
      ],
      [
        "object has key with falsy value (0)",
        true,
        { name: 0 },
        "name",
        undefined,
      ],
      [
        "object has key with falsy value (null)",
        true,
        { name: null },
        "name",
        undefined,
      ],
      [
        "object has key with falsy value (undefined)",
        true,
        { name: undefined },
        "name",
        undefined,
      ],
    ])("%s => %j", (_, expected, obj, key, typeGuard) => {
      const actual = hasKey(obj, key, typeGuard);
      expect(actual).toBe(expected);
    });
  });
});
