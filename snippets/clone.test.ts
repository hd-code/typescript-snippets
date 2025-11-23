import assert from "assert/strict";
import { clone, deepClone } from "./clone";

describe("clone", () => {
    describe(clone.name + "()", () => {
        it("should clone primitive types (number,string,null,undefined)", () => {
            const original = [1, "text", null, undefined];
            original.forEach((data) => assert.deepEqual(clone(data), data));
        });

        it("should clone array of numbers – arrays should be independent now", () => {
            const original = [1, 2, 3, 4];
            const actual = clone(original);
            assert.deepEqual(actual, original);
            actual[0] = 0;
            assert.notDeepEqual(actual, original);
        });

        it("should clone array of array of numbers – nested arrays are not independent!", () => {
            const original = [
                [1, 2],
                [3, 4],
            ];
            const actual = clone(original);
            assert.deepEqual(actual, original);
            (actual[0] as number[])[0] = 0;
            assert.deepEqual(actual, original);
        });

        it("should clone object of primitive values – objects should be independent now", () => {
            const original = { name: "John Doe", age: 42 };
            const actual = clone(original);
            assert.deepEqual(actual, original);
            actual.age = 0;
            assert.notDeepEqual(actual, original);
        });

        it("should clone complex object – nested elements are not independent", () => {
            const original = {
                name: "John Doe",
                age: 42,
                hobbies: ["poker", "baccarat"],
                phone: { company: "Apple", model: "iPhone SE" },
                greet: () => "Hello World",
            };
            const actual = clone(original);
            assert.deepEqual(actual, original);

            actual.age = 0;
            assert.notDeepEqual(actual, original);
            ((actual.age = 42), (actual.hobbies[0] = "roulette"));
            assert.deepEqual(actual, original);
            actual.hobbies[0] = "poker";

            actual.phone.company = "Samsung";
            assert.deepEqual(actual, original);
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
            assert.notDeepEqual(actual, original);
        });
    });

    describe(deepClone.name + "()", () => {
        it("should clone primitive types (number,string,null,undefined)", () => {
            const original = [1, "text", null, undefined];
            original.forEach((data) => assert.deepEqual(deepClone(data), data));
        });

        it("should clone array of numbers – arrays should be independent now", () => {
            const original = [1, 2, 3, 4];
            const actual = deepClone(original);
            assert.deepEqual(actual, original);
            actual[0] = 0;
            assert.notDeepEqual(actual, original);
        });

        it("should clone array of array of numbers – arrays should be independant now", () => {
            const original = [
                [1, 2],
                [3, 4],
            ];
            const actual = deepClone(original);
            assert.deepEqual(actual, original);
            (actual[0] as number[])[0] = 0;
            assert.notDeepEqual(actual, original);
        });

        it("should clone object of primitive values – objects should be independent now", () => {
            const original = { name: "John Doe", age: 42 };
            const actual = deepClone(original);
            assert.deepEqual(actual, original);
            actual.age = 0;
            assert.notDeepEqual(actual, original);
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
            assert.deepEqual(actual, original);

            actual.age = 0;
            assert.notDeepEqual(actual, original);
            ((actual.age = 42), (actual.hobbies[0] = "roulette"));
            assert.notDeepEqual(actual, original);
            actual.hobbies[0] = "poker";

            actual.phone.company = "Samsung";
            assert.notDeepEqual(actual, original);
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
            assert.notDeepEqual(actual, original);
        });
    });
});
