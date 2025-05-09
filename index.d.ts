export declare class AssertionError extends Error {
    constructor(message: string, stackStartFn: Function);
}
type ExtraMessageOrFn = string | (() => string);
/**
 * Assert that `a` is the same value as `b` (using `Object.is`) and throw `AssertionError` if it is not.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
declare function is<T>(a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn): void;
/**
 * Assert that `a` is not the same value as `b` (using `Object.is`) and throw `AssertionError` if it is.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
declare function nis<T>(a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn): void;
/**
 * Assert that `a` is equal to `b` (`===`) and throw `AssertionError` if it is not.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
declare function eq<T>(a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn): void;
/**
 * Assert that `a` is not equal to `b` (`!==`) and throw `AssertionError` if it is.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
declare function neq<T>(a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn): void;
/**
 * Assert that `a` is less than `b` (`<`) and throw `AssertionError` if it is not.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
declare function lt<T>(a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn): void;
/**
 * Assert that `a` is less than or equal to `b` (`<=`) and throw `AssertionError` if it is not.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
declare function lte<T>(a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn): void;
/**
 * Assert that `a` is greater than `b` (`>`) and throw `AssertionError` if it is not.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
declare function gt<T>(a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn): void;
/**
 * Assert that `a` is greater than or equal to `b` (`>=`) and throw `AssertionError` if it is not.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
declare function gte<T>(a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn): void;
interface AssertionFn {
    (value: unknown, extraMessageOrFn?: ExtraMessageOrFn): asserts value;
    is: typeof is;
    nis: typeof nis;
    eq: typeof eq;
    neq: typeof neq;
    lt: typeof lt;
    lte: typeof lte;
    gt: typeof gt;
    gte: typeof gte;
}
export declare const A: AssertionFn;
export {};
