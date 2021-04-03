/*! dom v0.0.2 | MIT | https://github.com/hd-code/web-snippets */
declare type ElFunc = (element: Element, index: number) => void;
export declare function $(selector: string, fn?: ElFunc): NodeListOf<Element>;
export declare function $(root: Element, selector: string, fn?: ElFunc): NodeListOf<Element>;
export declare function hide(el: HTMLElement): void;
export declare function show(el: HTMLElement): void;
export declare function toggle(el: HTMLElement): void;
export {};
