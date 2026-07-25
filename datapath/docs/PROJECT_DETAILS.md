# DataPath 项目技术文档

## 项目概述

**DataPath** 是一个数据学习平台，旨在帮助用户系统学习 SQL、Python 数据分析以及数据思维模型。平台采用"免费体验 + 付费解锁"的商业模式。

### 技术栈

| 层级 | 技术选型 |
|------|----------|
| 前端框架 | React 18 + TypeScript |
| 构建工具 | Vite 6 |
| 路由管理 | React Router v6 |
| 后端服务 | Supabase (PostgreSQL + Auth) |
| 样式方案 | CSS Variables + 模块化 CSS |
| 图标系统 | 自定义 SVG 渐变图标 |

### 项目结构

```
datapath/
├── src/
│   ├── components/          # UI 组件
│   │   ├── Layout.tsx       # 页面布局
│   │   ├── Navbar.tsx       # 导航栏
│   │   ├── HeroCard.tsx     # 首页统计卡片
│   │   ├── CourseCard.tsx   # 课程模块卡片
│   │   ├── Icons.tsx        # SVG 图标库
│   │   ├── PaywallOverlay.tsx  # 付费墙遮罩
│   │   ├── AuthModal.tsx    # 登录/注册弹窗
│   │   ├── SqlPlayground.tsx   # SQL 在线练习
│   │   ├── PythonPlayground.tsx # Python 在线练习
│   │   └── quiz/            # 刷题相关组件
│   │       ├── QuizStats.tsx
│   │       ├── QuizFilter.tsx
│   │       ├── OptionCard.tsx
│   │       └── QuizProgress.tsx
│   │
│   ├── pages/               # 页面组件
│   │   ├── HomePage.tsx     # 首页
│   │   ├── SqlOverviewPage.tsx    # SQL 模块列表
│   │   ├── PythonOverviewPage.tsx # Python 模块列表
│   │   ├── ThinkingOverviewPage.tsx # 思维模型列表
│   │   ├── DetailPage.tsx   # 教程详情页
│   │   ├── ProgressPage.tsx # 学习进度页
│   │   ├── PurchasePage.tsx # 购买页
│   │   ├── quiz/            # 刷题页面
│   │   │   ├── QuizHomePage.tsx   # 刷题首页
│   │   │   ├── SqlQuizPage.tsx    # SQL 题库
│   │   │   ├── PythonQuizPage.tsx # Python 题库
│   │   │   ├── SqlPracticePage.tsx   # SQL 刷题
│   │   │   ├── PythonPracticePage.tsx # Python 刷题
│   │   │   ├── SqlAssessmentPage.tsx  # SQL 测评
│   │   │   ├── PythonAssessmentPage.tsx # Python 测评
│   │   │   └── WrongBookPage.tsx      # 错题本
│   │   └── projects/
│   │       ├── ProjectsPage.tsx      # 实战项目列表
│   │       └── ProjectDetailPage.tsx # 项目详情
│   │
│   ├── data/                # 数据源
│   │   ├── courses.ts       # 课程配置 (SQL/Python/Thinking 模块)
│   │   ├── sqlQuestions.ts  # SQL 题库 (150+ 题)
│   │   ├── pythonQuestions.ts # Python 题库 (100+ 题)
│   │   └── dataProjects.ts  # 实战项目数据
│   │
│   ├── hooks/               # 自定义 Hooks
│   │   ├── useProgress.ts   # 学习进度管理
│   │   ├── useQuiz.ts       # 刷题统计 (云端同步)
│   │   ├── useSmartQuiz.ts  # 智能刷题系统
│   │   └── useWrongBook.ts  # 错题本管理
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx  # 用户认证上下文
│   │
│   ├── utils/               # 工具函数
│   │   ├── access.ts        # 访问权限控制
│   │   ├── progress.ts      # 进度存储
│   │   ├── supabaseData.ts  # 云端数据同步
│   │   ├── iconMap.tsx      # 图标映射
│   │   └── formatContent.ts # 内容格式化
│   │
│   ├── config/
│   │   └── purchase.ts      # 购买配置 (价格、链接)
│   │
│   ├── lib/
│   │   └── supabase.ts      # Supabase 客户端
│   │
│   └── styles/
│       └── global.css       # 全局样式
│
├── supabase/
│   └── migrations/
│       ├── 001_initial.sql
│       └── 002_user_data.sql
│
└── public/
    └── projects/            # 实战项目图片资源
```

---

## 核心功能模块

### 1. 学习模块系统

#### 内容结构

| 学科 | 阶段数 | 免费阶段 | 内容类型 |
|------|--------|----------|----------|
| SQL | 8 阶段 | 1-3 | 基础 → 窗口函数 → 实战 |
| Python | 12 阶段 | 1-2 | 基础 → Pandas → 机器学习 |
| Thinking | 12 章 | 1.1-2.4 | 思维模型 → 商业分析 → 高级分析 |

#### 访问控制

```typescript
// 免费阶段配置
const FREE_SQL_IDS = ['1', '2', '3']
const FREE_PYTHON_IDS = ['1', '2']
const FREE_THINKING_IDS = ['1.1', '1.2', '1.3', '1.4', '2']

// 权限判断
function isStageAccessible(subject: Subject, stageId: string): boolean {
  if (loadStore().unlocked) return true  // 已解锁全部访问
  if (subject === 'sql') return FREE_SQL_IDS.includes(stageId)
  if (subject === 'python') return FREE_PYTHON_IDS.includes(stageId)
  if (subject === 'thinking') return FREE_THINKING_IDS.includes(stageId)
  return false
}
```

---

### 2. 刷题系统

#### 智能刷题流程

```
用户进入刷题
    ↓
是否完成测评?
    ├─ 否 → 水平测评 (自适应 CAT)
    │         ↓
    │    根据测评结果定级 (Lv.1-5)
    │         ↓
    │    初始化板块权重
    │
    └─ 是 → 智能刷题
              ↓
         根据权重选题:
         - 未掌握板块 → 高权重
         - 已掌握板块 → 低权重
         - 根据等级配难度
              ↓
         答题 → 更新权重
              ↓
         满足晋阶条件 → 挑战升级
```

#### 等级系统

| 等级 | 名称 | 难度配比 (Easy/Medium/Hard) |
|------|------|----------------------------|
| Lv.1 | 小白一枚 | 70% / 25% / 5% |
| Lv.2 | 上道儿了 | 60% / 30% / 10% |
| Lv.3 | 拿捏了 | 30% / 50% / 20% |
| Lv.4 | 稳如老狗 | 10% / 40% / 50% |
| Lv.5 | SQL老炮 | 0% / 20% / 80% |

#### 自适应测评 (CAT)

```typescript
interface AssessmentState {
  currentDifficulty: string      // 当前难度 (easy/medium/hard)
  currentBoardIndex: number      // 当前板块索引
  consecutiveCorrect: number     // 连续正确数
  consecutiveWrong: number       // 连续错误数
  hardStreak: number            // 连续答对难题数
  easyFailStreak: number        // 连续答错简单题数
  // ...
}

// 测评结束条件:
// 1. 连续答对 3 道 hard 题 → Lv.5
// 2. 连续答错 3 道 easy 题 → Lv.1
// 3. 答满 12 题 → 根据正确率定级
```

#### 晋阶条件 (SQL 为例)

| 当前等级 | 累计题数 | 总正确率 | 板块正确率 | 错题清空率 | 最近20题 |
|----------|----------|----------|------------|------------|----------|
| 1→2 | 50题 | 60% | 70% | 80% | 对14题 |
| 2→3 | 120题 | 65% | 70% | 80% | 对14题 |
| 3→4 | 200题 | 70% | 70% | 80% | 对15题 |
| 4→5 | 350题 | 75% | 70% | 90% | 对16题 |

---

### 3. 错题本系统

#### 数据结构

```typescript
interface WrongBookEntry {
  questionId: number
  subject: 'sql' | 'python'
  count: number           // 答错次数
  lastTimestamp: number   // 最后答错时间
  reviewed: boolean       // 是否已复习
}
```

#### 功能

- 自动记录错题
- 显示答错次数
- 支持标记"已复习"
- 支持删除 (掌握后移除)

---

### 4. 实战项目

#### 项目列表

| 项目 | 难度 | 图表数 | 核心模型 |
|------|------|--------|----------|
| RFM 用户价值分层 | 入门 | 8 张 | RFM 模型 |
| AARRR 用户增长分析 | 进阶 | 10 张 | AARRR 漏斗 |
| LTV/CAC 商业分析 | 进阶 | 10 张 | LTV、CAC、同期群 |
| 跨境电商全案诊断 | 高级 | 11 张 | DMAIC、多模型融合 |

#### 项目内容

每个项目包含：
- 完整分析报告 (Markdown)
- 项目深度剖析指南
- 可视化图表
- Python 代码文件

---

### 5. 用户认证与付费

#### 认证流程

```
用户注册/登录 (Supabase Auth)
    ↓
检查 user_access 表
    ↓
是否已激活?
    ├─ 是 → 同步权限到 localStorage
    │
    └─ 否 → 显示购买页
              ↓
         输入激活码
              ↓
         验证激活码 (云端)
              ↓
         更新 user_access 表
              ↓
         解锁全站内容
```

#### 激活码系统

```typescript
// 激活码格式: DP-XXXX-XXXX-XX
// 示例: DP-A7B2-K9M3-P5

function validateCode(code: string): boolean {
  const match = code.match(/^DP-([A-Z0-9]{4})-([A-Z0-9]{4})-([A-Z0-9]{2})$/)
  if (!match) return false
  return computeChecksum(match[1] + match[2]) === match[3]
}
```

#### 数据库表结构

```sql
-- 激活码表
CREATE TABLE activation_codes (
  code TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  activated_at TIMESTAMPTZ
);

-- 用户访问权限
CREATE TABLE user_access (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id),
  unlocked BOOLEAN DEFAULT false,
  activation_code TEXT
);

-- 答题记录
CREATE TABLE quiz_records (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  question_id INTEGER,
  chosen_option TEXT,
  is_correct BOOLEAN,
  subject TEXT,
  timestamp TIMESTAMPTZ
);

-- 错题本
CREATE TABLE wrong_book (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  question_id INTEGER,
  subject TEXT,
  count INTEGER,
  last_timestamp TIMESTAMPTZ,
  reviewed BOOLEAN,
  UNIQUE(user_id, question_id, subject)
);

-- 用户画像 (智能刷题)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  subject TEXT,
  level INTEGER,
  level_name TEXT,
  assessment_done BOOLEAN,
  board_weights JSONB,
  promotion JSONB,
  done_questions INTEGER[],
  UNIQUE(user_id, subject)
);
```

---

## 数据库表结构详细说明

### 数据库架构概览

DataPath 使用 **Supabase (PostgreSQL)** 作为后端数据库，共包含 **6 张核心数据表**：

```
┌─────────────────────────────────────────────────────────────────┐
│                        auth.users (Supabase 内置)                │
│                        用户认证核心表                             │
└───────────────────────────┬─────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│activation_codes│  │  user_access  │  │ user_progress │
│   激活码表     │  │  用户权限表   │  │  学习进度表   │
└───────────────┘  └───────────────┘  └───────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│ quiz_records  │  │  wrong_book   │  │ user_profiles │
│  答题记录表   │  │   错题本表    │  │  用户画像表   │
└───────────────┘  └───────────────┘  └───────────────┘
```

---

### 1. activation_codes (激活码表)

**用途**: 存储系统生成的激活码，记录激活码的使用状态和绑定用户。

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | 主键 |
| code | TEXT | UNIQUE, NOT NULL | 激活码，格式: DP-XXXX-XXXX-XX |
| user_id | UUID | REFERENCES auth.users(id) | 绑定的用户ID，NULL表示未使用 |
| created_at | TIMESTAMPTZ | DEFAULT now() | 创建时间 |
| activated_at | TIMESTAMPTZ | | 激活时间 |
| created_by | TEXT | DEFAULT 'system' | 创建者标识 |

**RLS 策略**:
- `SELECT`: 任何人可查看（用于验证激活码）
- `INSERT/UPDATE`: 仅服务端可操作

**索引**:
- `idx_activation_codes_code` ON (code)
- `idx_activation_codes_user` ON (user_id)

**业务逻辑**:
```typescript
// 激活码验证流程
1. 用户输入激活码
2. 查询 activation_codes 表，条件: code = 输入值 AND user_id IS NULL
3. 如果存在，则更新: user_id = 当前用户ID, activated_at = now()
4. 同时在 user_access 表创建/更新解锁记录
```

---

### 2. user_access (用户权限表)

**用途**: 记录用户的解锁状态，控制付费内容的访问权限。

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | 主键 |
| user_id | UUID | REFERENCES auth.users(id), UNIQUE, NOT NULL | 用户ID |
| unlocked | BOOLEAN | DEFAULT false | 是否已解锁 |
| activated_at | TIMESTAMPTZ | | 激活时间 |
| activation_code | TEXT | | 使用的激活码 |
| created_at | TIMESTAMPTZ | DEFAULT now() | 创建时间 |

**RLS 策略**:
- `SELECT`: 用户只能查看自己的记录 (auth.uid() = user_id)
- `INSERT`: 用户只能插入自己的记录
- `UPDATE`: 用户只能更新自己的记录

**索引**:
- `idx_user_access_user` ON (user_id)

**前端调用**:
```typescript
// 检查用户权限
const { data } = await supabase
  .from('user_access')
  .select('unlocked')
  .eq('user_id', userId)
  .single()

// 返回: { unlocked: true/false }
```

---

### 3. user_progress (用户学习进度表)

**用途**: 云端同步用户的学习进度，支持多设备同步。

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | 主键 |
| user_id | UUID | REFERENCES auth.users(id), UNIQUE, NOT NULL | 用户ID |
| progress_data | JSONB | DEFAULT '{}' | 学习进度JSON数据 |
| updated_at | TIMESTAMPTZ | DEFAULT now() | 最后更新时间 |

**progress_data 结构**:
```json
{
  "sql": {
    "1": { "completed": true, "completedAt": 1716123456789 },
    "2": { "completed": false, "progress": 50 }
  },
  "python": {
    "1": { "completed": true },
    "2": { "completed": false, "progress": 30 }
  },
  "thinking": {
    "1.1": { "completed": true },
    "1.2": { "completed": false }
  }
}
```

**RLS 策略**:
- `SELECT/INSERT/UPDATE`: 用户只能操作自己的记录

**索引**:
- `idx_user_progress_user` ON (user_id)

---

### 4. quiz_records (答题记录表)

**用途**: 记录用户的每一道题的答题情况，用于统计分析和智能刷题。

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | 主键 |
| user_id | UUID | REFERENCES auth.users(id), NOT NULL | 用户ID |
| question_id | INTEGER | NOT NULL | 题目ID |
| chosen_option | TEXT | NOT NULL | 选择的选项 (A/B/C/D) |
| is_correct | BOOLEAN | NOT NULL | 是否正确 |
| subject | TEXT | NOT NULL, CHECK (subject IN ('sql', 'python')) | 学科类型 |
| timestamp | TIMESTAMPTZ | DEFAULT now() | 答题时间 |

**RLS 策略**:
- `SELECT`: 用户只能查看自己的答题记录
- `INSERT`: 用户只能插入自己的答题记录
- `DELETE`: 用户只能删除自己的答题记录

**索引**:
- `idx_quiz_records_user` ON (user_id)
- `idx_quiz_records_subject` ON (user_id, subject)
- `idx_quiz_records_timestamp` ON (user_id, timestamp DESC)

**统计查询示例**:
```sql
-- 总答题数
SELECT COUNT(*) FROM quiz_records WHERE user_id = ?

-- 正确率
SELECT 
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE is_correct = true) as correct,
  ROUND(COUNT(*) FILTER (WHERE is_correct = true)::numeric / COUNT(*) * 100, 0) as accuracy
FROM quiz_records 
WHERE user_id = ?

-- 今日答题数
SELECT COUNT(*) FROM quiz_records 
WHERE user_id = ? AND timestamp::date = CURRENT_DATE

-- 各板块正确率
SELECT 
  q.category,
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE r.is_correct = true) as correct
FROM quiz_records r
JOIN questions q ON r.question_id = q.id
WHERE r.user_id = ?
GROUP BY q.category
```

---

### 5. wrong_book (错题本表)

**用途**: 记录用户的错题，支持错题复习和掌握状态管理。

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | 主键 |
| user_id | UUID | REFERENCES auth.users(id), NOT NULL | 用户ID |
| question_id | INTEGER | NOT NULL | 题目ID |
| subject | TEXT | NOT NULL, CHECK (subject IN ('sql', 'python')) | 学科类型 |
| count | INTEGER | DEFAULT 1 | 答错次数 |
| last_timestamp | TIMESTAMPTZ | DEFAULT now() | 最后答错时间 |
| reviewed | BOOLEAN | DEFAULT false | 是否已复习 |
| created_at | TIMESTAMPTZ | DEFAULT now() | 创建时间 |

**唯一约束**: UNIQUE(user_id, question_id, subject)

**RLS 策略**:
- `SELECT/INSERT/UPDATE/DELETE`: 用户只能操作自己的错题

**索引**:
- `idx_wrong_book_user` ON (user_id)
- `idx_wrong_book_subject` ON (user_id, subject)

**业务逻辑**:
```typescript
// 答错时更新错题本
async function addWrongAnswer(questionId: number, subject: 'sql' | 'python') {
  // 1. 检查是否已存在
  const existing = await supabase
    .from('wrong_book')
    .select('*')
    .eq('user_id', userId)
    .eq('question_id', questionId)
    .eq('subject', subject)
    .single()

  if (existing) {
    // 2. 已存在则更新 count + 1
    await supabase
      .from('wrong_book')
      .update({ 
        count: existing.count + 1, 
        last_timestamp: now(),
        reviewed: false 
      })
      .eq('id', existing.id)
  } else {
    // 3. 不存在则插入新记录
    await supabase
      .from('wrong_book')
      .insert({ user_id, question_id, subject, count: 1 })
  }
}
```

---

### 6. user_profiles (用户画像表)

**用途**: 存储智能刷题系统的用户画像数据，包括等级、板块权重、测评结果等。

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | 主键 |
| user_id | UUID | REFERENCES auth.users(id), NOT NULL | 用户ID |
| subject | TEXT | NOT NULL, CHECK (subject IN ('sql', 'python')) | 学科类型 |
| level | INTEGER | DEFAULT 1 | 当前等级 (1-5) |
| level_name | TEXT | DEFAULT '小白一枚' | 等级名称 |
| assessment_done | BOOLEAN | DEFAULT false | 是否完成测评 |
| board_weights | JSONB | DEFAULT '{}' | 板块权重配置 |
| promotion | JSONB | DEFAULT '{}' | 晋阶状态数据 |
| assessment_score | INTEGER | | 测评得分 |
| assessment_answers | JSONB | DEFAULT '[]' | 测评答案详情 |
| done_questions | INTEGER[] | DEFAULT '{}' | 已做题目ID列表 |
| updated_at | TIMESTAMPTZ | DEFAULT now() | 最后更新时间 |

**唯一约束**: UNIQUE(user_id, subject)

**board_weights 结构**:
```json
{
  "basic": { "weight": 1.0, "correct": 10, "wrong": 3, "mastered": false },
  "join": { "weight": 1.5, "correct": 5, "wrong": 8, "mastered": false },
  "window": { "weight": 0.3, "correct": 30, "wrong": 2, "mastered": true }
}
```

**promotion 结构**:
```json
{
  "eligible": false,
  "lastChallengeTime": "2024-05-20T10:30:00Z",
  "challengeCount": 2,
  "cooldownUntil": "2024-05-21T10:30:00Z"
}
```

**RLS 策略**:
- `SELECT/INSERT/UPDATE`: 用户只能操作自己的画像

**索引**:
- `idx_user_profiles_user_subject` ON (user_id, subject)

---

### 表关系图

```
┌──────────────────────────────────────────────────────────────────────┐
│                           auth.users                                  │
│                    (Supabase 内置用户表)                              │
└─────────────────────────────┬────────────────────────────────────────┘
                              │
       ┌──────────────────────┼──────────────────────┐
       │                      │                      │
       ▼                      ▼                      ▼
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│activation_codes │   │   user_access   │   │  user_progress  │
├─────────────────┤   ├─────────────────┤   ├─────────────────┤
│ id (PK)         │   │ id (PK)         │   │ id (PK)         │
│ code (UK)       │   │ user_id (FK,UK) │   │ user_id (FK,UK) │
│ user_id (FK)    │◄──│ unlocked        │   │ progress_data   │
│ created_at      │   │ activated_at    │   │ updated_at      │
│ activated_at    │   │ activation_code │   └─────────────────┘
│ created_by      │   │ created_at      │
└─────────────────┘   └─────────────────┘
                              │
       ┌──────────────────────┼──────────────────────┐
       │                      │                      │
       ▼                      ▼                      ▼
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│  quiz_records   │   │   wrong_book    │   │  user_profiles  │
├─────────────────┤   ├─────────────────┤   ├─────────────────┤
│ id (PK)         │   │ id (PK)         │   │ id (PK)         │
│ user_id (FK)    │   │ user_id (FK)    │   │ user_id (FK)    │
│ question_id     │   │ question_id     │   │ subject         │
│ chosen_option   │   │ subject         │   │ level           │
│ is_correct      │   │ count           │   │ level_name      │
│ subject         │   │ last_timestamp  │   │ assessment_done │
│ timestamp       │   │ reviewed        │   │ board_weights   │
└─────────────────┘   └─────────────────┘   │ promotion       │
                                            │ done_questions  │
                                            │ updated_at      │
                                            └─────────────────┘

图例:
PK = Primary Key (主键)
FK = Foreign Key (外键)
UK = Unique Key (唯一键)
```

---

### 数据安全策略 (RLS)

所有用户数据表都启用了 **Row Level Security (RLS)**，确保用户只能访问自己的数据：

```sql
-- 启用 RLS
ALTER TABLE user_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE wrong_book ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 典型策略示例 (quiz_records)
CREATE POLICY "Users can read own quiz records" 
  ON quiz_records FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz records" 
  ON quiz_records FOR INSERT 
  WITH CHECK (auth.uid() = user_id);
```

---

### 数据同步策略

| 场景 | 同步时机 | 数据流向 |
|------|----------|----------|
| 用户登录 | 登录成功后 | 云端 → 本地 |
| 答题完成 | 每次答题后 | 本地 → 云端 |
| 进度更新 | 每次完成教程后 | 本地 → 云端 |
| 页面刷新 | 页面加载时 | 云端 → 本地 |
| 用户退出 | 退出前 | 清除本地权限 |

---

### 6. 在线练习环境

#### SQL 练习 (SqlPlayground)

- 基于 sql.js (SQLite WASM)
- 支持多数据库切换
- 实时执行反馈
- 结果表格展示

#### Python 练习 (PythonPlayground)

- 基于 Pyodide (Python WASM)
- 支持常用库 (pandas, numpy, matplotlib)
- 代码编辑器 + 输出区域
- 图表渲染支持

---

## 数据流程

### 答题数据流

```
用户答题
    ↓
SqlPracticePage.handleSelectOption()
    ↓
┌─────────────────────────────────────┐
│ 1. answerQuestion(label)            │
│    → useQuiz.answerQuestion()       │
│    → insertQuizRecordToCloud()      │  保存到 quiz_records 表
│                                     │
│ 2. updateSmartWeights()             │
│    → 更新板块权重                   │  更新 user_profiles 表
│                                     │
│ 3. addWrongAnswer() (如果错误)      │
│    → useWrongBook.addWrongAnswer()  │  更新 wrong_book 表
└─────────────────────────────────────┘
    ↓
返回刷题首页时重新加载统计数据
    ↓
QuizHomePage 显示更新后的统计
```

### 学习进度数据流

```
用户完成教程
    ↓
DetailPage 记录进度
    ↓
useProgress.markAsCompleted()
    ↓
保存到 localStorage + Supabase
    ↓
HomePage/ProgressPage 显示进度
```

---

## 样式系统

### CSS 变量

```css
:root {
  /* 主色调 */
  --color-sql: #a78bfa;      /* SQL 模块紫色 */
  --color-python: #4ecdc4;   /* Python 模块青色 */
  --color-thinking: #f59e0b; /* 思维模型橙色 */
  --color-accent: #ff6b35;   /* 强调色 */

  /* 背景色 */
  --color-bg: #faf5f0;       /* 主背景 */
  --color-card: #ffffff;     /* 卡片背景 */
  --color-border: #e8e0d5;   /* 边框色 */

  /* 文字色 */
  --color-text: #2d2a26;
  --color-text-secondary: #6b6560;

  /* 圆角 */
  --radius-btn: 8px;
  --radius-card: 16px;
  --radius-lg: 20px;
  --radius-pill: 50px;
}
```

### 图标系统

采用 SVG 渐变图标，按 subject + stageId 映射：

```typescript
// iconMap.tsx
export function getIcon(subject: string, stageId?: string) {
  if (!stageId) return themeIconMap[subject] || DefaultIcon
  const iconMap = iconMaps[subject]
  return iconMap[stageId] || DefaultIcon
}

// 使用示例
<CourseCard
  icon={getIcon('sql', '1')}  // 返回 SqlBasicIcon
  title="基础入门"
/>
```

---

## 商业模式

### 定价策略

| 项目 | 价格 |
|------|------|
| 原价 | ¥99 |
| 早鸟价 | ¥29.9 |
| 有效期 | 终身 |

### 包含内容

- SQL 高级模块 (5 阶段)
- Python 进阶模块 (4 阶段)
- 思维模型完整版
- 在线 SQL/Python 练习环境
- 全部刷题功能
- 持续更新内容

### 购买流程

1. 用户点击"解锁全站内容"
2. 跳转小红书店铺购买
3. 获得激活码
4. 在网站输入激活码激活
5. 解锁全部内容

---

## 关键技术点

### 1. 权限控制

- 前端基于 localStorage + Supabase 双重验证
- 登录时同步云端权限
- 退出时清除本地权限
- PaywallOverlay 组件遮罩未解锁内容

### 2. 数据同步策略

- 优先本地存储，后台异步同步云端
- 离线可用，联网后自动同步
- 使用 useRef 防止重复同步

### 3. 性能优化

- Python 练习环境懒加载 (Pyodide 体积大)
- 路由级别代码分割
- 图片懒加载 (loading="lazy")

### 4. SEO 优化

- 语义化 HTML 结构
- 合理的标题层级
- 面包屑导航

---

## 待办事项 / 已知问题

### 待开发功能

- [ ] 学习笔记功能
- [ ] 社区讨论功能
- [ ] 学习计划制定
- [ ] 移动端适配优化
- [ ] 离线模式完善

### 已知问题

- [ ] Python 练习首次加载较慢 (Pyodide 初始化)
- [ ] 部分旧浏览器不支持 WASM

---

## 部署说明

### 环境变量

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 构建命令

```bash
npm install
npm run build
```

### 部署平台

推荐 Vercel / Netlify / Cloudflare Pages

---

## 版本历史

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| 1.0 | - | 初始版本 |
| 1.1 | - | 添加智能刷题系统 |
| 1.2 | - | 添加实战项目模块 |
| 1.3 | - | 优化 UI，替换图标系统 |
| 1.4 | - | 修复刷题统计云端同步 |
