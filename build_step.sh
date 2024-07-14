#!/bin/bash

echo "Build script starting"

# Install dependencies
echo "Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
  echo "Failed to install dependencies"
  exit 1
fi

# Build the project
echo "Building the project..."
npm run build
if [ $? -ne 0 ]; then
  echo "Build failed"
  exit 1
fi

# List files in the build directory to confirm the build output
echo "Listing build directory contents..."
ls -la build

echo "Build script finished"
