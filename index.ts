import { inspect } from "util";

export class AssertionError extends Error {
	constructor(message: string, stackStartFn: Function) {
		super();
		this.name = 'AssertionError';
		this.message = message;
		Error.captureStackTrace(this, stackStartFn);
	}
}

// In all of our assert functions e.g. `A` or `A.eq`, we require the user to
// explicitly pass the symbol `A.fn` to indicate that they want a function to
// be called to get the message. This prevents the unintended calling of a
// function in some variable that was expected to contain a string.
function _appendExtraMessage(message: string, extraMessage?: string | Symbol, messageFn?: () => string) {
	if (extraMessage === A.fn) {
		// If function returns undefined, append value anyway
		message += `: ${messageFn!()}`;
	} else if (extraMessage !== undefined) {
		// We might prefer to check for arg count instead
		// of checking for `undefined`, but using ...args would
		// probably be slower.
		message += `: ${extraMessage}`;
	}
	return message;
}

export function A(value: unknown, extraMessage?: string | Symbol, messageFn?: () => string) {
	if (!value) {
		const message = _appendExtraMessage(
			`A(...): ${inspect(value)} not truthy`, extraMessage, messageFn);
		throw new AssertionError(message, A);
	}
}

A.fn = Symbol("A.fn");

A.eq = function eq<T>(a: T, b: T, extraMessage?: string | Symbol, messageFn?: () => string) {
	if (a !== b) {
		const message = _appendExtraMessage(
			`A.eq(...): ${inspect(a)} !== ${inspect(b)}`, extraMessage, messageFn);
		throw new AssertionError(message, A.eq);
	}
};

A.neq = function neq<T>(a: T, b: T, extraMessage?: string | Symbol, messageFn?: () => string) {
	if (a === b) {
		const message = _appendExtraMessage(
			`A.neq(...): ${inspect(a)} === ${inspect(b)}`, extraMessage, messageFn);
		throw new AssertionError(message, A.neq);
	}
};

A.lt = function lt<T>(a: T, b: T, extraMessage?: string | Symbol, messageFn?: () => string) {
	if (!(a < b)) {
		const message = _appendExtraMessage(
			`A.lt(...): !(${inspect(a)} < ${inspect(b)})`, extraMessage, messageFn);
		throw new AssertionError(message, A.lt);
	}
};

A.lte = function lte<T>(a: T, b: T, extraMessage?: string | Symbol, messageFn?: () => string) {
	if (!(a <= b)) {
		const message = _appendExtraMessage(
			`A.lte(...): !(${inspect(a)} <= ${inspect(b)})`, extraMessage, messageFn);
		throw new AssertionError(message, A.lte);
	}
};

A.gt = function gt<T>(a: T, b: T, extraMessage?: string | Symbol, messageFn?: () => string) {
	if (!(a > b)) {
		const message = _appendExtraMessage(
			`A.gt(...): !(${inspect(a)} > ${inspect(b)})`, extraMessage, messageFn);
		throw new AssertionError(message, A.gt);
	}
};

A.gte = function gte<T>(a: T, b: T, extraMessage?: string | Symbol, messageFn?: () => string) {
	if (!(a >= b)) {
		const message = _appendExtraMessage(
			`A.gte(...): !(${inspect(a)} >= ${inspect(b)})`, extraMessage, messageFn);
		throw new AssertionError(message, A.gte);
	}
};
