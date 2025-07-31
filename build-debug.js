const fs = require('fs');
const path = require('path');

console.log('=== Build Debug Information ===');
console.log('Current working directory:', process.cwd());
console.log('Current directory contents:');
try {
  const files = fs.readdirSync('.');
  files.forEach(file => {
    const stats = fs.statSync(file);
    console.log(`  ${file} - ${stats.isDirectory() ? 'DIR' : 'FILE'}`);
  });
} catch (error) {
  console.log('Error reading current directory:', error.message);
}

console.log('\nChecking for build directory:');
try {
  if (fs.existsSync('./build')) {
    console.log('✅ build directory exists');
    const buildFiles = fs.readdirSync('./build');
    console.log('Build directory contents:', buildFiles);
    
    if (fs.existsSync('./build/index.js')) {
      console.log('✅ build/index.js exists');
    } else {
      console.log('❌ build/index.js does not exist');
    }
  } else {
    console.log('❌ build directory does not exist');
  }
} catch (error) {
  console.log('Error checking build directory:', error.message);
}

console.log('\nChecking for src directory:');
try {
  if (fs.existsSync('./src')) {
    console.log('✅ src directory exists');
    const srcFiles = fs.readdirSync('./src');
    console.log('Src directory contents:', srcFiles);
  } else {
    console.log('❌ src directory does not exist');
  }
} catch (error) {
  console.log('Error checking src directory:', error.message);
}

console.log('\n=== End Debug Information ==='); 