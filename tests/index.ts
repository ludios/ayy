import test from "ava";
import { A, AssertionError } from "../index.js";

test('A', t => {
	// number messages are supported despite not being validly typed
	// @ts-expect-error
	A(3, 3);
	t.throws(() => A(false), {instanceOf: AssertionError, message: /^A\(\.\.\.\): false not truthy$/});
	t.throws(() => A(false), {instanceOf: AssertionError, message: /^A\(\.\.\.\): false not truthy$/});
	t.throws(() => A(0), {instanceOf: AssertionError, message: /^A\(\.\.\.\): 0 not truthy$/});
	t.throws(() => A(""), {instanceOf: AssertionError, message: /^A\(\.\.\.\): '' not truthy$/});
	t.throws(() => A(0), {instanceOf: AssertionError, message: "A(...): 0 not truthy"});
	t.throws(() => A(0, "explanation"), {instanceOf: AssertionError, message: "A(...): 0 not truthy: explanation"});
	t.throws(() => A(0, () => "explanation"), {instanceOf: AssertionError, message: "A(...): 0 not truthy: explanation"});
	// undefined return is supported despite not being validly typed
	// @ts-ignore
	t.throws(() => A(0, () => undefined), {instanceOf: AssertionError, message: "A(...): 0 not truthy: undefined"});
	// number messages are supported despite not being validly typed
	// @ts-expect-error
	t.throws(() => A(0, 0), {instanceOf: AssertionError, message: "A(...): 0 not truthy: 0"});
});

test('A.is', t => {
	A.is(NaN, NaN);
	t.throws(() => A.is(-0, 0), {instanceOf: AssertionError, message: "A.is(...): !Object.is(-0, 0)"});
});

test('A.nis', t => {
	A.nis(-0, 0);
	t.throws(() => A.nis(NaN, NaN), {instanceOf: AssertionError, message: "A.nis(...): Object.is(NaN, NaN)"});
});

test('A.eq', t => {
	A.eq(3, 3);
	t.throws(() => A.eq(3, 4), {instanceOf: AssertionError, message: "A.eq(...): 3 !== 4"});
});

test('A.neq', t => {
	A.neq(3, 4);
	t.throws(() => A.neq(3, 3), {instanceOf: AssertionError, message: "A.neq(...): 3 === 3"});
});

test('A.lt', t => {
	A.lt(3, 4);
	t.throws(() => A.lt(4, 3), {instanceOf: AssertionError, message: "A.lt(...): !(4 < 3)"});
});

test('A.lte', t => {
	A.lte(3, 3);
	A.lte(2, 3);
	t.throws(() => A.lte(4, 3), {instanceOf: AssertionError, message: "A.lte(...): !(4 <= 3)"});
});

test('A.gt', t => {
	A.gt(4, 3);
	t.throws(() => A.gt(3, 4), {instanceOf: AssertionError, message: "A.gt(...): !(3 > 4)"});
});

test('A.gte', t => {
	A.gte(3, 3);
	A.gte(3, 2);
	t.throws(() => A.gte(3, 4), {instanceOf: AssertionError, message: "A.gte(...): !(3 >= 4)"});
});
