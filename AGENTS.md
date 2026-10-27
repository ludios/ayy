<!-- clank-right
languages = ["typescript"]
-->

# This project

`ayy` is the assertion library that "Libraries to use" recommends, so other projects depend on its API and on the wording of its error messages.

Edit `index.ts` only: `index.js` and `index.d.ts` are generated from it by `pnpm build` and committed alongside it.

The tests in `tests/` use ava, not vitest.

# Before committing

At the workspace root:

	pnpm build # runs tsc, regenerating index.js and index.d.ts
	pnpm test  # runs ava, then tsc --noEmit on the tests, then biome lint
