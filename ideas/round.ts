type RecursiveArray<Type> = Array<RecursiveArray<Type> | Type>;

/** Rounds a number or an array of numbers of any depth to the desired
 * precision. The precisions specifies how many digits after the decimal point
 * should remain. A negative precision will round before the decimal point. */
export default function round<T extends number | RecursiveArray<number>>(
    input: T,
    precision = 0
): T {
    if (input instanceof Array) {
        return input.map((child) => round(child, precision)) as T;
    }
    const factor = 10 ** precision;
    return (Math.round((input as number) * factor) / factor) as T;
}
