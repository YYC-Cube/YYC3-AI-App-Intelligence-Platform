#!/bin/bash

echo "🚀 开始批量修复TypeScript错误..."

# 1. 修复未使用的React导入
find . -name "*.tsx" -type f ! -path "./node_modules/*" -exec grep -l "import React from 'react'" {} \; | while read file; do
    if grep -q "React\." "$file" || grep -q "<React\." "$file"; then
        echo "⏭️  跳过 $file (使用了 React.xxx)"
    else
        sed -i '' "/^import React from 'react'$/d" "$file"
        echo "✅ 移除React导入: $file"
    fi
done

# 2. 统计修复结果
ERRORS_BEFORE=$(pnpm typecheck 2>&1 | grep -c "error TS" || echo "0")
echo ""
echo "📊 修复前错误数: $ERRORS_BEFORE"

echo ""
echo "✅ 批量修复完成！"
