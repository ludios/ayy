import { inspect } from "util";
export class AssertionError extends Error {
    constructor(message, stackStartFn) {
        super();
        this.name = 'AssertionError';
        this.message = message;
        Error.captureStackTrace(this, stackStartFn);
    }
}
const fn = Symbol("A.fn");
// In all of our assert functions e.g. `A` or `A.eq`, we require the user to
// explicitly pass the symbol `A.fn` to indicate that they want a function to
// be called to get the message. This prevents the unintended calling of a
// function in some variable that was expected to contain a string.
function _appendExtraMessage(message, extraMessage, messageFn) {
    if (extraMessage === fn) {
        // If function returns undefined, append value anyway
        message += `: ${messageFn()}`;
    }
    else if (extraMessage !== undefined) {
        // We might prefer to check for arg count instead
        // of checking for `undefined`, but using ...args would
        // probably be slower.
        message += `: ${extraMessage}`;
    }
    return message;
}
export default function A(value, extraMessage, messageFn) {
    if (!value) {
        const message = _appendExtraMessage(`A(...): ${inspect(value)} not truthy`, extraMessage, messageFn);
        throw new AssertionError(message, A);
    }
}
A.fn = fn;
A.eq = function eq(a, b, extraMessage, messageFn) {
    if (a !== b) {
        const message = _appendExtraMessage(`A.eq(...): ${inspect(a)} !== ${inspect(b)}`, extraMessage, messageFn);
        throw new AssertionError(message, A.eq);
    }
};
A.neq = function neq(a, b, extraMessage, messageFn) {
    if (a === b) {
        const message = _appendExtraMessage(`A.neq(...): ${inspect(a)} === ${inspect(b)}`, extraMessage, messageFn);
        throw new AssertionError(message, A.neq);
    }
};
A.lt = function lt(a, b, extraMessage, messageFn) {
    if (!(a < b)) {
        const message = _appendExtraMessage(`A.lt(...): !(${inspect(a)} < ${inspect(b)})`, extraMessage, messageFn);
        throw new AssertionError(message, A.lt);
    }
};
A.lte = function lte(a, b, extraMessage, messageFn) {
    if (!(a <= b)) {
        const message = _appendExtraMessage(`A.lte(...): !(${inspect(a)} <= ${inspect(b)})`, extraMessage, messageFn);
        throw new AssertionError(message, A.lte);
    }
};
A.gt = function gt(a, b, extraMessage, messageFn) {
    if (!(a > b)) {
        const message = _appendExtraMessage(`A.gt(...): !(${inspect(a)} > ${inspect(b)})`, extraMessage, messageFn);
        throw new AssertionError(message, A.gt);
    }
};
A.gte = function gte(a, b, extraMessage, messageFn) {
    if (!(a >= b)) {
        const message = _appendExtraMessage(`A.gte(...): !(${inspect(a)} >= ${inspect(b)})`, extraMessage, messageFn);
        throw new AssertionError(message, A.gte);
    }
};
