import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { chmodSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const script = path.join(repoRoot, "scripts/build-images-for-tags.sh");

function runScript(args, env = {}) {
  return spawnSync("bash", [script, ...args], {
    cwd: repoRoot,
    encoding: "utf8",
    env: { ...process.env, ...env },
  });
}

function withFakeRuntime(test) {
  const dir = mkdtempSync(path.join(tmpdir(), "paperclip-tag-build-test-"));
  const runtime = path.join(dir, "fake-runtime");
  writeFileSync(
    runtime,
    `#!/usr/bin/env bash
case "$1" in
  info)  exit 0 ;;
  image) [ "\${FAKE_IMAGE_EXISTS:-0}" = 1 ] && exit 0 || exit 1 ;;
  tag)   echo "TAG $2 -> $3"; exit "\${FAKE_TAG_RC:-0}" ;;
  push)  echo "PUSH $2"; exit "\${FAKE_PUSH_RC:-0}" ;;
  build) echo "BUILD"; exit 0 ;;
  run)   exit "\${FAKE_RUN_RC:-0}" ;;
  *)     exit 1 ;;
esac
`,
  );
  chmodSync(runtime, 0o755);
  try {
    return test(runtime);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const remote = "registry.example/paperclip:v2026.1117.0";

test("push-existing publishes a local image without rebuilding", () => {
  withFakeRuntime((runtime) => {
    const result = runScript(
      ["--runtime", runtime, "--push-existing", "--image-repo", "registry.example/paperclip", "v2026.1117.0"],
      { FAKE_IMAGE_EXISTS: "1" },
    );
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /already exists; publishing .* without rebuilding/);
    assert.ok(result.stdout.includes(`PUSH ${remote}`), result.stdout);
    assert.doesNotMatch(result.stdout, /\bBUILD\b/);
    assert.match(result.stdout, /v2026\.1117\.0\s+OK\s+paperclip-local:v2026\.1117\.0\s+registry\.example\/paperclip:v2026\.1117\.0/);
  });
});

test("--push alone still skips an existing image without publishing", () => {
  withFakeRuntime((runtime) => {
    const result = runScript(
      ["--runtime", runtime, "--push", "--image-repo", "registry.example/paperclip", "v2026.1117.0"],
      { FAKE_IMAGE_EXISTS: "1" },
    );
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /already exists; skipping \(use --push-existing/);
    assert.match(result.stdout, /\bSKIP\b/);
    assert.doesNotMatch(result.stdout, /\bPUSH\b/);
    assert.doesNotMatch(result.stdout, /\bBUILD\b/);
  });
});

test("push-existing in dry-run only prints the tag and push commands", () => {
  withFakeRuntime((runtime) => {
    const result = runScript(
      ["--dry-run", "--runtime", runtime, "--push-existing", "--image-repo", "registry.example/paperclip", "v2026.1117.0"],
      { FAKE_IMAGE_EXISTS: "1" },
    );
    assert.equal(result.status, 0, result.stderr);
    assert.ok(
      result.stdout.includes(`tag paperclip-local:v2026.1117.0 ${remote}`),
      result.stdout,
    );
    assert.ok(result.stdout.includes(`push ${remote}`), result.stdout);
    assert.doesNotMatch(result.stdout, /\bBUILD\b/);
  });
});

test("--force and --push-existing are mutually exclusive", () => {
  const result = runScript(["--force", "--push-existing", "v2026.1117.0"]);
  assert.equal(result.status, 2);
  assert.match(result.stderr, /--push-existing and --force are mutually exclusive/);
});

test("push-existing fails the ref when the registry push fails", () => {
  withFakeRuntime((runtime) => {
    const result = runScript(
      ["--runtime", runtime, "--push-existing", "--image-repo", "registry.example/paperclip", "v2026.1117.0"],
      { FAKE_IMAGE_EXISTS: "1", FAKE_PUSH_RC: "1" },
    );
    assert.equal(result.status, 1);
    assert.match(result.stdout, /\bFAIL\b/);
    assert.match(result.stderr, /FAILED: see/);
  });
});
