const fs = require('fs');
const path = require('path');

// Fix unknown type issues in JSX by wrapping with String()
function fixUnknownTypes(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Pattern 1: {obj.property} where property might be unknown - wrap with String()
    // This handles cases like {ad.app}, {ad.hook}, etc.
    // Be careful to only wrap simple property access, not complex expressions

    // For CreativeModule.tsx specific patterns
    if (filePath.includes('CreativeModule.tsx')) {
        // Wrap ad.xxx properties that are displayed in JSX
        const patterns = [
            /\{ad\.app\}/g,
            /\{ad\.hook\}/g,
            /\{ad\.adType\}/g,
            /\{ad\.duration\}/g,
            /\{ad\.spend\}/g,
            /\{ad\.pattern\}/g,
            /\{ad\.description\}/g,
        ];

        patterns.forEach(pattern => {
            content = content.replace(pattern, (match) => {
                return `String(${match})`;
            });
        });

        // Fix retention segment properties
        content = content.replace(/\{segment\.time\}/g, '{String(segment.time)}');
        content = content.replace(/\{segment\.action\}/g, '{String(segment.action)}');
        content = content.replace(/\{segment\.impact\}/g, '{String(segment.impact)}');
        content = content.replace(/\{segment\.retention\}/g, '{segment.retention}');
    }

    // Generic pattern for other files: wrap object property access in JSX
    // This is a conservative approach - only wrap when it's likely needed
    // Pattern: {someObj.someProp} where it's used as text content

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    }
    return false;
}

// Main execution
const args = process.argv.slice(2);
if (args.length === 0) {
    console.log('Usage: node fix-unknown-types.cjs <file1.tsx> [file2.tsx ...]');
    process.exit(1);
}

let fixedCount = 0;
args.forEach(file => {
    if (fs.existsSync(file)) {
        if (fixUnknownTypes(file)) {
            console.log(`✅ Fixed: ${file}`);
            fixedCount++;
        } else {
            console.log(`⏭️ No changes: ${file}`);
        }
    } else {
        console.log(`❌ File not found: ${file}`);
    }
});

console.log(`\n🎉 Completed! Fixed ${fixedCount}/${args.length} files`);
