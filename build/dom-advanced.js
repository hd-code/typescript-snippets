/*! hd-snippets-js v0.1.0 | MIT | Hannes Dröse git+https://github.com/hd-code/hd-snippets-js.git */
/*

In this file you find extensions to the NodeList and Element prototypes.
They add typical JQuery-like methods and functionality directly to the Elements and NodeLists.

In combination with the $(css) function in 'dom.js' you get a very lightweight pseudo-JQuery implementation.
E.g.:
    $('button').on('click', function(event) { event.preventDefault() })
    $('#user-info').hide()

It's written unobtrusively. If there is already an implementation e.g. for NodeList.prototype.forEach, than this file will not overwrite the existing implementation.

*/

/* --------------------------- forEach,map,reduce --------------------------- */

/** Array.prototyp.forEach function for NodeList */
NodeList.prototype.forEach = NodeList.prototype.forEach || Array.prototype.forEach

/** Array.prototyp.map function for NodeList */
NodeList.prototype.map = NodeList.prototype.map || Array.prototype.map

/** Array.prototyp.reduce function for NodeList */
NodeList.prototype.reduce = NodeList.prototype.reduce || Array.prototype.reduce

/* ------------------------------- on,off,one ------------------------------- */

/** Shorthand for addEventListener() */
Element.prototype.on = Element.prototype.on || Element.prototype.addEventListener
/** Shorthand for addEventListener() */
NodeList.prototype.on = NodeList.prototype.on || function(...params) {
    this.forEach(e => e.on(...params))
}

/** Shorthand for removeEventListener() */
Element.prototype.off = Element.prototype.off || Element.prototype.removeEventListener
/** Shorthand for removeEventListener() */
NodeList.prototype.off = NodeList.prototype.off || function(...params) {
    this.forEach(e => e.off(...params))
}

/** Adds EventListener to an element which gets removed after the event fired once */
Element.prototype.one = Element.prototype.one || function(...params) {
    var self = this
    var rest = [...params]; rest.shift(); rest.shift()

    function callback(...e) {
        self.off(params[0], callback)
        params[1](...e)
    }
    self.on(params[0], callback, ...rest)
}
/** Adds EventListener to all elements which gets removed after the event fired once */
NodeList.prototype.one = NodeList.prototype.one || function(...params) {
    this.forEach(e => e.one(...params))
}

/* ---------------------------- hide,show,toggle ---------------------------- */

/** Hides an element */
Element.prototype.hide = Element.prototype.hide || function() {
    this.style.display = 'none'
}
/** Hides all elements */
NodeList.prototype.hide = NodeList.prototype.hide || function() {
    this.forEach(e => e.hide())
}

/** Makes an element reappear. Note: has to be hidden first! */
Element.prototype.show = Element.prototype.show || function() {
    this.style.display = ''
}
/** Makes all elements reappear. Note: have to be hidden first! */
NodeList.prototype.show = NodeList.prototype.show || function() {
    this.forEach(e => e.show())
}

/** Hide a visible element and vice-versa */
Element.prototype.toggle = Element.prototype.toggle || function() {
    this.style.display = this.style.display ? '' : 'none'
}
/** Hide all visible elements and vice-versa */
NodeList.prototype.toggle = NodeList.prototype.toggle || function() {
    this.forEach(e => e.toggle())
}

/* -------------------- addClass,removeClass,toggleClass -------------------- */

/** Add a class to an element */
Element.prototype.addClass = Element.prototype.addClass || function(className) {
    this.classList.add(className)
}
/** Add a class to all elements */
NodeList.prototype.addClass = NodeList.prototype.addClass || function(className) {
    this.forEach(e => e.addClass(className))
}

/** Remove a class from an element */
Element.prototype.removeClass = Element.prototype.removeClass || function(className) {
    this.classList.remove(className)
}
/** Remove a class from all elements */
NodeList.prototype.removeClass = NodeList.prototype.removeClass || function(className) {
    this.forEach(e => e.removeClass(className))
}

/** Add a class to an element, if it doesn't have it and vice-versa */
Element.prototype.toggleClass = Element.prototype.toggleClass || function(className) {
    this.classList.toggle(className)
}
/** Add a class to all elements, if they don't have it and vice-versa */
NodeList.prototype.toggleClass = NodeList.prototype.toggleClass || function(className) {
    this.forEach(e => e.toggleClass(className))
}