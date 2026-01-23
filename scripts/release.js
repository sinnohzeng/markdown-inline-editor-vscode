#!/usr/bin/env node
const { execSync } = require("child_process");

/**
 * Release helper script for markdown-inline-editor-vscode.
 * - Gets next version with git-cliff
 * - Generates CHANGELOG.md
 * - Bumps package.json version
 * - Commits changes
 * - Prints push/undo instructions
 */

function run(cmd, opts = {}) {
  return execSync(cmd, { stdio: "pipe", encoding: "utf8", ...opts }).trim();
}

function log(msg) {
  console.log(`\x1b[36m${msg}\x1b[0m`);
}

try {
  // check that we are on main and working tree is clean
  const branch = run("git rev-parse --abbrev-ref HEAD");
  if (branch !== "main") {
    throw new Error(
      `You must be on the main branch to run this script. Current branch: ${branch}`,
    );
  }
  const status = run("git status --porcelain");
  if (status) {
    throw new Error(
      "Your working tree is not clean. Please commit or stash your changes before running this script.",
    );
  }
  log("🔍 Determining next version with git-cliff...");
  const nextVersion = run("npx git-cliff --bumped-version");
  log(`Next version: ${nextVersion}`);

  log("📝 Generating CHANGELOG.md...");
  run(`npx git-cliff -o CHANGELOG.md --tag ${nextVersion}`);
  log("🔢 Bumping package.json version...");
  run(`npm version ${nextVersion} --no-git-tag-version`);

  log("✅ Committing changes...");
  run("git add CHANGELOG.md package.json package-lock.json");
  run(`git commit -m "chore(release): ${nextVersion}"`);

  log("🎉 Release prep complete!");
  console.log("\nNext steps:");
  console.log(
    `  1. Push changes including the new tag:\n     git push origin main --follow-tags`,
  );
  console.log(
    "  2. If you need to undo, run:\n     git reset --hard HEAD~1\n     git tag -d v" +
      nextVersion,
  );
} catch (err) {
  console.error("\x1b[31mRelease failed:\x1b[0m", err.message);
  process.exit(1);
}
