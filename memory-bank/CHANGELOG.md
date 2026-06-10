# 修改记录

## 第 1 轮 — 首页暖化改造 (2026-06-10)

**目标：** 让首页看起来温暖友好、容易交流，去掉简历感和模板感。

### 改动文件

| 文件 | 改动 |
|------|------|
| `src/index.css` | 主色从冷蓝 `221 83% 53%` → 暖靛 `240 60% 58%`；亮色/暗色模式全套色板同步变暖；全局圆角 `0.375rem → 0.625rem`；背景、边框、muted 色系统一调暖 |
| `src/pages/HomePage.tsx` | 去掉双栏面板布局 → 单列 `max-w-2xl` 居中；去掉 header 导航链接和 footer 版权 → 右上角只保留主题切换按钮；去掉 `AVATAR_URL` 常量（移入 ProfileSection 内部） |
| `src/components/ProfileSection.tsx` | 去掉 `Currently / Focus / Interests` 标签式信息卡片 → 一段自然人话自我介绍；去掉两个 `<Separator>` 分割线；去掉 LinkedIn 风格 badges（Open Source / Community Builder）；去掉 `avatarUrl` prop → 改为内部常量；头像加暖色渐变光晕 |
| `src/components/ChatSection.tsx` | 头部从 "Digital Avatar" + 脉冲点 → 「💬 和 chench 聊聊」；去掉外层边框卡片 → `bg-muted/30` 融入页面；欢迎语从英文 → 中文口语；建议问题标签改为中文优先 + 英文副标题；输入框 placeholder →「想问什么？随便聊～」；气泡圆角加大 |

---

## 第 2 轮 — 建议问题发送中文 (2026-06-10)

**目标：** 点击建议问题按钮时发送中文内容，而非英文。

### 改动文件

| 文件 | 改动 |
|------|------|
| `src/components/ChatSection.tsx` | `SUGGESTED_QUESTIONS` 数组中三个问题的 `value` 字段从英文改为中文（`"最近在忙什么？"` / `"怎么联系你？"` / `"未来的计划？"`），按钮上显示的英文副标题 `sub` 保留 |

---

## 第 3 轮 — 修复 AI 响应语言 (2026-06-10)

**问题：** 页面发送中文消息，但 AI 数字分身始终回复英文。

**原因：** Supabase 边缘函数 `chench-avatar` 的系统提示词中写有 `Default language: English`，模型被英语默认值带偏。

### 改动文件

| 文件 | 改动 |
|------|------|
| `supabase/functions/chench-avatar/index.ts` | 系统提示词第 43 行：`Default language: English, but be bilingual-friendly (respond in the language the user uses)` → `Language: Respond in the same language the user uses — if they write in Chinese, reply in Chinese; if they write in English, reply in English. Match the user's tone and style.` |

> ⚠️ 此文件为远端部署的边缘函数，本地修改后需要在秒哒平台或通过 Supabase CLI 重新部署才能生效。

---

## 第 4 轮 — 首页首屏排版优化 (2026-06-10)

**目标：** 让名字、一句话介绍和主要按钮更有主次，聊天入口更容易被注意到。不新增模块，只调整布局、间距和元素优先级。

### 改动文件

| 文件 | 改动 |
|------|------|
| `src/components/ProfileSection.tsx` | 头像缩小（`w-24→w-20`）不抢名字风头；名字放大（`text-2xl→text-4xl md:text-5xl`）撑起首屏；英文 tagline 提级（`text-base→text-lg md:text-xl`）；中文 tagline 降透明度退到第三层；"Ask me anything" 从 Badge 组件 → 圆角边框药丸按钮样式，主题色 + hover 效果，点击锚点跳转到聊天区 |
| `src/pages/HomePage.tsx` | Profile 顶部留白加大（`pt-6→pt-16 md:pt-24`）；聊天区加 `id="chat"` 锚点；去掉 profile 和 chat 之间均匀间距 |
| `src/components/ChatSection.tsx` | 容器背景加深（`bg-muted/30→bg-muted/40`）+ 细边框 + `shadow-sm`；标题 `text-sm→text-base`；圆角 `rounded-xl→rounded-2xl` |

---

## 第 5 轮 — 恢复双栏布局 (2026-06-10)

**目标：** 单列布局太空且需要下拉，恢复桌面端双栏，让 Profile 和 Chat 一屏展示。

### 改动文件

| 文件 | 改动 |
|------|------|
| `src/pages/HomePage.tsx` | 单列 `max-w-2xl` → 双栏 `max-w-6xl`；左列 Profile `w-80 lg:w-96`，右列 Chat `flex-1 max-w-lg lg:max-w-xl`；`justify-center` 垂直居中填满视口；`gap-8 md:gap-28` 拉开中缝 |

---

## 第 6 轮 — 增加联系方式 (2026-06-10)

**目标：** 在 ProfileSection 中增加 QQ 和 GitHub 联系方式，放在自我介绍段落后、"Ask me anything" 之前。

### 改动文件

| 文件 | 改动 |
|------|------|
| `src/components/ProfileSection.tsx` | 在 Bio 段落和 CTA 之间插入联系方式行：QQ `1462446123`（可点击唤起 QQ）+ GitHub `dark-cc`（跳转 `https://github.com/dark-cc`）；`text-sm text-muted-foreground`，hover 变 `text-foreground`；中间用 `·` 分隔 |
