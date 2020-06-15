/*! math v2.0.0 from hd-snippets-js | MIT | © Hannes Dröse https://github.com/hd-code/hd-snippets-js */
/**
 * This file contains some basic math operations that are missing from the
 * standard Math library. It also offers vector and matrix calculus.
 * @package
 */
/** Adds two numbers together. */
export declare function add(x: number, y: number): number;
/** Subtracts y from x. */
export declare function sub(x: number, y: number): number;
/** Multiplies x and y. */
export declare function mul(x: number, y: number): number;
/** Divides x by y. */
export declare function div(x: number, y: number): number;
/** Returns the the remainder from x divided by y. */
export declare function mod(x: number, y: number): number;
/** Rounds a number to the desired precision. The precisions specifies how many
 * digits after the decimal point should remain. A negative precision will round
 * before the decimal point. */
export declare function round(num: number, precision?: number): number;
export declare namespace Vector {
    /** TypeGuard for a vector. */
    function isVector(vector: any): vector is number[];
    /** Calculates the sum of all elements of a vector. */
    function sum(vector: number[]): number;
    /** Calculates the average (mean) of all elements of a vector. */
    function avg(vector: number[]): number;
    /** Calculates the media of all elements of a vector. */
    function median(_vector: number[]): number;
    /** Calculates the magnitude of a vector. */
    function mag(vector: number[]): number;
    /** Adds two vectors element-wise. */
    function add(x: number[], y: number[]): number[];
    /** Subtract vector y from vector x element-wise. */
    function sub(x: number[], y: number[]): number[];
    /** Multiplies two vectors element-wise. For dot-product see {@link dot} */
    function mul(x: number[], y: number[]): number[];
    /** Calculates the dot product of two vectors. */
    function dot(x: number[], y: number[]): number;
    /** Scales a vector by multiplying each element with the scalar value. */
    function scale(scalar: number, vector: number[]): number[];
    /** Multiplies a vector with a matrix (in that order). */
    function mulMatrix(vector: number[], matrix: number[][]): number[];
    /** Rounds a vector to the desired precision. The precisions specifies how
     * many digits after the decimal point should remain. A negative precision
     * will round before the decimal point. */
    function round(vector: number[], precision: number): number[];
}
export declare namespace Matrix {
    /** TypeGuard for a matrix. */
    function isMatrix(matrix: any): matrix is number[][];
    /** Transposes a matrix. */
    function transpose(matrix: number[][]): number[][];
    /** Adds two matrices element-wise. */
    function add(x: number[][], y: number[][]): number[][];
    /** Subtract matrix y from matrix x element-wise. */
    function sub(x: number[][], y: number[][]): number[][];
    /** Multiplies two matrices element-wise. */
    function mul(x: number[][], y: number[][]): number[][];
    /** Scales a matrix by multiplying each element with the scalar value. */
    function scale(scalar: number, matrix: number[][]): number[][];
    /** Multiplies a matrix with a vector (in that order). */
    function mulVector(matrix: number[][], vector: number[]): number[];
    /** Rounds a number to the desired precision. The precisions specifies how
     * many digits after the decimal point should remain. A negative precision
     * will round before the decimal point. */
    function round(matrix: number[][], precision: number): number[][];
}
/** Transforms a decimal number into a binary number. The returned binary number
 * is a string. Optionally, the number of digits the result should have can be
 * specified. */
export declare function dec2bin(n: number, digits?: number): string;
/** Transforms a decimal number into a binary number. The returned binary number
 * is an array of numbers. Optionally, the number of digits the result should
 * have can be specified. */
export declare function dec2binArray(n: number, digits?: number): number[];
