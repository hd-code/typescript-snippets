"use strict";
/*! random v1.0.0 from hd-snippets-js | MIT | © Hannes Dröse https://github.com/hd-code/hd-snippets-js */var Random;Object.defineProperty(exports,"__esModule",{value:!0}),function(t){function e(){return getNext()/mod}t.setSeed=function(t){val=1<=t&&t<mod?Math.floor(t):mod-1},t.get=e,t.getInt=function(t){return Math.floor(e()*(Math.floor(Math.abs(t))+1))}}(Random=Random||{}),exports.default=Random;var mod=2147483647,mul=16807,defaultSeed=Math.floor(Math.random()*mod)+1,val=defaultSeed;function getNext(){return val=val*mul%mod}