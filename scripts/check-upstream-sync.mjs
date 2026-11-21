#!/usr/bin/env node
/**
 * Pre-flight report for syncing a fixes branch onto a newer upstream release tag.
 *
 * Usage:
 *   node scripts/check-upstream-sync.mjs --old v2026.1001.0 --new v2026.1005.0 --branch fixes/main
 *   node scripts/check-upstream-sync.mjs ... --json
 *
 * The script only reads git state. It never rebases, commits, or pushes.
 * Exit 1 means "unsafe to continue" (bad refs or invalid package.json);
 * findings such as replay candidates and hotspots are warnings with exit 0.
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const flag = argv[i];
    if (!flag.startsWith("--")) continue;
    const key = flag.slice(2);
    if (key === "json") {
      args[key] = true;
    } else {
      args[key] = argv[i + 1];
      i += 1;
    }
  }
  for (const key of ["old", "new", "branch"]) {
    if (!args[key]) throw new Error(`Missing --${key}`);
  }
  return args;
}

export function extractPrNumbers(subjects) {
  const numbers = new Set();
  for (const subject of subjects) {
    for (const match of subject.matchAll(/#(\d+)\b/g)) numbers.add(match[1]);
  }
  return [...numbers].sort((a, b) => Number(a) - Number(b));
}

export function findCollisions(branchSubjects, upstreamSubjects) {
  const upstreamText = upstreamSubjects.join("\n");
  return extractPrNumbers(branchSubjects).filter((number) =>
    new RegExp(`#${number}\\b`).test(upstreamText),
  );
}

export function intersectFiles(left, right) {
  const rightSet = new Set(right);
  return [...new Set(left)].filter((file) => rightSet.has(file)).sort();
}

export function validatePackageJson(text) {
  try {
    JSON.parse(text);
    return { ok: true, error: null };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

function git(args, options = {}) {
  return execFileSync("git", args, {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...options,
  });
}

function lines(value) {
  return value.split("\n").map((line) => line.trim()).filter(Boolean);
}

function refExists(ref) {
  try {
    git(["rev-parse", "--verify", `${ref}^{commit}`]);
    return true;
  } catch {
    return false;
  }
}

function subjects(range) {
  return lines(git(["log", "--format=%s", range]));
}

function cherryReport(upstream, branch) {
  const output = lines(git(["cherry", upstream, branch]));
  const landed = output
    .filter((line) => line.startsWith("- "))
    .map((line) => {
      const hash = line.slice(2);
      return { hash, subject: git(["log", "-1", "--format=%s", hash]).trim() };
    });
  return { total: output.length, landed, pending: output.filter((line) => line.startsWith("+ ")).length };
}

export function buildReport({ oldTag, newTag, branch }) {
  const refs = { [oldTag]: refExists(oldTag), [newTag]: refExists(newTag), [branch]: refExists(branch) };
  const missing = Object.entries(refs).filter(([, ok]) => !ok).map(([ref]) => ref);
  if (missing.length) {
    return { ok: false, error: `Unknown refs: ${missing.join(", ")}`, refs };
  }

  const branchSubjects = subjects(`${oldTag}..${branch}`);
  const upstreamSubjects = subjects(`${oldTag}..${newTag}`);
  const branchFiles = lines(git(["diff", "--name-only", `${oldTag}..${branch}`]));
  const upstreamFiles = lines(git(["diff", "--name-only", `${oldTag}..${newTag}`]));
  const hotspots = intersectFiles(branchFiles, upstreamFiles).map((file) => ({
    file,
    upstreamCommits: Number(git(["rev-list", "--count", `${oldTag}..${newTag}`, "--", file]).trim()),
  })).sort((a, b) => b.upstreamCommits - a.upstreamCommits);

  let branchPackage;
  try {
    branchPackage = git(["show", `${branch}:package.json`]);
  } catch {
    branchPackage = "";
  }
  const packageJson = {
    branch: validatePackageJson(branchPackage),
    workingTree: validatePackageJson(readFileSync(path.join(repoRoot, "package.json"), "utf8")),
  };

  const drift = {
    upstream: lines(git(["rev-list", "--left-right", "--count", `${oldTag}...${newTag}`]))[0],
    branch: lines(git(["rev-list", "--left-right", "--count", `${oldTag}...${branch}`]))[0],
  };

  const collisions = findCollisions(branchSubjects, upstreamSubjects);
  const cherry = cherryReport(newTag, branch);
  const ok = packageJson.branch.ok && packageJson.workingTree.ok;

  return {
    ok,
    oldTag,
    newTag,
    branch,
    refs,
    drift,
    branchCommits: branchSubjects.length,
    cherry,
    prCollisions: collisions,
    hotspots,
    packageJson,
    warnings: [
      cherry.landed.length ? `${cherry.landed.length} branch commit(s) already upstream: drop them` : null,
      collisions.length ? `PR numbers also present upstream: #${collisions.join(", #")}` : null,
      hotspots.length ? `${hotspots.length} shared files to merge field-by-field` : null,
    ].filter(Boolean),
  };
}

export function formatReport(report) {
  if (!report.ok && report.error) return `ERROR: ${report.error}`;
  const out = [
    `upstream sync: ${report.oldTag} -> ${report.newTag} on ${report.branch}`,
    `drift (old...new): ${report.drift.upstream}   (old...branch): ${report.drift.branch}`,
    `branch commits to replay: ${report.branchCommits}`,
    `git cherry: ${report.cherry.pending} pending, ${report.cherry.landed.length} already upstream`,
  ];
  for (const item of report.cherry.landed) out.push(`  DROP ${item.hash} ${item.subject}`);
  if (report.prCollisions.length) out.push(`REPLAY CANDIDATES: #${report.prCollisions.join(", #")}`);
  out.push(`hotspots (${report.hotspots.length}):`);
  for (const item of report.hotspots) out.push(`  ${String(item.upstreamCommits).padStart(3)} ${item.file}`);
  out.push(`package.json: branch=${report.packageJson.branch.ok ? "valid" : `INVALID (${report.packageJson.branch.error})`}, workingTree=${report.packageJson.workingTree.ok ? "valid" : `INVALID (${report.packageJson.workingTree.error})`}`);
  if (report.warnings.length) out.push(`WARNINGS: ${report.warnings.join(" | ")}`);
  return out.join("\n");
}

if (process.argv[1] && import.meta.url === new URL(`file://${path.resolve(process.argv[1])}`).href) {
  try {
    const args = parseArgs(process.argv.slice(2));
    const report = buildReport({ oldTag: args.old, newTag: args.new, branch: args.branch });
    console.log(args.json ? JSON.stringify(report, null, 2) : formatReport(report));
    process.exitCode = report.ok ? 0 : 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
