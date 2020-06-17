/**
 * Pauses the execution of an asynchronous function for a fixed duration.
 * @param milliseconds The duration the execution should be paused in milliseconds.
 */
export declare function sleep(milliseconds: number): Promise<unknown>;
export declare function toCSV<T>(data: T[], noHeader?: boolean): string;
