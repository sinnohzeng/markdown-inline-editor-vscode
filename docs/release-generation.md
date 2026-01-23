# Release generation

This document outlines the steps to generate and publish a new release for the project, following [Conventional Commits](https://www.conventionalcommits.org/) and [Semantic Versioning (SemVer)](https://semver.org/) guidelines.

## Create a Release

To create a new release, run `node scripts/release.js`. This script will:

1. Determine the next version based on commit messages since the last tag using `git-cliff`.
2. Generate or update the `CHANGELOG.md` file with the changes for the new version.
3. Update the `package.json` and `package-lock.json` version fields.
4. Commit the changes with a conventional commit message.
5. Provide instructions for pushing the changes and tagging the release.
