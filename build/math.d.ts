/*! math v0.0.1 from hd-snippets-js | MIT | © Hannes Dröse https://github.com/hd-code/hd-snippets-js */
/**
 * @file
 * Contains some advanced math constructs and functions. Mainly vectors and 2d
 * matrices.
 */
export declare function isVector(vector: any): vector is number[];
export declare function addVector(vec1: number[], vec2: number[]): number[];
export declare function subVector(vec1: number[], vec2: number[]): number[];
export declare function mulVector(vec1: number[], vec2: number[]): number[];
export declare function scaleVector(scalar: number, vec: number[]): number[];
export declare function calcDotProduct(vec1: number[], vec2: number[]): number;
export declare function calcMagnitude(vector: number[]): number;
export declare function isMatrix(matrix: any): matrix is number[][];
export declare function addMatrix(mat1: number[][], mat2: number[][]): number[][];
export declare function subMatrix(mat1: number[][], mat2: number[][]): number[][];
export declare function mulMatrix(left: number[][], right: number[][]): number[][];
export declare function scaleMatrix(scalar: number, matrix: number[][]): number[][];
export declare function transposeMatrix(matrix: number[][]): number[][];
export declare function mulVectorMatrix(vector: number[], matrix: number[][]): number[];
export declare function mulMatrixVector(matrix: number[][], vector: number[]): number[];
