const assert = require('assert');
const A = require('..');

describe('A', function() {
	it('works', function() {
		A(3, 3);
		assert.throws(()=>A(false), /^AyyError: A\(\.\.\.\): false not truthy$/);
		assert.throws(()=>A(0), /^AyyError: A\(\.\.\.\): 0 not truthy$/);
		assert.throws(()=>A(""), /^AyyError: A\(\.\.\.\): '' not truthy$/);
		try {
			A(0);
		} catch(e) {
			assert.strictEqual(e.toString(), "AyyError: A(...): 0 not truthy");
		}
	});
});
