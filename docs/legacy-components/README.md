# Legacy Components 存档

> 本目录保存 YYC³ AI App Intelligence Platform 项目演进过程中产生的简化版组件 (Legacy / Simple variants)。
> 这些组件在当前生产代码中已**无任何引用**，但保留以供：
>
> - 历史参考与设计对比（Simple vs Full 实现差异）
> - 未来快速原型迭代的素材
> - 教学与文档示例

---

## 📋 组件清单

### 🏠 Root

| 组件                                  | 原路径             | 功能描述                                                                                                           |
| ------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| [App.simple.tsx](root/App.simple.tsx) | `./App.simple.tsx` | 极简版应用入口，仅渲染一个静态欢迎页（"YYC³ AI Platform" 标题 + 端口提示），用于早期开发验证 dev server 启动状态。 |

---

### 🤖 NARA Console 简化版

NARA (Neural Architecture for Responsive Agents) 三大主模式的轻量级实现，去除复杂的交互、状态机与国际化，保留核心 UI 骨架，便于快速演示与设计验证。

| 组件                                          | 原路径                               | 功能描述                                                                                                                               |
| --------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| [HomeModeSimple.tsx](nara/HomeModeSimple.tsx) | `components/nara/HomeModeSimple.tsx` | **Home 模式简化版**：展示系统架构、技能、内存、安全、部署五大控制面板的静态布局，使用 lucide-react 图标，含基础交互（展开/折叠）。     |
| [ChatModeSimple.tsx](nara/ChatModeSimple.tsx) | `components/nara/ChatModeSimple.tsx` | **Chat 模式简化版**：实现 user/assistant/system 三种角色的消息列表 UI，含发送、状态指示器（loader / check / alert），无实际 LLM 集成。 |
| [LoopModeSimple.tsx](nara/LoopModeSimple.tsx) | `components/nara/LoopModeSimple.tsx` | **Loop 模式简化版**：可视化工作流步骤（WorkflowStep），支持 Play/Pause/Stop 控制，展示任务编排的 UI 骨架。                             |

---

### ⚙️ NARA Home Sections 简化控制面板

Home 模式的 5 个子控制面板的简化版本，每个面板聚焦单一功能模块，便于独立开发与测试。

| 组件                                                                                            | 原路径                                                               | 功能描述                                                                                                                                          |
| ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [DeploymentControlsSimple.tsx](nara/home-sections/DeploymentControlsSimple.tsx)                 | `components/nara/home-sections/DeploymentControlsSimple.tsx`         | **部署控制**：模拟部署流程 UI，含 Globe / Server / Rocket 图标，状态指示（idle / running / success / failed），支持 Pause / Resume / Retry 操作。 |
| [MemoryControlsSimple.tsx](nara/home-sections/MemoryControlsSimple.tsx)                         | `components/nara/home-sections/MemoryControlsSimple.tsx`             | **内存控制**：缓存 / 日志 / 临时文件三大类内存条目的可视化管理，支持刷新、清空、删除单项操作，含容量统计。                                        |
| [SecurityControlsSimple.tsx](nara/home-sections/SecurityControlsSimple.tsx)                     | `components/nara/home-sections/SecurityControlsSimple.tsx`           | **安全控制**：身份验证 / 加密设置 / 密钥管理 / 威胁告警四模块的 UI 布局，使用 Shield / Lock / Key / Eye 图标，含中英双语支持。                    |
| [SkillsControlsSimple.tsx](nara/home-sections/SkillsControlsSimple.tsx)                         | `components/nara/home-sections/SkillsControlsSimple.tsx`             | **技能控制**：AI 技能列表（数据分析、机器学习、NLP、图像识别等）的可视化，含技能等级进度条、分类标签、增删改操作。                                |
| [SystemArchitectureControlsSimple.tsx](nara/home-sections/SystemArchitectureControlsSimple.tsx) | `components/nara/home-sections/SystemArchitectureControlsSimple.tsx` | **系统架构控制**：CPU / 数据库 / 网络 / 安全 / 全球部署等系统资源的可视化概览，含 tab 切换（overview / metrics / topology）。                     |

---

### 🧭 YYC Enterprise 简化布局

| 组件                                                                          | 原路径                                                    | 功能描述                                                                                                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [YYCEnterpriseLayoutSimple.tsx](yyc/navigation/YYCEnterpriseLayoutSimple.tsx) | `components/yyc/navigation/YYCEnterpriseLayoutSimple.tsx` | **企业版布局简化版**：左侧 64px 侧边栏 + 主内容区的极简骨架，含 YYC Logo + 3 个一级导航项（Dashboard / Analytics / Edit），无四级导航深度的复杂结构。 |

---

## 🔄 与生产版本的对应关系

| 简化版                      | 生产版                                              | 关键差异                                                          |
| --------------------------- | --------------------------------------------------- | ----------------------------------------------------------------- |
| `HomeModeSimple`            | `components/nara/HomeMode.tsx`                      | 完整版含 i18n、深色模式、动态主题、复杂状态机、framer-motion 动画 |
| `ChatModeSimple`            | `components/nara/ChatMode.tsx`                      | 完整版含 LLM 集成、流式响应、上下文管理、工具调用                 |
| `LoopModeSimple`            | `components/nara/LoopMode.tsx`                      | 完整版含 DAG 编排、并行执行、错误重试、依赖注入                   |
| `YYCEnterpriseLayoutSimple` | `components/yyc/navigation/YYCEnterpriseLayout.tsx` | 完整版含 4 级导航、AnimatePresence 过渡、响应式适配、深色模式     |

---

## 📐 五维评估

| 维度　　　 | 评估　　　　　　　　　　　　　　　　　　　　　　　　　　　  |
| ---------- | ----------------------------------------------------------- |
| **时间维** | 这些组件代表项目演进的不同阶段，是开发迭代的"时间胶囊"　　  |
| **空间维** | 保留组件物理形态但隔离于 `docs/` 之外，避免污染构建产物　　 |
| **属性维** | 简化版聚焦 UI 骨架，便于教学；生产版聚焦完整功能，便于业务  |
| **事件维** | 简化版无业务逻辑事件链；生产版含完整事件系统　　　　　　　  |
| **关联维** | 简化版无外部依赖耦合；生产版深度集成 hooks / utils / types  |

---

## ⚠️ 重要说明

- 这些组件**不会被 TypeScript 编译器检查**（已在 `tsconfig.json` 的 `exclude` 中排除 `docs/`）
- 这些组件**不会被打包到生产 bundle**（`vite.config.ts` 入口不包含 `docs/`）
- 如需"复活"某个组件，请将其移回 `components/` 原位置，并更新相关 import 路径

---

_最后更新：2026-06-02 · YYC³ Team_
