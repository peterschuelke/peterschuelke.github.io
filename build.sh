#!/bin/bash

set -e  # Exit on error

echo "Starting build process..."

# Clean up any previous build
echo "Cleaning up previous builds..."
rm -rf dist
rm -rf web/dist

# Build the Redwood app
echo "Building Redwood app..."
yarn rw build

# Create the dist directory if it doesn't exist
echo "Creating dist directory..."
mkdir -p dist

# Create a .nojekyll file to tell GitHub Pages not to use Jekyll
echo "Creating .nojekyll file..."
touch web/dist/.nojekyll

# Copy the built files to the dist directory
echo "Copying built files..."
cp -r web/dist/* dist/

# List the contents of dist directory
echo "Contents of dist directory:"
ls -la dist/

# Clean up
echo "Cleaning up..."
rm -rf web/dist

echo "Build completed successfully!"
