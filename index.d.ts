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
    /**
     * Assert that `a` is the same value as `b` (using `Object.is`) and throw `AssertionError` if it is not.
     * @param a first value
     * @param b second value
     * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
     */
    function is<T>(a: T, b: T, extraMessageOrFn?: string | (() => string)): void;
    /**
     * Assert that `a` is not the same value as `b` (using `Object.is`) and throw `AssertionError` if it is.
     * @param a first value
     * @param b second value
     * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
     */
    function nis<T>(a: T, b: T, extraMessageOrFn?: string | (() => string)): void;
    /**
     * Assert that `a` is equal to `b` (`===`) and throw `AssertionError` if it is not.
     * @param a first value
     * @param b second value
     * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
     */
    function eq<T>(a: T, b: T, extraMessageOrFn?: string | (() => string)): void;
    /**
     * Assert that `a` is not equal to `b` (`!==`) and throw `AssertionError` if it is.
     * @param a first value
     * @param b second value
     * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
     */
    function neq<T>(a: T, b: T, extraMessageOrFn?: string | (() => string)): void;
    /**
     * Assert that `a` is less than `b` (`<`) and throw `AssertionError` if it is not.
     * @param a first value
     * @param b second value
     * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
     */
    function lt<T>(a: T, b: T, extraMessageOrFn?: string | (() => string)): void;
    /**
     * Assert that `a` is less than or equal to `b` (`<=`) and throw `AssertionError` if it is not.
     * @param a first value
     * @param b second value
     * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
     */
    function lte<T>(a: T, b: T, extraMessageOrFn?: string | (() => string)): void;
    /**
     * Assert that `a` is greater than `b` (`>`) and throw `AssertionError` if it is not.
     * @param a first value
     * @param b second value
     * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
     */
    function gt<T>(a: T, b: T, extraMessageOrFn?: string | (() => string)): void;
    /**
     * Assert that `a` is greater than or equal to `b` (`>=`) and throw `AssertionError` if it is not.
     * @param a first value
     * @param b second value
     * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
     */
    function gte<T>(a: T, b: T, extraMessageOrFn?: string | (() => string)): void;
}
