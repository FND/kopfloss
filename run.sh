#!/usr/bin/env sh

# Usage:
#   $ run.sh [-v] <testfiles>

if [ "$1" = "-v" ]; then
	verbose=true
	shift
fi

filename=${1:?}

if [ -n "$verbose" ]; then
	cfg='-e QUnit.config.headless.verbose=true;' # XXX: must not contain spaces
fi

# Spidermonkey
js -f qunit.js -f headless.js $cfg -f $filename -f report.js
