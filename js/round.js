/*! round 0.0.2 | MIT | https://github.com/hd-code/web-snippets */
export default function round(r,n=0){if(r instanceof Array)return r.map(r=>round(r,n));var t=Math.pow(10,n);return Math.round(r*t)/t}