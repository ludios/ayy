// Model-output: Claude Opus 5.5

import { expect, test } from "vitest";
import { A, AssertionError } from "../index.js";

/**
 * @param message - the exact message the thrown error should have.
 * @returns an `AssertionError` to pass to `toThrow`, which then requires the
 *          thrown error to have the same prototype and exactly this message.
 */
function assertion_error(message: string): AssertionError {
	return new AssertionError(message, assertion_error);
}

test("A", () => {
	// number messages are supported despite not being validly typed
	// @ts-expect-error
	A(3, 3);
	expect(() => A(false)).toThrow(assertion_error("A(...): false not truthy"));
	expect(() => A(0)).toThrow(assertion_error("A(...): 0 not truthy"));
	expect(() => A("")).toThrow(assertion_error("A(...): '' not truthy"));
	expect(() => A(0, "explanation")).toThrow(assertion_error("A(...): 0 not truthy: explanation"));
	expect(() => A(0, () => "explanation")).toThrow(assertion_error("A(...): 0 not truthy: explanation"));
	// undefined return is supported despite not being validly typed
	// @ts-expect-error
	expect(() => A(0, () => undefined)).toThrow(assertion_error("A(...): 0 not truthy: undefined"));
	// number messages are supported despite not being validly typed
	// @ts-expect-error
	expect(() => A(0, 0)).toThrow(assertion_error("A(...): 0 not truthy: 0"));
});

test("A.is", () => {
	A.is(Number.NaN, Number.NaN);
	expect(() => A.is(-0, 0)).toThrow(assertion_error("A.is(...): !Object.is(-0, 0)"));
});

test("A.nis", () => {
	A.nis(-0, 0);
	expect(() => A.nis(Number.NaN, Number.NaN)).toThrow(assertion_error("A.nis(...): Object.is(NaN, NaN)"));
});

test("A.eq", () => {
	A.eq(3, 3);
	expect(() => A.eq(3, 4)).toThrow(assertion_error("A.eq(...): 3 !== 4"));
});

test("A.neq", () => {
	A.neq(3, 4);
	expect(() => A.neq(3, 3)).toThrow(assertion_error("A.neq(...): 3 === 3"));
});

test("A.lt", () => {
	A.lt(3, 4);
	expect(() => A.lt(4, 3)).toThrow(assertion_error("A.lt(...): !(4 < 3)"));
});

test("A.lte", () => {
	A.lte(3, 3);
	A.lte(2, 3);
	expect(() => A.lte(4, 3)).toThrow(assertion_error("A.lte(...): !(4 <= 3)"));
});

test("A.gt", () => {
	A.gt(4, 3);
	expect(() => A.gt(3, 4)).toThrow(assertion_error("A.gt(...): !(3 > 4)"));
});

test("A.gte", () => {
	A.gte(3, 3);
	A.gte(3, 2);
	expect(() => A.gte(3, 4)).toThrow(assertion_error("A.gte(...): !(3 >= 4)"));
});
