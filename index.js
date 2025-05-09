import { inspect } from "node:util";
export class AssertionError extends Error {
    // biome-ignore lint/complexity/noBannedTypes: Function is what stackStartFn is
    constructor(message, stackStartFn) {
        super();
        this.name = 'AssertionError';
        this.message = message;
        Error.captureStackTrace(this, stackStartFn);
    }
}
function _appendExtraMessage(message, extraMessageOrFn) {
    let out = message;
    if (typeof extraMessageOrFn === "function") {
        // If function returns undefined, append value anyway
        out += `: ${extraMessageOrFn()}`;
    }
    else if (extraMessageOrFn !== undefined) {
        out += `: ${extraMessageOrFn}`;
    }
    return out;
}
/**
 * Assert that `value` is truthy and throw `AssertionError` if it is not.
 * @param value value to test
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
function base_A(value, extraMessageOrFn) {
    if (!value) {
        const message = _appendExtraMessage(`A(...): ${inspect(value)} not truthy`, extraMessageOrFn);
        throw new AssertionError(message, A);
    }
}
/**
 * Assert that `a` is the same value as `b` (using `Object.is`) and throw `AssertionError` if it is not.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
function is(a, b, extraMessageOrFn) {
    if (!Object.is(a, b)) {
        const message = _appendExtraMessage(`A.is(...): !Object.is(${inspect(a)}, ${inspect(b)})`, extraMessageOrFn);
        throw new AssertionError(message, A.is);
    }
}
;
/**
 * Assert that `a` is not the same value as `b` (using `Object.is`) and throw `AssertionError` if it is.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
function nis(a, b, extraMessageOrFn) {
    if (Object.is(a, b)) {
        const message = _appendExtraMessage(`A.nis(...): Object.is(${inspect(a)}, ${inspect(b)})`, extraMessageOrFn);
        throw new AssertionError(message, A.nis);
    }
}
;
/**
 * Assert that `a` is equal to `b` (`===`) and throw `AssertionError` if it is not.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
function eq(a, b, extraMessageOrFn) {
    if (a !== b) {
        const message = _appendExtraMessage(`A.eq(...): ${inspect(a)} !== ${inspect(b)}`, extraMessageOrFn);
        throw new AssertionError(message, A.eq);
    }
}
;
/**
 * Assert that `a` is not equal to `b` (`!==`) and throw `AssertionError` if it is.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
function neq(a, b, extraMessageOrFn) {
    if (a === b) {
        const message = _appendExtraMessage(`A.neq(...): ${inspect(a)} === ${inspect(b)}`, extraMessageOrFn);
        throw new AssertionError(message, A.neq);
    }
}
;
/**
 * Assert that `a` is less than `b` (`<`) and throw `AssertionError` if it is not.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
function lt(a, b, extraMessageOrFn) {
    if (!(a < b)) {
        const message = _appendExtraMessage(`A.lt(...): !(${inspect(a)} < ${inspect(b)})`, extraMessageOrFn);
        throw new AssertionError(message, A.lt);
    }
}
;
/**
 * Assert that `a` is less than or equal to `b` (`<=`) and throw `AssertionError` if it is not.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
function lte(a, b, extraMessageOrFn) {
    if (!(a <= b)) {
        const message = _appendExtraMessage(`A.lte(...): !(${inspect(a)} <= ${inspect(b)})`, extraMessageOrFn);
        throw new AssertionError(message, A.lte);
    }
}
;
/**
 * Assert that `a` is greater than `b` (`>`) and throw `AssertionError` if it is not.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
function gt(a, b, extraMessageOrFn) {
    if (!(a > b)) {
        const message = _appendExtraMessage(`A.gt(...): !(${inspect(a)} > ${inspect(b)})`, extraMessageOrFn);
        throw new AssertionError(message, A.gt);
    }
}
;
/**
 * Assert that `a` is greater than or equal to `b` (`>=`) and throw `AssertionError` if it is not.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
function gte(a, b, extraMessageOrFn) {
    if (!(a >= b)) {
        const message = _appendExtraMessage(`A.gte(...): !(${inspect(a)} >= ${inspect(b)})`, extraMessageOrFn);
        throw new AssertionError(message, A.gte);
    }
}
;
export const A = Object.assign(base_A, {
    is,
    nis,
    eq,
    neq,
    lt,
    lte,
    gt,
    gte,
});
