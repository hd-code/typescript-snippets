import { median as orig, avg as alt } from './ts/vector';

const iterations = 99;
const numOfValues = 99999;
const values = [...Array(iterations)].map(() => [generateVector(numOfValues)]);

function generateVector(numOfValues: number): number[] {
    return [...Array(numOfValues)].map(() => Math.random());
}

// @ts-ignore
function test(fn, args) {
    const begin = Date.now();
    for (let i = 0, ie = args.length; i < ie; i++) {
        fn(...args[i]);
    }
    return Date.now() - begin;
}

const res1 = test(orig, values);
const res2 = test(alt, values);

console.log(res1, res2);