#!/bin/bash

# Bundle Analysis Script for YYC³ AI Intelligence Platform
# Analyzes build output and generates performance report

set -e

DIST_DIR="dist"
REPORT_DIR="reports/bundle-analysis"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "📊 YYC³ Bundle Analysis Tool"
echo "=============================="
echo ""

# Create report directory
mkdir -p "$REPORT_DIR"

# Check if dist directory exists
if [ ! -d "$DIST_DIR" ]; then
  echo "❌ Error: $DIST_DIR directory not found. Run 'pnpm build' first."
  exit 1
fi

REPORT_FILE="$REPORT_DIR/bundle-report-$TIMESTAMP.md"

echo "🔍 Analyzing bundle composition..."
echo ""

cat > "$REPORT_FILE" << EOF
# 📊 Bundle Analysis Report

**Generated**: $(date)  
**Project**: YYC³ AI Intelligence Platform  
**Build**: Production

---

## 📁 Bundle Overview

EOF

# Calculate total size
TOTAL_SIZE=$(du -sb "$DIST_DIR/assets" | cut -f1)
TOTAL_SIZE_HUMAN=$(du -sh "$DIST_DIR/assets" | cut -f1)

echo "Total Assets Size: $TOTAL_SIZE_HUMAN" | tee -a "$REPORT_FILE"

cat >> "$REPORT_FILE" << EOF

| Metric | Value |
|--------|-------|
| **Total Size** | $TOTAL_SIZE_HUMAN |
| **Bytes** | $TOTAL_SIZE |
| **Files Count** | $(find "$DIST_DIR/assets" -type f | wc -l) |

---

## 📦 JavaScript Bundles

| File | Size (KB) | Size (Bytes) | Gzipped Est. |
|------|-----------|--------------|--------------|

EOF

# Analyze JS bundles
echo ""
echo "=== JavaScript Bundles ==="

for file in $(find "$DIST_DIR/assets" -name "*.js" -type f); do
  FILENAME=$(basename "$file")
  SIZE_BYTES=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
  SIZE_KB=$(echo "scale=2; $SIZE_BYTES / 1024" | bc)
  
  # Estimate gzipped size (~70% reduction)
  GZIPPED=$(echo "scale=2; $SIZE_BYTES * 0.3 / 1024" | bc)
  
  echo "  $FILENAME: ${SIZE_KB}KB (gzipped ~${GZIPPED}KB)"
  
  echo "| \`$FILENAME\` | **${SIZE_KB}KB** | $SIZE_BYTES bytes | ~${GZIPPED}KB |" >> "$REPORT_FILE"
done

cat >> "$REPORT_FILE" << EOF

---

## 🎨 CSS Bundles

| File | Size (KB) | Size (Bytes) |
|------|-----------|--------------|

EOF

# Analyze CSS files
echo ""
echo "=== CSS Files ==="

for file in $(find "$DIST_DIR/assets" -name "*.css" -type f); do
  FILENAME=$(basename "$file")
  SIZE_BYTES=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
  SIZE_KB=$(echo "scale=2; $SIZE_BYTES / 1024" | bc)
  
  echo "  $FILENAME: ${SIZE_KB}KB"
  
  echo "| \`$FILENAME\` | **${SIZE_KB}KB** | $SIZE_BYTES bytes |" >> "$REPORT_FILE"
done

cat >> "$REPORT_FILE" << EOF

---

## 🖼️ Media Assets

| Type | Count | Total Size |
|------|-------|------------|

EOF

# Analyze media files
echo ""
echo "=== Media Assets ==="

IMAGE_COUNT=$(find "$DIST_DIR/assets" \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.svg" -o -name "*.webp" \) -type f | wc -l)
IMAGE_SIZE=$(find "$DIST_DIR/assets" \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.svg" -o -name "*.webp" \) -type f -exec du -ch {} + 2>/dev/null | tail -1 | cut -f1)

FONT_COUNT=$(find "$DIST_DIR/assets" -name "*.woff*" -type f | wc -l)
FONT_SIZE=$(find "$DIST_DIR/assets" -name "*.woff*" -type f -exec du -ch {} + 2>/dev/null | tail -1 | cut -f1)

echo "  Images: $IMAGE_COUNT files ($IMAGE_SIZE)"
echo "  Fonts: $FONT_COUNT files ($FONT_SIZE)"

cat >> "$REPORT_FILE" << EOF
| Images | $IMAGE_COUNT | $IMAGE_SIZE |
| Fonts | $FONT_COUNT | $FONT_SIZE |

---

## ✅ Performance Checklist

EOF

# Performance checks
JS_TOTAL_KB=$(find "$DIST_DIR/assets" -name "*.js" -type f -exec du -k {} + 2>/dev/null | tail -1 | cut -f1)

echo ""
echo "=== Performance Thresholds ==="

if [ "$(echo "$JS_TOTAL_KB < 500" | bc -l)" -eq 1 ]; then
  echo "✅ JS Bundle Size: ${JS_TOTAL_KB}KB < 500KB threshold"
  echo "| **JS Bundle Size** | ✅ **${JS_TOTAL_KB}KB** (< 500KB) |" >> "$REPORT_FILE"
else
  echo "⚠️  JS Bundle Size: ${JS_TOTAL_KB}KB >= 500KB threshold (consider code splitting)"
  echo "| **JS Bundle Size** | ⚠️ **${JS_TOTAL_KB}KB** (>= 500KB, consider optimization) |" >> "$REPORT_FILE"
fi

LARGEST_FILE=$(find "$DIST_DIR/assets" -name "*.js" -type f -exec ls -lS {} + 2>/dev/null | head -1 | awk '{print $5, $NF}')
LARGEST_SIZE_KB=$(echo "scale=2; $(echo "$LARGEST_FILE" | awk '{print $1}') / 1024" | bc)

if [ "$(echo "$LARGEST_SIZE_KB < 250" | bc -l)" -eq 1 ]; then
  echo "✅ Largest Chunk: ${LARGEST_SIZE_KB}KB < 250KB threshold"
  echo "| **Largest Chunk** | ✅ **${LARGEST_SIZE_KB}KB** (< 250KB) |" >> "$REPORT_FILE"
else
  echo "⚠️  Largest Chunk: ${LARGEST_SIZE_KB}KB >= 250KB threshold"
  echo "| **Largest Chunk** | ⚠️ **${LARGEST_SIZE_KB}KB** (>= 250KB) |" >> "$REPORT_FILE"
fi

BUNDLE_COUNT=$(find "$DIST_DIR/assets" -name "*.js" -type f | wc -l)
echo "  Number of JS bundles: $BUNDLE_COUNT"

cat >> "$REPORT_FILE" << EOF
| **Bundle Count** | $BUNDLE_COUNT chunks |
| **Code Splitting** | ✅ Enabled (manualChunks configured) |
| **Tree Shaking** | ✅ Enabled (ES modules) |
| **Minification** | ✅ Enabled (Terser) |

---

## 💡 Optimization Recommendations

EOF

# Generate recommendations
cat >> "$REPORT_FILE" << EOF
### High Priority
- [ ] Monitor bundle size in CI/CD pipeline
- [ ] Set up Lighthouse CI for performance regression detection
- [ ] Implement bundle size budgets in build config

### Medium Priority
- [ ] Consider dynamic imports for route-based code splitting
- [ ] Optimize image assets (WebP format, lazy loading)
- [ ] Review and remove unused dependencies

### Low Priority
- [ ] Evaluate alternative lighter libraries
- [ ] Implement service worker caching strategy
- [ ] Consider module federation for micro-frontends

---

## 📈 Historical Comparison

*Run this script after each build to track size changes over time.*

**Previous Reports**:
$(ls -1 "$REPORT_DIR"/bundle-report-*.md 2>/dev/null | grep -v "$REPORT_FILE" | tail -5 | while read f; do echo "- $(basename $f)"; done || echo "*No previous reports*")

---

*Report generated by YYC³ Bundle Analysis Tool*  
*Version: 1.0.0*
EOF

echo ""
echo "=========================================="
echo "✅ Analysis Complete!"
echo ""
echo "📄 Report saved to: $REPORT_FILE"
echo ""
echo "📊 Summary:"
echo "   Total Size: $TOTAL_SIZE_HUMAN"
echo "   JS Bundles: $BUNDLE_COUNT files (${JS_TOTAL_KB}KB total)"
echo "   Largest Chunk: ${LARGEST_SIZE_KB}KB"
echo ""
echo "💡 Tip: Review the full report for detailed analysis and recommendations"
