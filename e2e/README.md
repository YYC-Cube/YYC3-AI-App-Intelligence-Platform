# E2E Test Suite - Playwright

## 📋 概述

YYC³ AI App Intelligence Platform 的端到端(E2E)测试套件，使用 **Playwright** 测试框架实现。

### 覆盖范围

| 测试文件                     | 描述               | 用例数 | 优先级 |
| ---------------------------- | ------------------ | ------ | ------ |
| `app-loading.spec.ts`        | 应用加载与渲染     | 8      | 🔴 高  |
| `navigation.spec.ts`         | 导航流程与模式切换 | 8      | 🔴 高  |
| `language-switching.spec.ts` | 中英文切换功能     | 6      | 🔴 高  |
| `responsive.spec.ts`         | 响应式设计适配     | 8      | 🟡 中  |
| `accessibility.spec.ts`      | 可访问性基础检查   | 7      | 🟡 中  |

**总计**: **37个E2E测试用例**

---

## 🚀 快速开始

### 前置要求

- Node.js >= 18.0.0
- npm >= 9.0.0
- Playwright浏览器（首次需安装）

### 安装依赖

```bash
npm install
npx playwright install --with-deps
```

### 运行测试

```bash
# 运行所有E2E测试（无头模式）
npm run e2e

# UI模式（可视化调试）
npm run e2e:ui

# 有头模式（显示浏览器窗口）
npm run e2e:headed

# 调试模式（暂停执行）
npm run e2e:debug

# CI环境运行
npm run e2e:ci
```

### 运行特定测试

```bash
# 只运行应用加载测试
npx playwright test app-loading

# 只运行导航测试
npx playwright test navigation

# 运行特定项目（Chromium/Firefox/WebKit）
npx playwright test --project=chromium

# 运行移动端测试
npx playwright test responsive --project="Mobile Chrome"
```

---

## 📁 项目结构

```
e2e/
├── app-loading.spec.ts          # 应用加载测试
├── navigation.spec.ts           # 导航流程测试
├── language-switching.spec.ts   # 语言切换测试
├── responsive.spec.ts           # 响应式设计测试
└── accessibility.spec.ts        # 可访问性测试

playwright.config.ts             # Playwright配置文件
```

---

## ⚙️ 配置说明

### 浏览器支持

| 项目          | 设备            | 视口大小  | 用途         |
| ------------- | --------------- | --------- | ------------ |
| chromium      | Desktop Chrome  | 1920x1080 | 主要测试目标 |
| firefox       | Desktop Firefox | 1920x1080 | 兼容性验证   |
| webkit        | Desktop Safari  | 1920x1080 | Safari兼容性 |
| Mobile Chrome | Pixel 5         | 393x851   | 移动端适配   |

### 关键配置项

```typescript
{
  baseURL: 'http://localhost:3200',      // 开发服务器地址
  actionTimeout: 10000,                  // 操作超时10秒
  navigationTimeout: 30000,              // 导航超时30秒
  retries: process.env.CI ? 2 : 0,       // CI环境重试2次
  trace: 'on-first-retry',              // 首次失败时录制trace
  screenshot: 'only-on-failure',         // 仅在失败时截图
  video: 'retain-on-failure',            // 仅在失败时保留视频
}
```

---

## 🧪 测试用例详情

### 1. 应用加载 (app-loading.spec.ts)

**目标**: 验证应用正确初始化和渲染

#### 测试场景

1. ✅ 正确加载NARA控制台主页
2. ✅ 3秒内完成初始渲染
3. ✅ 显示在线状态指示器
4. ✅ 显示所有导航标签
5. ✅ 默认激活主页模式
6. ✅ 语言切换按钮可见
7. ✅ 无JavaScript错误
8. ✅ 关键资源成功加载

**验收标准**:

- 页面标题包含 "NARA" 或 "YYC³"
- 加载时间 < 3秒
- 所有4个导航标签可见
- 无控制台错误

---

### 2. 导航流程 (navigation.spec.ts)

**目标**: 验证用户可以在不同模式间流畅切换

#### 测试场景

1. ✅ 切换到对话模式
2. ✅ 切换到循环模式
3. ✅ 切换到企业系统模式
4. ✅ 不同模式间快速切换
5. ✅ 从企业系统返回主页
6. ✅ 平滑过渡效果
7. ✅ 激活标签视觉样式正确

**验收标准**:

- 点击后对应标签激活（白色背景）
- 内容区域正确更新
- 过渡动画流畅
- 可从任何状态返回主页

---

### 3. 语言切换 (language-switching.spec.ts)

**目标**: 验证中英文界面切换功能

#### 测试场景

1. ✅ 默认中文界面
2. ✅ 切换到英文
3. ✅ 切换回中文
4. ✅ 所有导航标签语言同步
5. ✅ 不影响当前激活模式
6. ✅ 语言按钮文本更新

**验收标准**:

- 中文: "AI 操作系统", "主页", "在线"
- 英文: "AI Operating System", "Home", "Online"
- 双向切换正常工作

---

### 4. 响应式设计 (responsive.spec.ts)

**目标**: 验证不同设备尺寸下的布局适配

#### 测试场景

**桌面视图 (1920x1080)**:

1. ✅ 完整布局显示
2. ✅ 导航标签水平排列

**平板视图 (768x1024)**: 3. ✅ 适配平板屏幕 4. ✅ 无水平溢出

**移动端视图 (iPhone 12)**: 5. ✅ 移动设备正确显示 6. ✅ 导航标签可访问 7. ✅ 触摸交互正常

**大屏视图 (2560x1440)**: 8. ✅ 4K屏幕正确渲染9. ✅ 字体大小合理调整

**验收标准**:

- 所有视口下内容完整显示
- 无水平滚动条
- 触摸操作响应灵敏
- 字体大小随视口调整

---

### 5. 可访问性基础 (accessibility.spec.ts)

**目标**: 验证基本的可访问性标准

#### 测试场景

1. ✅ 页面标题存在
2. ✅ 按钮有可访问文本
3. ✅ 颜色对比度合理
4. ✅ 焦点管理正常
5. ✅ 键盘导航可用
6. ✅ 图片有alt属性
7. ✅ 无重复ID

**验收标准**:

- 符合WCAG 2.1 AA级基本要求
- 键盘可访问所有交互元素
- 焦点顺序逻辑清晰

---

## 📊 测试报告

### 运行结果位置

```
playwright-report/     # HTML报告（UI模式查看）
e2e-results.json       # JSON结果（CI集成）
test-results/          # 详细结果和截图
```

### 查看HTML报告

```bash
npx playwright show-report
```

### 失败时自动生成

- **截图**: PNG格式，失败时刻的页面快照
- **视频**: WebM格式，完整的测试执行过程
- **Trace**: ZIP格式，详细的DOM快照和网络日志

---

## 🔧 CI/CD集成

### GitHub Actions

已在 `.github/workflows/ci-cd.yml` 中配置：

```yaml
# 可选：添加E2E测试阶段
- name: Run E2E Tests
  run: npm run e2e:ci

- name: Upload E2E Results
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: e2e-results
    path: e2e-results.json
    retention-days: 7
```

### 本地Pre-commit钩子（可选）

```json
// package.json lint-staged配置
{
  "lint-staged": {
    "*.spec.ts": ["playwright test --reporter=list"]
  }
}
```

---

## 🐛 调试技巧

### 1. 使用Play Inspector

```bash
npm run e2e:debug
```

在代码中添加：

```typescript
await page.pause(); // 暂停执行，打开Inspector
```

### 2. 查看详细日志

```bash
DEBUG=pw:api npx playwright test
```

### 3. 录制新测试

```bash
npx playwright codegen http://localhost:3200
```

### 4. 时间调试

```typescript
// 添加延迟观察页面变化
await page.waitForTimeout(1000);

// 等待特定元素
await page.locator('.target-element').waitFor({ timeout: 5000 });
```

---

## ⚠️ 注意事项

### 测试稳定性

1. **等待策略**: 使用智能等待而非固定延迟

   ```typescript
   // ❌ 不推荐
   await page.waitForTimeout(2000);

   // ✅ 推荐
   await expect(page.locator('button')).toBeVisible();
   ```

2. **选择器优先级**:

   ```typescript
   // 优先级：文本 > 角色 > CSS > XPath
   page.locator('button:has-text("提交")'); // 最佳
   page.getByRole('button', { name: '提交' }); // 很好
   page.locator('.submit-button'); // 一般
   page.locator('//*[@id="submit"]'); // 避免
   ```

3. **隔离性**: 每个测试应该独立运行

   ```typescript
   test.beforeEach(async ({ page }) => {
     await page.goto('/'); // 每个测试都从干净状态开始
   });
   ```

### 性能优化

- 使用 `fullyParallel: true` 并行执行
- 合理设置超时时间
- 避免不必要的截图和视频录制

---

## 📈 下一步计划

### Phase 4.2 扩展计划

- [ ] 企业系统模块E2E测试
- [ ] 表单提交与验证测试
- [ ] API Mock与网络拦截测试
- [ ] 性能基准测试集成
- [ ] 视觉回归测试（截图对比）

### 高级功能

- [ ] 多用户会话测试
- [ ] WebSocket实时通信测试
- [ ] 文件上传/下载测试
- [ ] 第三方登录流程测试

---

## 📞 支持

遇到问题？

1. 查看 [Playwright官方文档](https://playwright.dev/)
2. 检查 `playwright-report/` 中的失败报告
3. 在团队频道提问或创建Issue

---

**版本**: v1.0.0
**最后更新**: 2025-04-20
**维护者**: YYC³ Team
**框架**: Playwright @latest
