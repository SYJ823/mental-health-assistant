# Mental Health Assistant / 心理健康助手

基于 **Vue 3 + Vite** 的心理健康 Web 应用：用户侧提供 AI 流式心理咨询、情绪日记与知识库阅读；管理侧提供数据统计、知识文章运营、咨询与情绪日志管理。前后端分离，通过 REST 与 SSE 对接后端服务。

---

## 功能概览

### 用户端（`/`，需登录后按角色访问）

| 模块 | 说明 |
|------|------|
| 首页 | 产品介绍与入口 |
| AI 咨询 | 会话创建/历史/删除；**SSE 流式**回复；会话情绪分析（情绪花园） |
| 情绪日记 | 情绪评分、主导情绪、触发因素与日记正文；睡眠与压力等维度提交 |
| 知识库 | 文章分页列表、推荐阅读、文章详情 |

![](C:\Users\sunyo\Pictures\Screenshots\屏幕截图 2026-05-03 191017.png)

![幕截图 2026-05-03 19105](C:\Users\sunyo\Pictures\Screenshots\屏幕截图 2026-05-03 191057.png)

![](C:\Users\sunyo\Pictures\Screenshots\屏幕截图 2026-05-03 191114.png)

![](C:\Users\sunyo\Pictures\Screenshots\屏幕截图 2026-05-03 191337.png)

![](C:\Users\sunyo\Pictures\Screenshots\屏幕截图 2026-05-03 191350.png)

![](C:\Users\sunyo\Pictures\Screenshots\屏幕截图 2026-05-03 191131.png)

### 管理端（`/back`，管理员）

| 模块 | 说明 |
|------|------|
| 数据分析 | 系统概览指标；情绪趋势、咨询统计、用户活跃度（ECharts） |
| 知识文章 | 分类、分页检索、新增/编辑（富文本 + 封面上传）、发布/下线/删除 |
| 咨询记录 | 会话列表与详情对话展示 |
| 情绪日志 | 用户情绪日记分页与详情、删除 |

![](C:\Users\sunyo\Pictures\Screenshots\屏幕截图 2026-05-03 191146.png)

![](C:\Users\sunyo\Pictures\Screenshots\屏幕截图 2026-05-03 191159.png)

![](C:\Users\sunyo\Pictures\Screenshots\屏幕截图 2026-05-03 191211.png)

![](C:\Users\sunyo\Pictures\Screenshots\屏幕截图 2026-05-03 191222.png)

### 认证

- 登录 / 注册（`/auth/login`、`/auth/register`）
- 路由守卫：`token` + `userType` 区分普通用户与管理员可访问范围

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Vue 3（Composition API / `<script setup>`）、Vue Router 4、Pinia 3 |
| UI | Element Plus、Sass、@element-plus/icons-vue |
| 构建 | Vite 8、@vitejs/plugin-vue、路径别名 `@` → `src` |
| 网络 | Axios（统一实例、拦截器、Token）；`@microsoft/fetch-event-source`（流式 AI） |
| 可视化 | ECharts 6 |
| 富文本 | wangEditor 5（`@wangeditor/editor-for-vue`） |

---

## 仓库结构

```
mental-health-assistant/
├── code/ai-vue/          # 前端工程（在此目录安装依赖与启动）
│   ├── src/
│   │   ├── api/          # 接口：admin.js（管理端）、frontend.js（用户端）
│   │   ├── components/   # 布局与通用组件（Layout、TableSearch、MarkdownRenderer 等）
│   │   ├── router/       # 路由与全局前置守卫
│   │   ├── stores/       # Pinia
│   │   ├── utils/        # Axios 封装 request.js
│   │   └── views/        # 页面
│   ├── vite.config.js    # 开发代理 /api → 后端
│   └── package.json
├── Records/
│   ├── docs.md           # 环境说明、接口文档与资源链接
│   └── logs.md           # 开发过程记录（可选阅读）
└── README.md
```

---

## 快速开始

### 环境要求

- **Node.js**：建议 **v18+** 或 **v20+**（团队文档参考见 `Records/docs.md`）
- **npm** 或 **pnpm** / **yarn**

### 安装与启动

```bash
cd code/ai-vue
npm install
npm run dev
```

默认开发服务器一般为 `http://localhost:5173`。前端请求前缀为 **`/api`**，由 Vite 代理到 `vite.config.js` 中配置的 `server.proxy` 目标地址。

### 构建与预览

```bash
npm run build
npm run preview
```

### 后端与接口

- 接口文档、文件服务与默认资源说明见 **[Records/docs.md](./Records/docs.md)**。
- 若后端地址变更，请同步修改 **`code/ai-vue/vite.config.js`** 中的 `server.proxy["/api"].target`，以及按需调整 **`code/ai-vue/src/config/index.js`** 中的文件基础地址等常量。

---

## 说明与免责

- 本项目用于学习与产品演示，**不能替代专业医疗或心理咨询**。如遇心理危机，请优先联系当地专业机构或紧急援助渠道。
- 生产部署时请自行配置 HTTPS、鉴权与隐私合规策略，勿在仓库中提交真实密钥。

---

## 许可证

若仓库未单独声明许可证，以仓库根目录或组织策略为准；添加 `LICENSE` 文件后可在此更新说明。
