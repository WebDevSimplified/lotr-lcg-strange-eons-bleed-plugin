/**
 * Publish a release: npm run release -- --notes "What changed"
 *
 * Also what the "Release" GitHub Actions workflow runs (Actions → Release →
 * Run workflow). Options:
 *   --notes "…"        release notes (or the RELEASE_NOTES environment variable)
 *   --notes-file FILE  release notes from a file
 *   --dry-run          build and check, but publish nothing
 *
 * It versions the release by date (v2026.11.20, then v2026.11.20.2, … on the
 * same day), builds the plug-in with a new catalogue timestamp (so Strange
 * Eons sees it as newer), and publishes a GitHub release of the current commit
 * with TheLordOfTheRingsLCG-Bleed.seext attached, followed by the commits
 * since the last release. Needs the GitHub CLI (`gh`), signed in. Run
 * locally, the commit must be pushed and the working tree clean, so the
 * release matches what is on GitHub.
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { build, catalogueTimestamp, PLUGIN_FILE, ROOT } from "./build.js";

const args = process.argv.slice(2);
const option = (name) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
};
const dryRun = args.includes("--dry-run");
const ci = !!process.env.GITHUB_ACTIONS;

const run = (command, commandArgs) =>
  execFileSync(command, commandArgs, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
const succeeds = (command, commandArgs) => {
  try {
    run(command, commandArgs);
    return true;
  } catch {
    return false;
  }
};
const step = (message) => console.log(`\n▸ ${message}`);
const fail = (message) => {
  console.error(`\n✗ ${message}`);
  process.exit(1);
};

// The repository on GitHub, and the commit to release.
if (!succeeds("gh", ["auth", "status"])) fail("The GitHub CLI is not signed in. Run `gh auth login`.");
const repository =
  process.env.GITHUB_REPOSITORY ?? run("gh", ["repo", "view", "--json", "nameWithOwner", "--jq", ".nameWithOwner"]);
const commit = process.env.GITHUB_SHA ?? run("git", ["rev-parse", "HEAD"]);
if (!ci && !dryRun) {
  if (run("git", ["status", "--porcelain"]))
    fail("Commit (or stash) your changes first: the release is built from the current commit.");
  run("git", ["fetch", "--quiet"]);
  const upstream = succeeds("git", ["rev-parse", "@{u}"]) ? run("git", ["rev-parse", "@{u}"]) : "";
  if (upstream !== commit) fail("Push this commit first: the release is tagged on GitHub at the current commit.");
}

// Version: the date, numbered when there is already a release that day.
const now = new Date();
const date = `${now.getUTCFullYear()}.${now.getUTCMonth() + 1}.${now.getUTCDate()}`;
let tag = `v${date}`;
for (let n = 2; succeeds("gh", ["release", "view", tag, "--repo", repository]); n++) tag = `v${date}.${n}`;
const version = tag.slice(1);
const timestamp = catalogueTimestamp(now);
step(`${repository} ${version} at ${commit.slice(0, 7)} (catalogue timestamp ${timestamp})${dryRun ? ", dry run" : ""}`);

step("Building the plug-in");
let built;
try {
  built = build({ timestamp });
} catch (error) {
  fail(error.message);
}
console.log(`  ${built.files} files → ${built.file}`);

if (dryRun) {
  step("Dry run: nothing was published.");
  process.exit(0);
}

step(`Publishing release ${tag}`);
const notesFile = option("--notes-file");
const notes = ((notesFile ? readFileSync(resolve(notesFile), "utf8") : (option("--notes") ?? process.env.RELEASE_NOTES)) || "").trim();
const install =
  `**Install or update:** download \`${PLUGIN_FILE}\` below, copy it into Strange Eons' plug-in folder ` +
  "(Toolbox → Manage Plug-ins → Open Plug-in Folder, replacing any older copy) and restart Strange Eons.";
const url = run("gh", [
  "release", "create", tag, built.file,
  "--repo", repository,
  "--target", commit,
  "--title", version,
  "--notes", [notes, install, `Strange Eons catalogue version: \`${timestamp}\``].filter(Boolean).join("\n\n"),
  "--generate-notes",
]);
console.log(`  ${url}`);
console.log(`  Latest download: https://github.com/${repository}/releases/latest/download/${PLUGIN_FILE}`);
