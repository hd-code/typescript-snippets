/*! worker-template v1.0.0 from hd-snippets-js | MIT | © Hannes Dröse https://github.com/hd-code/hd-snippets-js */

/**
 * @fileoverview
 * This is a template to be used for running a Worker in Node.js. Workers are
 * scripts that are executed in a separate thread. They are called from the main
 * thread. Run their calculation and return the result via a callback function
 * to the main thread.
 * 
 * Handleing of workers can be a little challenging. Therefore, this script is
 * designed to simplify the process:
 * 
 * Copy the template file to your application and rename it to your liking.
 * Now you enter your code in the corresponding section of this file (see below).
 * Only one kind of function can be implemented here. If you want workers to
 * handle separate tasks, create one copy of this template for each and
 * implement it in the corresponding files.
 * 
 * Now you can use the worker in your application by importing the corresponding
 * file.
 * 
 * _Important:_ Worker scripts do not work in ts-node, so they always have to be
 * compiled before usage.
 * 
 * Example:
 * ```ts
 * import WorkerTemplate from 'worker-template';
 * 
 * const worker = new WorkerTemplate();
 * 
 * worker.registerCallback(onWorkerIsFinished);
 * function onWorkerIsFinished(result: number) {
 *      // code to be run once the worker is done...
 * }
 * 
 * // ...
 * 
 * // can be called multiple times, tasks will be chained
 * worker.run('input parameter you specified in worker template');
 * 
 * // check if worker is currently executing
 * worker.isRunning(); // check if worker is currently executing
 * 
 * // ...
 * 
 * // Always run this function, when the worker is no longer needed!
 * // Otherwise, the worker will keep your application running infinitely.
 * worker.delete();
 * ```
 */

import { isMainThread, parentPort, Worker } from 'worker_threads';

// -----------------------------------------------------------------------------
// Worker Implementation – This is, where you insert your code !!!
// -----------------------------------------------------------------------------

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
type TInput  = { a:number, b: number };

/**
 * Specify the output type of the worker script.
 */
type TOutput = number;

/**
 * This is the cpu intensive script, that has to be executed in a separate thread.
 * 
 * **Do not change the function signature!** Otherwise, the script will not work.
 * 
 * Make sure to return your specified output value!
 */
function main(input: TInput): TOutput {
    let result = 0;
    for (let i = 0; i < input.a; i++) {
        for (let j = 0; j < input.b; j++) {
            result += 1;
        }
    }
    return result;
}

// -----------------------------------------------------------------------------
// Public API - Do not alter anything here !!!
// -----------------------------------------------------------------------------

/**
 * Execute CPU intensive tasks in a separate thread and get noticed once it is
 * done.
 */
export default class Script {
    private worker: Worker;
    private running: boolean;
    private callback: (data: TOutput) => void = () => {};

    /** Creates a new separate thread. */
    constructor() {
        this.worker = new Worker(__filename);
        this.worker.on('message', data => {
            this.running = false;
            this.callback(data);
        });
        this.running = false;
    }

    /** Register a callback function to be called when the worker is finished.
     * The computed result is passed to the callback as the first parameter. */
    registerCallback(callback: (data: TOutput) => void) {
        this.callback = callback;
    }

    /** Run the task in a separate thread. */
    run(input: TInput) {
        this.running = true;
        this.worker.postMessage(input);
    }

    /** Returns true if the script is currently running, false if not. */
    isRunning(): boolean {
        return this.running;
    }

    /**
     * Stops the script and closes the parallel thread.
     * 
     * _Important_: always call this function, when the script is no longer
     * needed. Otherwise it will keep the whole node program running.
     */
    delete() {
        this.worker.unref();
    }
}

// -----------------------------------------------------------------------------
// Execution of Worker Script – Do not alter anything here !!!
// -----------------------------------------------------------------------------

function onMessage(input: TInput) {
    const result = main(input);
    parentPort?.postMessage(result);
}

!isMainThread && parentPort?.on('message', onMessage);