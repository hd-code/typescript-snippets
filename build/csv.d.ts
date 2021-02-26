/*! csv v0.0.2 | MIT | © Hannes Dröse https://github.com/hd-code/web-snippets */
/**
 * @fileoverview
 * This file gives the possibility to transform arrays of objects to csv strings
 * and backwards.
 */
/** Converts an array of objects into a csv string. */
export declare function serialize<T>(data: T[]): string;
/** Converts a csv string back to an array of objects. */
export declare function parse<T>(csv: string): T[];
