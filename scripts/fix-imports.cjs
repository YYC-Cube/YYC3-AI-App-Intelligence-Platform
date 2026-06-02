const fs = require('fs');
const path = require('path');

// Fix import paths by removing version numbers
function fixImports(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Fix @radix-ui imports: @radix-ui/react-xxx@1.2.3 -> @radix-ui/react-xxx
    content = content.replace(/@radix-ui\/react-[a-z-]+@\d+\.\d+\.\d+/g, (match) => {
        return match.replace(/@\d+\.\d+\.\d+$/, '');
    });

    // Fix lucide-react imports: lucide-react@0.487.0 -> lucide-react
    content = content.replace(/lucide-react@\d+\.\d+\.\d+/g, 'lucide-react');

    // Fix class-variance-authority imports
    content = content.replace(/class-variance-authority@\d+\.\d+\.\d+/g, 'class-variance-authority');

    // Fix other @radix-ui imports without react- prefix
    content = content.replace(/@radix-ui\/[a-z-]+@\d+\.\d+\.\d+/g, (match) => {
        return match.replace(/@\d+\.\d+\.\d+$/, '');
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    }
    return false;
}

// Process all UI component files
const uiDir = path.join(__dirname, '..', 'components', 'ui');
const files = fs.readdirSync(uiDir).filter(f => f.endsWith('.tsx'));

let fixedCount = 0;
files.forEach(file => {
    const filePath = path.join(uiDir, file);
    if (fixImports(filePath)) {
        console.log(`✅ Fixed: ${file}`);
        fixedCount++;
    }
});

console.log(`\n🎉 Completed! Fixed ${fixedCount}/${files.length} files`);
