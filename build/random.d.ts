/*! random v1.0.0 from hd-snippets-js | MIT | © Hannes Dröse https://github.com/hd-code/hd-snippets-js */
/**
 * In JavaScript the Math.random() function is not seedable. So you
 * cannot have repeatable scripts with native JS. Therefore, this is a
 * implementation of the Lehmer random number generator. A rather simple but
 * effective random number generator. And it is seeadable.
 *
 * Import or require to start using it:
 * ```ts
 * import Random from 'random';
 * Random.setSeed(5);
 * ...
 * ```
 * or
 * ```js
 * const Random = require('random');
 * Random.setSeed(2);
 * ...
 * ```
 */
declare namespace Random {
    /** Set the seed for the random number generator. It should be a positive whole
     * number. Other numbers work as well, but are set to a default seed. */
    function setSeed(seed: number): void;
    /** Returns a random number between 0 and 1 (both not included). */
    function get(): number;
    /**
     * Returns a random integer between 0 and `max` (both included).
     *
     * Negative `max` values will be transformed to positive values and
     * fractional `max` values will be rounded down (floor).
     */
    function getInt(max: number): number;
}
export default Random;
