/*! testutil v0.0.4 | MIT | https://github.com/hd-code/web-snippets */
/**
 * Tests a pure function against a list of test cases. Pure functions have no
 * side effects and their return value only depends on the input parameters.
 * @param fn The function to be tested.
 * @param cases An array of test cases. A test case is a tuple with two entries.
 * The first are the params (as an array) and the second is the expected return
 * value.
 *
 * Or a map of named test cases. The key is the name of the case. The
 * value is a tuple with two entries. The first are the params (as an array) and
 * the second is the expected return value.
 */
export declare function testFunc<Args extends unknown[], Return>(fn: (...args: Args) => Return, cases: [Args, Return][] | {
    [name: string]: [Args, Return];
}): void;
declare type RecursiveArray<Type> = Array<RecursiveArray<Type> | Type>;
export declare function testFuncClose<Args extends unknown[], Return extends number | RecursiveArray<number>>(fn: (...args: Args) => Return, cases: [Args, Return][] | {
    [name: string]: [Args, Return];
}, delta: number): void;
export {};
