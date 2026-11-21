import assert from "node:assert/strict";
import test from "node:test";
import {
  extractPrNumbers,
  findCollisions,
  intersectFiles,
  parseArgs,
  validatePackageJson,
} from "../check-upstream-sync.mjs";

test("parseArgs requires old, new and branch, and accepts --json as a flag", () => {
  assert.deepEqual(parseArgs(["--old", "v1", "--new", "v2", "--branch", "fixes/main", "--json"]), {
    old: "v1",
    new: "v2",
    branch: "fixes/main",
    json: true,
  });
  assert.throws(() => parseArgs(["--old", "v1"]), /Missing --new/);
});

test("PR numbers are deduplicated and numerically ordered", () => {
  assert.deepEqual(
    extractPrNumbers([
      "fix(a) (#12)",
      "fix(b) (#3) and (#12)",
      "no number here",
    ]),
    ["3", "12"],
  );
});

test("collisions only match whole PR numbers present upstream", () => {
  assert.deepEqual(
    findCollisions(["fix(a) (#12667)"], ["upstream (#1266)", "upstream (#12667)"]),
    ["12667"],
  );
  assert.deepEqual(findCollisions(["fix(a) (#12667)"], ["upstream (#1266)"]), []);
});

test("hotspots are the sorted intersection of touched files", () => {
  assert.deepEqual(
    intersectFiles(["b", "a", "c"], ["c", "a", "d"]),
    ["a", "c"],
  );
});

test("package.json validation reports parse errors instead of throwing", () => {
  assert.deepEqual(validatePackageJson('{"ok":true}'), { ok: true, error: null });
  const bad = validatePackageJson('{"a":}');
  assert.equal(bad.ok, false);
  assert.match(bad.error, /JSON/);
});
