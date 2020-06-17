import assert from 'assert';
import { sleep } from '../src/#ideas';

// -----------------------------------------------------------------------------

describe('#ideas', () => {
    describe('sleep()', () => {
        async function test(milliseconds: number) {
            const begin = Date.now();
            await sleep(milliseconds);
            const end = Date.now();

            return end - begin;
        }

        it('should take at least 1ms to execute function with sleep(1)', (done) => {
            const ms = 1;
            test(ms).then(duration => {
                try {
                    assert(ms <= duration);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });

        it('should take at least 5ms to execute function with sleep(5)', (done) => {
            const ms = 5;
            test(ms).then(duration => {
                try {
                    assert(ms <= duration);
                    done();
                } catch (err) {
                    done(err);
                }
            });
        });
    });
});