#!/usr/bin/env sh

# QUnit for Spidermonkey
#
# Usage:
#   $ run.sh [-v] <testfiles>

set -e

die() {
    echo "$*"
    exit 1
}

if [ "$1" = "-v" ]; then
	verbose=true
	shift
fi

if [ -z "$1" ]; then
	die "no test files specified"
fi
testfiles=""
for filename in $@; do
	testfiles="$testfiles -f $filename"
done

if [ -n "$verbose" ]; then
	cfg='-e QUnit.config.headless.verbose=true;' # XXX: must not contain spaces
fi

js -f qunit.js -f headless.js $cfg $testfiles -f report.js
