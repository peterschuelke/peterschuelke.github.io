#!/bin/bash

# Build the Redwood app
yarn rw build

# Create the dist directory if it doesn't exist
mkdir -p web/dist

# Create a .nojekyll file to tell GitHub Pages not to use Jekyll
touch web/dist/.nojekyll

# Copy the built files to the root directory
cp -r web/dist/* .

# Clean up
rm -rf web/dist
