const fs = require('fs');
const path = require('path');

const srcDir = 'E:/E-commerce-App/frontend/src';

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

const allFiles = getAllFiles(srcDir).filter(f => f.endsWith('.js') || f.endsWith('.jsx'));

// 1. Identify unused components
const componentDirs = ['components', 'layouts', 'pages'];
const components = allFiles.filter(f => {
    const relative = path.relative(srcDir, f);
    return componentDirs.some(dir => relative.startsWith(dir));
});

const unusedComponents = [];

components.forEach(compPath => {
    const fileName = path.basename(compPath, path.extname(compPath));
    const relativePath = path.relative(srcDir, compPath);
    
    // We search for the filename in all files except the file itself
    let used = false;
    for (const file of allFiles) {
        if (file === compPath) continue;
        const content = fs.readFileSync(file, 'utf8');
        // Simple check for import or usage. 
        // We look for the component name in imports or as a JSX tag
        if (content.includes(fileName)) {
            used = true;
            break;
        }
    }
    
    if (!used) {
        unusedComponents.push(relativePath);
    }
});

// 2. Identify unused imports
const unusedImportsByFile = {};

allFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    const imports = [];
    
    // Simple regex to find imports. 
    // Matches: import { a, b } from '...'; import c from '...';
    const importRegex = /^import\s+(?:(?:[\w*\s{},]*)\s+from\s+)?['"]([^'"]+)['"]/gm;
    let match;
    
    // More precise import parsing
    const importLines = lines.filter(line => line.trim().startsWith('import '));
    
    const fileUnusedImports = [];
    
    importLines.forEach(line => {
        // Handle various import styles
        // import Default from 'path'
        // import { Named } from 'path'
        // import Default, { Named } from 'path'
        // import * as Name from 'path'
        
        const namedMatch = line.match(/{([^}]+)}/);
        const defaultMatch = line.match(/import\s+([\w]+)\s+from/);
        const starMatch = line.match(/import\s+\*\s+as\s+([\w]+)\s+from/);
        
        let importedSymbols = [];
        if (namedMatch) {
            importedSymbols = importedSymbols.concat(namedMatch[1].split(',').map(s => s.trim().split(/\s+as\s+/).pop()));
        }
        if (defaultMatch) {
            importedSymbols.push(defaultMatch[1]);
        }
        if (starMatch) {
            importedSymbols.push(starMatch[1]);
        }
        
        // Remove symbols that are empty or have aliases we didn't catch perfectly
        importedSymbols = importedSymbols.map(s => s.trim()).filter(s => s && !s.includes('{') && !s.includes('}'));

        importedSymbols.forEach(symbol => {
            if (symbol === 'React') return; // React is often imported but not explicitly used in JSX
            
            // Check if symbol is used in the rest of the file
            // We look for the symbol but not in the import line itself
            const restOfContent = content.replace(line, '');
            // Word boundary check
            const symbolRegex = new RegExp(`\\b${symbol}\\b`, 'g');
            const matches = content.match(symbolRegex);
            
            // If it only appears once, it's probably just the import
            if (matches && matches.length === 1) {
                fileUnusedImports.push(symbol);
            }
        });
    });
    
    if (fileUnusedImports.length > 0) {
        unusedImportsByFile[path.relative(srcDir, file)] = fileUnusedImports;
    }
});

console.log('--- UNUSED COMPONENTS ---');
console.log(JSON.stringify(unusedComponents, null, 2));
console.log('--- UNUSED IMPORTS ---');
console.log(JSON.stringify(unusedImportsByFile, null, 2));
