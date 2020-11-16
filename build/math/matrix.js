/*! matrix v0.0.1 | MIT | © Hannes Dröse https://github.com/hd-code/js-snippets */
export function isMatrix(t){var n;if(!(t instanceof Array))return!1;if(0===t.length)return!0;const e=null===(n=t[0])||void 0===n?void 0:n.length;if(void 0===e)return!1;for(let n=0,r=t.length;n<r;n++){const r=t[n];if(!(r instanceof Array)||e!==r.length)return!1;for(let t=0,n=r.length;t<n;t++){if("number"!=typeof r[t])return!1}}return!0};export function flatten(t){const n=[];for(let e=0,r=t.length;e<r;e++)for(let r=0,l=t[e].length;r<l;r++)n.push(t[e][r]);return n};export function transpose(t){const n=[];for(let e=0,r=t[0].length;e<r;e++){n.push([]);for(let r=0,l=t.length;r<l;r++){if(void 0===t[r][e])return[];n[e].push(t[r][e])}}return n};export function add(t,n){if(t.length!==n.length)return[];const e=[];for(let r=0,l=t.length;r<l;r++){if(t[r].length!==n[r].length)return[];e.push([]);for(let l=0,o=t[r].length;l<o;l++)e[r].push(t[r][l]+n[r][l])}return e};export function sub(t,n){if(t.length!==n.length)return[];const e=[];for(let r=0,l=t.length;r<l;r++){if(t[r].length!==n[r].length)return[];e.push([]);for(let l=0,o=t[r].length;l<o;l++)e[r].push(t[r][l]-n[r][l])}return e};export function mul(t,n){if(t.length!==n.length)return[];const e=[];for(let r=0,l=t.length;r<l;r++){if(t[r].length!==n[r].length)return[];e.push([]);for(let l=0,o=t[r].length;l<o;l++)e[r].push(t[r][l]*n[r][l])}return e};export function dot(t,n){const e=[];for(let r=0,l=t.length;r<l;r++){e.push([]);for(let l=0,o=n[0].length;l<o;l++){e[r].push(0);for(let o=0,u=t[r].length;o<u;o++){if(void 0===n[o][l])return[];e[r][l]+=t[r][o]*n[o][l]}}}return e};export function scale(t,n){const e=[];for(let r=0,l=n.length;r<l;r++){e.push([]);for(let l=0,o=n[r].length;l<o;l++)e[r].push(t*n[r][l])}return e};export function mulVector(t,n){const e=[];for(let r=0,l=t.length;r<l;r++){const l=t[r];if(l.length!==n.length)return[];e.push(0);for(let t=0,o=l.length;t<o;t++)e[r]+=l[t]*n[t]}return e};