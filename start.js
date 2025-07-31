const fs = require('fs');
const path = require('path');

console.log('=== Starting Application ===');
console.log('Current working directory:', process.cwd());

// Check multiple possible build locations
const possibleBuildPaths = [
  path.join(__dirname, 'build', 'index.js'),
  path.join(__dirname, 'src', 'build', 'index.js'),
  path.join(__dirname, '..', 'build', 'index.js'),
  path.join(__dirname, '..', 'src', 'build', 'index.js')
];

const possibleSrcPaths = [
  path.join(__dirname, 'src', 'index.ts'),
  path.join(__dirname, 'src', 'src', 'index.ts'),
  path.join(__dirname, '..', 'src', 'index.ts')
];

console.log('Checking for build files in multiple locations:');
possibleBuildPaths.forEach((buildPath, index) => {
  console.log(`  ${index + 1}. ${buildPath} - ${fs.existsSync(buildPath) ? '✅ EXISTS' : '❌ NOT FOUND'}`);
});

console.log('\nChecking for src files in multiple locations:');
possibleSrcPaths.forEach((srcPath, index) => {
  console.log(`  ${index + 1}. ${srcPath} - ${fs.existsSync(srcPath) ? '✅ EXISTS' : '❌ NOT FOUND'}`);
});

// Try to find and use a build file
let foundBuildFile = null;
for (const buildPath of possibleBuildPaths) {
  if (fs.existsSync(buildPath)) {
    foundBuildFile = buildPath;
    break;
  }
}

if (foundBuildFile) {
  console.log(`\n✅ Found build file: ${foundBuildFile}`);
  console.log('Starting production build...');
  require(foundBuildFile);
} else {
  console.log('\n❌ No build files found in any expected location');
  console.log('\nCurrent directory contents:');
  try {
    const files = fs.readdirSync('.');
    files.forEach(file => {
      const stats = fs.statSync(file);
      console.log(`  ${file} - ${stats.isDirectory() ? 'DIR' : 'FILE'}`);
    });
  } catch (error) {
    console.log('Error reading directory:', error.message);
  }
  
  // Check if we're in a subdirectory
  console.log('\nParent directory contents:');
  try {
    const parentFiles = fs.readdirSync('..');
    parentFiles.forEach(file => {
      const stats = fs.statSync(path.join('..', file));
      console.log(`  ${file} - ${stats.isDirectory() ? 'DIR' : 'FILE'}`);
    });
  } catch (error) {
    console.log('Error reading parent directory:', error.message);
  }
  
  process.exit(1);
} 