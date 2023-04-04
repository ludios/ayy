import { inspect } from "util";

export class AssertionError extends Error {
	constructor(message: string, stackStartFn: Function) {
		super();
		this.name = 'AssertionError';
		this.message = message;
		Error.captureStackTrace(this, stackStartFn);
	}
}

function _appendExtraMessage(message: string, extraMessageOrFn?: string | (() => string)) {
	if (typeof extraMessageOrFn == "function") {
		// If function returns undefined, append value anyway
		message += `: ${extraMessageOrFn()}`;
	} else if (extraMessageOrFn !== undefined) {
		message += `: ${extraMessageOrFn}`;
	}
	return message;
}

/**
 * Assert that `value` is truthy and throw `AssertionError` if it is not.
 * @param value value to test
 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
 */
export function A(value: unknown, extraMessageOrFn?: string | (() => string)) {
	if (!value) {
		const message = _appendExtraMessage(
			`A(...): ${inspect(value)} not truthy`, extraMessageOrFn);
		throw new AssertionError(message, A);
	}
}

export namespace A {
	/**
	 * Assert that `a` is the same value as `b` (using `Object.is`) and throw `AssertionError` if it is not.
	 * @param a first value
	 * @param b second value
	 * @param extraMessageOrFn string to append to the assertion error, or a 0-arg callable that returns such a string
	 */
	export function is<T>(a: T, b: T, extraMessageOrFn?: string | (() => string)) {
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
	export function nis<T>(a: T, b: T, extraMessageOrFn?: string | (() => string)) {
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
	export function eq<T>(a: T, b: T, extraMessageOrFn?: string | (() => string)) {
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
	export function neq<T>(a: T, b: T, extraMessageOrFn?: string | (() => string)) {
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
	export function lt<T>(a: T, b: T, extraMessageOrFn?: string | (() => string)) {
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
	export function lte<T>(a: T, b: T, extraMessageOrFn?: string | (() => string)) {
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
	export function gt<T>(a: T, b: T, extraMessageOrFn?: string | (() => string)) {
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
	export function gte<T>(a: T, b: T, extraMessageOrFn?: string | (() => string)) {
		if (!(a >= b)) {
			const message = _appendExtraMessage(
				`A.gte(...): !(${inspect(a)} >= ${inspect(b)})`, extraMessageOrFn);
			throw new AssertionError(message, A.gte);
		}
	};
}
