#!/bin/bash

set -e  # Exit on error

echo "Starting build process..."

# Clean up previous builds
echo "Cleaning up previous builds..."
rm -rf dist
rm -rf web/dist
rm -rf web/public/storybook

# Build Redwood app
echo "Building Redwood app..."
yarn rw build

# Create necessary directories
echo "Creating directories..."
mkdir -p dist
mkdir -p dist/storybook
mkdir -p dist/data

# Create .nojekyll files
echo "Creating .nojekyll files..."
touch dist/.nojekyll
touch dist/storybook/.nojekyll

# Build Storybook
echo "Building Storybook..."
(cd web && yarn rw storybook --build --ci)

# Copy built files
echo "Copying built files..."
cp -r web/dist/* dist/

# Copy static files
echo "Copying static files..."
if [ -d "web/public" ]; then
  find web/public -type f -not -path "*/storybook/*" -exec cp --parents {} dist/ \;
fi

# Copy Storybook files
echo "Copying Storybook files..."
cp -r web/public/storybook/* dist/storybook/

# Fix Storybook paths
echo "Fixing Storybook paths..."
find dist/storybook -type f -name "*.html" -exec sed -i '' 's|/storybook/|/storybook/index.html|g' {} \;

# Set proper permissions
echo "Setting permissions..."
chmod -R 755 dist/
find dist/ -type f -exec chmod 644 {} \;

# List the contents of dist directory
echo "Contents of dist directory:"
ls -la dist/
if [ -d "dist/data" ]; then
  echo "Contents of data directory:"
  ls -la dist/data/
fi
if [ -d "dist/storybook" ]; then
  echo "Contents of storybook directory:"
  ls -la dist/storybook/
fi

# Clean up
echo "Cleaning up..."
rm -rf web/dist
rm -rf web/public/storybook

echo "Build complete!"
