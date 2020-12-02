#!/bin/sh

BUNDLE_DIR=lib
BUNDLE_FILE=index.js


printf "[1/2] Cleaning $BUNDLE_DIR folder... "
rm -rf $BUNDLE_DIR/*
echo OK


printf "[2/2] Creating $BUNDLE_FILE file... "
node_modules/.bin/rollup -c --compact --silent
echo OK


exit 0
