import { inspect } from "node:util";

export class AssertionError extends Error {
	// biome-ignore lint/complexity/noBannedTypes: Function is what stackStartFn is
	constructor(message: string, stackStartFn: Function) {
		super();
		this.name = 'AssertionError';
		this.message = message;
		Error.captureStackTrace(this, stackStartFn);
	}
}

type ExtraMessageOrFn = string | (() => string);

function _appendExtraMessage(message: string, extraMessageOrFn?: ExtraMessageOrFn): string {
	let out = message;
	if (typeof extraMessageOrFn === "function") {
		// If function returns undefined, append value anyway
		out += `: ${extraMessageOrFn()}`;
	} else if (extraMessageOrFn !== undefined) {
		out += `: ${extraMessageOrFn}`;
	}
	return out;
}

/**
 * Assert that `value` is truthy and throw `AssertionError` if it is not.
 * @param value value to test
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
function base_A(value: unknown, extraMessageOrFn?: ExtraMessageOrFn): asserts value {
	if (!value) {
		const message = _appendExtraMessage(
			`A(...): ${inspect(value)} not truthy`, extraMessageOrFn);
		throw new AssertionError(message, A);
	}
}

/**
 * Assert that `a` is the same value as `b` (using `Object.is`) and throw `AssertionError` if it is not.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
function is<T>(a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn) {
	if (!Object.is(a, b)) {
		const message = _appendExtraMessage(
			`A.is(...): !Object.is(${inspect(a)}, ${inspect(b)})`, extraMessageOrFn);
		throw new AssertionError(message, A.is);
	}
};

/**
 * Assert that `a` is not the same value as `b` (using `Object.is`) and throw `AssertionError` if it is.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
function nis<T>(a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn) {
	if (Object.is(a, b)) {
		const message = _appendExtraMessage(
			`A.nis(...): Object.is(${inspect(a)}, ${inspect(b)})`, extraMessageOrFn);
		throw new AssertionError(message, A.nis);
	}
};

/**
 * Assert that `a` is equal to `b` (`===`) and throw `AssertionError` if it is not.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
function eq<T>(a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn) {
	if (a !== b) {
		const message = _appendExtraMessage(
			`A.eq(...): ${inspect(a)} !== ${inspect(b)}`, extraMessageOrFn);
		throw new AssertionError(message, A.eq);
	}
};

/**
 * Assert that `a` is not equal to `b` (`!==`) and throw `AssertionError` if it is.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
function neq<T>(a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn) {
	if (a === b) {
		const message = _appendExtraMessage(
			`A.neq(...): ${inspect(a)} === ${inspect(b)}`, extraMessageOrFn);
		throw new AssertionError(message, A.neq);
	}
};

/**
 * Assert that `a` is less than `b` (`<`) and throw `AssertionError` if it is not.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
function lt<T>(a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn) {
	if (!(a < b)) {
		const message = _appendExtraMessage(
			`A.lt(...): !(${inspect(a)} < ${inspect(b)})`, extraMessageOrFn);
		throw new AssertionError(message, A.lt);
	}
};

/**
 * Assert that `a` is less than or equal to `b` (`<=`) and throw `AssertionError` if it is not.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
function lte<T>(a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn) {
	if (!(a <= b)) {
		const message = _appendExtraMessage(
			`A.lte(...): !(${inspect(a)} <= ${inspect(b)})`, extraMessageOrFn);
		throw new AssertionError(message, A.lte);
	}
};

/**
 * Assert that `a` is greater than `b` (`>`) and throw `AssertionError` if it is not.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
function gt<T>(a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn) {
	if (!(a > b)) {
		const message = _appendExtraMessage(
			`A.gt(...): !(${inspect(a)} > ${inspect(b)})`, extraMessageOrFn);
		throw new AssertionError(message, A.gt);
	}
};

/**
 * Assert that `a` is greater than or equal to `b` (`>=`) and throw `AssertionError` if it is not.
 * @param a first value
 * @param b second value
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
function gte<T>(a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn) {
	if (!(a >= b)) {
		const message = _appendExtraMessage(
			`A.gte(...): !(${inspect(a)} >= ${inspect(b)})`, extraMessageOrFn);
		throw new AssertionError(message, A.gte);
	}
};

// This `interface` and `Object.assign` is here to make both `A(` and `A.is(`
// and the rest work without using `namespace`.

interface AssertionFn {
	(value: unknown, extraMessageOrFn?: ExtraMessageOrFn): asserts value;

	is<T> (a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn): void;
	nis<T>(a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn): void;
	eq<T> (a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn): void;
	neq<T>(a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn): void;
	lt<T> (a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn): void;
	lte<T>(a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn): void;
	gt<T> (a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn): void;
	gte<T>(a: T, b: T, extraMessageOrFn?: ExtraMessageOrFn): void;
}

export const A: AssertionFn = Object.assign(base_A, {
	is,
	nis,
	eq,
	neq,
	lt,
	lte,
	gt,
	gte,
});
