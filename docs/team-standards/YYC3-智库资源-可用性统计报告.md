---
file: YYC3-智库资源-可用性统计报告.md
description: YYC³ 开发智库可用资源检索与统计 — 与 AI App Intelligence Platform 当前项目需求对齐分析
author: YanYuCloudCube Team <admin@0379.email>
version: v1.0.0
created: 2026-04-22
updated: 2026-04-22
status: active
tags: [智库],[资源检索],[可用性分析],[统计报告]
category: resource-audit
language: zh-CN
audience: developers,architects,managers
complexity: intermediate
---

> **_YanYuCloudCube_**
> _言启象限 | 语枢未来_
> **_Words Initiate Quadrants, Language Serves as Core for Future_**
> _万象归元于云枢 | 深栈智启新纪元_
> **_All things converge in cloud pivot; Deep stacks ignite a new era of intelligence_**

---

# YYC³ 开发智库 — 可用资源检索与统计报告

**智库路径**: `/Volumes/www/开发智库`
**检索日期**: 2026-04-22
**关联项目**: yyc3-ai-app-intelligence-platform
**检索范围**: 全量一级/二级目录 + README 分析

---

## 📋 目录

- [智库全景统计](#智库全景统计)
- [分类资源详表](#分类资源详表)
- [项目需求对齐分析](#项目需求对齐分析)
- [可用性评级矩阵](#可用性评级矩阵)
- [推荐使用优先级](#推荐使用优先级)

---

## 智库全景统计

### 总量概览

```
┌─────────────────────────────────────────────────────────────────┐
│                    YYC³ 开发智库资源全景                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   一级分类目录:  25 个                                           │
│   二级子项目:    68 个                                           │
│   核心技术栈:    React / TypeScript / Python / Node.js          │
│   资源类型:      代码仓库 + 配置模板 + Skills + 工具集          │
│                                                                 │
│   AI 相关:       17 个分类 (68%)                                 │
│   基础设施:       4 个分类 (16%)                                 │
│   YYC³ 专属:      4 个分类 (16%)                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 一级分类分布

| 分类              | 子项目数 | 领域                | 与当前项目关联度 |
| ----------------- | -------- | ------------------- | ---------------- |
| **AI-LLM**        | 13       | LLM/AI 大模型       | 🔴 高            |
| **AI-UI-UX**      | 5        | UI/UX 设计系统      | 🔴 高            |
| **TOOLS**         | 6        | 通用工具集          | 🟡 中            |
| **FAmily π³**     | 6        | YYC³ AI Family 平台 | 🔴 高            |
| **NPM**           | 4        | YYC³ NPM 包管理     | 🔴 高            |
| **AI-Agent**      | 3        | AI Agent 框架       | 🟡 中            |
| **AI-API**        | 3        | API 网关/代理       | 🟡 中            |
| **AI-Skills**     | 3        | AI Skills 库        | 🔴 高            |
| **AI-Tools**      | 2        | AI 开发工具         | 🟡 中            |
| **AI-IDE**        | 2        | AI IDE 工具         | 🟡 中            |
| **服务配置**      | 6        | Nginx/Ollama/Apollo | 🟢 低            |
| **容器编排**      | 3        | Docker/K8s          | 🟢 低            |
| **AI-HUB**        | 1        | LobeHub             | 🟡 中            |
| **AI-Prompts**    | 1        | System Prompts      | 🟡 中            |
| **AI-Repomix**    | 1        | 代码仓库打包        | 🟢 低            |
| **代码质量**      | 1        | Redux               | 🟡 中            |
| **AI-ClickHouse** | 1        | ClickHouse          | 🟢 低            |
| **AI-Caveman**    | 1        | Caveman             | 🟢 低            |
| **AI-Career-ops** | 1        | Career Ops          | 🟢 低            |
| **AI-PenPax**     | 1        | Graphify            | 🟢 低            |
| **AI-Vuex**       | 1        | Vuex                | 🟢 低            |
| **AI-Vode**       | 1        | Void                | 🟢 低            |
| **代码仓库**      | 1        | pm2m                | 🟢 低            |
| **容器数据**      | 0        | (空)                | —                |

---

## 分类资源详表

### 🔴 AI-LLM (13个子项目) — 高关联

| 子项目                    | 描述                   | 技术栈             | 可用性 | 项目关联                  |
| ------------------------- | ---------------------- | ------------------ | ------ | ------------------------- |
| **awesome-claude-skills** | Claude Skills 精选集合 | Markdown/Skills    | ⭐⭐⭐ | Skills 开发参考           |
| **claude-cookbooks**      | Claude 官方代码指南    | TypeScript/Python  | ⭐⭐⭐ | AI 集成最佳实践           |
| **claude-code-router**    | Claude Code 路由工具   | TypeScript         | ⭐⭐⭐ | NARA 模式切换参考         |
| **claude-mem**            | Claude 记忆管理        | TypeScript         | ⭐⭐⭐ | NARA Memory Controls 参考 |
| **learn-claude-code**     | Claude Code 学习资源   | Markdown           | ⭐⭐   | 开发规范参考              |
| **get-shit-done**         | 高效任务执行框架       | Python             | ⭐⭐   | Workflow Engine 参考      |
| **prompts.chat**          | Prompt 社区平台        | Next.js/TypeScript | ⭐⭐   | ChatMode UI 参考          |
| **hermes-agent**          | AI Agent 框架          | Python             | ⭐⭐   | Agent 架构参考            |
| **gstack**                | AI 全栈工具链          | TypeScript         | ⭐⭐⭐ | 全栈架构参考              |
| **AutoGPT**               | 自动化 AI Agent        | Python             | ⭐     | Agent 模式参考            |
| **GPT_API_free**          | 免费 GPT API           | Python             | ⭐     | API 代理参考              |
| **LibreChat**             | 开源聊天平台           | TypeScript/React   | ⭐⭐   | ChatMode 完整参考         |
| **Pake**                  | Web→桌面打包           | Rust/React         | ⭐     | Electron 方向参考         |

### 🔴 AI-UI-UX (5个子项目) — 高关联

| 子项目                    | 描述                 | 技术栈           | 可用性 | 项目关联              |
| ------------------------- | -------------------- | ---------------- | ------ | --------------------- |
| **ui-ux-pro-max-skill**   | 161条 UI/UX 推理规则 | Skill/Markdown   | ⭐⭐⭐ | UI/UX Module 直接参考 |
| **ui-ux-pro-max-skill-1** | Pro Max Skill 备份   | Skill/Markdown   | ⭐⭐⭐ | 备份/补充             |
| **ant-design**            | Ant Design 组件库    | React/TypeScript | ⭐⭐⭐ | UI 组件库备选/参考    |
| **ui**                    | UI 资源集            | —                | ⭐⭐   | 设计系统参考          |
| **ComfyUI**               | Stable Diffusion UI  | Python           | ⭐     | 创意分析方向参考      |

### 🔴 AI-Skills (3个子项目) — 高关联

| 子项目                         | 描述                   | 技术栈          | 可用性 | 项目关联                 |
| ------------------------------ | ---------------------- | --------------- | ------ | ------------------------ |
| **antigravity-awesome-skills** | 1,431+ AI Agent Skills | Skills/Markdown | ⭐⭐⭐ | 最大 Skills 库，直接可用 |
| **last30days-skill**           | 近30天热门 Skills      | Skills          | ⭐⭐   | 最新趋势 Skills          |
| **obsidian-skills**            | Obsidian 相关 Skills   | Skills          | ⭐⭐   | 知识管理参考             |

### 🔴 FAmily π³ (6个模块) — 高关联

| 子项目               | 描述                        | 技术栈        | 可用性 | 项目关联         |
| -------------------- | --------------------------- | ------------- | ------ | ---------------- |
| **FAmily π³ (整体)** | YYC³ AI Family 智能家庭平台 | pnpm/Monorepo | ⭐⭐⭐ | 架构设计直接参考 |
| packages/            | 各子包                      | TypeScript    | ⭐⭐⭐ | 组件/Hook 参考   |
| docs/                | 文档体系                    | Markdown      | ⭐⭐⭐ | 文档标准参考     |
| examples/            | 示例代码                    | TypeScript    | ⭐⭐   | 实现参考         |

### 🔴 NPM (4个子项目) — 高关联

| 子项目                             | 描述                    | 技术栈        | 可用性 | 项目关联       |
| ---------------------------------- | ----------------------- | ------------- | ------ | -------------- |
| **YYC3-NPM-FAmily**                | YYC³ AI Family NPM 总览 | Markdown/JSON | ⭐⭐⭐ | 品牌标准参考   |
| **YYC3-NPM-Packages**              | NPM 包源码              | TypeScript    | ⭐⭐⭐ | 共享包直接复用 |
| **YYC3-NPM-Packages-Architecture** | NPM 包架构设计          | Markdown      | ⭐⭐⭐ | 架构规范参考   |
| **YYC3-NPM-i18n**                  | 国际化 NPM 包           | TypeScript    | ⭐⭐⭐ | i18n 直接复用  |

### 🟡 AI-Agent (3个子项目) — 中关联

| 子项目           | 描述                 | 技术栈     | 可用性 | 项目关联       |
| ---------------- | -------------------- | ---------- | ------ | -------------- |
| **agents**       | Claude Code 插件编排 | TypeScript | ⭐⭐⭐ | Agent 编排参考 |
| **claude-howto** | Claude 使用指南      | Markdown   | ⭐⭐   | 最佳实践参考   |
| **nanobot**      | 超轻量 AI Agent      | Python     | ⭐⭐   | Agent 架构参考 |

### 🟡 AI-API (3个子项目) — 中关联

| 子项目      | 描述            | 技术栈   | 可用性 | 项目关联         |
| ----------- | --------------- | -------- | ------ | ---------------- |
| **one-api** | 统一 API 网关   | Go/React | ⭐⭐⭐ | API 代理直接部署 |
| **new-api** | 增强版 API 网关 | Go/React | ⭐⭐⭐ | API 管理参考     |
| **ruflo**   | API 工具        | —        | ⭐⭐   | API 工具参考     |

### 🟡 其他中关联资源

| 子项目                     | 所属分类   | 描述             | 可用性 | 项目关联              |
| -------------------------- | ---------- | ---------------- | ------ | --------------------- |
| **lobehub**                | AI-HUB     | 开源 AI 聊天 UI  | ⭐⭐⭐ | ChatMode UI 参考      |
| **system_prompts_leaks**   | AI-Prompts | 系统提示词集合   | ⭐⭐   | Prompt 工程参考       |
| **CowAgent**               | AI-Tools   | 多模型 Agent     | ⭐⭐   | Agent 参考框架        |
| **andrej-karpathy-skills** | AI-Tools   | Karpathy AI 技巧 | ⭐⭐   | AI 开发最佳实践       |
| **serena**                 | AI-IDE     | AI IDE 工具      | ⭐⭐   | IDE 集成参考          |
| **redux**                  | 代码质量   | 状态管理库       | ⭐⭐⭐ | Zustand vs Redux 参考 |

---

## 项目需求对齐分析

### 当前项目待解决问题 vs 智库可用资源

```
┌─────────────────────────────────────────────────────────────────┐
│              项目需求 ← 智库资源 对齐矩阵                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   项目需求                    智库可用资源                        │
│   ──────────                  ──────────                        │
│                                                                 │
│   ❌ 全局状态管理 (P1)                                           │
│   ├── Zustand 方案             → 代码质量/redux (参考对比)       │
│   └── Redux 方案               → 代码质量/redux (直接参考)       │
│                                                                 │
│   ❌ 数据层/API (P2)                                             │
│   ├── API 网关                 → AI-API/one-api (直接部署)       │
│   └── API 代理                 → AI-API/new-api (增强版)        │
│                                                                 │
│   ❌ UI/UX 模块优化 (P3)                                         │
│   ├── UI/UX 规则              → AI-UI-UX/ui-ux-pro-max-skill    │
│   └── 组件库参考              → AI-UI-UX/ant-design             │
│                                                                 │
│   ⚠️ NARA Console 优化                                           │
│   ├── 记忆管理                 → AI-LLM/claude-mem              │
│   ├── Chat UI                 → AI-HUB/lobehub                  │
│   └── Prompt 工程             → AI-Prompts/system_prompts_leaks │
│                                                                 │
│   ⚠️ 工作流引擎增强                                               │
│   ├── Agent 编排               → AI-Agent/agents                │
│   └── 任务执行框架             → AI-LLM/get-shit-done            │
│                                                                 │
│   ✅ YYC³ 标准对齐                                               │
│   ├── NPM 包复用               → NPM/YYC3-NPM-Packages          │
│   ├── i18n 方案                → NPM/YYC3-NPM-i18n              │
│   ├── 架构规范                 → NPM/YYC3-NPM-Packages-Architecture │
│   └── Family 平台              → FAmily π³                      │
│                                                                 │
│   ✅ Skills 生态                                                  │
│   ├── 1431+ Skills             → AI-Skills/antigravity-awesome  │
│   └── 161条 UI/UX 规则         → AI-UI-UX/ui-ux-pro-max-skill   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 可用性评级矩阵

### ⭐⭐⭐ 直接可用 (建议立即引入)

| 资源                           | 引入方式                   | 解决问题                 |
| ------------------------------ | -------------------------- | ------------------------ |
| **antigravity-awesome-skills** | Skills 参考/安装           | AI 能力增强              |
| **ui-ux-pro-max-skill**        | 161条规则集成到 UIUXModule | W5 修复 + UI 质量提升    |
| **claude-code-router**         | 路由架构参考               | NARA 模式路由优化        |
| **claude-mem**                 | Memory Controls 增强       | NARA 记忆系统完善        |
| **one-api / new-api**          | 部署为 API 网关            | P2 API 层建设            |
| **YYC3-NPM-i18n**              | 直接安装使用               | 国际化方案升级           |
| **YYC3-NPM-Packages**          | 共享包直接复用             | 减少代码重复             |
| **lobehub**                    | Chat UI 参考/组件复用      | ChatMode 完善            |
| **redux**                      | 状态管理对比学习           | P1 Zustand vs Redux 决策 |
| **claude-cookbooks**           | AI 集成最佳实践            | AI 功能开发参考          |

### ⭐⭐ 参考可用 (建议后续引入)

| 资源              | 引入方式         | 解决问题                |
| ----------------- | ---------------- | ----------------------- |
| **agents**        | Agent 编排参考   | 工作流引擎增强          |
| **get-shit-done** | 任务执行框架参考 | Workflow Engine 增强    |
| **gstack**        | 全栈架构参考     | 架构设计参考            |
| **hermes-agent**  | Agent 框架参考   | Agent 架构参考          |
| **LibreChat**     | 聊天平台参考     | ChatMode 完整参考       |
| **ant-design**    | 组件库对比参考   | shadcn/ui vs Ant Design |
| **nanobot**       | 轻量 Agent 参考  | Agent 轻量化方向        |

### ⭐ 潜在可用 (长期储备)

| 资源        | 引入方式          | 解决问题      |
| ----------- | ----------------- | ------------- |
| **AutoGPT** | 自动化 Agent 参考 | 自动化方向    |
| **Pake**    | Web→桌面打包      | Electron 方向 |
| **ComfyUI** | 创意 AI 参考      | 创意分析增强  |
| **repomix** | 代码打包工具      | 代码分析工具  |

---

## 推荐使用优先级

### 立即可用 (本周)

1. **YYC3-NPM-Packages** — 检查是否有可直接复用的 Hook/组件
2. **YYC3-NPM-i18n** — 替换 NARAConsole 中的内联翻译
3. **ui-ux-pro-max-skill** — 161条规则集成到 UIUXModule

### 短期可用 (2周内)

4. **one-api / new-api** — 部署为 API 网关，解决 P2 数据层
5. **antigravity-awesome-skills** — 筛选适用 Skills 增强平台能力
6. **claude-mem** — 参考实现 NARA Memory Controls 增强

### 中期可用 (1月内)

7. **lobehub** — Chat UI 组件参考/复用
8. **agents** — Agent 编排模式引入工作流引擎
9. **redux** — 与 Zustand 对比，确定最终状态管理方案

---

> **总结**: 智库共 25 个一级分类、68 个子项目，其中 **10+ 个资源可直接用于当前项目的加强完善**。最高优先级是 YYC³ NPM 系列包的直接复用和 API 网关的部署引入。

---

_文档遵循 YYC³ 团队规范-文档闭环标准 v3.0.0_
_智库路径: `/Volumes/www/开发智库`_
