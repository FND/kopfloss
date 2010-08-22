#!/usr/bin/env sh

filename="sample.js"

# Spidermonkey
js -f qunit.js -f headless.js -f $filename -f report.js
