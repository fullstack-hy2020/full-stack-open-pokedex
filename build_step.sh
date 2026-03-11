#!/usr/bin/env bash

set -e # exit on error

echo "Installing dependencies..."
npm install

echo "Running Webpack build..."
# This replaces the old "build" script command
npx webpack --mode production

echo "Build complete!"