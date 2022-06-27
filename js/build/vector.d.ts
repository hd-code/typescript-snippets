/*! vector v0.4.0 | MIT | https://github.com/hd-code/web-snippets */
export declare type Vector = number[];
/** TypeGuard for a vector. */
export declare function isVector(vector: unknown): vector is Vector;
/** Calculates the average (mean) of all elements in a vector. */
export declare function avg(vector: Vector): number;
/** Calculates the magnitude of a vector. */
export declare function mag(vector: Vector): number;
/** Calculates the median of all elements in a vector. */
export declare function median(vector: Vector): number;
/** Returns the value at the given index, if the vector was sorted. */
export declare function quickselect(vector: Vector, _index: number): number;
/** Calculates the sum of all elements in a vector. */
export declare function sum(vector: Vector): number;
/** Adds two vectors element-wise. */
export declare function add(x: Vector, y: Vector): Vector;
/** Subtract vector y from vector x element-wise. */
export declare function sub(x: Vector, y: Vector): Vector;
/** Multiplies two vectors element-wise. For dot-product see {@link dot} */
export declare function mul(x: Vector, y: Vector): Vector;
/** Divide two vectors element-wise. */
export declare function div(x: Vector, y: Vector): Vector;
/** Scales a vector by multiplying each element with the scalar value. */
export declare function scale(scalar: number, vector: Vector): Vector;
/** Calculates the dot product of two vectors. */
export declare function dot(x: Vector, y: Vector): number;
/** Multiplies a vector with a matrix (in that order). */
export declare function mulMatrix(vector: Vector, matrix: Matrix): Vector;
declare type Matrix = number[][];
export {};
