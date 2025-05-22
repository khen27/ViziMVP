#!/bin/bash

# Kill any running Expo and Metro processes
echo "Killing existing Expo and Metro processes..."
killall -9 node 2>/dev/null || true
kill -9 $(lsof -t -i:8081) 2>/dev/null || true
kill -9 $(lsof -t -i:19000) 2>/dev/null || true
kill -9 $(lsof -t -i:19001) 2>/dev/null || true
kill -9 $(lsof -t -i:19002) 2>/dev/null || true

# Clear Expo cache
echo "Clearing Expo cache..."
rm -rf node_modules/.cache/

# Set environment variables to disable DevTools
export EXPO_NO_DEV_MENU=true
export EXPO_NO_INSPECTOR=true
export EXPO_DISABLE_DEVELOPER_TOOLS=true
export EXPO_DISABLE_INSPECTOR=true
export NODE_ENV=production

# Start Expo with production settings
echo "Starting Expo in production mode..."
npx expo start --no-dev --minify 