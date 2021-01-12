/*! matrix v0.1.0 | MIT | © Hannes Dröse https://github.com/hd-code/js-snippets */

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
        for (let j = 0, je = matrix[i].length; j < je; j++) {
            result.push(matrix[i][j]);
        }
    }
    return result;
}

/** Transposes a matrix. So, the rows become the columns and vice versa. */
export function transpose(matrix: number[][]): number[][] {
    return !matrix?.[0] ? [] : matrix[0].map((_, i) => matrix.map(row => row[i]));
}

// -----------------------------------------------------------------------------

/** Adds two matrices element-wise. */
export function add(x: number[][], y: number[][]): number[][] {
    if (x.length !== y.length) {
        return [];
    }
    return x.map((_, i) => addVector(x[i], y[i]));
}

/** Subtract matrix y from matrix x element-wise. */
export function sub(x: number[][], y: number[][]): number[][] {
    if (x.length !== y.length) {
        return [];
    }
    return x.map((_, i) => subVector(x[i], y[i]));
}

/** Multiplies two matrices element-wise. For matrix-product see {@link dot} */
export function mul(x: number[][], y: number[][]): number[][] {
    if (x.length !== y.length) {
        return [];
    }
    return x.map((_, i) => mulVectors(x[i], y[i]));
}

/** Calculates the matrix-product of both matrices. */
export function dot(left: number[][], right: number[][]): number[][] {
    const transposed = transpose(right);
    return left.map(lRow => transposed.map(rRow => dotVector(lRow, rRow)));
}

// -----------------------------------------------------------------------------

/** Scales a matrix by multiplying each element with the scalar value. */
export function scale(scalar: number, matrix: number[][]): number[][] {
    const result = [];
    for (let i = 0, ie = matrix.length; i < ie; i++) {
        result.push(scaleVector(scalar, matrix[i]));
    }
    return result;
}

/** Multiplies a matrix with a vector (in that order). */
export function mulVector(matrix: number[][], vector: number[]): number[] {
    const result = [];
    for (let i = 0, ie = matrix.length; i < ie; i++) {
        const row = matrix[i];
        if (row.length !== vector.length) {
            return [];
        }
        result.push(dotVector(row, vector));
    }
    return result;
}

// -----------------------------------------------------------------------------

function addVector(x: number[], y: number[]): number[] {
    if (x.length !== y.length) {
        return [];
    }
    const result = [];
    for (let i = 0, ie = x.length; i < ie; i++) {
        result.push(x[i] + y[i]);
    }
    return result;
}

function subVector(x: number[], y: number[]): number[] {
    if (x.length !== y.length) {
        return [];
    }
    const result = [];
    for (let i = 0, ie = x.length; i < ie; i++) {
        result.push(x[i] - y[i]);
    }
    return result;
}

function mulVectors(x: number[], y: number[]): number[] {
    if (x.length !== y.length) {
        return [];
    }
    const result = [];
    for (let i = 0, ie = x.length; i < ie; i++) {
        result.push(x[i] * y[i]);
    }
    return result;
}

function dotVector(x: number[], y: number[]): number {
    if (x.length !== y.length || x.length === 0 || y.length === 0) {
        return NaN;
    }
    let result = 0;
    for (let i = 0, ie = x.length; i < ie; i++) {
        result += x[i] * y[i];
    }
    return result;
}

function scaleVector(scalar: number, vector: number[]): number[] {
    const result = [];
    for (let i = 0, ie = vector.length; i < ie; i++) {
        result.push(scalar * vector[i]);
    }
    return result;
}
