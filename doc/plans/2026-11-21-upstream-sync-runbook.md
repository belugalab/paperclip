# Upstream sync runbook for the `fixes/main` branch

Date: 2026-11-21. Predecessor: `doc/plans/2026-10-06-fixes-branch-rebase-considerations.md`
(that document explains *why* the rules below exist; this one is the repeatable checklist).

## Scope and decisions

- `origin` is `paperclipai/paperclip`; `beluga` is `belugalab/paperclip`.
- One canonical fork branch: **`fixes/main`**, created from `agent-runtime-v2` with all 31
  local commits (including `ci: add jq`). Older branches are frozen, not deleted.
- Rebase **onto a stable upstream tag**, one release at a time. Never merge and never
  rebase onto the moving `origin/master`.
- After every successful increment, tag the branch tip `fixes/synced-<tag>` so work can
  pause and resume there.
- Keep generally useful fixes moving upstream: every PR that lands becomes a `DROP`
  in the next pre-flight, which permanently reduces the size of this rebase.

## Naming

| kind | pattern | example |
|---|---|---|
| canonical branch | `fixes/main` | `fixes/main` |
| pre-consolidation backup | `backup/<old-branch>-pre-sync-2026-11-21` | `backup/agent-runtime-v2-pre-sync-2026-11-21` |
| pre-increment backup | `backup/fixes-main-pre-<tag>` | `backup/fixes-main-pre-v2026.1005.0` |
| increment worktree branch | `sync/<tag>` | `sync/v2026.1005.0` |
| verified checkpoint | `fixes/synced-<tag>` | `fixes/synced-v2026.1005.0` |

## Initial state (2026-11-21)

| ref | tip | commits ahead of `v2026.1001.0` |
|---|---|---|
| `fixes/v2026.1001.0` | `2ed6d1499` | 25 |
| `fixes-v2026.1001.2` (= `fixes/v2026.1001.2` = `test`) | `6c1f9d991` | 30 |
| `agent-runtime-v2` → `fixes/main` | `f4287e23a` | 31 |
| `fixes/v2026.916.0` | `e8929edb8` | separate base, out of scope |

Upstream tags after the current base: `v2026.1005.0`, `v2026.1012.0`, `v2026.1023.0`,
`v2026.1106.0`, `v2026.1117.0`. The first step alone brings 179 upstream commits and
13 shared files (`heartbeat.ts` with 32 upstream commits is the main hotspot).

## The loop (once per tag)

Let `O` be the current base tag and `N` the next one.

1. **Pre-flight**, read-only:
   ```sh
   node scripts/check-upstream-sync.mjs --old O --new N --branch fixes/main
   ```
   The report lists commits already upstream (`git cherry -`), PR-number collisions,
   shared files, and `package.json` validity. A `DROP` finding is never resolved as a
   conflict: use `drop` in the interactive todo.

2. **Triage** each local commit as `KEEP`, `DROP` (landed upstream), `DROP` (obsolete),
   or `REWORK` (upstream changed the API). Check patch bodies, not hashes: context
   drift alone changes a hash.

3. **Back up and branch**:
   ```sh
   git tag backup/fixes-main-pre-N fixes/main
   git switch -c sync/N fixes/main
   ```

4. **Rebase**:
   ```sh
   git rebase --onto N O sync/N
   ```
   Conflict rules (from the October runbook):
   - For files both sides changed, merge field by field. Never take ours/theirs wholesale.
   - `git-credentials.ts` is the highest-risk file: keep our provider abstraction and
     add upstream's GitHub-identity fields alongside it.
   - Check every commit subject for `(#NNNNN)`; if that PR is in `O..N`, drop the commit.
   - Validate `package.json` with `JSON.parse` in the working tree **and** via
     `git show sync/N:package.json`. Put corrections in the introducing commit with
     `git commit --fixup` + `GIT_SEQUENCE_EDITOR=true git rebase --autosquash -i N`.

5. **Verify** with the gates below. Do not promote on a failed gate.

6. **Promote**:
   ```sh
   git branch -f fixes/main sync/N
   git tag fixes/synced-N fixes/main
   git switch fixes/main
   git branch -d sync/N
   ```
   Set `O = N` and repeat.

## Verification gates

| gate | expectation |
|---|---|
| `node --test scripts/__tests__/check-upstream-sync.test.mjs` | 5/5 |
| file-scoped `tsc --noEmit -p server/tsconfig.json` over touched dirs | 0 errors in touched files (baseline tag has unrelated errors) |
| package-local vitest in `packages/plugins/sandbox-providers/kubernetes` | same environment failures as at the tag (15 at `v2026.1106.0`, 19 at `v2026.1117.0`), none new |
| server vitest: `git-credentials`, `adapter-models`, `environment-run-orchestrator`, heartbeat | no new failures; `git-credentials`/`queue` cannot import `ai` in this sandbox, `environment-run-orchestrator` is green at `v2026.1117.0` |
| `node --test scripts/__tests__/release-verify-workflow.test.mjs` | same as at the tag: 70/72 at `v2026.1117.0`; the 2 failures need smoke binaries this sandbox does not build |
| behaviour markers | canary build step / draft guard / `handleConfirmMission` = 1 / 2 / 0; GitLab SSH+CA tests; OpenRouter discovery; heartbeat concurrency |
| `patch-id` of each replayed commit | identical, or differs only in documented context |

Sandbox limitations (pre-existing, compare against the tag baseline, not absolute green):
no global `pnpm` (use `node_modules/.bin/*` directly); `@embedded-postgres` `initdb`
cannot run because `/lib64/ld-linux-x86-64.so.2` is missing, so embedded-postgres tests
hang; BusyBox `tar` makes `file-sync.test.ts` fail.

## Image build sweep

`scripts/build-images-for-tags.sh` builds one image per ref from a clean detached worktree,
so an uncommitted workspace cannot leak into a build. With no arguments it builds the six
upstream release tags in the sequence above plus the five `fixes/synced-*` checkpoints, using
the `cloud` target with the Kubernetes sandbox provider bundled.

```sh
scripts/build-images-for-tags.sh                 # all 11 refs, cloud + kubernetes
scripts/build-images-for-tags.sh --upstream-only # only the six upstream tags
scripts/build-images-for-tags.sh --target production  # lean self-hosted image, no plugins
scripts/build-images-for-tags.sh --plugins "daytona kubernetes"
scripts/build-images-for-tags.sh --dry-run       # print the exact docker/podman commands
scripts/build-images-for-tags.sh --image-prefix paperclip-preview fixes/main
scripts/build-images-for-tags.sh --push --image-repo ghcr.io/belugalab/paperclip --upstream-only
scripts/build-images-for-tags.sh --push-existing --image-repo registry.gitlab.com/castorinop/k3s-lab/paperclip-server v2026.1117.0
```

Images are named `<prefix>:<ref>` (`/` becomes `-`), the full commit SHA is passed as
`PAPERCLIP_BUILD_COMMIT` for the remote provider pack, and `CLI_TOOLS_CACHE_EPOCH` uses the
same weekly value as CI. **An image that already exists locally is skipped**, so the existing
`paperclip-local:v2026.1001.0` is never overwritten; `--force` opts in to rebuilding. Failures
are collected per tag and the script exits non-zero if any tag failed. Use `--report FILE` for a
status table (now with a `REMOTE` column) and `--keep-worktrees` to inspect a failed build context.

Pushing is opt-in with `--push`. The script tags each built image as
`<image-repo>:<ref>` in addition to the local tag and pushes it only after the build (and optional
`--verify`) succeeds. The default repository is `ghcr.io/paperclipai/paperclip`; override it with
`--image-repo`, for example `ghcr.io/belugalab/paperclip`. **Skipped images are not pushed** by
`--push` alone; use `--force --push` to rebuild and publish an existing local ref, or
`--push-existing` to publish that local image as-is without a rebuild (needed when a rebuild does
not fit on disk). `--push-existing` implies `--push` and cannot be combined with `--force`. The
script does not run `docker login`; authenticate with the registry first.

This sandbox has no docker/podman or host `pnpm`, so builds were exercised with `--dry-run`
and a fake container runtime that verified skip, force, push, and failure paths; no real image
was built or pushed here.

## Increment log

| date | from → to | commits replayed | dropped / reworked | result |
|---|---|---|---|---|
| 2026-11-21 | `v2026.1001.0` → `v2026.1005.0` | 31 | 0 dropped, 4 conflict resolutions (OpenRouter ×2, `package.json`/lockfile, heartbeat) | `fixes/synced-v2026.1005.0` @ `8e3e1a2ab9`; 179 upstream commits absorbed; gates at baseline |
| 2026-11-21 | `v2026.1005.0` → `v2026.1012.0` | 31 | 0 dropped; 1 reworked conflict (`server/src/index.ts`: upstream landed its own OTel bootstrap, so we kept its `createServer`/`RequestListener` import and added our `Server` type) | `fixes/synced-v2026.1012.0` @ `1687127315`; 132 upstream commits absorbed; gates at baseline |
| 2026-11-21 | `v2026.1012.0` → `v2026.1023.0` | 31 + 2 fixes | 0 dropped; conflicts in GitLab credentials, OTel import, `billingType`, heartbeat/API version | `fixes/synced-v2026.1023.0` @ `e9151e2349`; 200 upstream commits absorbed; typecheck at tag baseline (305), gates at baseline |
| 2026-11-21 | `v2026.1023.0` → `v2026.1106.0` | 33 + 3 fixes | 0 dropped; conflicts in credentials relocation, compose, runtime-config, heartbeat guard, provider-aware contracts | `fixes/synced-v2026.1106.0` @ `efe4917d5b`; 515 upstream commits absorbed; typecheck at tag baseline (514), gates at baseline |
| 2026-11-21 | `v2026.1106.0` → `v2026.1117.0` | 33 + 3 fixes | 0 dropped; conflicts in credentials (upstream added GitHub API credential + issue-scoped provider), OmniRoute imports, OTel startup ordering, heartbeat guard, provider-aware contracts | `fixes/synced-v2026.1117.0` @ `7598c695b4`; 1590 upstream commits absorbed; typecheck at tag baseline (991), gates at baseline |

## Upstream candidate tracker

Verified against the GitHub API on 2026-11-21. These three are **already open** upstream;
follow up instead of opening duplicates. If any merges, the next pre-flight marks the
corresponding local commits as `DROP`.

| chain | PR | state | action |
|---|---|---|---|
| lease cwd (`7f39db34d`) | [#13733](https://github.com/paperclipai/paperclip/pull/13733) | open, updated 2026-10-15 | follow up |
| Sandbox API version (3 commits) | [#13734](https://github.com/paperclipai/paperclip/pull/13734) | open, updated 2026-11-01 | follow up; overlaps #13735 in `sandbox-cr-builder.ts` |
| git `safe.directory` (3 commits) | [#13735](https://github.com/paperclipai/paperclip/pull/13735) | open, updated 2026-11-01 | follow up; rebase after #13734 merges |
| heartbeat concurrency (5 commits) | — | not submitted | clean up and open a PR |
| OTel tracing (2 + 1 Docker) | — | not submitted | check overlap with upstream tracing first |
| `billingType`, `ci: add jq` | — | not submitted | small PR candidates |
| GitLab self-hosted (11 commits) | — | fork-specific | split out generic parts (CA cert, custom port, IPv6) as a partial PR |
| OpenRouter / OmniRoute (3 commits) | — | fork-specific (`OmniRoute` absent upstream) | keep local |
| GitHub identity re-integration (`034592186`) | — | depends on upstream | rework, do not upstream |

Historical check: [#1053](https://github.com/paperclipai/paperclip/pull/1053) ("support generic git
providers in project workspace URLs") was **closed without merge** and its commits
(`a83e9702f4`, `51ccf22f46`, UI-only) are not on `origin/master` or any release tag. Upstream still
has no credential resolver for generic/self-hosted GitLab hosts, so the fork chain remains needed.
