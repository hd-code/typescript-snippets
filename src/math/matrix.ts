/*! matrix v0.0.1 | MIT | © Hannes Dröse https://github.com/hd-code/js-snippets */

// -----------------------------------------------------------------------------

/** TypeGuard for a matrix. */
export function isMatrix(matrix: unknown): matrix is number[][] {
    if (!(matrix instanceof Array)) {
        return false;
    }

    if (matrix.length === 0) {
        return true;
    }

    const elementsPerRow: number|undefined = matrix[0]?.length;
    if (elementsPerRow === undefined) {
        return false;
    }

    for (let i = 0, ie = matrix.length; i < ie; i++) {
        const row = matrix[i];
        if (!(row instanceof Array) || elementsPerRow !== row.length) {
            return false;
        }

        for (let j = 0, je = row.length; j < je; j++) {
            const element = row[j];
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
    const result: number[][] = [];
    for (let j = 0, je = matrix[0].length; j < je; j++) {
        result.push([]);
        for (let i = 0, ie = matrix.length; i < ie; i++) {
            if (matrix[i][j] === undefined) {
                return [];
            }
            result[j].push(matrix[i][j]);
        }
    }
    return result;
}

// -----------------------------------------------------------------------------

/** Adds two matrices element-wise. */
export function add(x: number[][], y: number[][]): number[][] {
    if (x.length !== y.length) {
        return [];
    }
    const result: number[][] = [];
    for (let i = 0, ie = x.length; i < ie; i++) {
        if (x[i].length !== y[i].length) {
            return [];
        }
        result.push([]);
        for (let j = 0, je = x[i].length; j < je; j++) {
            result[i].push(x[i][j] + y[i][j]);
        }
    }
    return result;
}

/** Subtract matrix y from matrix x element-wise. */
export function sub(x: number[][], y: number[][]): number[][] {
    if (x.length !== y.length) {
        return [];
    }
    const result: number[][] = [];
    for (let i = 0, ie = x.length; i < ie; i++) {
        if (x[i].length !== y[i].length) {
            return [];
        }
        result.push([]);
        for (let j = 0, je = x[i].length; j < je; j++) {
            result[i].push(x[i][j] - y[i][j]);
        }
    }
    return result;
}

/** Multiplies two matrices element-wise. For matrix-product see {@link dot} */
export function mul(x: number[][], y: number[][]): number[][] {
    if (x.length !== y.length) {
        return [];
    }
    const result: number[][] = [];
    for (let i = 0, ie = x.length; i < ie; i++) {
        if (x[i].length !== y[i].length) {
            return [];
        }
        result.push([]);
        for (let j = 0, je = x[i].length; j < je; j++) {
            result[i].push(x[i][j] * y[i][j]);
        }
    }
    return result;
}

/** Calculates the matrix-product of both matrices. */
export function dot(left: number[][], right: number[][]): number[][] {
    const result: number[][] = [];
    for (let i = 0, ie = left.length; i < ie; i++) {
        result.push([]);
        for (let j = 0, je = right[0].length; j < je; j++) {
            result[i].push(0);
            for (let k = 0, ke = left[i].length; k < ke; k++) {
                if (right[k][j] === undefined) {
                    return [];
                }
                result[i][j] += left[i][k] * right[k][j];
            }
        }
    }
    return result;
}

// -----------------------------------------------------------------------------

/** Scales a matrix by multiplying each element with the scalar value. */
export function scale(scalar: number, matrix: number[][]): number[][] {
    const result: number[][] = [];
    for (let i = 0, ie = matrix.length; i < ie; i++) {
        result.push([]);
        for (let j = 0, je = matrix[i].length; j < je; j++) {
            result[i].push(scalar * matrix[i][j]);
        }
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
        result.push(0);
        for (let j = 0, je = row.length; j < je; j++) {
            result[i] += row[j] * vector[j];
        }
    }
    return result;
}