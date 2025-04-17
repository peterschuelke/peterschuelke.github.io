#!/bin/bash

# Clean up any previous build
rm -rf dist
rm -rf web/dist

# Build the Redwood app
yarn rw build

# Create the dist directory if it doesn't exist
mkdir -p dist

# Create a .nojekyll file to tell GitHub Pages not to use Jekyll
touch web/dist/.nojekyll

# Copy the built files to the dist directory
cp -r web/dist/* dist/

# Clean up
rm -rf web/dist
