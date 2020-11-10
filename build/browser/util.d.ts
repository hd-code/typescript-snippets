declare type ElFunc = (element: Element, index: number) => void;
export declare function $(selector: string, fn?: ElFunc): NodeListOf<Element>;
export declare function $(element: Element, selector: string, fn?: ElFunc): NodeListOf<Element>;
export declare function hide(el: HTMLElement): void;
export declare function show(el: HTMLElement): void;
export declare function toggle(el: HTMLElement): void;
export {};
