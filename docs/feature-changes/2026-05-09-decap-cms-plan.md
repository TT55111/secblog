# Decap CMS 集成实施计划

## 任务列表

### 任务 1：创建个人信息数据文件
- **目标**：将硬编码的个人信息提取为 JSON 数据文件，使 CMS 可编辑
- **输入**：about/index.astro 和 index.astro 中的硬编码信息
- **输出**：`src/content/site/meta.json` + Zod schema
- **验收标准**：meta.json 包含所有个人信息字段，schema 验证通过
- **可能影响的已有模块**：content/config.ts（新增 site 集合）
- **回归验证**：构建成功，32 个测试通过

### 任务 2：创建 Decap CMS 管理界面
- **目标**：添加 CMS 入口页面和配置文件
- **输入**：content/config.ts 中的集合定义
- **输出**：`public/admin/index.html` + `public/admin/config.yml`
- **验收标准**：访问 /admin/ 可看到 CMS 登录界面，集合和字段映射正确
- **可能影响的已有模块**：无（纯新增文件）
- **回归验证**：构建成功，已有页面不受影响

### 任务 3：重构关于页读取 meta.json
- **目标**：about/index.astro 从 meta.json 读取个人信息
- **输入**：meta.json 数据
- **输出**：修改后的 about/index.astro
- **验收标准**：关于页显示内容与 meta.json 一致，无硬编码信息
- **可能影响的已有模块**：about/index.astro
- **回归验证**：关于页正常渲染，其他页面不受影响

### 任务 4：重构首页社交链接读取 meta.json
- **目标**：index.astro 从 meta.json 读取社交链接
- **输入**：meta.json 数据
- **输出**：修改后的 index.astro
- **验收标准**：首页社交链接与 meta.json 一致
- **可能影响的已有模块**：index.astro
- **回归验证**：首页正常渲染，其他页面不受影响

### 任务 5：配置 GitHub OAuth 登录
- **目标**：配置 OAuth 使 CMS 可通过 GitHub 登录
- **输入**：GitHub OAuth App 信息
- **输出**：OAuth 配置说明 + config.yml 中的 backend 配置
- **验收标准**：OAuth 登录流程可走通
- **可能影响的已有模块**：public/admin/config.yml
- **回归验证**：构建成功

### 任务 6：回归测试与浏览器验证
- **目标**：全量回归验证，确保旧功能不受影响
- **输入**：所有已修改文件
- **输出**：测试报告
- **验收标准**：32 个测试通过 + 构建成功 + 浏览器验证所有页面正常
- **可能影响的已有模块**：全部（回归验证）
- **回归验证**：全量

## 任务依赖关系

```
任务 1 → 任务 3, 任务 4（meta.json 先创建，页面才能引用）
任务 2（独立，可与任务 1 并行）
任务 3, 任务 4（可并行）
任务 5（依赖任务 2）
任务 6（依赖所有任务完成）
```
