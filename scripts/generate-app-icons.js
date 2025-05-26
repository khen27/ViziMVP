const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ICON_SIZES = {
  ios: [
    { size: 20, name: 'icon-20.png' },
    { size: 29, name: 'icon-29.png' },
    { size: 40, name: 'icon-40.png' },
    { size: 60, name: 'icon-60.png' },
    { size: 76, name: 'icon-76.png' },
    { size: 83.5, name: 'icon-83.5.png' },
    { size: 1024, name: 'icon-1024.png' }
  ],
  android: [
    { size: 48, name: 'icon-48.png', density: 'mdpi' },
    { size: 72, name: 'icon-72.png', density: 'hdpi' },
    { size: 96, name: 'icon-96.png', density: 'xhdpi' },
    { size: 144, name: 'icon-144.png', density: 'xxhdpi' },
    { size: 192, name: 'icon-192.png', density: 'xxxhdpi' },
    { size: 512, name: 'icon-512.png', density: 'playstore' }
  ]
};

async function generateIcons() {
  const svgBuffer = fs.readFileSync(path.join(__dirname, '../assets/icon-clean.svg'));
  
  // Create directories if they don't exist
  const iosIconDir = path.join(__dirname, '../assets/ios');
  const androidIconDir = path.join(__dirname, '../assets/android');
  
  if (!fs.existsSync(iosIconDir)) {
    fs.mkdirSync(iosIconDir, { recursive: true });
  }
  if (!fs.existsSync(androidIconDir)) {
    fs.mkdirSync(androidIconDir, { recursive: true });
  }

  // Generate master 1024×1024 PNG first
  await sharp(svgBuffer)
    .resize(1024, 1024)
    .png()
    .toFile(path.join(__dirname, '../assets/icon.png'));
  console.log('Generated master icon: 1024×1024');

  // Generate iOS icons
  for (const { size, name } of ICON_SIZES.ios) {
    const pixelSize = Math.round(size);
    await sharp(svgBuffer)
      .resize(pixelSize, pixelSize)
      .png()
      .toFile(path.join(iosIconDir, name));
    console.log(`Generated iOS icon: ${pixelSize}×${pixelSize}`);
  }

  // Generate Android icons
  for (const { size, name, density } of ICON_SIZES.android) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(androidIconDir, name));
    console.log(`Generated Android icon: ${size}×${size} (${density})`);
  }
}

generateIcons().catch(console.error); 