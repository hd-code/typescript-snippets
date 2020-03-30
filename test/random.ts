import assert from 'assert';
import Random from '../src/random';

// -----------------------------------------------------------------------------

describe('random', () => {
    describe('setSeed()', () => {
        it('should work even for strange seeds', () => {
            test(5);
            test(0);
            test(100.5);
            test(-30);            
            test(Infinity);

            function test(seed: number) {
                Random.setSeed(seed);
                Random.get();
            }
        });

        it('should produce the same random numbers for the same seeds', () => {
            assert.deepStrictEqual(generateValues(1, 999), generateValues(1, 999));
            assert.deepStrictEqual(generateValues(5, 10), generateValues(5, 10));
            assert.deepStrictEqual(generateValues(-30.4, 10), generateValues(-30.4, 10));
        });

        it('should produce different numbers for different seeds', () => {
            assert.notDeepStrictEqual(generateValues(1, 999), generateValues(2, 999));
            assert.notDeepStrictEqual(generateValues(4, 10), generateValues(5, 10));
            assert.notDeepStrictEqual(generateValues(40, 10), generateValues(99999, 10));
        });

        function generateValues(seed: number, numOfValues: number) {
            Random.setSeed(seed);
            return [...Array(numOfValues)].map(_ => Random.get());
        }
    });

    describe('get()', () => {
        it('should only produce numbers between 0 and 1 (not included)', () => {
            for (let i = 0; i < 99999; i++) {
                const num = Random.get();
                assert(0 < num && num < 1);
            }
        });
    });

    describe('getInt()', () => {
        it('should only produce whole numbers', () => {
            for (let i = 0; i < 99999; i++) {
                const num = Random.getInt(99999);
                assert(num === Math.floor(num));
            }
        });

        it('should only produce numbers between 0 and the given max (both included)', () => {
            for (let i = 0; i < 99999; i++) {
                const num = Random.getInt(10);
                assert(0 <= num && num <= 10);
            }
        });

        it('should ignore fractions in max parameter and just use the whole number', () => {
            for (let i = 0; i < 99999; i++) {
                const num = Random.getInt(10.43);
                assert(0 <= num && num <= 10);
            }
        });

        it('should treat negative max values as positive ones', () => {
            for (let i = 0; i < 99999; i++) {
                const num = Random.getInt(-10);
                assert(0 <= num && num <= 10);
            }
        });

        it('should only output 0 if max is 0', () => {
            for (let i = 0; i < 99999; i++) {
                const num = Random.getInt(0);
                assert(0 === num);
            }
        });
    });
});