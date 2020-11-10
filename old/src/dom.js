/*! dom v0.0.1 from hd-snippets-js | MIT | © Hannes Dröse https://github.com/hd-code/hd-snippets-js */

/**
 * Select an element from the DOM using css selector syntax.
 * @param {string} css the css selector
 * @returns {NodeList} all matching elements
 */
// Caution: If you use JQuery, you should rename this function!
function $(css) {
    return document.querySelectorAll(css)
}

/**
 * Creates an HTML element.
 * @param {string} tagName the html tag to be created
 * @param {object} [attr] optional. a js-object. sets html attributes. e.g.: {class:'test'} -> class="test"
 * @param {string} [innerHTML] optional. the elements innerHTML
 * @returns {Element|null} The created HTML element
 */
function createElement(tagName, attr, innerHTML) {
    if (!tagName) return null

    var result = document.createElement(tagName)
    for (var key in attr) {
        result.setAttribute(key, attr[key])
    }
    result.innerHTML = innerHTML || ''

    return result
}

/**
 * Inserts an element before another one in the DOM.
 * @param {Element} newNode element to be inserted
 * @param {Element} refNode reference element
 */
function insertBefore(newNode, refNode) {
    refNode.parentElement.insertBefore(newNode, refNode)
}
/**
 * Inserts an element after another one in the DOM.
 * @param {Element} newNode element to be inserted
 * @param {Element} refNode reference element
 */
function insertAfter(newNode, refNode) {
    refNode.parentElement.insertBefore(newNode, refNode.nextElementSibling)
}