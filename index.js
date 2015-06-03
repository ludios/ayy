"use strong";
"use strict";

const inspect = require('util').inspect;

class AyyError extends Error {
	constructor(message, stackStartFunction) {
		super();
		this.name = 'AyyError';
		this.message = message;
		Error.captureStackTrace(this, stackStartFunction);
	}
}

function A(value, msgOrFn) {
	if(!value) {
		if(typeof msgOrFn === "function") {
			msgOrFn = msgOrFn();
		} else if(msgOrFn === undefined) {
			msgOrFn = `A(...): ${inspect(value)} not truthy`;
		}
		throw new AyyError(msgOrFn, A);
	}
}

A.eq = function eq(a, b, msgOrFn) {
	if(a !== b) {
		if(typeof msgOrFn === "function") {
			msgOrFn = msgOrFn();
		} else if(msgOrFn === undefined) {
			msgOrFn = `A.eq(...): ${inspect(a)} !== ${inspect(b)}`;
		}
		throw new AyyError(msgOrFn, A.eq);
	}
};

A.neq = function neq(a, b, msgOrFn) {
	if(a === b) {
		if(typeof msgOrFn === "function") {
			msgOrFn = msgOrFn();
		} else if(msgOrFn === undefined) {
			msgOrFn = `A.neq(...): ${inspect(a)} === ${inspect(b)}`;
		}
		throw new AyyError(msgOrFn, A.neq);
	}
};

A.lt = function lt(a, b, msgOrFn) {
	if(!(a < b)) {
		if(typeof msgOrFn === "function") {
			msgOrFn = msgOrFn();
		} else if(msgOrFn === undefined) {
			msgOrFn = `A.lt(...): !(${inspect(a)} < ${inspect(b)})`;
		}
		throw new AyyError(msgOrFn, A.lt);
	}
};

A.lte = function lte(a, b, msgOrFn) {
	if(!(a <= b)) {
		if(typeof msgOrFn === "function") {
			msgOrFn = msgOrFn();
		} else if(msgOrFn === undefined) {
			msgOrFn = `A.lte(...): !(${inspect(a)} <= ${inspect(b)})`;
		}
		throw new AyyError(msgOrFn, A.lte);
	}
};

A.gt = function gt(a, b, msgOrFn) {
	if(!(a > b)) {
		if(typeof msgOrFn === "function") {
			msgOrFn = msgOrFn();
		} else if(msgOrFn === undefined) {
			msgOrFn = `A.gt(...): !(${inspect(a)} > ${inspect(b)})`;
		}
		throw new AyyError(msgOrFn, A.gt);
	}
};

A.gte = function gte(a, b, msgOrFn) {
	if(!(a >= b)) {
		if(typeof msgOrFn === "function") {
			msgOrFn = msgOrFn();
		} else if(msgOrFn === undefined) {
			msgOrFn = `A.gte(...): !(${inspect(a)} >= ${inspect(b)})`;
		}
		throw new AyyError(msgOrFn, A.gt);
	}
};

A.AyyError = AyyError;
module.exports = A;
