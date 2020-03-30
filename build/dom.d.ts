/*! dom v0.0.1 from hd-snippets-js | MIT | © Hannes Dröse https://github.com/hd-code/hd-snippets-js */
/**
 * Select an element from the DOM using css selector syntax.
 * @param {string} css the css selector
 * @returns {NodeList} all matching elements
 */
declare function $(css: string): NodeList;
/**
 * Creates an HTML element.
 * @param {string} tagName the html tag to be created
 * @param {object} [attr] optional. a js-object. sets html attributes. e.g.: {class:'test'} -> class="test"
 * @param {string} [innerHTML] optional. the elements innerHTML
 * @returns {Element|null} The created HTML element
 */
declare function createElement(tagName: string, attr?: object | undefined, innerHTML?: string | undefined): Element | null;
/**
 * Inserts an element before another one in the DOM.
 * @param {Element} newNode element to be inserted
 * @param {Element} refNode reference element
 */
declare function insertBefore(newNode: Element, refNode: Element): void;
/**
 * Inserts an element after another one in the DOM.
 * @param {Element} newNode element to be inserted
 * @param {Element} refNode reference element
 */
declare function insertAfter(newNode: Element, refNode: Element): void;
