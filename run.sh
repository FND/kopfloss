#!/usr/bin/env sh

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

cfgfile="`dirname $0`/.kopfloss.cfg"
echo "// temporary configuration settings" > $cfgfile
if [ "$verbose" = "true" ]; then
	echo "QUnit.config.headless.verbose = true;" >> $cfgfile
fi
if [ "$abort" = "true" ]; then
	echo "QUnit.config.headless.abortOnFail = true;" >> $cfgfile
fi

if [ -n "`which smjs`" ]; then
	smjs -f fixtures/spidermonkey.js -f lib/qunit.js -f lib/headless.js \
		-f $cfgfile $testfiles \
		-f lib/report.js
elif [ -n "`which node`" ]; then
	node node_dispatch.js $cfgfile $@
else
	die "ERROR: failed to detect JavaScript engine"
fi
