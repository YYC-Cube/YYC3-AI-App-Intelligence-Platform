# Lighthouse CI 性能基准配置指南

## 📋 概述

YYC³ AI App Intelligence Platform 已集成 **Google Lighthouse CI** 用于自动化性能审计。本配置确保每次代码提交都能自动检测性能回归，并维持企业级应用的高性能标准。

---

## 🎯 核心目标

### Core Web Vitals 基准 (Google 推荐标准)

| 指标    | 名称                     | 目标值 | 警告阈值 | 说明             |
| ------- | ------------------------ | ------ | -------- | ---------------- |
| **LCP** | Largest Contentful Paint | ≤2.5s  | >4.0s    | 最大内容绘制时间 |
| **CLS** | Cumulative Layout Shift  | ≤0.1   | >0.25    | 累积布局偏移     |
| **TBT** | Total Blocking Time      | ≤200ms | >300ms   | 总阻塞时间       |
| **FID** | First Input Delay        | ≤100ms | >300ms   | 首次输入延迟     |

### Lighthouse 分类得分目标

| 类别           | 最低分 | 目标分 | 权重 |
| -------------- | ------ | ------ | ---- |
| Performance    | ≥90    | ≥95    | 40%  |
| Accessibility  | ≥92    | ≥98    | 25%  |
| Best Practices | ≥90    | ≥95    | 20%  |
| SEO            | ≥90    | ≥95    | 15%  |

---

## 🚀 快速开始

### 本地运行性能审计

```bash
# 1. 启动开发服务器
npm run dev

# 2. 运行单页审计（在另一个终端）
npm run lighthouse

# 3. 查看报告
npm run lighthouse:view

# 4. 运行完整多页审计
npm run lighthouse:all
```

### CI/CD 自动运行

Lighthouse CI 已集成到 GitHub Actions 工作流中：

- **触发条件**: Push 到 `main` 分支 或 Pull Request 到 `main`
- **执行位置**: [.github/workflows/lighthouse.yml](../.github/workflows/lighthouse.yml)
- **结果位置**: GitHub Actions Artifacts (保留14天)

---

## 📁 配置文件说明

### 1. [lighthouserc.json](../lighthouserc.json) - 生产环境配置

用于CI/CD环境的标准配置：

```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3, // 运行3次取平均值
      "settings": {
        "preset": "desktop", // 桌面端模拟
        "throttling": {
          // 网络节流设置
          "rttMs": 40,
          "throughputKbps": 10240,
          "cpuSlowdownMultiplier": 1
        }
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }]
        // ... 更多断言
      }
    }
  }
}
```

### 2. [lighthouserc.dev.json](../lighthouserc.dev.json) - 开发环境配置

包含多个关键页面的URL列表：

```json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:3200",
        "http://localhost:3200/dashboard",
        "http://localhost:3200/explorer"
        // ... 更多页面
      ]
    }
  }
}
```

### 3. [docs/lighthouse-baseline.md](lighthouse-baseline.md) - 完整基线文档

详细的性能预算、页面特定目标和故障排除指南。

---

## 📊 性能预算

### 资源大小限制

| 资源类型         | 最大大小 (压缩) | 警告大小  | 格式要求          |
| ---------------- | --------------- | --------- | ----------------- |
| JavaScript       | 500KB           | 400KB     | ES6+, Tree-shaken |
| CSS              | 100KB           | -         | Tailwind purged   |
| Images           | 200KB/张        | -         | WebP/AVIF         |
| Fonts            | 100KB总计       | -         | WOFF2, preloaded  |
| **Total Bundle** | **1MB**         | **800MB** | 所有资源合计      |

---

## 🔧 NPM 脚本命令

```bash
# 单页快速审计
npm run lighthouse

# CI模式运行（使用 lighthouserc.json）
npm run lighthouse:ci

# 开发模式多页审计
npm run lighthouse:dev

# 完整审计脚本（生成详细报告）
npm run lighthouse:audit

# 一键构建+预览+审计
npm run lighthouse:all

# 打开HTML报告
npm run lighthouse:view
```

---

## 📈 结果解读

### 性能得分等级

- **90-100**: 🟢 绿色 - 优秀
- **50-89**: 🟡 黄色 - 需要改进
- **0-49**: 🔴 红色 - 差

### Core Web Vitals 状态

- ✅ Good: 达到推荐标准
- ⚠️ Needs Improvement: 未达标但可接受
- ❌ Poor: 严重未达标，需要立即修复

---

## 🛠️ 常见问题排查

### 问题1: Lighthouse 审计超时

**症状**: `Error: Navigation timeout exceeded`

**解决方案**:

1. 在 `lighthouserc.json` 中增加 `maxWaitForLoad`:

   ```json
   "settings": {
     "maxWaitForLoad": 60000  // 增加到60秒
   }
   ```

2. 检查应用是否有长时间运行的初始化逻辑

### 问题2: 性能分数突然下降

**可能原因**:

- 新增了大型依赖包
- 图片未优化
- 引入了同步阻塞脚本
- 第三方资源加载变慢

**排查步骤**:

```bash
# 1. 检查bundle大小
npm run build
du -sh dist/assets/*

# 2. 对比前后两次报告的差异
# 查看 .lighthouseci/ 目录下的结果文件
```

### 问题3: CLS (布局偏移) 分数低

**常见原因**:

- 动态内容插入导致布局变化
- 图片缺少明确的尺寸属性
- 字体加载引起的 FOIT/FOUT
- 广告或动态注入内容

**解决方案**:

```css
/* 为图片容器预留空间 */
img {
  display: block;
  max-width: 100%;
  height: auto;
}

/* 使用 font-display: swap */
@font-face {
  font-family: 'CustomFont';
  src: url('./font.woff2');
  font-display: swap;
}
```

---

## 📝 CI/CD 集成详情

### GitHub Actions 工作流

工作流文件: [.github/workflows/lighthouse.yml](../.github/workflows/lighthouse.yml)

**执行流程**:

1. Checkout代码
2. 安装依赖 (npm ci)
3. 构建生产版本 (npm run build)
4. 启动预览服务器
5. 运行Lighthouse CI审计
6. 上传结果为Artifacts
7. 生成GitHub Summary报告

**失败处理**:

- 初始阶段: 仅警告，不阻塞PR (`failOnRegression: false`)
- 稳定后: 可改为严格模式，阻止性能回归的合并

---

## 🎯 优化建议清单

### 高优先级 (影响Performance分数 >10分)

- [ ] **代码分割**: 使用React.lazy()和Suspense实现路由级懒加载
- [ ] **Tree Shaking**: 确保Vite正确标记sideEffects
- [ ] **图片优化**: 转换为WebP格式，实现懒加载
- [ ] **字体优化**: 使用WOFF2，预加载关键字体
- [ ] **CSS优化**: PurgeCSS移除未使用的样式

### 中优先级 (影响5-10分)

- [ ] **缓存策略**: 配置Service Worker或HTTP缓存头
- [ ] **预连接**: 对第三方域名使用 `<link rel="preconnect">`
- [ ] **预加载**: 对关键资源使用 `<link rel="preload">`
- [ ] **压缩**: 启用Brotli/Gzip压缩

### 低优先级 (影响<5分但提升用户体验)

- [ ] **骨架屏**: 替代loading spinner
- [ ] **进度指示**: 长任务显示进度条
- [ ] **错误边界**: React Error Boundary优雅降级
- [ ] **离线支持**: PWA Service Worker缓存策略

---

## 📚 参考资源

- [Lighthouse 官方文档](https://developers.google.com/web/tools/lighthouse)
- [Lighthouse CI 文档](https://github.com/GoogleChrome/lighthouse-ci)
- [Core Web Vitals](https://web.dev/vitals/)
- [Web.dev 性能指南](https://web.dev/performance/)

---

## 🔄 版本历史

| 版本   | 日期       | 更新内容                         |
| ------ | ---------- | -------------------------------- |
| v1.0.0 | 2026-04-20 | 初始配置，建立性能基准           |
|        |            | - 集成Lighthouse CI到CI/CD流水线 |
|        |            | - 设定Core Web Vitals目标值      |
|        |            | - 配置多页面审计支持             |
|        |            | - 创建性能监控脚本和文档         |

---

## 👥 维护者

**YYC³ Team**

- 性能优化负责人: [待指定]
- 最后更新: 2026-04-20

---

_此配置遵循 Google Web Dev 推荐的最佳实践，针对企业级React应用进行了优化调整。_
