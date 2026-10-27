// Model-output: Claude Opus 5.5

// What package.json's "imports" resolves #inspect to under the "node" condition, as a file in
// this package so that it can't resolve to an npm package named util.
export { inspect } from "node:util";
