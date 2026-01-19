import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceLogo = join(__dirname, '../src/assets/logo-removebg-preview.png');
const outputDir = join(__dirname, '../public/favicon');

// Create output directory if it doesn't exist
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

async function generateFavicons() {
  try {
    console.log('Generating favicons from:', sourceLogo);
    
    // Generate PNG favicons
    for (const { name, size } of sizes) {
      const outputPath = join(outputDir, name);
      await sharp(sourceLogo)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      console.log(`✓ Generated ${name} (${size}x${size})`);
    }

    // Generate favicon.ico (multi-size ICO file)
    // ICO files need special handling - we'll create it from the 32x32 version
    const ico32Path = join(outputDir, 'favicon-32x32.png');
    const icoPath = join(outputDir, 'favicon.ico');
    
    // For ICO, we'll use the 32x32 PNG and convert it
    // Note: sharp doesn't directly support ICO, so we'll create a simple ICO
    // by copying the 32x32 PNG (browsers will accept PNG as ICO)
    await sharp(sourceLogo)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(icoPath);
    console.log('✓ Generated favicon.ico');

    console.log('\n✅ All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();




