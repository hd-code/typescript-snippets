/*! vector v0.0.1 | MIT | © Hannes Dröse https://github.com/hd-code/js-snippets */
/** TypeGuard for a vector. */
export declare function isVector(vector: unknown): vector is number[];
/** Calculates the sum of all elements in a vector. */
export declare function sum(vector: number[]): number;
/** Calculates the average (mean) of all elements in a vector. */
export declare function avg(vector: number[]): number;
/** Calculates the median of all elements in a vector. */
export declare function median(_vector: number[]): number;
/** Calculates the magnitude of a vector. */
export declare function mag(vector: number[]): number;
/** Adds two vectors element-wise. */
export declare function add(x: number[], y: number[]): number[];
/** Subtract vector y from vector x element-wise. */
export declare function sub(x: number[], y: number[]): number[];
/** Multiplies two vectors element-wise. For dot-product see {@link dot} */
export declare function mul(x: number[], y: number[]): number[];
/** Calculates the dot product of two vectors. */
export declare function dot(x: number[], y: number[]): number;
/** Scales a vector by multiplying each element with the scalar value. */
export declare function scale(scalar: number, vector: number[]): number[];
/** Multiplies a vector with a matrix (in that order). */
export declare function mulMatrix(vector: number[], matrix: number[][]): number[];
