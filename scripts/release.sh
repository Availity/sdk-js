#!/usr/bin/env bash

# Instructions:
#
#   - In package.json add:
#       "scripts": { "release": "sh ./scripts/release.sh" }
#
#   - Run:
#       npm run release 2.0.0
#

# error out if something fails
set -e

BUMP_TYPE=$1

if [ -z "$BUMP_TYPE" ]; then
  BUMP_TYPE="minor"
fi

echo "==> Bumping npm version"
VERSION="$(npm version --no-git-tag-version $BUMP_TYPE | sed 's/v//g')"

echo "==> Updating Changelog"
node_modules/.bin/conventional-changelog -i CHANGELOG.md -o CHANGELOG.md -p angular
git add .
git commit -m "docs: changelog"

echo "==> Bumping lerna version"
node_modules/.bin/lerna publish
