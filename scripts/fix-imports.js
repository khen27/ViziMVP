const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Directories to process
const dirsToProcess = ['app', 'components', 'utils', 'context', 'theme'];

// Function to update imports in a file
function updateImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const isTypeScript = filePath.endsWith('.tsx') || filePath.endsWith('.ts');
  
  // Update relative imports
  content = content.replace(
    /(from\s+['"]\.\.\/)+(?!\.\.\/)/g,
    'from \'@/'
  );
  
  // Update relative requires
  content = content.replace(
    /(require\(['"]\.\.\/)+(?!\.\.\/)/g,
    'require(\'@/'
  );
  
  // Update asset imports
  content = content.replace(
    /(require\(['"]\.\.\/)+assets\//g,
    'require(\'@/assets/'
  );
  
  fs.writeFileSync(filePath, content);
}

// Process all files
dirsToProcess.forEach(dir => {
  const pattern = path.join(dir, '**/*.{js,jsx,ts,tsx}');
  const files = glob.sync(pattern);
  
  files.forEach(file => {
    console.log(`Processing ${file}...`);
    updateImports(file);
  });
});

console.log('Done updating imports!'); 