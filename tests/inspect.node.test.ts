// Model-output: Claude Opus 5.5

import { execFileSync } from "node:child_process";
import { expect, test } from "vitest";

test("in Node, ayy loads and shows values with util.inspect", () => {
	// In a separate Node, so that Node itself resolves #inspect, as it does for ayy's users,
	// rather than vitest
	const index_url = new URL("../index.js", import.meta.url).href;
	const script = `
		const { A } = await import(${JSON.stringify(index_url)});
		try {
			A.eq(Promise.resolve(42), 1);
		} catch (e) {
			console.log(e.message);
		}
	`;
	const output = execFileSync(process.execPath, ["--input-type=module", "--eval", script], { encoding: "utf8" });
	// node-inspect-extracted's copy can't see a Promise's value
	expect(output).toBe("A.eq(...): Promise { 42 } !== 1\n");
});
