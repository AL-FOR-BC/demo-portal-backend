const fs = require('fs');
const path = require('path');

console.log('=== Starting Application ===');
console.log('Current working directory:', process.cwd());

// Check if build/index.js exists
const buildPath = path.join(__dirname, 'build', 'index.js');
const srcPath = path.join(__dirname, 'src', 'index.ts');

console.log('Checking for build file:', buildPath);
console.log('Checking for src file:', srcPath);

if (fs.existsSync(buildPath)) {
  console.log('✅ Found build/index.js, starting production build...');
  require('./build/index.js');
} else if (fs.existsSync(srcPath)) {
  console.log('❌ build/index.js not found, but src/index.ts exists');
  console.log('This suggests the build process failed. Please check the build logs.');
  process.exit(1);
} else {
  console.log('❌ Neither build/index.js nor src/index.ts found');
  console.log('Current directory contents:');
  try {
    const files = fs.readdirSync('.');
    files.forEach(file => {
      const stats = fs.statSync(file);
      console.log(`  ${file} - ${stats.isDirectory() ? 'DIR' : 'FILE'}`);
    });
  } catch (error) {
    console.log('Error reading directory:', error.message);
  }
  process.exit(1);
} 