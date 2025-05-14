#!/bin/bash

# Create fonts directory if it doesn't exist
mkdir -p assets/fonts

# Download DM Sans fonts
curl -L -o assets/fonts/DMSans-Regular.ttf "https://github.com/google/fonts/raw/main/ofl/dmsans/DMSans%5Bopsz%2Cwght%5D.ttf"
curl -L -o assets/fonts/DMSans-Medium.ttf "https://github.com/google/fonts/raw/main/ofl/dmsans/DMSans%5Bopsz%2Cwght%5D.ttf"

# Make the script executable
chmod +x scripts/setup-fonts.sh 