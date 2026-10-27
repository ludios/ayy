// Model-output: Claude Opus 5.5

import { inspect } from "node:util";
import fc from "fast-check";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { A } from "../index.js";

// Make ayy format values as in runtimes without `util.inspect`, like browsers.
beforeEach(() => {
	vi.spyOn(process, "getBuiltinModule").mockReturnValue(undefined as never);
});
afterEach(() => {
	vi.restoreAllMocks();
});

const sentinel = Symbol("sentinel");

/**
 * Find out how ayy formats a value in assertion messages.
 * @param value any value other than `sentinel`
 * @returns `value` as formatted in the message of a failed `A.is`
 */
function ayy_inspect(value: unknown): string {
	try {
		A.is(value, sentinel);
	} catch (e) {
		A(e instanceof Error);
		const match = /^A\.is\(\.\.\.\): !Object\.is\(([\s\S]*), Symbol\(sentinel\)\)$/.exec(e.message);
		A(match, () => `unexpected message: ${e.message}`);
		return match[1];
	}
	throw new Error("A.is didn't throw");
}

test("values look the same as with util.inspect", () => {
	const value = fc.oneof(
		fc.anything({
			withBigInt: true,
			withDate: true,
			withMap: true,
			withSet: true,
			withNullPrototype: true,
			withSparseArray: true,
			withTypedArray: true,
		}),
		fc.string({ unit: "binary", maxLength: 200 }),
		fc.double(),
	);
	fc.assert(fc.property(value, (value) => {
		expect(ayy_inspect(value)).toBe(inspect(value));
	}), { numRuns: 2000 });
});

// Except for what JavaScript can't see without Node's internals, like a settled Promise's
// value, whether something is a Proxy, or what a Map or Set iterator has left.
test("other kinds of values look the same as with util.inspect", () => {
	class Foo {
		x = 1;
	}
	const circular: Record<string, unknown> = { a: [1] };
	circular.self = circular;
	const values = [
		Foo,
		new Foo(),
		async function* agen() {},
		new TypeError("bad"),
		circular,
		new Promise(() => {}),
		{
			get a() {
				return 1;
			},
		},
	];
	for (const value of values) {
		expect.soft(ayy_inspect(value)).toBe(inspect(value));
	}
});

test("values that can't be formatted still make assertions fail with AssertionError", () => {
	const { proxy, revoke } = Proxy.revocable({}, {});
	revoke();
	expect(ayy_inspect(proxy)).toBe("<uninspectable value>");
});
