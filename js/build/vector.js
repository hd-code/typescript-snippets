/*! vector v0.4.0 | MIT | https://github.com/hd-code/web-snippets */
function isVector(e){if(!(e instanceof Array))return!1;for(let t=0,n=e.length;t<n;t++)if("number"!=typeof e[t])return!1;return!0}function avg(t){return 0===t.length?0:sum(t)/t.length}function mag(t){return Math.sqrt(dot(t,t))}function median(t){switch(t.length){case 0:return 0;case 1:return t[0]}var n=t.length;return n%2==1?quickselect(t,n/2):(quickselect(t,n/2-1)+quickselect(t,n/2))/2}function quickselect(t,n){switch(t.length){case 0:return 0;case 1:return t[0]}n=Math.min(Math.max(0,Math.floor(n)),t.length-1);const e=t[Math.floor(Math.random()*t.length)];var{numOfLower:r,numOfPivs:u}=countValues(t,e);return n<r?quickselect(t.filter(t=>t<e),n):n<r+u?e:quickselect(t.filter(t=>t>e),n-r-u)}function sum(t){return t.reduce(plus,0)}function add(e,r){if(e.length!==r.length)return[];const u=[];for(let t=0,n=e.length;t<n;t++)u.push(e[t]+r[t]);return u}function sub(e,r){if(e.length!==r.length)return[];const u=[];for(let t=0,n=e.length;t<n;t++)u.push(e[t]-r[t]);return u}function mul(e,r){return e.length!==r.length?[]:e.map((t,n)=>e[n]*r[n])}function div(e,r){return e.length!==r.length?[]:e.map((t,n)=>e[n]/r[n])}function scale(n,t){return t.map(t=>n*t)}function dot(e,r){if(e.length!==r.length||0===e.length||0===r.length)return NaN;let u=0;for(let t=0,n=e.length;t<n;t++)u+=e[t]*r[t];return u}function mulMatrix(n,t){if(n.length!==t.length)return[];const e=transpose(t);return e.map(t=>dot(n,t))}function countValues(e,r){let u=0,l=0,c=0;for(let t=0,n=e.length;t<n;t++)e[t]<r?u++:e[t]===r?l++:c++;return{numOfLower:u,numOfPivs:l,numOfUpper:c}}function plus(t,n){return t+n}function transpose(e){var t;return null!=(t=null==(t=e[0])?void 0:t.map((t,n)=>e.map(t=>t[n])))?t:[]}export{isVector,avg,mag,median,quickselect,sum,add,sub,mul,div,scale,dot,mulMatrix};