/*! matrix v0.4.0 | MIT | https://github.com/hd-code/web-snippets */
export declare type Matrix = number[][];
/** TypeGuard for a matrix. */
export declare function isMatrix(matrix: unknown): matrix is Matrix;
/** Transforms a matrix to a vector by chaining all rows together in series. */
export declare function flatten(matrix: Matrix): Vector;
/** Transposes a matrix. So, the rows become the columns and vice versa. */
export declare function transpose(matrix: Matrix): Matrix;
/** Adds two matrices element-wise. */
export declare function add(x: Matrix, y: Matrix): Matrix;
/** Subtract matrix y from matrix x element-wise. */
export declare function sub(x: Matrix, y: Matrix): Matrix;
/** Multiplies two matrices element-wise. For matrix-product see {@link dot} */
export declare function mul(x: Matrix, y: Matrix): Matrix;
/** Divides two matrices element-wise. */
export declare function div(x: Matrix, y: Matrix): Matrix;
/** Scales a matrix by multiplying each element with the scalar value. */
export declare function scale(scalar: number, matrix: Matrix): Matrix;
/** Multiplies a matrix with a vector (in that order). */
export declare function mulVector(matrix: Matrix, vec: Vector): Vector;
/** Calculates the matrix-product of both matrices. */
export declare function dot(left: Matrix, right: Matrix): Matrix;
declare type Vector = number[];
export {};
