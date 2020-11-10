type ElFunc = (element: Element, index: number) => void;

export function $(selector: string, fn?: ElFunc): NodeListOf<Element>;
export function $(element: Element, selector: string, fn?: ElFunc): NodeListOf<Element>;

export function $(_prim: Element | string, _sec?: ElFunc | string, _ter?: ElFunc): NodeListOf<Element> {
    const root = typeof _prim !== 'string' ? _prim as Element : document;
    const selector = typeof _prim === 'string' ? _prim : _sec as string;
    const fn = typeof _sec === 'string' ? _ter : _sec as ElFunc | undefined;

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
