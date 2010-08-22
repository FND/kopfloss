#!/usr/bin/env sh

# QUnit for Spidermonkey
#
# Usage:
#   $ run.sh [-v] [-x] <testfiles>

set -e

die() {
    echo "$*"
    exit 1
}

while getopts "vx" opt; do
	case "$opt" in
		"v" )
			verbose=true
			;;
		"x" )
			abort=true
			;;
	esac
done
shift $(( $OPTIND - 1 ))

if [ -z "$1" ]; then
	die "ERROR: no test files specified"
fi
testfiles=""
for filename in $@; do
	testfiles="$testfiles -f $filename"
done

cfg='' # TODO: use array to allow for spaces in expressions? generate temporary file?
if [ "$verbose" = "true" ]; then
	cfg="$cfg -e QUnit.config.headless.verbose=true;"
fi
if [ "$abort" = "true" ]; then
	cfg="$cfg -e QUnit.config.headless.abortOnFail=true;"
fi

if [ -n "`which smjs`" ]; then
	smjs -f fixtures/spidermonkey.js -f lib/qunit.js -f lib/headless.js \
		$cfg $testfiles \
		-f lib/report.js
elif [ -n "`which node`" ]; then
	# TODO: cfg support
	node node_dispatch.js $@
else
	die "ERROR: failed to detect JavaScript engine"
fi
