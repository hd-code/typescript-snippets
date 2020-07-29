/*! storage-local v0.0.1 from hd-snippets-js | MIT | © Hannes Dröse https://github.com/hd-code/hd-snippets-js */
import { Storage } from './storage';
/** This function creates a new local storage. The local storage is dumped into
 * a simple json file. An arbitrary filepath (including the filename) can be
 * specified. The file is used to persist the storage. */
export declare function LocalStorage<T>(filepath?: string): Storage<T>;
