export type Callback<T> = (state: T) => void;

export interface Container<T> {
    update: (reducer: (state: T) => T) => T;
    retrieve: () => T;
    subscribe: (callback: (state: T) => void) => void;
    unsubscribe: (callback: (state: T) => void) => boolean;
}

export function BaseContainer<T>(initState: T): Container<T> {
    let state: T = initState;
    let subscribers: Callback<T>[] = [];

    const callSubscribers = () => {
        for (let i = 0, ie = subscribers.length; i < ie; i++) {
            subscribers[i](state);
        }
    };

    return {
        update: (reducer: (state: T) => T) => {
            state = reducer(state);
            callSubscribers();
            return state;
        },

        retrieve: () => state,

        subscribe: (callback: (state: T) => void) => {
            subscribers.push(callback);
        },

        unsubscribe: (callback: (state: T) => void) => {
            const numOfSubscribers = subscribers.length;
            subscribers = subscribers.filter(
                (subscriber) => subscriber !== callback,
            );
            return numOfSubscribers > subscribers.length;
        },
    };
}
