/*! matrix v0.1.0 | MIT | © Hannes Dröse https://github.com/hd-code/js-snippets */
/** TypeGuard for a matrix. */
export declare function isMatrix(matrix: unknown): matrix is number[][];
/** Transforms a matrix to a vector by chaining all rows together in series. */
export declare function flatten(matrix: number[][]): number[];
/** Transposes a matrix. So, the rows become the columns and vice versa. */
export declare function transpose(matrix: number[][]): number[][];
/** Adds two matrices element-wise. */
export declare function add(x: number[][], y: number[][]): number[][];
/** Subtract matrix y from matrix x element-wise. */
export declare function sub(x: number[][], y: number[][]): number[][];
/** Multiplies two matrices element-wise. For matrix-product see {@link dot} */
export declare function mul(x: number[][], y: number[][]): number[][];
/** Calculates the matrix-product of both matrices. */
export declare function dot(left: number[][], right: number[][]): number[][];
/** Scales a matrix by multiplying each element with the scalar value. */
export declare function scale(scalar: number, matrix: number[][]): number[][];
/** Multiplies a matrix with a vector (in that order). */
export declare function mulVector(matrix: number[][], vector: number[]): number[];
