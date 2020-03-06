export function isVector(vector: any): vector is number[] {
    return Array.isArray(vector)
        && vector.every(num => typeof num === 'number');
}

export function add(vec1: number[], vec2: number[]) {
    return vec1.map((_, i) => vec1[i] + vec2[i]);
}

export function sub(vec1: number[], vec2: number[]) {
    return vec1.map((_, i) => vec1[i] - vec2[i]);
}

export function mul(vec1: number[], vec2: number[]) {
    return vec1.map((_, i) => vec1[i] * vec2[i]);
}

export function scale(scalar: number, vec: number[]) {
    return vec.map(num => scalar * num);
}

export function dot(vec1: number[], vec2: number[]) {
    return vec1.reduce((result, _, i) => result + vec1[i] * vec2[i], 0);
}

export function magnitude(vector: number[]) {
    return Math.sqrt(dot(vector, vector));
}