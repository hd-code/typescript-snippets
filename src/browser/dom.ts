/*! browser-util v0.0.1 | MIT | © Hannes Dröse https://github.com/hd-code/js-snippets */

// -----------------------------------------------------------------------------

type ElFunc = (element: Element, index: number) => void;

export function $(selector: string, fn?: ElFunc): NodeListOf<Element>;
export function $(root: Element, selector: string, fn?: ElFunc): NodeListOf<Element>;

export function $(arg1: Element | string, arg2?: ElFunc | string, arg3?: ElFunc): NodeListOf<Element> {
    const root = typeof arg1 !== 'string' ? arg1 as Element : document;
    const selector = typeof arg1 === 'string' ? arg1 : arg2 as string;
    const fn = typeof arg2 === 'string' ? arg3 : arg2 as ElFunc | undefined;

    const elements = root.querySelectorAll(selector);
    if (fn) {
        for (let i = 0, ie = elements.length; i < ie; i++) {
            fn(elements[i], i);
        }
    }
    return elements;
}

// -----------------------------------------------------------------------------

export function hide(el: HTMLElement): void {
    el.style.display = 'none';
}

export function show(el: HTMLElement): void {
    el.style.display = '';
}

export function toggle(el: HTMLElement): void {
    if (el.style.display === 'none') {
        el.style.display = '';
    } else {
        el.style.display = 'none';
    }
}
