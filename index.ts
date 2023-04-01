import { inspect } from "util";

export class AssertionError extends Error {
	constructor(message: string, stackStartFn: Function) {
		super();
		this.name = 'AssertionError';
		this.message = message;
		Error.captureStackTrace(this, stackStartFn);
	}
}

const fn = Symbol("A.fn");

function _appendExtraMessage(message: string, extraMessage: string | Symbol, messageFn: () => string) {
	if (extraMessage === fn) {
		// If function returns undefined, append value anyway
		message += `: ${messageFn()}`;
	} else if (extraMessage !== undefined) {
		// We might prefer to check for arg count instead
		// of checking for `undefined`, but using ...args would
		// probably be slower.
		message += `: ${extraMessage}`;
	}
	return message;
}

export default function A(value: unknown, extraMessage: string | Symbol, messageFn: () => string) {
	if (!value) {
		const message = _appendExtraMessage(
			`A(...): ${inspect(value)} not truthy`, extraMessage, messageFn);
		throw new AssertionError(message, A);
	}
}

A.fn = fn;

A.eq = function eq(a: any, b: any, extraMessage: string | Symbol, messageFn: () => string) {
	if (a !== b) {
		const message = _appendExtraMessage(
			`A.eq(...): ${inspect(a)} !== ${inspect(b)}`, extraMessage, messageFn);
		throw new AssertionError(message, A.eq);
	}
};

A.neq = function neq(a: any, b: any, extraMessage: string | Symbol, messageFn: () => string) {
	if (a === b) {
		const message = _appendExtraMessage(
			`A.neq(...): ${inspect(a)} === ${inspect(b)}`, extraMessage, messageFn);
		throw new AssertionError(message, A.neq);
	}
};

A.lt = function lt(a: any, b: any, extraMessage: string | Symbol, messageFn: () => string) {
	if (!(a < b)) {
		const message = _appendExtraMessage(
			`A.lt(...): !(${inspect(a)} < ${inspect(b)})`, extraMessage, messageFn);
		throw new AssertionError(message, A.lt);
	}
};

A.lte = function lte(a: any, b: any, extraMessage: string | Symbol, messageFn: () => string) {
	if (!(a <= b)) {
		const message = _appendExtraMessage(
			`A.lte(...): !(${inspect(a)} <= ${inspect(b)})`, extraMessage, messageFn);
		throw new AssertionError(message, A.lte);
	}
};

A.gt = function gt(a: any, b: any, extraMessage: string | Symbol, messageFn: () => string) {
	if (!(a > b)) {
		const message = _appendExtraMessage(
			`A.gt(...): !(${inspect(a)} > ${inspect(b)})`, extraMessage, messageFn);
		throw new AssertionError(message, A.gt);
	}
};

A.gte = function gte(a: any, b: any, extraMessage: string | Symbol, messageFn: () => string) {
	if (!(a >= b)) {
		const message = _appendExtraMessage(
			`A.gte(...): !(${inspect(a)} >= ${inspect(b)})`, extraMessage, messageFn);
		throw new AssertionError(message, A.gte);
	}
};
