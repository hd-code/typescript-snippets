import { clone, deepClone } from "clone";

// -----------------------------------------------------------------------------

describe("clone", () => {
  describe(clone.name + "()", () => {
    it("should clone primitive types (number,string,null,undefined)", () => {
      const original = [1, "text", null, undefined];
      original.forEach((data) => expect(clone(data)).toEqual(data));
    });

    it("should clone array of numbers – arrays should be independant now", () => {
      const original = [1, 2, 3, 4];
      const actual = clone(original);
      expect(actual).toEqual(original);
      actual[0] = 0;
      expect(actual).not.toEqual(original);
    });

    it("should clone array of array of numbers – nested arrays are not independant!", () => {
      const original = [
        [1, 2],
        [3, 4],
      ];
      const actual = clone(original);
      expect(actual).toEqual(original);
      (actual[0] as number[])[0] = 0;
      expect(actual).toEqual(original);
    });

    it("should clone object of primitive values – objects should be independent now", () => {
      const original = { name: "John Doe", age: 42 };
      const actual = clone(original);
      expect(actual).toEqual(original);
      actual.age = 0;
      expect(actual).not.toEqual(original);
    });

    it("should clone complex object – nested elements are not independant", () => {
      const original = {
        name: "John Doe",
        age: 42,
        hobbies: ["poker", "baccarat"],
        phone: { company: "Apple", model: "iPhone SE" },
        greet: () => "Hello World",
      };
      const actual = clone(original);
      expect(actual).toEqual(original);

      actual.age = 0;
      expect(actual).not.toEqual(original);
      (actual.age = 42), (actual.hobbies[0] = "roulette");
      expect(actual).toEqual(original);
      actual.hobbies[0] = "poker";

      actual.phone.company = "Samsung";
      expect(actual).toEqual(original);
      actual.phone.company = "Apple";
    });

    it("should not be able to correctly clone classes", () => {
      class CTest {
        getValue() {
          return 1;
        }
      }
      const original = new CTest();
      const actual = clone(original);
      expect(actual instanceof CTest).toBeFalsy();
    });
  });

  describe(deepClone.name + "()", () => {
    it("should clone primitive types (number,string,null,undefined)", () => {
      const original = [1, "text", null, undefined];
      original.forEach((data) => expect(deepClone(data)).toEqual(data));
    });

    it("should clone array of numbers – arrays should be independant now", () => {
      const original = [1, 2, 3, 4];
      const actual = deepClone(original);
      expect(actual).toEqual(original);
      actual[0] = 0;
      expect(actual).not.toEqual(original);
    });

    it("should clone array of array of numbers – arrays should be independant now", () => {
      const original = [
        [1, 2],
        [3, 4],
      ];
      const actual = deepClone(original);
      expect(actual).toEqual(original);
      (actual[0] as number[])[0] = 0;
      expect(actual).not.toEqual(original);
    });

    it("should clone object of primitive values – objects should be independent now", () => {
      const original = { name: "John Doe", age: 42 };
      const actual = deepClone(original);
      expect(actual).toEqual(original);
      actual.age = 0;
      expect(actual).not.toEqual(original);
    });

    it("should clone complex object – objects should be independent now", () => {
      const original = {
        name: "John Doe",
        age: 42,
        hobbies: ["poker", "baccarat"],
        phone: { company: "Apple", model: "iPhone SE" },
        greet: () => "Hello World",
      };
      const actual = deepClone(original);
      expect(actual).toEqual(original);

      actual.age = 0;
      expect(actual).not.toEqual(original);
      (actual.age = 42), (actual.hobbies[0] = "roulette");
      expect(actual).not.toEqual(original);
      actual.hobbies[0] = "poker";

      actual.phone.company = "Samsung";
      expect(actual).not.toEqual(original);
      actual.phone.company = "Apple";
    });

    it("should not be able to correctly clone classes", () => {
      class CTest {
        getValue() {
          return 1;
        }
      }
      const original = new CTest();
      const actual = deepClone(original);
      expect(actual).not.toEqual(original);
    });
  });
});
