import * as assert from 'assert';
import { MAX_INT, getFloat, getInt, setSeed } from 'random';
import { isInteger } from 'type-guards';

// -----------------------------------------------------------------------------

describe('math/random', () => {
    const numberOfTries = 1000;
    const minSpreadCoverage = 0.95;

    describe(getFloat.name, () => {
        [
            { name: 'no args', args: [undefined, undefined], expected: { from: 0, til: 1 } },
            { name: 'with max', args: [10, undefined], expected: { from: 0, til: 10 } },
            { name: 'with negative max', args: [-10, undefined], expected: { from: -10, til: 0 } },
            { name: 'with min and max', args: [5, 15], expected: { from: 5, til: 15 } },
            { name: 'with negative min', args: [-5, 15], expected: { from: -5, til: 15 } },
            { name: 'min bigger than max', args: [10, 0], expected: { from: 0, til: 10 } },
            { name: 'negative min and max', args: [-20, -10], expected: { from: -20, til: -10 } },
            { name: 'negative min and max wrong order', args: [-10, -20], expected: { from: -20, til: -10 } },
            { name: 'no min but max', args: [undefined, 10], expected: { from: 0, til: 10 } },
        ].forEach(({ name, args, expected }) =>
            it(name, () => {
                const actuals = [];
                for (let i = 0; i < numberOfTries; i++) {
                    actuals.push(getFloat(args[0] as number, args[1] as number));
                }

                const smallest = Math.min(...actuals);
                const largest = Math.max(...actuals);

                assert.ok(smallest >= expected.from, 'some value were too small');
                assert.ok(smallest < expected.til, 'some value were too large');
                assert.ok(largest >= expected.from, 'some value were too small');
                assert.ok(largest < expected.til, 'some value were too large');

                const actDiff = largest - smallest;
                const expDiff = expected.til - expected.from;

                assert.ok(actDiff <= expDiff, 'values have a bigger spread then allowed');
                assert.ok(actDiff > expDiff * minSpreadCoverage, 'values do not span the whole range');
            }),
        );
    });

    describe(getInt.name, () => {
        [
            { name: 'no args', args: [undefined, undefined], expected: { from: 0, til: MAX_INT } },
            { name: 'with max', args: [10, undefined], expected: { from: 0, til: 10 } },
            { name: 'with negative max', args: [-10, undefined], expected: { from: -10, til: 0 } },
            { name: 'with real max', args: [10.7, undefined], expected: { from: 0, til: 10 } },
            { name: 'with negative real max', args: [-10.7, undefined], expected: { from: -10, til: 0 } },
            { name: 'with min and max', args: [5, 15], expected: { from: 5, til: 15 } },
            { name: 'with negative min', args: [-5, 15], expected: { from: -5, til: 15 } },
            { name: 'min bigger than max', args: [10, 0], expected: { from: 0, til: 10 } },
            { name: 'negative min and max', args: [-20, -10], expected: { from: -20, til: -10 } },
            { name: 'negative real min and max', args: [-20.5, -10.2], expected: { from: -20, til: -10 } },
            { name: 'negative min and max wrong order', args: [-10, -20], expected: { from: -20, til: -10 } },
            { name: 'no min but max', args: [undefined, 10], expected: { from: 0, til: 10 } },
        ].forEach(({ name, args, expected }) =>
            it(name, () => {
                const actuals = [];
                for (let i = 0; i < numberOfTries; i++) {
                    actuals.push(getInt(args[0] as number, args[1] as number));
                    assert.ok(actuals.every(isInteger), 'did not return an integer');
                }

                const smallest = Math.min(...actuals);
                const largest = Math.max(...actuals);

                assert.ok(smallest >= expected.from, 'smallest value was too small');
                assert.ok(smallest <= expected.til, 'smallest value was too large');
                assert.ok(largest >= expected.from, 'largest value was too small');
                assert.ok(largest <= expected.til, 'largest value was too large');

                const actDiff = largest - smallest;
                const expDiff = expected.til - expected.from;

                assert.ok(actDiff <= expDiff, 'values have a bigger spread then allowed');
                assert.ok(actDiff > expDiff * minSpreadCoverage, 'values do not span the whole range');
            }),
        );
    });

    describe(setSeed.name, () => {
        const numOfValues = 100;
        const numOfTries = 100;

        function generateValues(): number[] {
            const result = [];
            for (let i = 0; i < numOfValues; i++) {
                result.push(getInt());
            }
            return result;
        }

        [
            { name: 'no seed' },
            { name: '0 seed', seed: 0 },
            { name: 'normal seed', seed: 23 },
            { name: 'negative seed', seed: -23 },
            { name: 'very large seed', seed: 999999999999999999 },
            { name: 'very large negative seed', seed: -999999999999999999 },
        ].forEach(({ name, seed }) =>
            it(name, () => {
                setSeed(seed as number);
                const expected = generateValues();

                for (let i = 0; i < numOfTries; i++) {
                    setSeed(seed as number);
                    const actual = generateValues();
                    assert.deepStrictEqual(actual, expected, 'did not generate the same values');
                }
            }),
        );

        it('should generate different values for 0 and 1', () => {
            setSeed(0);
            const valuesZero = generateValues();
            setSeed(1);
            const valuesOne = generateValues();
            assert.notDeepStrictEqual(valuesZero, valuesOne);
        });
    });
});
