// Model-output: Claude Opus 5.5

import { inspect } from "node:util";
import { inspect as extracted_inspect } from "@ludios/node-inspect-extracted";
import fc from "fast-check";
import { expect, test } from "vitest";
import { A, AssertionError } from "../index.js";

test("in Node, messages show values with util.inspect", () => {
	// node-inspect-extracted can't see a Promise's value
	expect(() => A.eq<unknown>(Promise.resolve(42), 1)).toThrow(AssertionError);
	expect(() => A.eq<unknown>(Promise.resolve(42), 1)).toThrow("A.eq(...): Promise { 42 } !== 1");
});

// Where there's no util.inspect, like in browsers, ayy uses node-inspect-extracted's copy of it,
// so these check that messages there show values the way they do in Node.

test("node-inspect-extracted shows values like util.inspect", () => {
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
		expect(extracted_inspect(value)).toBe(inspect(value));
	}), { numRuns: 2000 });
});

// Except for what JavaScript can't see without Node's internals, like a settled Promise's
// value, whether something is a Proxy, or what a Map or Set iterator has left.
test("node-inspect-extracted shows other kinds of values like util.inspect", () => {
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
		expect.soft(extracted_inspect(value)).toBe(inspect(value));
	}
});
