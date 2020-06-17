/*! math v2.0.0 from hd-snippets-js | MIT | © Hannes Dröse https://github.com/hd-code/hd-snippets-js */

/**
 * @file
 * This file contains some basic math operations that are missing from the
 * standard Math library. It also offers vector and matrix calculus.
 */

/** Adds two numbers together. */
export function add(x: number, y: number): number {
    return x + y;
}

/** Subtracts y from x. */
export function sub(x: number, y: number): number {
    return x - y;
}

/** Multiplies x and y. */
export function mul(x: number, y: number): number {
    return x * y;
}

/** Divides x by y. */
export function div(x: number, y: number): number {
    if (y === 0) return NaN;
    return x / y;
}

/** Returns the the remainder from x divided by y. */
export function mod(x: number, y: number): number {
    if (y === 0) return NaN;
    return x % y;
}

/** Rounds a number to the desired precision. The precisions specifies how many
 * digits after the decimal point should remain. A negative precision will round
 * before the decimal point. */
export function round(num: number, precision = 0): number {
    const factor = 10 ** precision;
    return Math.round(num * factor) / factor;
}

/** Vectors are one-dimensional arrays of numbers. */
export namespace Vector {
    /** TypeGuard for a vector. */
    export function isVector(vector: any): vector is number[] {
        return Array.isArray(vector) && vector.every(x => typeof x === 'number');
    }

    /** Calculates the sum of all elements of a vector. */
    export function sum(vector: number[]): number {
        return vector.reduce(noNameSpace.add);
    }
    
    /** Calculates the average (mean) of all elements of a vector. */
    export function avg(vector: number[]): number {
        return sum(vector) / vector.length;
    }
    
    /** Calculates the media of all elements of a vector. */
    export function median(_vector: number[]): number {
        if (_vector.length === 0) return 0;
    
        let vector = [..._vector];
        vector.sort(noNameSpace.sub);
    
        const half = Math.floor(vector.length / 2);
        return vector.length % 2 ? vector[half] : (vector[half - 1] + vector[half]) / 2.0;
    }

    /** Calculates the magnitude of a vector. */
    export function mag(vector: number[]): number {
        return Math.sqrt(dot(vector, vector));
    }

    /** Adds two vectors element-wise. */
    export function add(x: number[], y: number[]): number[] {
        return x.map((_,i) => x[i] + y[i]);
    }

    /** Subtract vector y from vector x element-wise. */
    export function sub(x: number[], y: number[]): number[] {
        return x.map((_,i) => x[i] - y[i]);
    }

    /** Multiplies two vectors element-wise. For dot-product see {@link dot} */
    export function mul(x: number[], y: number[]): number[] {
        return x.map((_,i) => x[i] * y[i]);
    }

    /** Calculates the dot product of two vectors. */
    export function dot(x: number[], y: number[]): number {
        return x.reduce((sum,_,i) => sum + x[i] * y[i], 0);
    }

    /** Scales a vector by multiplying each element with the scalar value. */
    export function scale(scalar: number, vector: number[]): number[] {
        return vector.map(x => x * scalar);
    }

    /** Multiplies a vector with a matrix (in that order). */
    export function mulMatrix(vector: number[], matrix: number[][]): number[] {
        const tMatrix = Matrix.transpose(matrix);
        return Matrix.mulVector(tMatrix, vector);
    }

    /** Rounds a vector to the desired precision. The precisions specifies how
     * many digits after the decimal point should remain. A negative precision
     * will round before the decimal point. */
    export function round(vector: number[], precision = 0): number[] {
        return vector.map(x => noNameSpace.round(x, precision));
    }
}

/** Matrices are two-dimensional arrays of numbers. All rows have the same
 * number of columns. */
export namespace Matrix {
    /** TypeGuard for a matrix. */
    export function isMatrix(matrix: any): matrix is number[][] {
        const len = matrix && matrix[0]?.length;
        return Array.isArray(matrix) && matrix.every(row => Vector.isVector(row))
            && matrix.every(row => row.length === len);
    }

    /** Transposes a matrix. So, the rows become the columns and vice versa. */
    export function transpose(matrix: number[][]): number[][] {
        return matrix[0].map((_, i) => matrix.map(row => row[i]));
    }

    /** Adds two matrices element-wise. */
    export function add(x: number[][], y: number[][]): number[][] {
        return x.map((_,i) => Vector.add(x[i], y[i]));
    }

    /** Subtract matrix y from matrix x element-wise. */
    export function sub(x: number[][], y: number[][]): number[][] {
        return x.map((_,i) => Vector.sub(x[i], y[i]));
    }

    /** Multiplies two matrices element-wise. */
    export function mul(x: number[][], y: number[][]): number[][] {
        return x.map((_,i) => Vector.mul(x[i], y[i]));
    }

    /** Scales a matrix by multiplying each element with the scalar value. */
    export function scale(scalar: number, matrix: number[][]): number[][] {
        return matrix.map(row => Vector.scale(scalar, row));
    }

    /** Multiplies a matrix with a vector (in that order). */
    export function mulVector(matrix: number[][], vector: number[]): number[] {
        return matrix.map(row => Vector.dot(row, vector));
    }

    /** Rounds a matrix to the desired precision. The precisions specifies how
     * many digits after the decimal point should remain. A negative precision
     * will round before the decimal point. */
    export function round(matrix: number[][], precision = 0): number[][] {
        return matrix.map(row => Vector.round(row, precision));
    }
}

/** Transforms a decimal number into a binary number. The returned binary number
 * is a string. Optionally, the number of digits the result should have can be
 * specified. */
export function dec2bin(n: number, digits?: number): string {
    const bin = (n >>> 0).toString(2);
    let zeros = '';
    for (let i = 0; i < (digits ?? 0); i++) zeros += '0';
    return !digits ? bin : (zeros + bin).slice(-digits);
}

/** Transforms a decimal number into a binary number. The returned binary number
 * is an array of numbers. Optionally, the number of digits the result should
 * have can be specified. */
export function dec2binArray(n: number, digits?: number): number[] {
    const bin = dec2bin(n, digits);
    let result = [];
    for (let i = 0, ie = bin.length; i < ie; i++) result.push(parseInt(bin[i]));
    return result;
}

// -----------------------------------------------------------------------------

const noNameSpace = { add, sub, mul, div, mod, round };