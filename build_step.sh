#!/bin/bash
# Script to build the project for Render deployment. Render will run this script. 

echo "Build script"

# add the commands here
npm install
npm run build

echo "Build script finished"