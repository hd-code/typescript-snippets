export declare type Callback<T> = (state: T) => void;
export interface Container<T> {
    update: (reducer: (state: T) => T) => T;
    retrieve: () => T;
    subscribe: (callback: (state: T) => void) => void;
    unsubscribe: (callback: (state: T) => void) => boolean;
}
export declare function BaseContainer<T>(initState: T): Container<T>;
