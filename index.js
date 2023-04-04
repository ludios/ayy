import { inspect } from "util";
export class AssertionError extends Error {
    constructor(message, stackStartFn) {
        super();
        this.name = 'AssertionError';
        this.message = message;
        Error.captureStackTrace(this, stackStartFn);
    }
}
function _appendExtraMessage(message, extraMessageOrFn) {
    if (typeof extraMessageOrFn == "function") {
        // If function returns undefined, append value anyway
        message += `: ${extraMessageOrFn()}`;
    }
    else if (extraMessageOrFn !== undefined) {
        message += `: ${extraMessageOrFn}`;
    }
    return message;
}
/**
 * Assert that `value` is truthy and throw `AssertionError` if it is not.
 * @param value value to test
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
export function A(value, extraMessageOrFn) {
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
A.is = function is(a, b, extraMessageOrFn) {
    if (!Object.is(a, b)) {
        const message = _appendExtraMessage(`A.is(...): !Object.is(${inspect(a)}, ${inspect(b)})`, extraMessageOrFn);
        throw new AssertionError(message, A.is);
    }
};
/**
 * Assert that `a` is not the same value as `b` (using `Object.is`) and throw `AssertionError` if it is.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
A.nis = function is(a, b, extraMessageOrFn) {
    if (Object.is(a, b)) {
        const message = _appendExtraMessage(`A.nis(...): Object.is(${inspect(a)}, ${inspect(b)})`, extraMessageOrFn);
        throw new AssertionError(message, A.nis);
    }
};
/**
 * Assert that `a` is equal to `b` (`===`) and throw `AssertionError` if it is not.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
A.eq = function eq(a, b, extraMessageOrFn) {
    if (a !== b) {
        const message = _appendExtraMessage(`A.eq(...): ${inspect(a)} !== ${inspect(b)}`, extraMessageOrFn);
        throw new AssertionError(message, A.eq);
    }
};
/**
 * Assert that `a` is not equal to `b` (`!==`) and throw `AssertionError` if it is.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
A.neq = function neq(a, b, extraMessageOrFn) {
    if (a === b) {
        const message = _appendExtraMessage(`A.neq(...): ${inspect(a)} === ${inspect(b)}`, extraMessageOrFn);
        throw new AssertionError(message, A.neq);
    }
};
/**
 * Assert that `a` is less than `b` (`<`) and throw `AssertionError` if it is not.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
A.lt = function lt(a, b, extraMessageOrFn) {
    if (!(a < b)) {
        const message = _appendExtraMessage(`A.lt(...): !(${inspect(a)} < ${inspect(b)})`, extraMessageOrFn);
        throw new AssertionError(message, A.lt);
    }
};
/**
 * Assert that `a` is less than or equal to `b` (`<=`) and throw `AssertionError` if it is not.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
A.lte = function lte(a, b, extraMessageOrFn) {
    if (!(a <= b)) {
        const message = _appendExtraMessage(`A.lte(...): !(${inspect(a)} <= ${inspect(b)})`, extraMessageOrFn);
        throw new AssertionError(message, A.lte);
    }
};
/**
 * Assert that `a` is greater than `b` (`>`) and throw `AssertionError` if it is not.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
A.gt = function gt(a, b, extraMessageOrFn) {
    if (!(a > b)) {
        const message = _appendExtraMessage(`A.gt(...): !(${inspect(a)} > ${inspect(b)})`, extraMessageOrFn);
        throw new AssertionError(message, A.gt);
    }
};
/**
 * Assert that `a` is greater than or equal to `b` (`>=`) and throw `AssertionError` if it is not.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
A.gte = function gte(a, b, extraMessageOrFn) {
    if (!(a >= b)) {
        const message = _appendExtraMessage(`A.gte(...): !(${inspect(a)} >= ${inspect(b)})`, extraMessageOrFn);
        throw new AssertionError(message, A.gte);
    }
};
