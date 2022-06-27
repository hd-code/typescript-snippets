import {
    deepStrictEqual as equal,
    notDeepStrictEqual as notEqual,
} from "assert";

import { clone, deepClone } from "./clone";

describe("clone", () => {
    describe(clone.name + "()", () => {
        it("should clone primitive types (number,string,null,undefined)", () => {
            const original = [1, "text", null, undefined];
            original.forEach((data) => equal(clone(data), data));
        });

        it("should clone array of numbers – arrays should be independent now", () => {
            const original = [1, 2, 3, 4];
            const actual = clone(original);
            equal(actual, original);
            actual[0] = 0;
            notEqual(actual, original);
        });

        it("should clone array of array of numbers – nested arrays are not independent!", () => {
            const original = [
                [1, 2],
                [3, 4],
            ];
            const actual = clone(original);
            equal(actual, original);
            (actual[0] as number[])[0] = 0;
            equal(actual, original);
        });

        it("should clone object of primitive values – objects should be independent now", () => {
            const original = { name: "John Doe", age: 42 };
            const actual = clone(original);
            equal(actual, original);
            actual.age = 0;
            notEqual(actual, original);
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
            equal(actual, original);

            actual.age = 0;
            notEqual(actual, original);
            (actual.age = 42), (actual.hobbies[0] = "roulette");
            equal(actual, original);
            actual.hobbies[0] = "poker";

            actual.phone.company = "Samsung";
            equal(actual, original);
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
            notEqual(actual, original);
        });
    });

    describe(deepClone.name + "()", () => {
        it("should clone primitive types (number,string,null,undefined)", () => {
            const original = [1, "text", null, undefined];
            original.forEach((data) => equal(deepClone(data), data));
        });

        it("should clone array of numbers – arrays should be independent now", () => {
            const original = [1, 2, 3, 4];
            const actual = deepClone(original);
            equal(actual, original);
            actual[0] = 0;
            notEqual(actual, original);
        });

        it("should clone array of array of numbers – arrays should be independant now", () => {
            const original = [
                [1, 2],
                [3, 4],
            ];
            const actual = deepClone(original);
            equal(actual, original);
            (actual[0] as number[])[0] = 0;
            notEqual(actual, original);
        });

        it("should clone object of primitive values – objects should be independent now", () => {
            const original = { name: "John Doe", age: 42 };
            const actual = deepClone(original);
            equal(actual, original);
            actual.age = 0;
            notEqual(actual, original);
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
            equal(actual, original);

            actual.age = 0;
            notEqual(actual, original);
            (actual.age = 42), (actual.hobbies[0] = "roulette");
            notEqual(actual, original);
            actual.hobbies[0] = "poker";

            actual.phone.company = "Samsung";
            notEqual(actual, original);
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
            notEqual(actual, original);
        });
    });
});
