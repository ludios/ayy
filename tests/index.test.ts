// Model-output: Claude Opus 5.5

import { expect, test } from "vitest";
import { A, AssertionError } from "../index.js";

/**
 * Expect `fn` to throw an `AssertionError` with exactly `message`.
 *
 * Both checks are needed: `toThrow(AssertionError)` alone doesn't check the
 * message, and `toThrow` with an error object doesn't check the class.
 *
 * @param fn - a call that should fail an assertion.
 * @param message - the exact message the thrown error should have.
 */
function expect_assertion_error(fn: () => unknown, message: string): void {
	expect(fn).toThrow(AssertionError);
	expect(fn).toThrow(expect.objectContaining({ message }));
}

test("A", () => {
	// number messages are supported despite not being validly typed
	// @ts-expect-error
	A(3, 3);
	expect_assertion_error(() => A(false), "A(...): false not truthy");
	expect_assertion_error(() => A(0), "A(...): 0 not truthy");
	expect_assertion_error(() => A(""), "A(...): '' not truthy");
	expect_assertion_error(() => A(0, "explanation"), "A(...): 0 not truthy: explanation");
	expect_assertion_error(() => A(0, () => "explanation"), "A(...): 0 not truthy: explanation");
	// undefined return is supported despite not being validly typed
	// @ts-expect-error
	expect_assertion_error(() => A(0, () => undefined), "A(...): 0 not truthy: undefined");
	// number messages are supported despite not being validly typed
	// @ts-expect-error
	expect_assertion_error(() => A(0, 0), "A(...): 0 not truthy: 0");
});

test("A.is", () => {
	A.is(Number.NaN, Number.NaN);
	expect_assertion_error(() => A.is(-0, 0), "A.is(...): !Object.is(-0, 0)");
});

test("A.nis", () => {
	A.nis(-0, 0);
	expect_assertion_error(() => A.nis(Number.NaN, Number.NaN), "A.nis(...): Object.is(NaN, NaN)");
});

test("A.eq", () => {
	A.eq(3, 3);
	expect_assertion_error(() => A.eq(3, 4), "A.eq(...): 3 !== 4");
});

test("A.neq", () => {
	A.neq(3, 4);
	expect_assertion_error(() => A.neq(3, 3), "A.neq(...): 3 === 3");
});

test("A.lt", () => {
	A.lt(3, 4);
	expect_assertion_error(() => A.lt(4, 3), "A.lt(...): !(4 < 3)");
});

test("A.lte", () => {
	A.lte(3, 3);
	A.lte(2, 3);
	expect_assertion_error(() => A.lte(4, 3), "A.lte(...): !(4 <= 3)");
});

test("A.gt", () => {
	A.gt(4, 3);
	expect_assertion_error(() => A.gt(3, 4), "A.gt(...): !(3 > 4)");
});

test("A.gte", () => {
	A.gte(3, 3);
	A.gte(3, 2);
	expect_assertion_error(() => A.gte(3, 4), "A.gte(...): !(3 >= 4)");
});

test("the stack starts with the message, then the caller", () => {
	function caller() {
		A.eq(3, 4);
	}
	let stack: string | undefined;
	try {
		caller();
	} catch (e) {
		A(e instanceof AssertionError);
		stack = e.stack;
	}
	// The format of V8's stacks, which Node and Chrome have
	expect(stack).toMatch(/^AssertionError: A\.eq\(\.\.\.\): 3 !== 4\n {4}at caller\b/);
});

test("AssertionError's own properties are its name and then its message", () => {
	const error = new AssertionError("A(...): 0 not truthy", A);
	expect(JSON.stringify(error)).toBe('{"name":"AssertionError","message":"A(...): 0 not truthy"}');
});

test("AssertionError works without Error.captureStackTrace", () => {
	const error_constructor = Error as { captureStackTrace?: unknown };
	const capture_stack_trace = error_constructor.captureStackTrace;
	let error: unknown;
	error_constructor.captureStackTrace = undefined;
	try {
		A.eq(3, 4);
	} catch (e) {
		error = e;
	} finally {
		error_constructor.captureStackTrace = capture_stack_trace;
	}
	expect(error).toBeInstanceOf(AssertionError);
	expect(error).toHaveProperty("message", "A.eq(...): 3 !== 4");
});

test("messages show values the way util.inspect does", () => {
	class Point {
		x = 1;
		y = 2;
	}
	expect_assertion_error(() => A.eq("it's", "a\nb"), `A.eq(...): "it's" !== 'a\\nb'`);
	expect_assertion_error(() => A.eq<unknown>(3n, Symbol("s")), "A.eq(...): 3n !== Symbol(s)");
	expect_assertion_error(() => A.is<unknown>({ a: [1, "b"], "c-d": null }, [undefined]),
		"A.is(...): !Object.is({ a: [ 1, 'b' ], 'c-d': null }, [ undefined ])");
	expect_assertion_error(() => A.is<unknown>(new Point(), new Map([["k", new Set([1])]])),
		"A.is(...): !Object.is(Point { x: 1, y: 2 }, Map(1) { 'k' => Set(1) { 1 } })");
	expect_assertion_error(() => A.lt<unknown>(new Date(0), function f() {}),
		"A.lt(...): !(1970-01-01T00:00:00.000Z < [Function: f])");
	expect_assertion_error(() => A.neq<unknown>(Point, Point), "A.neq(...): [class Point] === [class Point]");
});

test("a value that throws while being formatted is shown as what it threw", () => {
	const value = {
		[Symbol.for("nodejs.util.inspect.custom")]() {
			throw new Error("bug in a custom inspect function");
		},
	};
	expect_assertion_error(() => A.eq<unknown>(value, 1),
		"A.eq(...): <uninspectable value: Error: bug in a custom inspect function> !== 1");
});
