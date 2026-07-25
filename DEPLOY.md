# DataPath 部署流程

> 本文档梳理 DataPath 数据分析学习站的完整部署流程，覆盖本地开发、构建产物到四种部署目标（GitHub Pages / Vercel / Cloudflare Pages / Docker + Nginx）。

---

## 一、项目结构

```
data_assitant_web/                          ← Git 仓库根目录
├── datapath/                               ← React + Vite 源码
│   ├── src/
│   │   ├── pages/                          ← 路由页面（详情页/购买页/题库等）
│   │   ├── components/                     ← 通用组件（编辑器/支付墙等）
│   │   ├── data/courses.ts                 ← 课程索引（mdFile 路径）
│   │   ├── config/purchase.ts              ← 价格/小红书链接配置
│   │   └── utils/access.ts                 ← 激活码校验逻辑
│   ├── public/                             ← 静态资源
│   ├── vite.config.ts                      ← base 路径决定部署子目录
│   └── package.json                        ← scripts: dev / build / preview
├── sql_learning/                           ← SQL 教程 Markdown（仓库根）
├── python_learning/                        ← Python 教程 Markdown
├── data_tk_learning/                       ← 思维模型 Markdown
├── data_project/                           ← 实战项目数据
├── projects/                               ← 实战项目图表（封面/流程图）
├── pyodide/                                ← Python 浏览器运行时
├── sql-wasm.js / .wasm / -browser.wasm     ← SQL.js 运行时
├── supabase/                               ← 数据库迁移 SQL
├── cloudflare.toml                         ← Cloudflare Pages 配置
├── Dockerfile + nginx.conf                ← Docker 部署
├── build.sh                                ← 服务器构建脚本
└── .env                                    ← Supabase 环境变量（仓库根）
```

**关键设计**：`vite.config.ts` 使用 `import.meta.glob` 直接读取仓库根的 `sql_learning/`、`python_learning/`、`data_tk_learning/`。**部署时这些目录必须和构建产物（dist）同级**。

---

## 二、本地开发

```bash
cd datapath
npm install
npm run dev
```

- 默认端口：5173（如被占用自动顺延）
- `base` 自动为 `/`，无需修改配置
- Supabase 配置从仓库根 `.env` 读取（`vite.config.ts` 中 `envDir: '..'`）

---

## 三、构建流程

### 1. 触发构建

```bash
cd datapath
npm install        # 首次或依赖变更时
npm run build      # tsc -b && vite build
```

构建产物：`datapath/dist/`
- `index.html` — 入口
- `assets/index-*.js` — JS bundle（≈ 16 MB，包含 Pyodide/SQL.js 运行时）
- `assets/index-*.css` — 样式

### 2. 拷贝静态资源到 dist

构建产物**不包含**以下内容，需要手动拷贝到 `dist/` 同级：

```bash
# 学习资料 Markdown（被 import.meta.glob 直接读取）
cp -r sql_learning       datapath/dist/
cp -r python_learning    datapath/dist/
cp -r data_tk_learning   datapath/dist/

# 实战项目数据与图表
cp -r data_project       datapath/dist/
cp -r projects           datapath/dist/

# 浏览器运行时
cp -r pyodide            datapath/dist/
cp sql-wasm.js sql-wasm.wasm sql-wasm-browser.wasm  datapath/dist/

# 禁用 Jekyll（GitHub Pages 必需）
cp .nojekyll             datapath/dist/
```

> **提示**：`build.sh` 已封装以上全部拷贝步骤，直接执行即可。

---

## 四、部署目标

### 目标 A：GitHub Pages（推荐）

**适用场景**：个人/开源项目，零成本

**配置要点**：
- `vite.config.ts` 中 `base: '/data_assitant_web/'`（与仓库名一致）
- 需要仓库根创建 `.nojekyll` 文件

**操作步骤**：

```bash
cd datapath
npm run build

# 把 dist 内容 + 学习资料平铺到仓库根（保持仓库根作为发布源）
cd ..
cp -r datapath/dist/* .
git add .
git commit -m "deploy: update site"
git push origin master
```

**GitHub 设置**：`Settings → Pages → Source: master / (root)`

**访问地址**：`https://<user>.github.io/data_assitant_web/`

---

### 目标 B：Vercel（最简单）

**适用场景**：CI/CD 自动化，自定义域名

**环境变量**（在 Vercel 控制台配置）：
- `VITE_BASE_PATH` = `/`
- `VITE_SUPABASE_URL` = 你的 Supabase URL
- `VITE_SUPABASE_ANON_KEY` = 你的 anon key

**Build 配置**：
- Build Command: `cd datapath && npm run build`
- Output Directory: `datapath/dist`
- Root Directory: 留空（仓库根）

**学习资料处理**：Vercel 不会自动复制 Markdown 目录，建议在 `build.sh` 中把拷贝步骤加到 build command 里，或写一个 postbuild 脚本。

---

### 目标 C：Cloudflare Pages（推荐用于海外）

**配置**：仓库根已有 `cloudflare.toml`，开箱即用。

- Build Command: `cd datapath && npm install && npm run build`
- Output Directory: `datapath/dist`

**路由重写**：已配置 `/* → /index.html`（SPA 支持）
**缓存策略**：已配置 `assets/*` 一年缓存 + `*.html` 不缓存

**学习资料处理**：参考 `build.sh`，在 build 前把 `sql_learning/` 等目录拷到 `datapath/dist/`。

---

### 目标 D：Docker + Nginx（自托管）

**适用场景**：自有服务器、内网部署、完全可控

**构建镜像**：

```bash
docker build -t datapath:latest .
```

**Dockerfile 行为**：
1. 阶段1：`node:20-alpine` 编译前端
2. 阶段2：`nginx:alpine` 托管 dist + 学习资料
3. 自动配置 `nginx.conf`（SPA 路由 + WASM MIME + gzip）

**运行容器**：

```bash
docker run -d --name datapath -p 8080:80 datapath:latest
```

访问：`http://localhost:8080/`

---

## 五、环境变量

| 变量 | 用途 | 必需 |
|---|---|---|
| `VITE_SUPABASE_URL` | Supabase 项目 URL | ✅ |
| `VITE_SUPABASE_ANON_KEY` | Supabase 公开 anon key | ✅ |
| `VITE_BASE_PATH` | 子路径前缀（GitHub Pages 用） | 仅 GH Pages |

**`.env` 文件位置**：仓库根（`data_assitant_web/.env`），不要提交到 Git。

---

## 六、Supabase 后端

数据库迁移在 `supabase/migrations/`，部署前需在 Supabase 控制台执行。

**核心表**：
- `activation_codes` — 激活码表（小红书发货后写入）
- `user_access` — 用户解锁状态

**生成激活码**（本地脚本）：

```bash
cd datapath
node scripts/generateActivationCodes.ts
```

---

## 七、部署后验证清单

- [ ] 首页打开无 404
- [ ] `/sql/1` 等详情页能正常显示学习内容（Markdown）
- [ ] 练习面板能打开，SQL/Python 都能执行
- [ ] 购买页 → 点击按钮能跳转到小红书
- [ ] 登录后输入激活码能正常解锁
- [ ] 思维模型/SQL/Python 三类内容都能访问
- [ ] 控制台无 404（特别是 `/sql_learning/*.md`、`/assets/*.js`）

---

## 八、常见问题

**Q: 详情页显示空白？**
A: `vite.config.ts` 的 `base` 与部署路径不匹配，或学习资料目录没拷贝到 dist 同级。

**Q: 支付墙弹出"未选择阶段"？**
A: 浏览器缓存了旧版本，硬刷新（Ctrl+Shift+R）即可。

**Q: Pyodide 加载很慢？**
A: 首次需要下载约 30 MB 资源，建议 CDN 加速或本地部署（见 `docs/pyodide-local-deployment.md`）。

**Q: GitHub Pages 路径不对？**
A: 修改 `vite.config.ts` 中 `base` 为 `/你的仓库名/`，重新构建。

---

## 九、CI/CD 建议（可选）

推荐 GitHub Actions 工作流：

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [master]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: cd datapath && npm ci && npm run build
      - run: cp -r sql_learning python_learning data_tk_learning datapath/dist/
      - uses: actions/upload-pages-artifact@v3
        with:
          path: datapath/dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

这样 `git push` 即可自动部署到 GitHub Pages。

---

**最后更新**：2026-07-25
