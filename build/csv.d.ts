/*! csv v0.0.1 | MIT | © Hannes Dröse https://github.com/hd-code/js-snippets */
/**
 * @fileoverview
 * This file gives the possibility to transform arrays of objects to csv strings
 * and backwards.
 */
export declare function serialize<T>(data: T[]): string;
export declare function parse<T>(csv: string): T[];
