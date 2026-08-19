const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== Simple Build Process ===');
console.log('Current working directory:', process.cwd());

// Check if TypeScript is available
try {
  console.log('Checking TypeScript installation...');
  execSync('npx tsc --version', { stdio: 'inherit' });
} catch (error) {
  console.log('TypeScript not available, installing...');
  execSync('npm install -g typescript', { stdio: 'inherit' });
}

// Create build directory if it doesn't exist
const buildDir = path.join(__dirname, 'build');
if (!fs.existsSync(buildDir)) {
  console.log('Creating build directory...');
  fs.mkdirSync(buildDir, { recursive: true });
}

// Copy and compile main files
const filesToCompile = [
  'src/index.ts',
  'src/config/index.ts',
  'src/utils/MongoDB.ts',
  'src/services/ExpressApp.ts',
  'src/Controllers/UserControllers.ts',
  'src/Controllers/AdminController.ts',
  'src/Controllers/BcAuthControllers.ts',
  'src/middlewares/AuthMiddleWare.ts',
  'src/middlewares/index.ts',
  'src/routes/UserRoutes.ts',
  'src/routes/AdminRoutes.ts',
  'src/routes/BcAuthRoutes.ts',
  'src/routes/index.ts',
  'src/models/User.ts',
  'src/models/Settings.ts',
  'src/models/BcConfig.ts',
  'src/models/index.ts',
  'src/@types/Auth.dto.ts',
  'src/@types/User.dto.ts'
];

console.log('Compiling TypeScript files...');
filesToCompile.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`Compiling ${file}...`);
    try {
      execSync(`npx tsc ${file} --outDir build --target es5 --module commonjs --esModuleInterop --allowSyntheticDefaultImports`, { stdio: 'inherit' });
    } catch (error) {
      console.log(`Error compiling ${file}:`, error.message);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
});

console.log('=== Build Complete ===');
console.log('Build directory contents:');
if (fs.existsSync(buildDir)) {
  const buildFiles = fs.readdirSync(buildDir, { recursive: true });
  buildFiles.forEach(file => {
    console.log(`  ${file}`);
  });
} else {
  console.log('Build directory not found!');
} 