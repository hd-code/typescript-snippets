/*! testutil v0.0.1 | MIT | https://github.com/hd-code/web-snippets */
/**
 * Tests a pure function against a list of test cases. Pure functions have no
 * side effects and their return value only depends on the input parameters.
 * @param fn The function to be tested.
 * @param cases An array of test cases. A test case is a tuple with two entries.
 * The first are the params (as an array) and the second is the expected return
 * value.
 */
export declare function testFunc<Args extends any[], Return>(fn: (...args: Args) => Return, cases: [Args, Return][]): void;
/**
 * Tests a pure function against a list of test cases. Pure functions have no
 * side effects and their return value only depends on the input parameters.
 * @param fn The function to be tested.
 * @param cases A map of named test cases. The key is the name of the case. The
 * value is a tuple with two entries. The first are the params (as an array) and
 * the second is the expected return value.
 */
export declare function testFunc<Args extends any[], Return>(fn: (...args: Args) => Return, cases: {
    [name: string]: [Args, Return];
}): void;
