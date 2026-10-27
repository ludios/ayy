// Model-output: Claude Opus 5.5

import { existsSync } from "node:fs";
import { delimiter, join } from "node:path";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

/**
 * Find a program in the directories in $PATH.
 * @param program the program's file name
 * @returns the program's path, or undefined if it's in none of them
 */
function find_on_path(program: string): string | undefined {
	for (const dir of (process.env.PATH ?? "").split(delimiter)) {
		const path = join(dir, program);
		if (existsSync(path)) {
			return path;
		}
	}
	return undefined;
}

export default defineConfig({
	test: {
		projects: [
			{
				test: {
					name: "node",
					include: ["tests/**/*.test.ts"],
				},
			},
			{
				test: {
					name: "chrome",
					include: ["tests/**/*.test.ts"],
					// These use Node APIs
					exclude: ["tests/**/*.node.test.ts"],
					browser: {
						enabled: true,
						headless: true,
						// The installed Chrome, if any, rather than requiring `playwright install chromium`
						provider: playwright({ launchOptions: { executablePath: find_on_path("google-chrome") } }),
						instances: [{ browser: "chromium" }],
						// The tests don't render anything
						screenshotFailures: false,
					},
				},
			},
		],
	},
});
