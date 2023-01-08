import assert from "assert/strict";
import { round } from "./round";

describe(round.name, function () {
    const precisions = [-2, -1, undefined, 0, 1, 2];
    const xs = [0, 123.456, 987.654];
    const results = [
        [0, 0, 0, 0, 0, 0],
        [100, 120, 123, 123, 123.5, 123.46],
        [1000, 990, 988, 988, 987.7, 987.65],
    ];

    it("should correctly round scalars", function () {
        xs.forEach((x, i) => {
            precisions.forEach((prec, j) => {
                const want = results[i][j];
                const got = round(x, prec);
                assert.equal(got, want);
            });
        });
    });

    it("should correctly round a vector", function () {
        precisions.forEach((prec, j) => {
            const want = results.map((row) => row[j]);
            const got = round(xs, prec);
            assert.deepEqual(got, want);
        });
    });

    const deepen = (arr: any[], n: number) =>
        Array.from({ length: n }, () => arr);

    it("should correctly round a matrix", function () {
        precisions.forEach((prec, j) => {
            const want = deepen(
                results.map((row) => row[j]),
                3,
            );
            const got = round(deepen(xs, 3), prec);
            assert.deepEqual(got, want);
        });
    });

    it("should correctly round a tensor", function () {
        precisions.forEach((prec, j) => {
            const want = deepen(
                deepen(
                    results.map((row) => row[j]),
                    3,
                ),
                2,
            );
            const got = round(deepen(deepen(xs, 3), 2), prec);
            assert.deepEqual(got, want);
        });
    });
});
