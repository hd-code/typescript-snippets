export type Vector = number[];

/** TypeGuard for a vector. */
export function isVector(vector: unknown): vector is Vector {
    if (!(vector instanceof Array)) {
        return false;
    }
    for (let i = 0, ie = vector.length; i < ie; i++) {
        if (typeof vector[i] !== "number") {
            return false;
        }
    }
    return true;
}

// -----------------------------------------------------------------------------

/** Calculates the average (mean) of all elements in a vector. */
export function avg(vector: Vector): number {
    if (vector.length === 0) {
        return 0;
    }
    return sum(vector) / vector.length;
}

/** Calculates the magnitude of a vector. */
export function mag(vector: Vector): number {
    return Math.sqrt(dot(vector, vector));
}

/** Calculates the median of all elements in a vector. */
export function median(vector: Vector): number {
    switch (vector.length) {
        case 0:
            return 0;
        case 1:
            return vector[0];
    }

    const numOfValues = vector.length;

    if (numOfValues % 2 == 1) {
        return quickselect(vector, numOfValues / 2);
    }

    return (
        (quickselect(vector, numOfValues / 2 - 1) +
            quickselect(vector, numOfValues / 2)) /
        2
    );
}

/** Returns the value at the given index, if the vector was sorted. */
export function quickselect(vector: Vector, _index: number): number {
    switch (vector.length) {
        case 0:
            return 0;
        case 1:
            return vector[0];
    }
    const index = Math.min(Math.max(0, Math.floor(_index)), vector.length - 1);

    const pivot = vector[Math.floor(Math.random() * vector.length)];
    const { numOfLower, numOfPivs } = countValues(vector, pivot);

    if (index < numOfLower) {
        const lows = vector.filter((value) => value < pivot);
        return quickselect(lows, index);
    }
    if (index < numOfLower + numOfPivs) {
        return pivot;
    }
    const highs = vector.filter((value) => value > pivot);
    return quickselect(highs, index - numOfLower - numOfPivs);
}

/** Calculates the sum of all elements in a vector. */
export function sum(vector: Vector): number {
    return vector.reduce(plus, 0);
}

// -----------------------------------------------------------------------------

/** Adds two vectors element-wise. */
export function add(x: Vector, y: Vector): Vector {
    if (x.length !== y.length) {
        return [];
    }
    const result: Vector = [];
    for (let i = 0, ie = x.length; i < ie; i++) {
        result.push((x[i] as number) + (y[i] as number));
    }
    return result;
}

/** Subtract vector y from vector x element-wise. */
export function sub(x: Vector, y: Vector): Vector {
    if (x.length !== y.length) {
        return [];
    }
    const result: Vector = [];
    for (let i = 0, ie = x.length; i < ie; i++) {
        result.push((x[i] as number) - (y[i] as number));
    }
    return result;
}

/** Multiplies two vectors element-wise. For dot-product see {@link dot} */
export function mul(x: Vector, y: Vector): Vector {
    if (x.length !== y.length) {
        return [];
    }
    return x.map((_, i) => (x[i] as number) * (y[i] as number));
}

/** Divide two vectors element-wise. */
export function div(x: Vector, y: Vector): Vector {
    if (x.length !== y.length) {
        return [];
    }
    return x.map((_, i) => (x[i] as number) / (y[i] as number));
}

// -----------------------------------------------------------------------------

/** Scales a vector by multiplying each element with the scalar value. */
export function scale(scalar: number, vector: Vector): Vector {
    return vector.map((value) => scalar * value);
}

/** Calculates the dot product of two vectors. */
export function dot(x: Vector, y: Vector): number {
    if (x.length !== y.length || x.length === 0 || y.length === 0) {
        return NaN;
    }
    let result = 0;
    for (let i = 0, ie = x.length; i < ie; i++) {
        result += (x[i] as number) * (y[i] as number);
    }
    return result;
}

/** Multiplies a vector with a matrix (in that order). */
export function mulMatrix(vector: Vector, matrix: Matrix): Vector {
    if (vector.length !== matrix.length) {
        return [];
    }
    const transposed = transpose(matrix);
    return transposed.map((row) => dot(vector, row));
}

// -----------------------------------------------------------------------------

type Matrix = number[][];

function countValues(vector: Vector, pivot: number) {
    let numOfLower = 0,
        numOfPivs = 0,
        numOfUpper = 0;
    for (let i = 0, ie = vector.length; i < ie; i++) {
        if (vector[i] < pivot) {
            numOfLower++;
        } else if (vector[i] === pivot) {
            numOfPivs++;
        } else {
            numOfUpper++;
        }
    }
    return { numOfLower, numOfPivs, numOfUpper };
}

function plus(x: number, y: number): number {
    return x + y;
}

function transpose(matrix: Matrix): Matrix {
    return (
        matrix[0]?.map((_, i) => matrix.map((row) => row[i] as number)) ?? []
    );
}
