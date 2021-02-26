/*! matrix v0.1.1 | MIT | © Hannes Dröse https://github.com/hd-code/web-snippets */

import * as Vector from './vector';

// -----------------------------------------------------------------------------

/** TypeGuard for a matrix. */
export function isMatrix(matrix: unknown): matrix is number[][] {
    if (!(matrix instanceof Array)) {
        return false;
    }

    if (matrix.length === 0) {
        return true;
    }

    const elementsPerRow = (matrix[0] as number[] | undefined)?.length;
    if (elementsPerRow === undefined) {
        return false;
    }

    for (let i = 0, ie = matrix.length; i < ie; i++) {
        const row = matrix[i] as number[] | unknown;
        if (!(row instanceof Array) || elementsPerRow !== row.length) {
            return false;
        }

        for (let j = 0, je = row.length; j < je; j++) {
            const element = row[j] as number | unknown;
            if (typeof element !== 'number') {
                return false;
            }
        }
    }

    return true;
}

// -----------------------------------------------------------------------------

// TODO:
// export function det(matrix: number[][]): number {
//     return 0;
// }

/** Transforms a matrix to a vector by chaining all rows together in series. */
export function flatten(matrix: number[][]): number[] {
    const result = [];
    for (let i = 0, ie = matrix.length; i < ie; i++) {
        const row = matrix[i] ?? [];
        for (let j = 0, je = row.length; j < je; j++) {
            result.push(row[j] as number);
        }
    }
    return result;
}

/** Transposes a matrix. So, the rows become the columns and vice versa. */
export function transpose(matrix: number[][]): number[][] {
    return matrix[0]?.map((_, i) => matrix.map(row => row[i] as number)) ?? [];
}

// -----------------------------------------------------------------------------

/** Adds two matrices element-wise. */
export function add(x: number[][], y: number[][]): number[][] {
    if (x.length !== y.length) {
        return [];
    }
    return x.map((_, i) => Vector.add(x[i] as number[], y[i] as number[]));
}

/** Subtract matrix y from matrix x element-wise. */
export function sub(x: number[][], y: number[][]): number[][] {
    if (x.length !== y.length) {
        return [];
    }
    return x.map((_, i) => Vector.sub(x[i] as number[], y[i] as number[]));
}

/** Multiplies two matrices element-wise. For matrix-product see {@link dot} */
export function mul(x: number[][], y: number[][]): number[][] {
    if (x.length !== y.length) {
        return [];
    }
    return x.map((_, i) => Vector.mul(x[i] as number[], y[i] as number[]));
}

/** Calculates the matrix-product of both matrices. */
export function dot(left: number[][], right: number[][]): number[][] {
    const transposed = transpose(right);
    return left.map(lRow => transposed.map(rRow => Vector.dot(lRow, rRow)));
}

// -----------------------------------------------------------------------------

/** Scales a matrix by multiplying each element with the scalar value. */
export function scale(scalar: number, matrix: number[][]): number[][] {
    return matrix.map(row => Vector.scale(scalar, row));
}

/** Multiplies a matrix with a vector (in that order). */
export function mulVector(matrix: number[][], vector: number[]): number[] {
    const result = [];
    for (let i = 0, ie = matrix.length; i < ie; i++) {
        const row = matrix[i] as number[];
        if (row.length !== vector.length) {
            return [];
        }
        result.push(Vector.dot(row, vector));
    }
    return result;
}
