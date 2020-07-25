/*! storage v0.0.2 from hd-snippets-js | MIT | © Hannes Dröse https://github.com/hd-code/hd-snippets-js */
/** StorageMap is used to represent a list of storage elements. It is a map
 * where the element's id is the key and the element itself is the value. */
export declare type StorageMap<T> = {
    [id: string]: T;
};
/** A Storage is used to save a list of elements. The elements are indexed by an
 * id. The id can either be set manually or generated automatically. The id is
 * not necessarily part of the element.
 *
 * The storage interface defines methods for interacting with an arbitrary
 * storage system. This could be a cache that will not persist, file or
 * database-based implementations. */
export interface Storage<T> {
    /** Completely empties the storage. All previously stored items are
     * returned. */
    clear: () => StorageMap<T>;
    /** Deletes one element from the storage specified by its id. The deleted
     * element is then returned. If there is no element to delete, undefined is
     * returned. */
    delete: (id: string) => T | undefined;
    /** Returns all elements that match the filter. Each element in the storage
     * is passed to the filter function. The filter function should return true,
     * if the element should be returned and false if not. The matching elements
     * are returned together with their ids as a map. */
    filter: (filterFunc: (element: T) => boolean) => StorageMap<T>;
    /** Returns one element from the storage with the specified id. If there is
     * no such element, undefined is returned. */
    get: (id: string) => T | undefined;
    /** Returns all the elements in the storage together with their id as a map. */
    getAll: () => StorageMap<T>;
    /** Replaces all elements in the storage with a modified version of
     * themselves. The replace function defines the mapping from one original
     * element to the modified version. The modified elements are then stored
     * and returned.
     *
     * When the preview flag is set to true, the function will only return the
     * modified versions of the elements. The original elements in the storage
     * are not altered, yet. This is useful for checking and verifying that the
     * replace function works as intended before actually doing the replacement. */
    replace: (replaceFunc: (element: T) => T, preview?: boolean) => StorageMap<T>;
    /** Saves an element to the storage. A new random id is generated under
     * which the element is stored. The id is then returned. */
    save: (element: T) => string;
    /** Stores an element under the specified id. If there already is an element
     * with that id, it is replaced. The former element (that was replaced) is
     * returned or undefined if the key was not used before. */
    set: (id: string, element: T) => T | undefined;
}
/** This function creates a new base storage. A base storage only exists during
 * the lifetime of the application. It can be used as a basis to implement more
 * advanced storage providers. */
export declare function BaseStorage<T>(initCache?: StorageMap<T>): Storage<T>;
/** This function creates a new local storage. The local storage is dumped into
 * a simple json file. An arbitrary filepath (including the filename) can be
 * specified. The file is used to persist the storage. */
export declare function LocalStorage<T>(filepath?: string): Storage<T>;