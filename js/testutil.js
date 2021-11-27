/*! testutil v0.0.4 | MIT | https://github.com/hd-code/web-snippets */
import*as assert from"assert";function testFunc(r,t){const o=t instanceof Array?toCaseMap(t):t;describe(r.name,()=>{for(const t in o){const e=o[t][0],n=o[t][1];it(t,()=>{var t=r(...e);"object"==typeof t?assert.deepStrictEqual(t,n):assert.strictEqual(t,n)})}})}function testFuncClose(o,t,s){const e=t instanceof Array?toCaseMap(t):t;describe(o.name,()=>{for(const t in e){const n=e[t][0],r=e[t][1];it(t,()=>{var t,e=o(...n);typeof e!=typeof r&&(t=new assert.AssertionError({actual:e,expected:r,message:"Returned value does not match expected structure"}),assert.fail(t)),"number"==typeof r?assert.ok(isClose(e,r,s)):(t=flatten(e),e=flatten(r),t.length!==e.length&&assert.fail("Returned value does not match expected structure"),assert.ok(isCloseArray(t,e,s)))})}})}function toCaseMap(t){const n={};return t.forEach(t=>{var e=getName(t);n[e]=t}),n}function getName(t){return`(${toString(t[0]).slice(1,-1)}) => `+toString(t[1])}function toString(t,e=38,n=5){if(t instanceof Array){const r=Math.max(n,Math.floor(e/t.length));return`[${clipString(t.map(t=>toString(t,r)).join(","),e-2)}]`}if("object"!=typeof t)return clipString(""+t,e);{const o=extractEntries(t),s=Math.max(n,Math.floor(e/o.length/2));return`{${clipString(o.map(t=>toString(t[0],s)+":"+toString(t[1],s)).join(","),e-2)}}`}}function clipString(t,e){return t.length<=e?t:t.slice(0,e-1)+"…"}function extractEntries(t){const e=[];for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.push([n,t[n]]);return e}function flatten(n){const r=[];for(let t=0,e=n.length;t<e;t++){var o,s=n[t];s instanceof Array?(o=flatten(s),r.push(...o)):r.push(s)}return r}function isClose(t,e,n){return Math.abs(t-e)<n}function isCloseArray(n,r,o){for(let t=0,e=n.length;t<e;t++)if(!isClose(n[t],r[t],o))return!1;return!0}export{testFunc,testFuncClose};