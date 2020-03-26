import assert from 'assert';
import * as rd from '../src/random';

// -----------------------------------------------------------------------------

describe(__filename, () => {
    it('getRandom()', () => {
        for (let i = 0; i < 999; i++) {
            const num = rd.getRandom();
            assert(0 <= num && num < 1);
        }
    });
    it('setSeed()', () => {
        rd.setSeed(5);
        rd.getRandom();

        rd.setSeed(0);
        rd.getRandom();

        rd.setSeed(100.5);
        rd.getRandom();

        rd.setSeed(-30);
        rd.getRandom();
        
        rd.setSeed(Infinity);
        rd.getRandom();
    });
});