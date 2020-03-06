export function isMatrix(matrix: any): matrix is number[][] {
    return Array.isArray(matrix)
        && matrix.every(vec => Array.isArray(vec)
            && vec.every(num => typeof num === 'number'))
        && matrix.every(vec => matrix[0].length === vec.length);
}

export function add(mat1: number[][], mat2: number[][]) {
    return mat1.map((row, i) => row.map((_, j) => mat1[i][j] + mat2[i][j]));
}

export function sub(mat1: number[][], mat2: number[][]) {
    return mat1.map((row, i) => row.map((_, j) => mat1[i][j] - mat2[i][j]));
}

export function mul(left: number[][], right: number[][]) {
    return left.map((_, i) => right[0].map((_, j) =>
        right.reduce((result, _, k) => result + left[i][k] * right[k][j], 0))
    );
}

export function mulVector(vector: number[], matrix: number[][]) {
    return matrix[0].map((_, j) => vector.reduce(
        (result, _, i) => result + vector[i] * matrix[i][j]
    , 0));
}

export function scale(scalar: number, matrix: number[][]) {
    return matrix.map((row, i) => row.map((_, j) => scalar * matrix[i][j]));
}

export function transpose(matrix: number[][]) {
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
}