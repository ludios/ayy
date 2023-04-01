import test from "ava";
import {default as A, AyyError} from "../index.js";

test('A', t => {
	A(3, 3);
	t.throws(() => A(false), {instanceOf: AyyError, message: /^A\(\.\.\.\): false not truthy$/});
	t.throws(() => A(false), {instanceOf: AyyError, message: /^A\(\.\.\.\): false not truthy$/});
	t.throws(() => A(0), {instanceOf: AyyError, message: /^A\(\.\.\.\): 0 not truthy$/});
	t.throws(() => A(""), {instanceOf: AyyError, message: /^A\(\.\.\.\): '' not truthy$/});
	try {
		A(0);
	} catch (e) {
		t.is(e.toString(), "AyyError: A(...): 0 not truthy");
	}
	try {
		A(0, "explanation");
	} catch (e) {
		t.is(e.toString(), "AyyError: A(...): 0 not truthy: explanation");
	}
	try {
		A(0, A.fn, () => "explanation");
	} catch (e) {
		t.is(e.toString(), "AyyError: A(...): 0 not truthy: explanation");
	}
	try {
		A(0, A.fn, () => undefined);
	} catch (e) {
		t.is(e.toString(), "AyyError: A(...): 0 not truthy: undefined");
	}
	try {
		A(0, 0);
	} catch (e) {
		t.is(e.toString(), "AyyError: A(...): 0 not truthy: 0");
	}
});

test('A.eq', t => {
	A.eq(3, 3);
	try {
		A.eq(3, "3");
	} catch (e) {
		t.is(e.toString(), "AyyError: A.eq(...): 3 !== '3'");
	}
});

test('A.neq', t => {
	A.neq(3, "3");
	try {
		A.neq(3, 3);
	} catch (e) {
		t.is(e.toString(), "AyyError: A.neq(...): 3 === 3");
	}
});

test('A.lt', t => {
	A.lt(3, 4);
	try {
		A.lt(4, 3);
	} catch (e) {
		t.is(e.toString(), "AyyError: A.lt(...): !(4 < 3)");
	}
});

test('A.lte', t => {
	A.lte(3, 3);
	A.lte(2, 3);
	try {
		A.lte(4, 3);
	} catch (e) {
		t.is(e.toString(), "AyyError: A.lte(...): !(4 <= 3)");
	}
});

test('A.gt', t => {
	A.gt(4, 3);
	try {
		A.gt(3, 4);
	} catch (e) {
		t.is(e.toString(), "AyyError: A.gt(...): !(3 > 4)");
	}
});

test('A.gte', t => {
	A.gte(3, 3);
	A.gte(3, 2);
	try {
		A.gte(3, 4);
	} catch (e) {
		t.is(e.toString(), "AyyError: A.gte(...): !(3 >= 4)");
	}
});
