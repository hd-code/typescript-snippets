/*! random v2.0.0 from hd-snippets-js | MIT | © Hannes Dröse https://github.com/hd-code/hd-snippets-js */
/**
 * @file
 * The JavaScript Math.random() function is not seedable. This package provides
 * an implementation of the Lehmer random number generator. The generator is
 * seedable, but will use a random seed when none was set.
 *
* Make sure to set the seed only once in your application, ideally on startup.
*/
/** Returns a random number between 0 (included) and 1 (not included). */
export declare function getFloat(): number;
/** Returns a random number between 0 and `max` (both included). */
export declare function getFloat(max: number): number;
/** Returns a random number between `min` and `max` (both included). */
export declare function getFloat(min: number, max: number): number;
/** The maximum integer that is returned by the `getInt()` function. */
export declare const MAX_INT: number;
/** Returns an integer between 0 and `MAX_INT` (both included). */
export declare function getInt(): number;
/** Returns an integer between 0 and `max` (both included).
 *
 * _Note:_ Decimals will be ignored.
 */
export declare function getInt(max: number): number;
/** Returns an integer between `min` and `max` (both included).
 *
 * _Note:_ Decimals will be ignored.
 */
export declare function getInt(min: number, max: number): number;
/** Sets the seed for the random number generator to 0. */
export declare function setSeed(): void;
/** Sets the seed for the random number generator.
 *
 * _Note:_ Decimals will be ignored.
 */
export declare function setSeed(seed: number): void;
