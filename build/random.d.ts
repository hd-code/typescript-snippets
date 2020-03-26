/*! hd-snippets-js v0.1.1 | MIT | Hannes Dröse git+https://github.com/hd-code/hd-snippets-js.git */
/** @file In JavaScript the Math.random() function is not seedable. So you
 * cannot have repeatable scripts with native JS. Therefore, this is a
 * implementation of the Lehmer random number generator. A rather simple but
 * effective random number generator. And it is seeadable. */
/** Set the seed for the random number generator. It should be a positive whole
 * number. Other numbers work as well, but are set to a default seed. */
export declare function setSeed(seed: number): void;
/** Returns a random number in the interval `[0,1)`. */
export declare function getRandom(): number;
