import * as vector from "./vector";

// -----------------------------------------------------------------------------

export type Matrix = number[][];

/** TypeGuard for a matrix. */
export function isMatrix(matrix: unknown): matrix is Matrix {
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
        const row = matrix[i];
        if (!(row instanceof Array) || elementsPerRow !== row.length) {
            return false;
        }

        for (let j = 0, je = row.length; j < je; j++) {
            if (typeof row[j] !== "number") {
                return false;
            }
        }
    }

    return true;
}

// -----------------------------------------------------------------------------

/** Transforms a matrix to a vector by chaining all rows together in series. */
export function flatten(matrix: Matrix): vector.Vector {
    const result: vector.Vector = [];
    for (let i = 0, ie = matrix.length; i < ie; i++) {
        const row = matrix[i];
        for (let j = 0, je = row.length; j < je; j++) {
            result.push(row[j]);
        }
    }
    return result;
}

/** Transposes a matrix. So, the rows become the columns and vice versa. */
export function transpose(matrix: Matrix): Matrix {
    return matrix[0]?.map((_, i) => matrix.map((row) => row[i])) ?? [];
}

// -----------------------------------------------------------------------------

/** Adds two matrices element-wise. */
export function add(x: Matrix, y: Matrix): Matrix {
    return hasSameDimensions(x, y)
        ? x.map((_, i) => vector.add(x[i], y[i]))
        : [];
}

/** Subtract matrix y from matrix x element-wise. */
export function sub(x: Matrix, y: Matrix): Matrix {
    return hasSameDimensions(x, y)
        ? x.map((_, i) => vector.sub(x[i], y[i]))
        : [];
}

/** Multiplies two matrices element-wise. For matrix-product see {@link dot} */
export function mul(x: Matrix, y: Matrix): Matrix {
    return hasSameDimensions(x, y)
        ? x.map((_, i) => vector.mul(x[i], y[i]))
        : [];
}

/** Divides two matrices element-wise. */
export function div(x: Matrix, y: Matrix): Matrix {
    return hasSameDimensions(x, y)
        ? x.map((_, i) => vector.div(x[i], y[i]))
        : [];
}

// -----------------------------------------------------------------------------

/** Scales a matrix by multiplying each element with the scalar value. */
export function scale(scalar: number, matrix: Matrix): Matrix {
    return matrix.map((row) => vector.scale(scalar, row));
}

/** Multiplies a matrix with a vector (in that order). */
export function mulVector(matrix: Matrix, vec: vector.Vector): vector.Vector {
    const result: vector.Vector = [];
    for (let i = 0, ie = matrix.length; i < ie; i++) {
        const row = matrix[i];
        if (row.length !== vec.length) {
            return [];
        }
        result.push(vector.dot(row, vec));
    }
    return result;
}

/** Calculates the matrix-product of both matrices. */
export function dot(left: Matrix, right: Matrix): Matrix {
    const numOfRowsRight = right.length;
    for (let i = 0, ie = left.length; i < ie; i++) {
        const row = left[i];
        if (row.length != numOfRowsRight) {
            return [];
        }
    }

    const transposed = transpose(right);
    return left.map((lRow) => transposed.map((rRow) => vector.dot(lRow, rRow)));
}

// -----------------------------------------------------------------------------

function hasSameDimensions(x: Matrix, y: Matrix): boolean {
    if (x.length !== y.length) {
        return false;
    }
    for (let i = 0, ie = x.length; i < ie; i++) {
        if (x[i].length !== y[i].length) {
            return false;
        }
    }
    return true;
}
