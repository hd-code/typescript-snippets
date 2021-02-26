/*! vector v0.1.1 | MIT | © Hannes Dröse https://github.com/hd-code/web-snippets */

// -----------------------------------------------------------------------------

/** TypeGuard for a vector. */
export function isVector(vector: unknown): vector is number[] {
    if (!(vector instanceof Array)) {
        return false;
    }
    for (let i = 0, ie = vector.length; i < ie; i++) {
        if (typeof vector[i] !== 'number') {
            return false;
        }
    }
    return true;
}

// -----------------------------------------------------------------------------

/** Calculates the sum of all elements in a vector. */
export function sum(vector: number[]): number {
    return vector.reduce(plus, 0);
}

/** Calculates the average (mean) of all elements in a vector. */
export function avg(vector: number[]): number {
    if (vector.length === 0) {
        return 0;
    }
    return sum(vector) / vector.length;
}

/** Calculates the median of all elements in a vector. */
export function median(_vector: number[]): number {
    if (_vector.length === 0) {
        return 0;
    }

    const vector = [..._vector];
    vector.sort();

    const half = Math.floor(vector.length / 2);
    return vector.length % 2 ? vector[half] as number : ((vector[half - 1] as number) + (vector[half] as number)) / 2.0;
}

/** Calculates the magnitude of a vector. */
export function mag(vector: number[]): number {
    return Math.sqrt(dot(vector, vector));
}

// -----------------------------------------------------------------------------

/** Adds two vectors element-wise. */
export function add(x: number[], y: number[]): number[] {
    if (x.length !== y.length) {
        return [];
    }
    const result = [];
    for (let i = 0, ie = x.length; i < ie; i++) {
        result.push((x[i] as number) + (y[i] as number));
    }
    return result;
}

/** Subtract vector y from vector x element-wise. */
export function sub(x: number[], y: number[]): number[] {
    if (x.length !== y.length) {
        return [];
    }
    const result = [];
    for (let i = 0, ie = x.length; i < ie; i++) {
        result.push((x[i] as number) - (y[i] as number));
    }
    return result;
}

/** Multiplies two vectors element-wise. For dot-product see {@link dot} */
export function mul(x: number[], y: number[]): number[] {
    if (x.length !== y.length) {
        return [];
    }
    return x.map((_,i) => (x[i] as number) * (y[i] as number));
}

/** Calculates the dot product of two vectors. */
export function dot(x: number[], y: number[]): number {
    if (x.length !== y.length || x.length === 0 || y.length === 0) {
        return NaN;
    }
    let result = 0;
    for (let i = 0, ie = x.length; i < ie; i++) {
        result += (x[i] as number) * (y[i] as number);
    }
    return result;
}

// -----------------------------------------------------------------------------

/** Scales a vector by multiplying each element with the scalar value. */
export function scale(scalar: number, vector: number[]): number[] {
    return vector.map(value => scalar * value);
}

/** Multiplies a vector with a matrix (in that order). */
export function mulMatrix(vector: number[], matrix: number[][]): number[] {
    if (vector.length !== matrix.length) {
        return [];
    }
    const transposed = transpose(matrix);
    return transposed.map(row => dot(vector, row));
}

// -----------------------------------------------------------------------------

function plus(x: number, y: number): number {
    return x + y;
}

function transpose(matrix: number[][]): number[][] {
    return matrix[0]?.map((_, i) => matrix.map(row => row[i] as number)) ?? [];
}
