# 思维模型学习板块 — 项目方案

## 一、板块定位

新增第三个学习板块 **"思维模型"**，与 SQL、Python 并列，覆盖数据分析核心思维框架。
内容来源：`data_tk_learning/` 目录，共 12 个阶段、30+ 个 md 文件。

## 二、阶段规划

根据 `数据分析思维模型.md` 目录结构，分为 12 个阶段：

| 阶段 | ID | 标题 | emoji | 子文件数 |
|------|-----|------|-------|---------|
| 1 | thinking/1 | 基础思维 | 🧠 | 4（结构化、漏斗、对比、分类） |
| 2 | thinking/2 | 核心分析模型 | 📐 | 4（描述/诊断/预测/处方） |
| 3 | thinking/3 | 商业分析模型 | 💼 | 7（RFM、AARRR、LTV/CAC、留存、KANO、波士顿、安索夫） |
| 4 | thinking/4 | 归因分析 | 🎯 | 2（归因类型、归因流程） |
| 5 | thinking/5 | 细分分析 | 🔍 | 3（用户画像、同期群、分群对比） |
| 6 | thinking/6 | 数据指标体系 | 📊 | 4（北极星、OSM、AARRR指标、KPI） |
| 7 | thinking/7 | A/B 测试思维 | 🧪 | 1 |
| 8 | thinking/8 | 数据可视化思维 | 📈 | 1 |
| 9 | thinking/9 | 场景与模型组合 | 🔗 | 1 |
| 10 | thinking/10 | 方法论框架 | 📋 | 1（DMAIC、CRISP-DM、通用流程） |
| 11 | thinking/11 | 高级分析思维 | 🚀 | 3（因果推断、网络分析、文本分析） |
| 12 | thinking/12 | 避坑指南 | ⚠️ | 1 |

## 三、路由设计

```
/thinking          → ThinkingOverviewPage（总览页，卡片列表 + 进度条）
/thinking/:id      → DetailPage（复用现有详情页，type="thinking"）
```

- `:id` 对应阶段编号 1-12
- 复用 DetailPage 组件，通过 `type="thinking"` prop 切换数据源
- 每个阶段的 md 内容从 `data_tk_learning/` 目录懒加载

## 四、文件结构

```
datapath/src/
├── data/courses.ts          ← 新增 thinking course 定义
├── pages/
│   ├── HomePage.tsx          ← 新增思维模型板块
│   ├── ThinkingOverviewPage.tsx  ← 新增，参考 SqlOverviewPage
│   └── DetailPage.tsx        ← 扩展，支持 type="thinking"
├── pages/
│   ├── HomePage.css          ← 新增 .home__section-badge--thinking 样式
│   └── ThinkingOverviewPage.css  ← 新增
```

## 五、courses.ts 数据定义

```ts
// 在 courses 数组中新增第三项
{
  id: 'thinking',
  title: '数据分析思维模型',
  color: '#f59e0b',  // 琥珀色，区别于 SQL 紫 / Python 绿
  stages: [
    { id: '1',  title: '基础思维',       emoji: '🧠', description: '结构化 / 漏斗 / 对比 / 分类',            topicCount: 4,  mdFile: '../../data_tk_learning/数据分析思维模型.md' },
    { id: '2',  title: '核心分析模型',   emoji: '📐', description: '描述性 / 诊断性 / 预测性 / 处方性',     topicCount: 4,  mdFile: '../../data_tk_learning/2.1 描述性分析模型.md' },
    { id: '3',  title: '商业分析模型',   emoji: '💼', description: 'RFM / AARRR / LTV / 留存 / KANO',     topicCount: 7,  mdFile: '../../data_tk_learning/3.1 RFM模型.md' },
    { id: '4',  title: '归因分析',       emoji: '🎯', description: '归因类型 / 归因分析流程',                topicCount: 2,  mdFile: '../../data_tk_learning/4.1 归因类型.md' },
    { id: '5',  title: '细分分析',       emoji: '🔍', description: '用户画像 / 同期群 / 分群对比',           topicCount: 3,  mdFile: '../../data_tk_learning/5.1 用户画像分析.md' },
    { id: '6',  title: '数据指标体系',   emoji: '📊', description: '北极星 / OSM / AARRR指标 / KPI',        topicCount: 4,  mdFile: '../../data_tk_learning/6.1 北极星指标.md' },
    { id: '7',  title: 'A/B 测试思维',   emoji: '🧪', description: '统计基础 / 实验流程 / 常见陷阱',         topicCount: 1,  mdFile: '../../data_tk_learning/7.1 A/B测试思维.md' },
    { id: '8',  title: '数据可视化思维', emoji: '📈', description: '图表选择 / 设计原则',                     topicCount: 1,  mdFile: '../../data_tk_learning/8.1 数据可视化思维.md' },
    { id: '9',  title: '场景与模型组合', emoji: '🔗', description: '增长 / 流失 / 活动 / 产品分析',          topicCount: 1,  mdFile: '../../data_tk_learning/9.1 常见分析场景与思维模型组合.md' },
    { id: '10', title: '方法论框架',     emoji: '📋', description: 'DMAIC / CRISP-DM / 通用流程',            topicCount: 1,  mdFile: '../../data_tk_learning/10.1 数据分析方法论框架.md' },
    { id: '11', title: '高级分析思维',   emoji: '🚀', description: '因果推断 / 网络分析 / 文本分析',         topicCount: 3,  mdFile: '../../data_tk_learning/11.1 因果推断.md' },
    { id: '12', title: '避坑指南',       emoji: '⚠️', description: '认知偏差 / 数据陷阱 / 数据质量',         topicCount: 1,  mdFile: '../../data_tk_learning/12.1 避坑指南.md' },
  ],
}
```

## 六、首页展示

### 学习路线卡片
在 ROADMAP_GRADIENTS 末尾追加 12 个渐变色（橙/琥珀/暖色调，匹配思维模型定位），ROADMAP_CARDS 从 thinking course stages 派生。

### 板块区域
```
{ SQL 板块 }       ← 红色系 badge
{ Python 板块 }    ← 绿色系 badge
{ 思维模型 板块 }  ← 琥珀色 badge  ← 新增
```

CSS 新增：
```css
.home__section-badge--thinking {
  background: rgba(245, 158, 11, 0.12);
  color: #d97706;
}
```

CourseCard 的 color/tag 传 `"thinking"`。

## 七、DetailPage 适配

### md 文件加载
新增第三个 import.meta.glob：
```ts
const thinkingModules = import.meta.glob('../../../data_tk_learning/*.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>
```

路径匹配逻辑：
- `type === 'thinking'` 时，匹配 `/stage${id}_` 或具体文件名模式
- 需要处理文件名格式（如 `3.1 RFM模型.md`、`11.1 因果推断.md`）

### 练习面板
思维模型阶段**不显示**练习按钮（无 SQL/Python 代码可执行）。

### FAB 按钮颜色
thinking 详情页的 FAB 练习按钮不显示，目录按钮保留。

## 八、ThinkingOverviewPage

完全复用 SqlOverviewPage 的结构：
- 面包屑：首页 / 思维模型
- 总进度条
- 12 阶段卡片列表，显示完成状态
- 数据从 courses.ts 读取

## 九、导航栏更新

Navbar 新增思维模型入口：
```
[ SQL | Python | 思维模型 | 进度 ]
```

## 十、颜色方案

| 板块 | 主色 | badge 背景 | badge 文字 | FAB 按钮 |
|------|------|-----------|-----------|---------|
| SQL | #a78bfa 紫 | rgba(255,107,107,0.12) | #ff6b6b | 红色渐变 |
| Python | #4ecdc4 绿 | rgba(78,205,196,0.12) | #26a69a | 绿色渐变 |
| Thinking | #f59e0b 琥珀 | rgba(245,158,11,0.12) | #d97706 | 琥珀色渐变 |

## 十一、实施步骤

1. **courses.ts** — 新增 thinking course 定义
2. **App.tsx** — 新增 `/thinking` 和 `/thinking/:id` 路由
3. **ThinkingOverviewPage.tsx + .css** — 新增总览页
4. **DetailPage.tsx** — 支持 type="thinking"，新增 md glob，隐藏练习按钮
5. **HomePage.tsx + .css** — 新增思维模型板块、学习路线卡片
6. **Navbar** — 新增导航入口
7. **验证** — tsc + vite build

## 十二、注意事项

- 思维模型的 md 文件名有空格和中文，import.meta.glob 需要正确匹配
- 每个阶段只有 1 个 md（不像 SQL 有多个代码块），阶段 1 的 md 就是 `数据分析思维模型.md`（总览）
- 思维模型没有在线练习功能，不显示练习 FAB
- 阶段 2-12 的 md 文件需确认内容是否完整（部分可能还在编写中）
- md 文件 lazy import，不影响首屏 bundle
