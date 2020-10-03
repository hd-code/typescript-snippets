import assert from 'assert';
import * as Random from '../src/random';

// -----------------------------------------------------------------------------

describe('random', () => {
    const numberOfTries = 1000;
    const minSpreadCoverage = 0.95;

    describe(Random.getFloat.name + '()', () => {
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
        ].forEach(({ name, args, expected }) => {
            it(name, () => {
                const actuals = [];
                for (let i = 0; i < numberOfTries; i++) {
                    actuals.push(
                        Random.getFloat(args[0] as any, args[1] as any)
                    );
                }

                const smallest = Math.min(...actuals);
                const largest = Math.max(...actuals);

                assert(smallest >= expected.from, 'some value were too small');
                assert(smallest < expected.til, 'some value were too large');
                assert(largest >= expected.from, 'some value were too small');
                assert(largest < expected.til, 'some value were too large');

                const actDiff = largest - smallest;
                const expDiff = expected.til - expected.from;

                assert(actDiff <= expDiff, 'values have a bigger spread then allowed');
                assert(actDiff > expDiff * minSpreadCoverage, 'values do not span the whole range');
            });
        });
    });

    describe(Random.getInt.name + '()', () => {
        [
            { name: 'no args', args: [undefined, undefined], expected: { from: 0, til: Random.MAX_INT } },
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
        ].forEach(({ name, args, expected }) => {
            it(name, () => {
                const actuals = [];
                for (let i = 0; i < numberOfTries; i++) {
                    actuals.push(
                        Random.getInt(args[0] as any, args[1] as any)
                    );
                    assert(Math.floor(actuals[i]) === actuals[i], 'did not return an integer');
                }

                const smallest = Math.min(...actuals);
                const largest = Math.max(...actuals);

                assert(smallest >= expected.from, 'smallest value was too small');
                assert(smallest <= expected.til, 'smallest value was too large');
                assert(largest >= expected.from, 'largest value was too small');
                assert(largest <= expected.til, 'largest value was too large');

                const actDiff = largest - smallest;
                const expDiff = expected.til - expected.from;

                assert(actDiff <= expDiff, 'values have a bigger spread then allowed');
                assert(actDiff > expDiff * minSpreadCoverage, 'values do not span the whole range');
            });
        });
    });

    describe(Random.setSeed.name + '()', () => {
        const numOfValues = 100;
        const numOfTries = 100;

        function generateValues(): number[] {
            const result = [];
            for (let i = 0; i < numOfValues; i++) {
                result.push(Random.getInt());
            }
            return result;
        }

        [
            { name: 'no seed', seed: 0 },
            { name: '0 seed', seed: 0 },
            { name: 'normal seed', seed: 23 },
            { name: 'negative seed', seed: -23 },
            { name: 'very large seed', seed: 999999999999999999 },
            { name: 'very large negative seed', seed: -999999999999999999 },
        ].forEach(({ name, seed }) => {
            it(name, () => {
                Random.setSeed(seed);
                const expected = generateValues();

                for (let i = 0; i < numOfTries; i++) {
                    Random.setSeed(seed);
                    const actual = generateValues();
                    assert.deepStrictEqual(actual, expected, 'did not generate the same values');
                }
            });
        });

        it('should generate different values for 0 and 1', () => {
            Random.setSeed(0);
            const valuesZero = generateValues();
            Random.setSeed(1);
            const valuesOne = generateValues();
            assert.notDeepStrictEqual(valuesZero, valuesOne);
        });
    });
});