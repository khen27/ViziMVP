const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SIZES = {
  ios: [
    20, 29, 40, 58, 60, 76, 80, 87, 120, 152, 167, 180, 1024
  ],
  android: [
    36, 48, 72, 96, 144, 192
  ]
};

async function generateIcons() {
  const svgBuffer = fs.readFileSync(path.join(__dirname, '../assets/icon.svg'));
  
  // Create directories if they don't exist
  const iosIconDir = path.join(__dirname, '../assets/ios');
  const androidIconDir = path.join(__dirname, '../assets/android');
  
  if (!fs.existsSync(iosIconDir)) {
    fs.mkdirSync(iosIconDir, { recursive: true });
  }
  if (!fs.existsSync(androidIconDir)) {
    fs.mkdirSync(androidIconDir, { recursive: true });
  }

  // Generate iOS icons
  for (const size of SIZES.ios) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(iosIconDir, `icon-${size}.png`));
    console.log(`Generated iOS icon: ${size}x${size}`);
  }

  // Generate Android icons
  for (const size of SIZES.android) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(androidIconDir, `icon-${size}.png`));
    console.log(`Generated Android icon: ${size}x${size}`);
  }

  // Generate main icon
  await sharp(svgBuffer)
    .resize(1024, 1024)
    .png()
    .toFile(path.join(__dirname, '../assets/icon.png'));
  console.log('Generated main icon: 1024x1024');
}

generateIcons().catch(console.error); 