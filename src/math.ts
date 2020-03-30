/*! math v0.0.1 from hd-snippets-js | MIT | © Hannes Dröse https://github.com/hd-code/hd-snippets-js */

/**
 * @file
 * Contains some advanced math constructs and functions. Mainly vectors and 2d
 * matrices.
 */

// -----------------------------------------------------------------------------
// Vector Calculus
// -----------------------------------------------------------------------------

export function isVector(vector: any): vector is number[] {
    return Array.isArray(vector)
        && vector.every(num => typeof num === 'number');
}

export function addVector(vec1: number[], vec2: number[]): number[] {
    return vec1.map((_, i) => vec1[i] + vec2[i]);
}

export function subVector(vec1: number[], vec2: number[]): number[] {
    return vec1.map((_, i) => vec1[i] - vec2[i]);
}

export function mulVector(vec1: number[], vec2: number[]): number[] {
    return vec1.map((_, i) => vec1[i] * vec2[i]);
}

export function scaleVector(scalar: number, vec: number[]): number[] {
    return vec.map(num => scalar * num);
}

export function calcDotProduct(vec1: number[], vec2: number[]): number {
    return vec1.reduce((result, _, i) => result + vec1[i] * vec2[i], 0);
}

export function calcMagnitude(vector: number[]): number {
    return Math.sqrt(calcDotProduct(vector, vector));
}

// -----------------------------------------------------------------------------
// Matrix Calculus
// -----------------------------------------------------------------------------

export function isMatrix(matrix: any): matrix is number[][] {
    return Array.isArray(matrix)
        && matrix.every(vec => isVector(vec))
        && matrix.every(vec => matrix[0].length === vec.length);
}

export function addMatrix(mat1: number[][], mat2: number[][]): number[][] {
    return mat1.map((_, i) => addVector(mat1[i], mat2[i]));
}

export function subMatrix(mat1: number[][], mat2: number[][]): number[][] {
    return mat1.map((_, i) => subVector(mat1[i], mat2[i]));
}

export function mulMatrix(left: number[][], right: number[][]): number[][] {
    return left.map(row => mulVectorMatrix(row, right));
}

export function scaleMatrix(scalar: number, matrix: number[][]): number[][] {
    return matrix.map(row => scaleVector(scalar, row));
}

export function transposeMatrix(matrix: number[][]): number[][] {
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
}

// -----------------------------------------------------------------------------
// Vector-Matrix Calculus
// -----------------------------------------------------------------------------

export function mulVectorMatrix(vector: number[], matrix: number[][]): number[] {
    return transposeMatrix(matrix).map(row => calcDotProduct(row, vector));
}

export function mulMatrixVector(matrix: number[][], vector: number[]): number[] {
    return matrix.map(row => calcDotProduct(row, vector));
}