/*! math v1.0.0 from hd-snippets-js | MIT | © Hannes Dröse https://github.com/hd-code/hd-snippets-js */

/**
 * @file
 * This file contains some basic math operations that are missing from the
 * standard Math library.
 */

export function add(x: number, y: number): number {
    return x + y;
}

export function sub(x: number, y: number): number {
    return x - y;
}

export function mul(x: number, y: number): number {
    return x * y;
}

export function div(x: number, y: number): number {
    if (y === 0) return NaN;
    return x / y;
}

export function mod(x: number, y: number): number {
    if (y === 0) return NaN;
    return x % y;
}

export function sum(n: number[]): number {
    return n.reduce(add);
}

export function avg(n: number[]): number {
    return sum(n) / n.length;
}

export function median(_n: number[]): number {
    if (_n.length === 0) return 0;

    let n = [..._n];
    n.sort(sub);

    const half = Math.floor(_n.length / 2);

    if (n.length % 2) return n[half];

    return (n[half - 1] + n[half]) / 2.0;
}