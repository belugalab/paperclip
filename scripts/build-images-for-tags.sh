#!/usr/bin/env bash
# Build one Docker image per release tag from a clean detached worktree.
#
# Defaults to the `cloud` target with the Kubernetes sandbox provider bundled
# (CLOUD_BUNDLED_PLUGINS=kubernetes). Use --target production for the lean
# self-hosted image. Mirrors CI's full commit SHA in PAPERCLIP_BUILD_COMMIT
# and weekly CLI tools cache epoch. Each tag is built serially so a failure
# does not stop the remaining tags; the exit code is non-zero if any tag failed.
#
# No host pnpm is required: the Dockerfile resolves pnpm-lock.yaml inside its
# own deps stage. A container runtime (docker or podman) is required.
# Pushing is opt-in via --push; log in to the registry beforehand. Images that
# already exist locally are skipped by default; --push-existing publishes one
# of those images without rebuilding it (useful when a rebuild cannot fit on
# disk). --force still rebuilds and is mutually exclusive with --push-existing.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# Keep in sync with doc/plans/2026-11-21-upstream-sync-runbook.md.
UPSTREAM_TAGS=(
  v2026.1001.0
  v2026.1005.0
  v2026.1012.0
  v2026.1023.0
  v2026.1106.0
  v2026.1117.0
)
FORK_TAGS=(
  fixes/synced-v2026.1005.0
  fixes/synced-v2026.1012.0
  fixes/synced-v2026.1023.0
  fixes/synced-v2026.1106.0
  fixes/synced-v2026.1117.0
)

TARGET=cloud
PLUGINS=kubernetes
PLUGINS_SET=0
RUNTIME=""
IMAGE_PREFIX=paperclip-local
IMAGE_REPO=ghcr.io/paperclipai/paperclip
PUSH=0
PUSH_EXISTING=0
UPSTREAM_ONLY=0
FETCH=0
FORCE=0
KEEP_WORKTREES=0
DRY_RUN=0
VERIFY=0
REPORT=""
TAGS=()

usage() {
  cat <<'EOF'
Usage: scripts/build-images-for-tags.sh [options] [TAG ...]

Build the cloud image (Kubernetes plugin bundled) for every supplied git
tag/ref. With no TAGs, build the release tags from the upstream-sync runbook
plus the fork checkpoint tags. Existing local images are skipped by default,
so an image you already have (for example v2026.1001.0) is never overwritten.
Pushing is opt-in: --push tags and pushes each successfully built image to
--image-repo. Images that already exist locally are skipped; --push-existing
publishes one of those images as-is, with no rebuild, while --force rebuilds it.
Log in to the registry before pushing.

Options:
  --target NAME       Dockerfile stage: cloud (default) or production
  --plugins LIST      sandbox providers to bundle in cloud (default: kubernetes)
  --no-plugins        build the cloud target with no bundled providers
  --runtime NAME      docker or podman (auto-detected by default)
  --image-prefix P    local image name prefix (default: paperclip-local)
  --push              push each built image to --image-repo after a successful build
  --push-existing     push an already-existing local image instead of rebuilding it
                      (implies --push; cannot be combined with --force)
  --image-repo REPO   registry repository for --push (default: ghcr.io/paperclipai/paperclip)
  --upstream-only     with no TAGs, build only upstream release tags
  --fetch             run `git fetch origin --tags --force` first
  --force             rebuild images that already exist locally
  --verify            smoke-run each built image (`node --version`)
  --report FILE       append a status table to FILE
  --keep-worktrees    keep the temporary worktrees for debugging
  --dry-run           print the build commands without running them
  -h, --help          show this help

Examples:
  scripts/build-images-for-tags.sh --upstream-only
  scripts/build-images-for-tags.sh --target production   # lean self-hosted image
  scripts/build-images-for-tags.sh --plugins "daytona kubernetes"
  scripts/build-images-for-tags.sh v2026.1106.0 v2026.1117.0 --verify
  scripts/build-images-for-tags.sh --push-existing v2026.1117.0
  scripts/build-images-for-tags.sh fixes/main --image-prefix paperclip-preview
  scripts/build-images-for-tags.sh --push --image-repo ghcr.io/belugalab/paperclip --upstream-only
EOF
}

while (($#)); do
  case "$1" in
    --target)         TARGET="$2"; shift 2 ;;
    --target=*)       TARGET="${1#*=}"; shift ;;
    --runtime)        RUNTIME="$2"; shift 2 ;;
    --runtime=*)      RUNTIME="${1#*=}"; shift ;;
    --image-prefix)   IMAGE_PREFIX="$2"; shift 2 ;;
    --image-prefix=*) IMAGE_PREFIX="${1#*=}"; shift ;;
    --push)           PUSH=1; shift ;;
    --push-existing)  PUSH=1; PUSH_EXISTING=1; shift ;;
    --image-repo)     IMAGE_REPO="$2"; shift 2 ;;
    --image-repo=*)   IMAGE_REPO="${1#*=}"; shift ;;
    --plugins)        PLUGINS="$2"; PLUGINS_SET=1; shift 2 ;;
    --plugins=*)      PLUGINS="${1#*=}"; PLUGINS_SET=1; shift ;;
    --no-plugins)     PLUGINS=""; PLUGINS_SET=1; shift ;;
    --report)         REPORT="$2"; shift 2 ;;
    --report=*)       REPORT="${1#*=}"; shift ;;
    --upstream-only)  UPSTREAM_ONLY=1; shift ;;
    --fetch)          FETCH=1; shift ;;
    --force)          FORCE=1; shift ;;
    --verify)         VERIFY=1; shift ;;
    --keep-worktrees) KEEP_WORKTREES=1; shift ;;
    --dry-run)        DRY_RUN=1; shift ;;
    -h|--help)        usage; exit 0 ;;
    --)               shift; TAGS+=("$@"); break ;;
    -*)               echo "Unknown option: $1" >&2; usage >&2; exit 2 ;;
    *)                TAGS+=("$1"); shift ;;
  esac
done

if ((${#TAGS[@]} == 0)); then
  TAGS=("${UPSTREAM_TAGS[@]}")
  if ((!UPSTREAM_ONLY)); then
    TAGS+=("${FORK_TAGS[@]}")
  fi
fi

if ((PUSH)) && [[ -z "$IMAGE_REPO" ]]; then
  echo "ERROR: --push requires a non-empty --image-repo" >&2
  exit 2
fi

if ((PUSH_EXISTING && FORCE)); then
  echo "ERROR: --push-existing and --force are mutually exclusive" >&2
  exit 2
fi

if [[ -z "$RUNTIME" ]]; then
  if command -v docker >/dev/null 2>&1; then
    RUNTIME=docker
  elif command -v podman >/dev/null 2>&1; then
    RUNTIME=podman
  elif ((DRY_RUN)); then
    RUNTIME=docker
  else
    echo "ERROR: neither docker nor podman found; cannot build images." >&2
    exit 1
  fi
fi

if ((!DRY_RUN)) && ! "$RUNTIME" info >/dev/null 2>&1; then
  echo "ERROR: $RUNTIME is installed but its daemon is not reachable." >&2
  exit 1
fi

if ((FETCH)) && ((!DRY_RUN)); then
  echo "==> Fetching tags from origin"
  git -C "$REPO_ROOT" fetch origin --tags --force
fi

pick_tmp_base() {
  local candidate
  for candidate in "${TMPDIR:-}" /tmp/opencode /tmp; do
    if [[ -n "$candidate" && -d "$candidate" && -w "$candidate" ]]; then
      printf '%s\n' "$candidate"
      return 0
    fi
  done
  echo "ERROR: no writable temp directory found" >&2
  return 1
}
TMP_BASE="$(pick_tmp_base)"
WORK_ROOT="$(mktemp -d "$TMP_BASE/paperclip-tag-builds.XXXXXX")"
declare -a WORKTREES=()
declare -a RESULTS=()
EPOCH="$(date -u +%G-W%V)"
if [[ "$TARGET" == cloud ]]; then
  PLUGIN_LABEL="${PLUGINS:-none}"
else
  PLUGIN_LABEL=none
fi

image_exists() {
  # In dry-run with no runtime installed we cannot inspect the local store.
  if ((DRY_RUN)) && ! command -v "$RUNTIME" >/dev/null 2>&1; then
    return 1
  fi
  "$RUNTIME" image inspect "$1" >/dev/null 2>&1
}

cleanup() {
  local rc=$?
  if ((KEEP_WORKTREES)); then
    echo "==> Worktrees kept at $WORK_ROOT"
    return "$rc"
  fi
  local wt
  for wt in "${WORKTREES[@]}"; do
    git -C "$REPO_ROOT" worktree remove --force "$wt" >/dev/null 2>&1 || true
  done
  rm -rf "$WORK_ROOT"
  return "$rc"
}
trap cleanup EXIT

printf '%-36s %-9s %-40s %s\n' REF STATUS IMAGE REMOTE
if [[ -n "$REPORT" ]]; then
  printf '# image builds %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$REPORT"
fi

failed=0
for ref in "${TAGS[@]}"; do
  safe="${ref//\//-}"
  image="${IMAGE_PREFIX}:${safe}"
  remote="$IMAGE_REPO:$safe"
  remote_cell="-"
  worktree="$WORK_ROOT/$safe"
  log="$WORK_ROOT/$safe.log"

  if ! sha="$(git -C "$REPO_ROOT" rev-parse --verify "${ref}^{commit}" 2>/dev/null)"; then
    echo "ERROR: cannot resolve ref: $ref" >&2
    RESULTS+=("fail|$ref|$image|$remote_cell|unresolved ref")
    failed=$((failed + 1))
    printf '%-36s %-9s %-40s %s\n' "$ref" FAIL "$image" -
    continue
  fi

  if ((!FORCE)) && image_exists "$image"; then
    if ((PUSH_EXISTING)); then
      echo "==> $ref -> $image already exists; publishing $remote without rebuilding"
      remote_cell="$remote"
      status=ok
      if ((DRY_RUN)); then
        printf '    '
        printf '%q tag %q %q\n' "$RUNTIME" "$image" "$remote"
        printf '    '
        printf '%q push %q\n' "$RUNTIME" "$remote"
      elif ((VERIFY)) && ! "$RUNTIME" run --rm "$image" node --version >/dev/null 2>&1; then
        status=fail
      elif "$RUNTIME" tag "$image" "$remote" >/dev/null 2>&1 && "$RUNTIME" push "$remote" 2>&1 | tee "$log"; then
        status=ok
      else
        status=fail
      fi
      if [[ "$status" != ok ]]; then
        failed=$((failed + 1))
        echo "    FAILED: see $log" >&2
      fi
      RESULTS+=("$status|$ref|$image|$remote_cell|$sha")
      printf '%-36s %-9s %-40s %s\n' "$ref" "${status^^}" "$image" "$remote_cell"
      continue
    fi
    if ((PUSH)); then
      echo "==> $ref -> $image already exists; skipping (use --push-existing to publish it, or --force --push to rebuild and push)"
    else
      echo "==> $ref -> $image already exists; skipping (use --force to rebuild)"
    fi
    RESULTS+=("skip|$ref|$image|$remote_cell|$sha")
    printf '%-36s %-9s %-40s %s\n' "$ref" SKIP "$image" -
    continue
  fi

  if ! git -C "$REPO_ROOT" worktree add --detach "$worktree" "$sha" >/dev/null 2>&1; then
    RESULTS+=("fail|$ref|$image|$remote_cell|worktree add failed")
    failed=$((failed + 1))
    printf '%-36s %-9s %-40s %s\n' "$ref" FAIL "$image" -
    continue
  fi
  WORKTREES+=("$worktree")

  args=(
    build
    --file "$worktree/Dockerfile"
    --target "$TARGET"
    --tag "$image"
    --build-arg "PAPERCLIP_BUILD_COMMIT=$sha"
    --build-arg "PAPERCLIP_BUILD_VERSION=$ref"
    --build-arg "CLI_TOOLS_CACHE_EPOCH=$EPOCH"
  )
  if ((PUSH)); then
    args+=(--tag "$remote")
  fi
  if [[ "$TARGET" == cloud ]]; then
    args+=(
      --build-arg "CLOUD_BUNDLED_PLUGINS=$PLUGINS"
      --build-arg CLOUD_BUNDLED_SERVER_DEPS=@sentry/node
    )
  elif ((PLUGINS_SET)); then
    echo "WARNING: --plugins only applies to the cloud target; ignoring for $TARGET" >&2
  fi

  target_note="target $TARGET, plugins: $PLUGIN_LABEL"
  if ((PUSH)); then
    echo "==> $ref @ ${sha:0:12} -> $image (+ $remote) ($RUNTIME, $target_note)"
  else
    echo "==> $ref @ ${sha:0:12} -> $image ($RUNTIME, $target_note)"
  fi
  status=ok
  if ((DRY_RUN)); then
    printf '    '
    printf '%q ' "$RUNTIME" "${args[@]}" "$worktree"
    printf '\n'
    if ((PUSH)); then
      printf '    '
      printf '%q push %q\n' "$RUNTIME" "$remote"
      remote_cell="$remote"
    fi
  elif "$RUNTIME" "${args[@]}" "$worktree" 2>&1 | tee "$log"; then
    if ((VERIFY)); then
      if "$RUNTIME" run --rm "$image" node --version >/dev/null 2>&1; then
        status=ok
      else
        status=fail
      fi
    fi
    if [[ "$status" == ok ]] && ((PUSH)); then
      echo "==> Pushing $remote"
      remote_cell="$remote"
      if "$RUNTIME" push "$remote" 2>&1 | tee -a "$log"; then
        :
      else
        status=fail
      fi
    fi
  else
    status=fail
  fi

  if [[ "$status" != ok ]]; then
    failed=$((failed + 1))
    echo "    FAILED: see $log" >&2
  fi
  RESULTS+=("$status|$ref|$image|$remote_cell|$sha")
  printf '%-36s %-9s %-40s %s\n' "$ref" "${status^^}" "$image" "$remote_cell"
done

if [[ -n "$REPORT" ]]; then
  printf '%-36s %-9s %-40s %s\n' REF STATUS IMAGE REMOTE >> "$REPORT"
  for row in "${RESULTS[@]}"; do
    IFS='|' read -r status ref image remote_cell _detail <<< "$row"
    printf '%-36s %-9s %-40s %s\n' "$ref" "${status^^}" "$image" "$remote_cell" >> "$REPORT"
  done
fi

echo
echo "Built ${#RESULTS[@]} image(s); failed: $failed"
if ((failed > 0)); then
  exit 1
fi
