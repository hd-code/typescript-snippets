// ------------------------------ Vector Calculus ------------------------------

export function isVector(vector: any): vector is number[] {
    return Array.isArray(vector)
        && vector.every(num => typeof num === 'number');
}

export function addVector(vec1: number[], vec2: number[]) {
    return vec1.map((_, i) => vec1[i] + vec2[i]);
}

export function subVector(vec1: number[], vec2: number[]) {
    return vec1.map((_, i) => vec1[i] - vec2[i]);
}

export function mulVector(vec1: number[], vec2: number[]) {
    return vec1.map((_, i) => vec1[i] * vec2[i]);
}

export function scaleVector(scalar: number, vec: number[]) {
    return vec.map(num => scalar * num);
}

export function calcDotProduct(vec1: number[], vec2: number[]) {
    return vec1.reduce((result, _, i) => result + vec1[i] * vec2[i], 0);
}

export function getVectorMagnitude(vector: number[]) {
    return Math.sqrt(calcDotProduct(vector, vector));
}

// ------------------------------ Matrix Calculus ------------------------------

export function isMatrix(matrix: any): matrix is number[][] {
    return Array.isArray(matrix)
        && matrix.every(vec => isVector(vec))
        && matrix.every(vec => matrix[0].length === vec.length);
}

export function addMatrix(mat1: number[][], mat2: number[][]) {
    return mat1.map((_, i) => addVector(mat1[i], mat2[i]));
}

export function subMatrix(mat1: number[][], mat2: number[][]) {
    return mat1.map((_, i) => subVector(mat1[i], mat2[i]));
}

export function mulMatrix(left: number[][], right: number[][]) {
    return left.map(row => mulVectorMatrix(row, right));
}

export function scaleMatrix(scalar: number, matrix: number[][]) {
    return matrix.map(row => scaleVector(scalar, row));
}

export function transposeMatrix(matrix: number[][]) {
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
}

// --------------------------- Vector-Matrix Calculus --------------------------

export function mulVectorMatrix(vector: number[], matrix: number[][]) {
    return transposeMatrix(matrix).map(row => calcDotProduct(row, vector));
}