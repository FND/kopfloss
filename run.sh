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
testfiles=$@

cfgfile="`dirname $0`/.kopfloss.cfg"
echo "// temporary configuration settings" > $cfgfile
if [ "$verbose" = "true" ]; then
	echo "QUnit.config.headless.verbose = true;" >> $cfgfile
fi
if [ "$abort" = "true" ]; then
	echo "QUnit.config.headless.abortOnFail = true;" >> $cfgfile
fi

if [ -n "`which node`" ]; then
	node dispatch_node.js $cfgfile $testfiles
elif [ -n "`which smjs`" ]; then
	smjs dispatch_spidermonkey.js $cfgfile $testfiles
else
	die "ERROR: no JavaScript engine detected"
fi
