# SecBlog — 安全技术博客设计文档

**日期**：2026-05-09
**作者**：TT
**状态**：待审核

---

## 1. 需求概述

### 1.1 项目背景

开发者是一名网络安全方向的大学生，主攻 CTF 竞赛和漏洞挖掘，未来计划从事安全服务方向。需要一个个人网站来展示技术能力、沉淀 CTF Writeup 和漏洞分析文章，同时建立个人品牌。

### 1.2 目标用户

- **CTF 选手**：寻找 Writeup 和解题思路
- **安全从业者**：关注漏洞分析、安全工具、渗透技术

### 1.3 核心目标

1. 提供高质量的 CTF Writeup 和漏洞分析内容展示
2. 建立专业的安全从业者个人品牌
3. 支持内容分类、搜索和读者互动
4. 视觉风格突出安全/黑客文化特色

---

## 2. 技术选型

### 2.1 框架：Astro

**选择理由**：
- 专为内容型网站设计的静态站点生成器（SSG）
- Content Collections 功能天然适合管理 Writeup 和漏洞分析
- 支持 React 组件，与开发者已有技术栈兼容
- 零 JS 默认输出，性能极佳
- SEO 友好，静态 HTML 直接渲染

### 2.2 样式：TailwindCSS

- 与 Astro 深度集成
- 原子化 CSS，快速实现自定义黑客风主题
- 响应式设计支持

### 2.3 内容格式：Markdown / MDX

- 文章使用 Markdown 编写，支持 frontmatter 元数据
- MDX 用于需要交互组件的文章页面
- 代码高亮使用 Shiki（Astro 内置）

### 2.4 评论系统：Giscus

- 基于 GitHub Discussions，免费无需服务器
- 支持 Markdown 格式评论
- 与 GitHub 账号集成，适合技术社区

### 2.5 搜索：Pagefind

- 静态搜索方案，零服务器成本
- 构建时自动索引，支持中文分词
- 与 Astro 集成简单

### 2.6 部署：GitHub Pages / Vercel

- GitHub Pages：免费，支持自定义域名
- Vercel：自动部署，支持预览分支

### 2.7 技术栈总览

| 层级 | 技术 | 版本 |
|------|------|------|
| 框架 | Astro | 5.x |
| 样式 | TailwindCSS | 4.x |
| 交互组件 | React | 19.x |
| 内容 | Markdown / MDX | - |
| 代码高亮 | Shiki | 内置 |
| 评论 | Giscus | 最新 |
| 搜索 | Pagefind | 最新 |
| 部署 | GitHub Pages / Vercel | - |
| 包管理 | pnpm | 最新 |

---

## 3. 页面设计

### 3.1 首页 `/`

**Hero 区域**：
- 全屏 Matrix 数字雨 Canvas 动画背景（日文片假名 + 特殊字符下落）
- 中央展示名字（Orbitron 字体，Glitch RGB 偏移抖动效果）
- 座右铭（打字机效果逐字打出）
- 技能标签（Web Security / Pwn / Crypto / Reverse / Bug Bounty）
- 社交链接按钮（GitHub / CTFtime / Twitter / Email）
- CRT 扫描线覆盖效果

**最新文章区**：
- 6 篇文章卡片网格（3 列）
- 每张卡片：分类标签（CTF 青色 / 漏洞红色）+ 日期 + 标题 + 摘要 + 标签
- 卡片 hover：左侧绿色指示条滑出 + 标题变绿 + 微位移

**热门标签区**：
- 标签云，热门标签字号更大
- hover 时 `#` 前缀出现 + 霓虹发光

### 3.2 CTF 列表页 `/ctf`

**筛选器**：
- 分类按钮：全部 / Web / Pwn / Crypto / Reverse / Misc
- 选中态：绿色边框 + 背景 + 发光

**赛事卡片**：
- 排名徽章（前三名金色高亮 + 发光）
- 赛事信息：名称 / 日期 / 队伍 / 排名
- 分类标签（Web 青色 / Pwn 红色 / Crypto 紫色 / Reverse 黄色 / Misc 绿色）
- 可展开/折叠的 Writeup 列表

**Writeup 列表项**：
- 难度标签：Easy（绿）/ Medium（黄）/ Hard（红）
- 题目名称
- hover 时左侧绿色指示条 + 标题变绿

### 3.3 文章详情页 `/ctf/[slug]` 和 `/vuln/[slug]`

**头部**：
- 面包屑导航
- 分类标签 + 标题（Orbitron 字体，霓虹发光）
- 元信息：日期 / 阅读时长 / 赛事名 / 难度

**内容区**：
- Markdown 渲染，代码块使用 Shiki 高亮
- 代码块右上角显示语言标签
- 章节标题带左侧绿色竖线 + `//` 前缀

**侧边 TOC**：
- 固定在右侧，当前章节高亮
- 点击平滑滚动

**底部**：
- 标签列表（`#标签名` 格式）
- Giscus 评论区

### 3.4 漏洞分析列表页 `/vuln`

**整体色调**：红色主题（与 CTF 页的绿色区分）

**筛选器**：
- 分类按钮：全部 / CVE / 0day / 逻辑漏洞 / 配置不当
- 选中态：红色边框 + 背景 + 发光

**漏洞卡片**：
- 左侧严重度指示条：CRITICAL（红色脉冲）/ HIGH（橙色）/ MEDIUM（黄色）
- 漏洞分类标签：CVE（红）/ 0day（紫）/ 逻辑漏洞（黄）/ 配置不当（青）
- CVE 编号（如 CVE-2026-XXXX）
- 状态标签：已修复（绿）/ 已报告（黄）/ 未修复（红+脉冲）
- hover 时标题变红 + 微位移

### 3.5 关于页 `/about`

**个人信息区**：
- ASCII Art 头像 + 彩虹渐变边框动画
- 名字（Orbitron 字体）+ 角色 + 简介
- 社交链接按钮

**技能树**：
- 4 张技能卡片：Web Security / Pwn / Cryptography / Reverse
- 每张卡片：技能名 + 等级标签（EXPERT 红 / ADVANCED 紫 / INTERMEDIATE 青）
- 渐变进度条 + 发光效果
- 子技能标签

**CTF 战绩**：
- 4 个统计卡片：参赛次数 / 领奖台 / 解题数 / 全球排名
- 近期赛事排名柱状图

### 3.6 搜索页 `/search`

**搜索框**：
- 大输入框，聚焦时霓虹边框发光
- 快捷键提示：Ctrl+K / ESC

**搜索结果**：
- 结果卡片：分类标签 + 路径 + 标题 + 摘要 + 标签
- 关键词高亮（绿色背景标记）
- hover 时左侧指示条 + 微位移

### 3.7 404 页面

- 巨型 404 数字，Glitch RGB 偏移抖动效果
- Kali 终端模拟：逐行打出扫描命令
- 扫描进度条 + 闪烁光标
- 返回首页按钮

---

## 4. 视觉设计规范

### 4.1 配色方案

| 用途 | 颜色 | 值 |
|------|------|-----|
| 主色（霓虹绿） | 🟢 | `#00ff41` |
| 危险色（红） | 🔴 | `#ff0040` |
| 信息色（青） | 🔵 | `#00f0ff` |
| 紫色 | 🟣 | `#b400ff` |
| 警告色（黄） | 🟡 | `#ffe600` |
| 橙色 | 🟠 | `#ff6b00` |
| 背景 | ⬛ | `#020a02` |
| 卡片背景 | ⬛ | `#0a140a` |
| 边框 | - | `#00ff4115` |
| 主文字 | - | `#c0ffc0` |
| 次文字 | - | `#4a7a4a` |

### 4.2 字体

| 用途 | 字体 | 备选 |
|------|------|------|
| 标题 | Orbitron | Rajdhani |
| 正文 | Rajdhani | sans-serif |
| 代码/标签 | Fira Code | monospace |

### 4.3 动效

| 效果 | 应用场景 | 实现 |
|------|----------|------|
| Matrix 数字雨 | 首页 Hero 背景 | Canvas API |
| Glitch 抖动 | 名字、404 数字 | CSS clip-path + animation |
| CRT 扫描线 | 全局覆盖 | CSS repeating-linear-gradient |
| 打字机效果 | Hero 副标题 | JS 逐字输出 |
| 卡片入场 | 文章列表 | IntersectionObserver + CSS transition |
| 霓虹发光 | 边框、文字 hover | CSS text-shadow / box-shadow |
| 进度条动画 | 技能树 | CSS transition |
| 脉冲动画 | 严重度指示器 | CSS animation |
| 页面过渡 | 路由切换 | View Transition API / Astro transitions |
| 加载动画 | 页面加载 | 终端光标 / 旋转方块 / 脉冲点 / 进度条 |

### 4.4 响应式断点

| 断点 | 宽度 | 适配 |
|------|------|------|
| 移动端 | < 768px | 单列布局，隐藏 TOC |
| 平板 | 768px - 1024px | 两列布局 |
| 桌面 | > 1024px | 三列布局，显示 TOC |

---

## 5. 内容结构

### 5.1 Content Collections

**CTF Writeup 集合** (`src/content/ctf/`)：

```yaml
---
title: "web_unpack — 堆叠查询 + UDF 提权"
date: 2026-05-01
event: "HGAME 2026"
category: "Web"        # Web / Pwn / Crypto / Reverse / Misc
difficulty: "Medium"   # Easy / Medium / Hard
tags: ["SQL注入", "UDF提权", "RCE"]
rank: 3
team: "ShadowTeam"
---
```

**漏洞分析集合** (`src/content/vuln/`)：

```yaml
---
title: "某框架反序列化链分析"
date: 2026-04-28
type: "CVE"            # CVE / 0day / 逻辑漏洞 / 配置不当
severity: "Critical"   # Critical / High / Medium / Low
status: "patched"      # patched / reported / unpatched
cve: "CVE-2026-XXXX"
tags: ["Java反序列化", "POP Chain", "RCE"]
---
```

### 5.2 目录结构

```
src/
├── content/
│   ├── ctf/           # CTF Writeup 文章
│   │   ├── hgame-2026-ez-sql.md
│   │   ├── hgame-2026-web-unpack.md
│   │   └── ...
│   └── vuln/          # 漏洞分析文章
│       ├── cve-2026-xxxx-deserialization.md
│       └── ...
├── components/        # Astro / React 组件
│   ├── Navbar.astro
│   ├── Footer.astro
│   ├── MatrixRain.tsx
│   ├── GlitchText.tsx
│   ├── ArticleCard.astro
│   ├── CtfEventCard.astro
│   ├── VulnCard.astro
│   ├── SkillCard.astro
│   ├── TagCloud.astro
│   ├── SearchBox.tsx
│   ├── Toc.tsx
│   ├── GiscusComment.tsx
│   └── ...
├── layouts/           # 页面布局
│   ├── BaseLayout.astro
│   └── ArticleLayout.astro
├── pages/             # 页面路由
│   ├── index.astro
│   ├── ctf/
│   │   ├── index.astro
│   │   └── [slug].astro
│   ├── vuln/
│   │   ├── index.astro
│   │   └── [slug].astro
│   ├── about.astro
│   ├── search.astro
│   └── 404.astro
├── styles/
│   └── global.css     # 全局样式 + TailwindCSS
└── lib/               # 工具函数
    ├── content.ts     # 内容查询辅助
    └── search.ts      # Pagefind 集成
```

---

## 6. 功能规格

### 6.1 搜索功能

- 基于 Pagefind 的静态全文搜索
- 支持中文分词
- 搜索范围：文章标题、内容、标签
- 结果页关键词高亮
- 快捷键 Ctrl+K 唤起搜索框

### 6.2 评论功能

- Giscus 基于 GitHub Discussions
- 支持 Markdown 格式
- 主题适配暗色风格
- 懒加载，不阻塞页面渲染

### 6.3 标签筛选

- CTF 页：按分类（Web/Pwn/Crypto/Reverse/Misc）筛选
- 漏洞页：按类型（CVE/0day/逻辑漏洞/配置不当）筛选
- 标签云：点击标签跳转到搜索结果页

### 6.4 SEO

- 每个页面有独立的 title / description / og 标签
- sitemap.xml 自动生成
- robots.txt 配置
- 结构化数据（JSON-LD）用于文章

### 6.5 性能

- Lighthouse 性能分数 > 95
- 首屏加载 < 1.5s
- 图片使用 WebP + 懒加载
- 字体使用 font-display: swap

---

## 7. 风险点

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| Matrix Canvas 动画性能 | 移动端可能卡顿 | 移动端降低粒子密度或禁用 |
| Pagefind 中文分词 | 中文搜索精度可能不足 | 配置中文分词器，测试搜索质量 |
| Giscus 依赖 GitHub | GitHub 服务中断时评论不可用 | 可接受，评论非核心功能 |
| TailwindCSS 4.x 稳定性 | 新版本可能有破坏性变更 | 锁定版本，关注 changelog |
| 内容安全 | 漏洞详情可能涉及敏感信息 | 文章发布前审核，脱敏处理 |
