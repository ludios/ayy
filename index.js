// Model-output: Claude Opus 5.5
import { inspect } from "node:util";
export class AssertionError extends Error {
    /**
     * @param message the whole error message
     * @param stackStartFn the function whose caller should be at the top of the stack;
     *        in engines without `Error.captureStackTrace`, the stack starts inside ayy instead
     */
    // biome-ignore lint/complexity/noBannedTypes: Function is what stackStartFn is
    constructor(message, stackStartFn) {
        // V8 takes the first line of the stack from the message given to Error's constructor.
        super(message);
        // That made `message` a non-enumerable own property; make it an ordinary one after `name`,
        // so that the error's own properties are `name` and then `message`, e.g. in JSON.stringify.
        delete this.message;
        this.name = "AssertionError";
        this.message = message;
        // Not every engine has this V8 extension; without it, the stack also shows ayy's own frames.
        // biome-ignore lint/complexity/noBannedTypes: Function is what V8 accepts
        Error
            .captureStackTrace?.(this, stackStartFn);
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
