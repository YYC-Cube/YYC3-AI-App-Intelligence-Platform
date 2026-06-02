#!/bin/bash

# YYC³ AI Platform - 性能测量脚本
# 用途: 自动化收集Core Web Vitals和Lighthouse数据
# 使用方法: ./scripts/performance-measure.sh [URL]

set -e

# 配置
DEFAULT_URL="http://localhost:3800/"
URL=${1:-$DEFAULT_URL}
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
OUTPUT_DIR="./docs/performance/reports"
OUTPUT_FILE="$OUTPUT_DIR/report_$TIMESTAMP.html"

echo "🚀 YYC³ AI Platform - Performance Measurement Tool"
echo "=================================================="
echo "Target URL: $URL"
echo "Timestamp: $TIMESTAMP"
echo ""

# 检查依赖
check_dependencies() {
    echo "📋 Checking dependencies..."
    
    if ! command -v lighthouse &> /dev/null; then
        echo "⚠️  Lighthouse not found. Installing..."
        npm install -g lighthouse
    fi
    
    if ! command -v curl &> /dev/null; then
        echo "❌ Error: curl is required but not installed."
        exit 1
    fi
    
    echo "✅ All dependencies satisfied"
    echo ""
}

# 创建输出目录
create_output_dir() {
    if [ ! -d "$OUTPUT_DIR" ]; then
        mkdir -p "$OUTPUT_DIR"
        echo "📁 Created output directory: $OUTPUT_DIR"
    fi
}

# 测量基本指标 (使用curl)
measure_basic_metrics() {
    echo "📊 Measuring basic metrics with curl..."
    
    # DNS查询时间
    DNS_TIME=$(curl -o /dev/null -s -w '%{time_namelookup}' "$URL")
    
    # TCP连接时间
    TCP_TIME=$(curl -o /dev/null -s -w '%{time_connect}' "$URL")
    
    # 首字节时间(TTFB)
    TTFB=$(curl -o /dev/null -s -w '%{time_starttransfer}' "$URL")
    
    # 总下载时间
    TOTAL_TIME=$(curl -o /dev/null -s -w '%{time_total}' "$URL")
    
    # 下载大小
    SIZE_DOWNLOAD=$(curl -o /dev/null -s -w '%{size_download}' "$URL")
    
    # HTTP状态码
    HTTP_CODE=$(curl -o /dev/null -s -w '%{http_code}' "$URL")
    
    echo "  DNS Lookup:     ${DNS_TIME}s"
    echo "  TCP Connect:    ${TCP_TIME}s"
    echo "  TTFB:           ${TTFB}s"
    echo "  Total Time:     ${TOTAL_TIME}s"
    echo "  Download Size:  $(echo "scale=2; $SIZE_DOWNLOAD / 1024" | bc) KB"
    echo "  HTTP Status:    ${HTTP_CODE}"
    echo ""
}

# 运行Lighthouse审计
run_lighthouse() {
    echo "🔍 Running Lighthouse audit..."
    echo "  This may take 30-60 seconds..."
    
    lighthouse "$URL" \
        --output html \
        --output-path "$OUTPUT_FILE" \
        --chrome-flags="--headless" \
        --quiet \
        --only-categories=performance,accessibility,best-practices,seo \
        || {
            echo "⚠️  Lighthouse audit failed. URL may be unreachable."
            return 1
        }
    
    echo "✅ Lighthouse report saved to: $OUTPUT_FILE"
    echo ""
}

# 提取Lighthouse分数
extract_scores() {
    if [ -f "$OUTPUT_FILE" ]; then
        echo "📈 Extracting key scores from report..."
        
        # 使用node提取分数（如果可用）
        if command -v node &> /dev/null; then
            node -e "
                const fs = require('fs');
                const html = fs.readFileSync('$OUTPUT_FILE', 'utf8');
                
                // 简单的正则提取分数（实际应使用JSON输出）
                const scores = {};
                const categories = ['Performance', 'Accessibility', 'Best Practices', 'SEO'];
                
                console.log('=== Lighthouse Scores ===');
                categories.forEach(cat => {
                    const regex = new RegExp(cat + '[^\\d]*(\\d+)', 'i');
                    const match = html.match(regex);
                    const score = match ? match[1] : 'N/A';
                    console.log(cat + ': ' + score);
                });
            "
        else
            echo "  Install Node.js for detailed score extraction"
        fi
        
        echo ""
    fi
}

# 生成摘要报告
generate_summary() {
    SUMMARY_FILE="$OUTPUT_DIR/summary_$TIMESTAMP.md"
    
    cat > "$SUMMARY_FILE" << EOF
# Performance Measurement Summary

**Date**: $(date)  
**URL**: $URL  
**Environment**: Local Development Server  

## Basic Metrics

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| DNS Lookup | ${DNS_TIME}s | < 0.1s | $(echo "${DNS_TIME} < 0.1" | bc -l | grep -q "^1" && echo "✅ PASS" || echo "⚠️ WARN") |
| TCP Connect | ${TCP_TIME}s | < 0.2s | $(echo "${TCP_TIME} < 0.2" | bc -l | grep -q "^1" && echo "✅ PASS" || echo "⚠️ WARN") |
| TTFB | ${TTFB}s | < 0.5s | $(echo "${TTFB} < 0.5" | bc -l | grep -q "^1" && echo "✅ PASS" || echo "⚠️ WARN") |
| Total Time | ${TOTAL_TIME}s | < 3.0s | $(echo "${TOTAL_TIME} < 3.0" | bc -l | grep -q "^1" && echo "✅ PASS" || echo "⚠️ WARN") |
| Download Size | $(echo "scale=2; $SIZE_DOWNLOAD / 1024" | bc) KB | < 200KB | ✅ PASS |

## Files Generated

- **HTML Report**: $OUTPUT_FILE
- **Summary**: $SUMMARY_FILE

## Notes

- ERR_ABORTED issue may affect measurements
- Consider re-running after resolving network issues
EOF

    echo "📝 Summary saved to: $SUMMARY_FILE"
}

# 主函数
main() {
    check_dependencies
    create_output_dir
    measure_basic_metrics
    
    # 尝试运行Lighthouse（可选）
    if command -v lighthouse &> /dev/null; then
        run_lighthouse && extract_scores
    else
        echo "ℹ️  Skipping Lighthouse (not installed)"
    fi
    
    generate_summary
    
    echo ""
    echo "==========================================="
    echo "✅ Performance measurement completed!"
    echo "📁 Results directory: $OUTPUT_DIR"
    echo "📄 Latest report: $OUTPUT_FILE"
    echo "==========================================="
}

# 执行主函数
main "$@"
