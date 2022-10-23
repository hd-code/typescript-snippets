import { isInteger } from "../../snippets/typeguards";

// -----------------------------------------------------------------------------

export enum Error {
    absolute,
    meanAbsolute,
    squared,
    meanSquared,
}

export function isError(error: unknown): error is Error {
    return isInteger(error) && !!Error[error];
}

// -----------------------------------------------------------------------------

export function calc(
    actual: number[],
    expected: number[],
    error = Error.meanSquared
): number {
    switch (error) {
        case Error.absolute:
            return sum(actual, expected, absolute);
        case Error.meanAbsolute:
            return mean(actual, expected, absolute);
        case Error.squared:
            return sum(actual, expected, squared);
        case Error.meanSquared:
            return mean(actual, expected, squared);
    }
}

export function diff(
    actual: number[],
    expected: number[],
    error = Error.meanSquared
): number[] {
    switch (error) {
        case Error.absolute:
            return sumDeriv(actual, expected, absoluteDeriv);
        case Error.meanAbsolute:
            return meanDeriv(actual, expected, absoluteDeriv);
        case Error.squared:
            return sumDeriv(actual, expected, squaredDeriv);
        case Error.meanSquared:
            return meanDeriv(actual, expected, squaredDeriv);
    }
}

// -----------------------------------------------------------------------------

function sum(
    actual: number[],
    expected: number[],
    func: (actual: number, expected: number) => number
): number {
    let result = 0;
    for (let i = 0, ie = actual.length; i < ie; i++) {
        result += func(actual[i], expected[i]);
    }
    return result;
}

function sumDeriv(
    actual: number[],
    expected: number[],
    func: (actual: number, expected: number) => number
): number[] {
    const result: number[] = [];
    for (let i = 0, ie = actual.length; i < ie; i++) {
        result.push(func(actual[i], expected[i]));
    }
    return result;
}

function mean(
    actual: number[],
    expected: number[],
    func: (actual: number, expected: number) => number
): number {
    return sum(actual, expected, func) / actual.length;
}

function meanDeriv(
    actual: number[],
    expected: number[],
    func: (actual: number, expected: number) => number
): number[] {
    const len = actual.length;
    const result: number[] = [];
    for (let i = 0; i < len; i++) {
        result.push(func(actual[i], expected[i]) / len);
    }
    return result;
}

// -----------------------------------------------------------------------------

function absolute(actual: number, expected: number): number {
    return Math.abs(actual - expected);
}

function absoluteDeriv(actual: number, expected: number): number {
    return actual === expected ? 0 : actual > expected ? 1 : -1;
}

function squared(actual: number, expected: number): number {
    const diff = actual - expected;
    return diff * diff;
}

function squaredDeriv(actual: number, expected: number): number {
    return 2 * (actual - expected);
}
