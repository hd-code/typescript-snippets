"use strict";
/*! type-guards v0.0.1 | MIT | © Hannes Dröse https://github.com/hd-code/js-snippets */function isUndefined(r){return void 0===r}function isNull(r){return null===r}function isBool(r){return"boolean"==typeof r}function isInteger(r){return"number"==typeof r&&Math.floor(r)===r}function isNumber(r){return"number"==typeof r}function isString(r){return"string"==typeof r}function isArray(r,e){if(!Array.isArray(r))return!1;if(!e)return!0;for(let t=0,i=r.length;t<i;t++)if(!e(r[t]))return!1;return!0}function isObject(r){return"object"==typeof r&&null!==r&&!Array.isArray(r)}function hasKey(r,e,t){var i;return!!(null===(i=r)||void 0===i?void 0:i[e])&&(!t||t(r[e]))}Object.defineProperty(exports,"__esModule",{value:!0}),exports.hasKey=exports.isObject=exports.isArray=exports.isString=exports.isNumber=exports.isInteger=exports.isBool=exports.isNull=exports.isUndefined=void 0,exports.isUndefined=isUndefined,exports.isNull=isNull,exports.isBool=isBool,exports.isInteger=isInteger,exports.isNumber=isNumber,exports.isString=isString,exports.isArray=isArray,exports.isObject=isObject,exports.hasKey=hasKey;