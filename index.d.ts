export declare class AssertionError extends Error {
    constructor(message: string, stackStartFn: Function);
}
/**
 * Assert that `value` is truthy and throw `AssertionError` if it is not.
 * @param value value to test
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
export declare function A(value: unknown, extraMessageOrFn?: string | (() => string)): void;
export declare namespace A {
    var is: <T>(a: T, b: T, extraMessageOrFn?: string | (() => string) | undefined) => void;
    var nis: <T>(a: T, b: T, extraMessageOrFn?: string | (() => string) | undefined) => void;
    var eq: <T>(a: T, b: T, extraMessageOrFn?: string | (() => string) | undefined) => void;
    var neq: <T>(a: T, b: T, extraMessageOrFn?: string | (() => string) | undefined) => void;
    var lt: <T>(a: T, b: T, extraMessageOrFn?: string | (() => string) | undefined) => void;
    var lte: <T>(a: T, b: T, extraMessageOrFn?: string | (() => string) | undefined) => void;
    var gt: <T>(a: T, b: T, extraMessageOrFn?: string | (() => string) | undefined) => void;
    var gte: <T>(a: T, b: T, extraMessageOrFn?: string | (() => string) | undefined) => void;
}
