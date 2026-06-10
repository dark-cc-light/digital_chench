# chench 个人主页

基于秒哒（MiaoDa）平台导出的个人主页项目，包含个人简介展示和 AI 数字分身聊天功能，支持中英双语。

- **技术栈:** React 18 · TypeScript · Vite · Tailwind CSS · Radix UI / shadcn/ui · Supabase
- **包管理器:** pnpm
- **在线地址:** https://www.miaoda.cn/projects/app-c6w29djsgjr7

---

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
npx vite --host 127.0.0.1
```

> ⚠️ `package.json` 中的 `dev` / `build` 脚本已被平台禁用，直接用 `npx vite` 启动即可。

---

## 项目地图

```
digital_chench/
│
├── src/
│   ├── main.tsx              ← 浏览器加载的第一个 JS 文件
│   ├── App.tsx               ← React 根组件：路由框架 + 主题 + Toast
│   ├── routes.tsx            ← 路由表，目前只有 "/" → HomePage
│   │
│   ├── pages/
│   │   └── HomePage.tsx      ← ★ 主页入口，拼装 ProfileSection + ChatSection
│   │
│   ├── components/
│   │   ├── ProfileSection.tsx  ← 个人简介区（头像、名字、介绍）
│   │   ├── ChatSection.tsx     ← ★ 数字分身聊天区（消息列表 + 输入框）
│   │   ├── common/             ← 通用小组件（IntersectObserver 等）
│   │   └── ui/                 ← shadcn/ui 组件库（自动生成，不需要改）
│   │
│   ├── contexts/
│   │   ├── ThemeContext.tsx     ← 主题状态（亮色/暗色切换）
│   │   └── AuthContext.tsx      ← 登录状态（本项目未使用）
│   │
│   ├── hooks/                  ← 自定义 hooks（防抖、移动端检测等）
│   ├── lib/                    ← 工具函数（SSE 流式请求、通用工具）
│   ├── db/supabase.ts          ← Supabase 客户端初始化
│   ├── types/index.ts          ← 全局类型定义
│   └── index.css               ← ★ 全局样式 + Tailwind 入口
│
├── tailwind.config.js          ← Tailwind 主题配置（颜色、字体等）
├── vite.config.ts              ← Vite 构建配置（不需要改）
├── vite.config.dev.ts          ← 开发环境 Vite 配置（不需要改）
├── index.html                  ← HTML 入口（不需要改）
├── .env                        ← 环境变量（Supabase 连接等）
└── public/
    ├── favicon.png             ← 网站图标
    └── images/                 ← 图片资源
```

### 阅读优先级

| 优先级 | 文件 | 说明 |
|--------|------|------|
| ★★★ | `src/pages/HomePage.tsx` | 页面入口，拼装各区块 |
| ★★★ | `src/components/ProfileSection.tsx` | 个人简介区 |
| ★★★ | `src/components/ChatSection.tsx` | 聊天区核心逻辑 |
| ★★ | `src/index.css` + `tailwind.config.js` | 全局样式和主题色 |
| ★ | `src/lib/` `src/hooks/` `src/types/` | 按需查阅 |

### 现阶段不需要读懂的

- `src/components/ui/` — shadcn/ui 自动生成的底层组件，知道存在就行
- `vite.config.dev.ts` / `vite.config.ts` — 构建配置，跑起来就不用管
- `.rules/` — CI 检查规则，与功能无关
- `src/contexts/AuthContext.tsx` — 本项目没有登录功能，用不上
- `src/db/supabase.ts` — 后端连接配置，暂时不需要改

---

## 页面结构

```
个人主页（单页）
├── Header（顶部导航：About / Chat + 主题切换）
├── ProfileSection（左侧）
│   ├── 头像
│   ├── 姓名 + 一句话介绍
│   ├── 信息卡片（当前工作 / 专注领域 / 兴趣爱好）
│   └── 标签
└── ChatSection（右侧）
    ├── 聊天消息列表
    └── 输入框 + 发送按钮
```
