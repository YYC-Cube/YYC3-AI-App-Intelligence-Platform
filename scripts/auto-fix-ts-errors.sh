#!/bin/bash

# TypeScript Error Auto-Fix Script
# YYC³ AI App Intelligence Platform

set -e

echo "🔧 Starting TypeScript Error Auto-Fix..."
echo ""

ERROR_COUNT_BEFORE=$(pnpm typecheck 2>&1 | grep -c "error TS" || echo "0")
echo "📊 Initial error count: $ERROR_COUNT_BEFORE"
echo ""

# Fix 1: Remove unused React imports
echo "🔄 Fixing unused React imports..."
find . -name "*.tsx" -type f ! -path "./node_modules/*" ! -path "./dist/*" | while read file; do
    if grep -q "^import React from 'react'" "$file" && ! grep -q "React\." "$file" && ! grep -q "<React\." "$file"; then
        sed -i '' "/^import React from 'react'/d" "$file"
        echo "  ✅ Removed unused React import from $file"
    fi
done

# Fix 2: Add underscore prefix to unused parameters (common patterns)
echo ""
echo "🔄 Fixing unused parameters (common patterns)..."
find components -name "*.tsx" -type f | while read file; do
    # Pattern 1: onBack parameter
    sed -i '' 's/{ onBack }/{ onBack: _onBack }/g' "$file" 2>/dev/null || true
    # Pattern 2: appContext parameter
    sed -i '' 's/, appContext }/, appContext: _appContext }/g' "$file" 2>/dev/null || true
    # Pattern 3: welcomeContext parameter
    sed -i '' 's/, welcomeContext }/, welcomeContext: _welcomeContext }/g' "$file" 2>/dev/null || true
done

echo ""
echo "✅ Auto-fix completed!"
echo ""

ERROR_COUNT_AFTER=$(pnpm typecheck 2>&1 | grep -c "error TS" || echo "0")
echo "📊 Final error count: $ERROR_COUNT_AFTER"
echo "📈 Errors fixed: $((ERROR_COUNT_BEFORE - ERROR_COUNT_AFTER))"
echo ""

if [ "$ERROR_COUNT_AFTER" -lt "$ERROR_COUNT_BEFORE" ]; then
    echo "🎉 Successfully reduced errors by $((ERROR_COUNT_BEFORE - ERROR_COUNT_AFTER))!"
else
    echo "⚠️ No automatic fixes applied. Manual review needed."
fi
