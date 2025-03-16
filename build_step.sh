#!/bin/bash

echo "Building the project..."
npm install
npm run build

echo "Starting the server..."
serve -s dist -l 8080
