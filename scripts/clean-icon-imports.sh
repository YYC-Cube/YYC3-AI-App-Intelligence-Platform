#!/bin/bash

# Smart Icon Import Cleaner
# Removes unused lucide-react icon imports while preserving used ones

set -e

echo "🧹 Cleaning unused icon imports..."

# Get all files with unused icon errors
FILES=$(npm run typecheck 2>&1 | grep "is declared but its value is never read" | grep -E "'(Users|Zap|Settings|AlertTriangle|TrendingUp|Star|Progress|Clock|Trash2|Target)'" | sed 's/(.*//' | sort -u)

for file in $FILES; do
    if [ ! -f "$file" ]; then
        continue
    fi

    # Get unused icons for this file
    UNUSED_ICONS=$(npm run typecheck 2>&1 | grep "$file.*is declared but its value is never read" | grep -oE "'[A-Z][a-z]+'" | tr -d "'" | sort -u)

    if [ -z "$UNUSED_ICONS" ]; then
        continue
    fi

    echo "  📝 Processing: $file"
    echo "     Removing: $UNUSED_ICONS"

    # Remove each unused icon from import statements
    for icon in $UNUSED_ICONS; do
        # Handle multi-line imports (comma-separated)
        sed -i '' "s/ $icon, / /g" "$file"
        sed -i '' "s/, $icon, /, /g" "$file"
        sed -i '' "s/, $icon//g" "$file"
        sed -i '' "s/ {$icon }/{/g" "$file"
        # Handle single icon import line
        sed -i '' "/^import { $icon } from 'lucide-react'$/d" "$file"
    done

    # Clean up empty imports or trailing commas
    sed -i '' 's/import { } from/# Empty import removed: /g' "$file"
    sed -i '' 's/, }/}/g' "$file"
    sed -i '' 's{, /{/g' "$file"
done

echo ""
echo "✅ Icon import cleaning completed!"
