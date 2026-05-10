# 变更说明：集成 Decap CMS 全站内容管理

## 变更描述

为 SecBlog 添加基于 Decap CMS（原 Netlify CMS）的浏览器端内容管理系统，使用户可以直接在浏览器中编辑个人信息、增删改 CTF writeup 和漏洞分析文章，无需手动编辑代码文件。

## 技术方案

- **CMS**: Decap CMS 3.x
- **登录方式**: GitHub OAuth（通过 Netlify Identity 或自定义 OAuth App）
- **存储方式**: 编辑内容自动提交到 GitHub 仓库
- **部署位置**: `public/admin/` 目录，零侵入现有代码

## 功能范围

1. **个人信息编辑** — 编辑关于页的姓名、简介、技能、联系方式等
2. **CTF 文章管理** — 增删改 CTF writeup，包含 frontmatter 字段编辑
3. **漏洞分析文章管理** — 增删改漏洞分析文章，包含 frontmatter 字段编辑
4. **图片上传** — 通过 Git 上传图片到仓库
5. **Markdown 编辑器** — 内置富文本 + 原始 Markdown 双模式编辑

## 影响范围

### 新增文件
| 文件 | 说明 |
|------|------|
| `public/admin/index.html` | CMS 管理界面入口 |
| `public/admin/config.yml` | CMS 配置（集合定义、字段映射） |
| `src/content/site/meta.json` | 个人信息数据文件（CMS 可编辑） |

### 修改文件
| 文件 | 修改内容 | 风险 |
|------|---------|------|
| `src/pages/about/index.astro` | 从 meta.json 读取个人信息替代硬编码 | 低 — 仅数据来源变更 |
| `src/pages/index.astro` | 社交链接从 meta.json 读取 | 低 — 仅数据来源变更 |
| `src/components/Navbar.astro` | 添加管理入口链接（可选） | 低 — 仅新增一个链接 |

### 不受影响的模块
- 所有页面样式
- MatrixRain、GlitchText 等交互组件
- 搜索功能（Pagefind）
- 评论系统（Giscus）
- SEO 配置
- 构建流程

## 受影响的已有模块清单

1. **about/index.astro** — 个人信息从硬编码改为从 JSON 文件读取
2. **index.astro** — 社交链接从硬编码改为从 JSON 文件读取
3. **content/config.ts** — 可能需要添加 site 集合定义

## 风险评估

| 风险 | 级别 | 缓解措施 |
|------|------|---------|
| OAuth 配置复杂 | 中 | 提供详细步骤文档，支持本地 proxy 模式开发 |
| CMS 编辑后需重新构建 | 低 | 部署平台自动触发构建（Vercel/GitHub Pages） |
| meta.json 格式错误导致页面崩溃 | 低 | 使用 Zod schema 验证，提供 fallback 默认值 |
| Decap CMS 项目维护状态不确定 | 中 | Decap CMS 是社区维护的 Netlify CMS fork，活跃度尚可 |

## 回归验证范围

- [ ] 首页正常渲染，社交链接正确
- [ ] 关于页正常渲染，个人信息正确
- [ ] CTF 列表页和详情页正常
- [ ] 漏洞分析列表页和详情页正常
- [ ] 搜索功能正常
- [ ] 404 页面正常
- [ ] 构建成功，无报错
- [ ] 32 个已有测试全部通过
