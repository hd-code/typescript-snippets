import * as assert from "assert/strict";
import * as random from "./random";

describe("random", function () {
    const checkNumbers = (func: () => number, min: number, max: number) => {
        for (let i = 0; i < 100000; i++) {
            const got = func();
            assert.ok(
                min <= got,
                `returned ${got}, which is smaller than ${min}`,
            );
            assert.ok(
                got <= max,
                `returned ${got}, which is bigger than ${max}`,
            );
        }
    };

    describe(random.float.name, function () {
        it("should only return numbers between 0 <= x <= 1", function () {
            checkNumbers(random.float, 0, 1);
        });
        it("should only return numbers between 0 <= x <= arg1 (20)", function () {
            checkNumbers(() => random.float(20), 0, 20);
        });
        it("should only return numbers between 0 <= x <= arg1 (-20)", function () {
            checkNumbers(() => random.float(-20), -20, 0);
        });
        it("should only return numbers between arg1 <= x <= arg2 (-20, 20)", function () {
            checkNumbers(() => random.float(-20, 20), -20, 20);
        });
        it("should work for wrong arg order as well (20, -20)", function () {
            checkNumbers(() => random.float(20, -20), -20, 20);
        });
    });

    describe(random.int.name, function () {
        it("should only return numbers between 0 <= x < MAX_INT", function () {
            checkNumbers(random.int, 0, random.MAX_INT);
        });
        it("should only return numbers between 0 <= x <= arg1 (200)", function () {
            checkNumbers(() => random.int(200), 0, 200);
        });
        it("should only return numbers between arg1 <= x <= 0 (-200)", function () {
            checkNumbers(() => random.int(-200), -200, 0);
        });
        it("should only return numbers between arg1 <= x <= arg2 (-200, 200)", function () {
            checkNumbers(() => random.int(-200, 200), -200, 200);
        });
        it("should work for wrong arg order as well (200, -200)", function () {
            checkNumbers(() => random.int(200, -200), -200, 200);
        });
        it("should only return numbers between -200 <= x <= 200 for (-200.45, 200.883)", function () {
            checkNumbers(() => random.int(-200.45, 200.883), -200, 200);
        });
        it("should behave like in with no args, when first arg is undefined", function () {
            random.seed();
            const want = Array.from({ length: 10 }, () => random.int());

            random.seed();
            const u = undefined as unknown as number;
            const got = Array.from({ length: 10 }, () => random.int(u, 10));

            assert.deepEqual(got, want);
        });
    });

    describe(random.seed.name, function () {
        const sequence = () => Array.from({ length: 10 }, () => random.int());
        const testSeeds = [
            0,
            1,
            2,
            -2,
            99,
            2.5,
            -16.777,
            random.MAX_INT,
            random.MAX_INT + 1,
            (random.MAX_INT + 1) * 5,
        ];

        it("should always return the same sequence after seeding", function () {
            testSeeds.forEach((seed) => {
                random.seed(seed);
                const want = sequence();

                for (let i = 0; i < 10; i++) {
                    random.seed(seed);
                    const got = sequence();
                    assert.deepEqual(got, want);
                }
            });
        });

        it("should always return valid sequences", function () {
            testSeeds.forEach((seed) => {
                const numbers: { [x: number]: boolean } = {};

                random.seed(seed);
                const got = sequence();

                got.forEach((x) => {
                    assert.ok(
                        0 <= x,
                        `seed ${seed} returned negative values: [${got}]`,
                    );
                    assert.ok(
                        x < random.MAX_INT,
                        `seed ${seed} returned too high values: [${got}]`,
                    );
                    numbers[x] = true;
                });
                assert.equal(
                    got.length,
                    Object.entries(numbers).length,
                    `seed ${seed} returned repeating values: [${got}]`,
                );
            });
        });

        it("should use 0 as default seed", function () {
            random.seed(0);
            const want = sequence();

            random.seed();
            const got = sequence();

            assert.deepEqual(got, want);
        });
    });
});
