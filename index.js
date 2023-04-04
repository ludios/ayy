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
export function A(value, extraMessageOrFn) {
    if (!value) {
        const message = _appendExtraMessage(`A(...): ${inspect(value)} not truthy`, extraMessageOrFn);
        throw new AssertionError(message, A);
    }
}
A.is = function is(a, b, extraMessageOrFn) {
    if (!Object.is(a, b)) {
        const message = _appendExtraMessage(`A.is(...): !Object.is(${inspect(a)}, ${inspect(b)})`, extraMessageOrFn);
        throw new AssertionError(message, A.is);
    }
};
A.nis = function is(a, b, extraMessageOrFn) {
    if (Object.is(a, b)) {
        const message = _appendExtraMessage(`A.nis(...): Object.is(${inspect(a)}, ${inspect(b)})`, extraMessageOrFn);
        throw new AssertionError(message, A.nis);
    }
};
A.eq = function eq(a, b, extraMessageOrFn) {
    if (a !== b) {
        const message = _appendExtraMessage(`A.eq(...): ${inspect(a)} !== ${inspect(b)}`, extraMessageOrFn);
        throw new AssertionError(message, A.eq);
    }
};
A.neq = function neq(a, b, extraMessageOrFn) {
    if (a === b) {
        const message = _appendExtraMessage(`A.neq(...): ${inspect(a)} === ${inspect(b)}`, extraMessageOrFn);
        throw new AssertionError(message, A.neq);
    }
};
A.lt = function lt(a, b, extraMessageOrFn) {
    if (!(a < b)) {
        const message = _appendExtraMessage(`A.lt(...): !(${inspect(a)} < ${inspect(b)})`, extraMessageOrFn);
        throw new AssertionError(message, A.lt);
    }
};
A.lte = function lte(a, b, extraMessageOrFn) {
    if (!(a <= b)) {
        const message = _appendExtraMessage(`A.lte(...): !(${inspect(a)} <= ${inspect(b)})`, extraMessageOrFn);
        throw new AssertionError(message, A.lte);
    }
};
A.gt = function gt(a, b, extraMessageOrFn) {
    if (!(a > b)) {
        const message = _appendExtraMessage(`A.gt(...): !(${inspect(a)} > ${inspect(b)})`, extraMessageOrFn);
        throw new AssertionError(message, A.gt);
    }
};
A.gte = function gte(a, b, extraMessageOrFn) {
    if (!(a >= b)) {
        const message = _appendExtraMessage(`A.gte(...): !(${inspect(a)} >= ${inspect(b)})`, extraMessageOrFn);
        throw new AssertionError(message, A.gte);
    }
};
