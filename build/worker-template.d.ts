/*! worker-template v1.0.0 from hd-snippets-js | MIT | © Hannes Dröse https://github.com/hd-code/hd-snippets-js */
/**
 * Specify the input parameter type for the worker script.
 *
 * If you want to pass several input parameters, just pass them as an object.
 *
 * Example:
 * ```ts
 * type TInput = { param1: type1, param2: type2 }
 * ```
 */
declare type TInput = {
    a: number;
    b: number;
};
/**
 * Specify the output type of the worker script.
 */
declare type TOutput = number;
/**
 * Execute CPU-intensive tasks in a separate thread and get noticed once it is
 * done.
 */
export default class Script {
    private worker;
    private running;
    private callback;
    /** Creates a new separate thread. */
    constructor();
    /** Register a callback function to be called when the worker is finished.
     * The computed result is passed to the callback as the first parameter. */
    registerCallback(callback: (data: TOutput) => void): void;
    /** Run the task in a separate thread. */
    run(input: TInput): void;
    /** Returns true if the script is currently running, false if not. */
    isRunning(): boolean;
    /**
     * Stops the script and closes the parallel thread.
     *
     * _Important_: always call this function, when the script is no longer
     * needed. Otherwise it will keep the whole node program running.
     */
    delete(): void;
}
export {};
