#!/bin/bash
set -euo pipefail

# Run esbuild with config
node esbuild.config.js

# Create package.json in build directory if it doesn't exist
cd build && npm init -y

# Install external dependencies in the build directory
npm install --production mock-aws-s3 aws-sdk nock

# Return to original directory
cd ../

# Deploy to Google Cloud Functions
gcloud functions deploy wsh2025-service --gen2 --project wsh2025 --region asia-south2 --entry-point=wshservice --source build --trigger-http --runtime=nodejs20 --allow-unauthenticated