# DataPath Supabase 后台数据库方案

> 最后更新：2026-05-20

---

## 目录

1. [总览](#1-总览)
2. [现有表结构 (001_initial.sql)](#2-现有表结构)
3. [刷题模块新增表 (002_quiz.sql)](#3-刷题模块新增表)
4. [RLS 行级安全策略](#4-rls-行级安全策略)
5. [索引设计](#5-索引设计)
6. [数据同步架构](#6-数据同步架构)
7. [关键设计决策](#7-关键设计决策)
8. [迁移策略](#8-迁移策略)
9. [完整 SQL](#9-完整-sql)

---

## 1. 总览

### 数据库表一览

| 表名 | 来源 migration | 用途 | 数据归属 |
|------|---------------|------|---------|
| `activation_codes` | 001 | 激活码管理 | 系统 |
| `user_access` | 001 | 用户解锁状态 | 按用户隔离 |
| `user_progress` | 001 | 学习课程进度 | 按用户隔离 |
| `quiz_questions` | 002 | 题库（SQL + Python） | 公共只读 |
| `quiz_answer_records` | 002 | 答题记录 | 按用户隔离 |
| `quiz_user_profile` | 002 | 刷题画像（等级、权重） | 按用户隔离 |
| `quiz_wrong_book` | 002 | 错题本 | 按用户隔离 |

### ER 关系

```
auth.users
  ├── user_access (1:1)
  ├── user_progress (1:1)
  ├── quiz_user_profile (1:N, per subject)
  ├── quiz_answer_records (1:N)
  └── quiz_wrong_book (1:N)

quiz_questions (独立公共表)
  ├── quiz_answer_records (1:N)
  └── quiz_wrong_book (1:N)
```

---

## 2. 现有表结构

### 001_initial.sql — 已有

```sql
-- 激活码表
CREATE TABLE IF NOT EXISTS activation_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,                    -- 格式 DP-XXXX-XXXX-XX
  user_id UUID REFERENCES auth.users(id),      -- 绑定用户（NULL=未使用）
  created_at TIMESTAMPTZ DEFAULT now(),
  activated_at TIMESTAMPTZ,
  created_by TEXT DEFAULT 'system'
);

-- 用户解锁状态表
CREATE TABLE IF NOT EXISTS user_access (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) UNIQUE NOT NULL,
  unlocked BOOLEAN DEFAULT false,
  activated_at TIMESTAMPTZ,
  activation_code TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 用户学习进度表（课程进度）
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) UNIQUE NOT NULL,
  progress_data JSONB DEFAULT '{}',            -- ProgressStore JSON
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 3. 刷题模块新增表

### 3.1 quiz_questions — 题库

从静态 TS 文件 (`sqlQuestions.ts` 330KB + `pythonQuestions.ts` 523KB) 迁移到数据库，支持后台动态管理。

```sql
CREATE TABLE IF NOT EXISTS quiz_questions (
  id SERIAL PRIMARY KEY,
  subject TEXT NOT NULL CHECK (subject IN ('sql', 'python')),
  type TEXT NOT NULL CHECK (type IN ('knowledge', 'result', 'completion', 'debug')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  category TEXT NOT NULL,                       -- 板块标识，如 'basic', 'join', 'window'
  tags TEXT[] DEFAULT '{}',                     -- 知识点标签，如 '{SELECT, WHERE}'
  stem TEXT NOT NULL,                           -- 题目题干
  options JSONB NOT NULL,                       -- 选项 JSON: [{label, text, correct}]
  explanation TEXT NOT NULL DEFAULT '',          -- 解析
  is_active BOOLEAN DEFAULT true,               -- 是否启用（可下架题目）
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

**字段说明：**

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `id` | SERIAL | 题目 ID，与前端现有 `id` 字段对应 | `42` |
| `subject` | TEXT | 学科 | `'sql'` / `'python'` |
| `type` | TEXT | 题型 | `'knowledge'` 知识点 / `'result'` 结果判断 / `'completion'` 补全 / `'debug'` 排错 |
| `difficulty` | TEXT | 难度 | `'easy'` / `'medium'` / `'hard'` |
| `category` | TEXT | 板块分类 | `'basic'`, `'join'`, `'window'`, `'numpy'`, `'pandas'` |
| `tags` | TEXT[] | 标签数组 | `'{SELECT, WHERE, JOIN}'` |
| `stem` | TEXT | 题目文本 | `'以下哪个SQL能查询所有列？'` |
| `options` | JSONB | 选项数组 | `[{"label":"A","text":"SELECT * FROM t","correct":true}]` |
| `explanation` | TEXT | 答案解析 | `'SELECT * 表示查询所有列...'` |
| `is_active` | BOOLEAN | 启用状态 | `true` |

### 3.2 quiz_answer_records — 答题记录

替代 localStorage `datapath_quiz_records`，支持跨设备同步和统计分析。

```sql
CREATE TABLE IF NOT EXISTS quiz_answer_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  question_id INTEGER REFERENCES quiz_questions(id) NOT NULL,
  subject TEXT NOT NULL CHECK (subject IN ('sql', 'python')),
  chosen_option TEXT NOT NULL,                  -- 用户选择的选项标签，如 'A'
  is_correct BOOLEAN NOT NULL,
  answered_at TIMESTAMPTZ DEFAULT now()
);
```

**字段说明：**

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `user_id` | UUID | 答题用户 | `auth.uid()` |
| `question_id` | INTEGER | 题目 ID | `42` |
| `subject` | TEXT | 学科（冗余字段，加速查询） | `'sql'` |
| `chosen_option` | TEXT | 选择的选项 | `'B'` |
| `is_correct` | BOOLEAN | 是否正确 | `false` |
| `answered_at` | TIMESTAMPTZ | 答题时间 | `2026-05-20T10:30:00Z` |

### 3.3 quiz_user_profile — 刷题画像

替代 localStorage `datapath_sql_profile` / `datapath_py_profile`，存储自适应学习所需的用户画像数据。

```sql
CREATE TABLE IF NOT EXISTS quiz_user_profile (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  subject TEXT NOT NULL CHECK (subject IN ('sql', 'python')),
  level INTEGER NOT NULL DEFAULT 1 CHECK (level BETWEEN 1 AND 5),
  level_name TEXT NOT NULL DEFAULT '小白一枚',
  assessment_done BOOLEAN DEFAULT false,
  assessment_score INTEGER,                     -- 测评分数 0-100
  assessment_answers JSONB DEFAULT '[]',        -- 测评答题明细
  board_weights JSONB NOT NULL DEFAULT '{}',    -- 板块权重和掌握度
  promotion JSONB DEFAULT '{}',                 -- 晋阶状态
  done_question_ids INTEGER[] DEFAULT '{}',     -- 已做题目 ID 列表
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, subject)                      -- 每个用户每学科一条记录
);
```

**字段说明：**

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `level` | INTEGER | 用户等级 1-5 | `3` |
| `level_name` | TEXT | 等级名称 | `'拿捏了'` |
| `assessment_done` | BOOLEAN | 是否完成测评 | `true` |
| `assessment_score` | INTEGER | 测评分 | `75` |
| `assessment_answers` | JSONB | 测评答案明细 | `[{"questionId":1,"board":"basic","difficulty":"easy","correct":true}]` |
| `board_weights` | JSONB | 板块权重（核心自适应数据） | 见下方详细结构 |
| `promotion` | JSONB | 晋阶状态 | 见下方详细结构 |
| `done_question_ids` | INTEGER[] | 已做题目（防重复出题） | `{1,5,12,33}` |

**board_weights JSONB 详细结构：**

```json
{
  "basic": {
    "weight": 1.0,
    "correct": 15,
    "wrong": 3,
    "mastered": false
  },
  "join": {
    "weight": 0.6,
    "correct": 25,
    "wrong": 2,
    "mastered": false
  },
  "window": {
    "weight": 1.5,
    "correct": 5,
    "wrong": 10,
    "mastered": false
  }
}
```

**promotion JSONB 详细结构：**

```json
{
  "eligible": false,
  "lastChallengeTime": "2026-05-19T10:00:00Z",
  "challengeCount": 2,
  "cooldownUntil": null
}
```

### 3.4 quiz_wrong_book — 错题本

替代 localStorage `datapath_wrong_book`，每个用户独立的错题集。

```sql
CREATE TABLE IF NOT EXISTS quiz_wrong_book (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  question_id INTEGER REFERENCES quiz_questions(id) NOT NULL,
  subject TEXT NOT NULL CHECK (subject IN ('sql', 'python')),
  wrong_count INTEGER NOT NULL DEFAULT 1,       -- 累计错误次数
  last_wrong_at TIMESTAMPTZ DEFAULT now(),      -- 最后一次做错的时间
  reviewed BOOLEAN DEFAULT false,                -- 是否已复习（做对过）
  UNIQUE(user_id, question_id, subject)         -- 同一用户同一题同一学科唯一
);
```

**字段说明：**

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `wrong_count` | INTEGER | 累计做错次数 | `3` |
| `last_wrong_at` | TIMESTAMPTZ | 最后做错时间 | `2026-05-20T08:15:00Z` |
| `reviewed` | BOOLEAN | 是否已复习通过 | `false` |

---

## 4. RLS 行级安全策略

### 4.1 现有表（001_initial.sql）

```sql
-- activation_codes: 任何人可查看，仅系统可写入
ALTER TABLE activation_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read activation codes" ON activation_codes
  FOR SELECT USING (true);

-- user_access: 用户只能操作自己的
ALTER TABLE user_access ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own access" ON user_access
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own access" ON user_access
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own access" ON user_access
  FOR UPDATE USING (auth.uid() = user_id);

-- user_progress: 用户只能操作自己的
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);
```

### 4.2 刷题表（002_quiz.sql）

```sql
-- quiz_questions: 所有人可读，仅后台管理可写（用 service_role key）
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read questions" ON quiz_questions
  FOR SELECT USING (is_active = true);
-- 注意：INSERT/UPDATE/DELETE 不设 policy = 前端 anon key 无法写入
-- 后台管理通过 service_role key 操作（绕过 RLS）

-- quiz_answer_records: 用户只能操作自己的
ALTER TABLE quiz_answer_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own records" ON quiz_answer_records
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own records" ON quiz_answer_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);
-- 不允许 UPDATE 和 DELETE（答题记录不可篡改）

-- quiz_user_profile: 用户只能操作自己的
ALTER TABLE quiz_user_profile ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own profile" ON quiz_user_profile
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own profile" ON quiz_user_profile
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own profile" ON quiz_user_profile
  FOR UPDATE USING (auth.uid() = user_id);

-- quiz_wrong_book: 用户只能操作自己的（支持 DELETE，用于移除错题）
ALTER TABLE quiz_wrong_book ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own wrong book" ON quiz_wrong_book
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own wrong book" ON quiz_wrong_book
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own wrong book" ON quiz_wrong_book
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own wrong book" ON quiz_wrong_book
  FOR DELETE USING (auth.uid() = user_id);
```

---

## 5. 索引设计

```sql
-- === 题库索引 ===
CREATE INDEX IF NOT EXISTS idx_questions_subject_category
  ON quiz_questions(subject, category);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty
  ON quiz_questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_questions_active
  ON quiz_questions(is_active) WHERE is_active = true;

-- === 答题记录索引 ===
CREATE INDEX IF NOT EXISTS idx_records_user_subject
  ON quiz_answer_records(user_id, subject);
CREATE INDEX IF NOT EXISTS idx_records_user_question
  ON quiz_answer_records(user_id, question_id);
CREATE INDEX IF NOT EXISTS idx_records_answered_at
  ON quiz_answer_records(user_id, answered_at DESC);

-- === 错题本索引 ===
CREATE INDEX IF NOT EXISTS idx_wrong_book_user
  ON quiz_wrong_book(user_id, subject);
CREATE INDEX IF NOT EXISTS idx_wrong_book_reviewed
  ON quiz_wrong_book(user_id, reviewed) WHERE reviewed = false;

-- === 画像索引 ===
CREATE INDEX IF NOT EXISTS idx_profile_user
  ON quiz_user_profile(user_id, subject);

-- === 现有表索引（001） ===
CREATE INDEX IF NOT EXISTS idx_activation_codes_code
  ON activation_codes(code);
CREATE INDEX IF NOT EXISTS idx_activation_codes_user
  ON activation_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_user_access_user
  ON user_access(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user
  ON user_progress(user_id);
```

---

## 6. 数据同步架构

### 6.1 整体流程

```
┌──────────────────────────────────────────────────────┐
│                      前端 (React)                     │
│                                                      │
│  useQuiz()          useSmartQuiz()      useWrongBook()│
│     │                    │                    │       │
│     └────────┬───────────┘                    │       │
│              ▼                                │       │
│     localStorage (即时写入)                    │       │
│              │                                │       │
│              ▼                                ▼       │
│     ┌─────────────────────────────────────────┐      │
│     │         syncService (同步层)              │      │
│     │                                         │      │
│     │  if (isSupabaseConfigured && loggedIn)  │      │
│     │    syncToCloud() ← localStorage → Supabase│    │
│     │    loadFromCloud() ← Supabase → localStorage│   │
│     └─────────────────────────────────────────┘      │
└──────────────────────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────┐
│                   Supabase (PostgreSQL)               │
│                                                      │
│  quiz_user_profile    quiz_answer_records             │
│  quiz_wrong_book      quiz_questions                  │
│  user_access          user_progress                   │
│  activation_codes                                     │
└──────────────────────────────────────────────────────┘
```

### 6.2 同步策略：localStorage 优先 + 云端同步

```
答题 → updateSmartWeights()        // 立即更新 localStorage profile
     → useWrongBook.addWrongAnswer()  // 立即更新 localStorage 错题本
     → syncService.queue({ type: 'answer', data: record })  // 入队
     → syncService.flush()            // 批量写入 Supabase（debounce 2s）

登录时 → syncService.pullFromCloud()
       → mergeWithLocal()            // 比较时间戳，取最新

离线时 → 队列积累在 localStorage
上线时 → syncService.flush()         // 自动补推
```

### 6.3 合并冲突规则

| 数据类型 | 冲突策略 | 原因 |
|---------|---------|------|
| 答题记录 | **合并（UNION）** | 每条记录不可变，按 id 去重 |
| 用户画像 | **取最新 updated_at** | 整体替换，不细粒度合并 |
| 错题本 | **合并 + 取最大 wrong_count** | 保留所有错题，次数取更大值 |
| 学习进度 | **取最新 updated_at** | 整体替换 |

### 6.4 同步 Service 接口设计

```typescript
// src/services/syncService.ts

interface SyncService {
  // 推送本地数据到云端
  pushProfile(subject: 'sql' | 'python'): Promise<void>
  pushAnswerRecords(records: QuizRecord[]): Promise<void>
  pushWrongBook(entries: WrongBookEntry[]): Promise<void>

  // 从云端拉取数据
  pullProfile(subject: 'sql' | 'python'): Promise<UserProfile | null>
  pullAnswerRecords(): Promise<QuizRecord[]>
  pullWrongBook(): Promise<WrongBookEntry[]>

  // 全量同步（登录时调用）
  fullSync(): Promise<void>
}
```

---

## 7. 关键设计决策

| 决策 | 方案 | 原因 |
|------|------|------|
| **题库：数据库 vs 静态文件？** | 分阶段：先用静态文件 + 同步用户数据，后续迁移题库到 DB | 850+ 道题迁移需要后台管理界面，先做用户数据同步价值更大 |
| **不同用户推不同难度** | `quiz_user_profile.level` + `board_weights` 驱动 | 现有 `smartPickQuestions()` 自适应算法已经很完善，只需持久化 profile |
| **选题算法在哪跑？** | **前端**（和现在一样） | 依赖随机数、权重计算、localStorage 缓存，前端跑更快 |
| **错题本隔离** | 独立 `quiz_wrong_book` 表 + RLS 按 user_id | 每个用户错题完全独立，支持跨设备同步 |
| **答题记录可修改吗？** | **不可变**（只允许 INSERT） | 答题历史不可篡改，用于统计分析和防作弊 |
| **离线支持** | localStorage 优先 + 云端同步队列 | 未登录/离线照常用，上线后自动同步 |
| **题目 ID 一致性** | 保持前端 `id` 与数据库 `id` 一致 | 现有代码大量依赖 `question.id`，迁移时需确保 ID 映射 |
| **JSONB vs 独立列** | 权重/晋阶等复杂嵌套用 JSONB，查询频繁字段用独立列 | JSONB 灵活但不利于索引查询，按实际查询模式选择 |

---

## 8. 迁移策略

### Phase 1：用户数据上云（优先级高）

**目标：** 用户换设备/清缓存不丢数据

- 新建 `quiz_answer_records`、`quiz_user_profile`、`quiz_wrong_book` 三张表
- 前端新增 `syncService`，登录后自动同步
- 保持现有 localStorage 逻辑不变，云端作为备份
- 选题算法不变

**改动范围：**
- 新增 `supabase/migrations/002_quiz.sql`
- 新增 `src/services/syncService.ts`
- 修改 `useQuiz.ts`、`useSmartQuiz.ts`、`useWrongBook.ts`（加入同步调用）

### Phase 2：题库迁入数据库（后续优化）

**目标：** 支持后台动态管理题目

- 新建 `quiz_questions` 表
- 编写脚本将 `sqlQuestions.ts` 和 `pythonQuestions.ts` 导入数据库
- 前端启动时从 Supabase 拉取题目，缓存到 localStorage
- 支持后台管理界面增删改题目

**改动范围：**
- 新增 `supabase/migrations/003_questions.sql`
- 新增 `src/services/questionLoader.ts`
- 新增后台管理页面（可选）

### Phase 3：数据分析与运营（远期）

**目标：** 基于答题数据优化产品和运营

- 题目正确率统计（哪道题最易错）
- 用户活跃度分析（每日/每周答题数）
- 难度校准（根据实际正确率调整题目难度标记）
- 用户流失预警

---

## 9. 完整 SQL

### 002_quiz.sql — 完整 migration 脚本

```sql
-- ========================================
-- DataPath 002_quiz.sql
-- 刷题模块：题库、答题记录、用户画像、错题本
-- ========================================

-- 1. 题库表
CREATE TABLE IF NOT EXISTS quiz_questions (
  id SERIAL PRIMARY KEY,
  subject TEXT NOT NULL CHECK (subject IN ('sql', 'python')),
  type TEXT NOT NULL CHECK (type IN ('knowledge', 'result', 'completion', 'debug')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  stem TEXT NOT NULL,
  options JSONB NOT NULL,
  explanation TEXT NOT NULL DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. 答题记录表
CREATE TABLE IF NOT EXISTS quiz_answer_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  question_id INTEGER REFERENCES quiz_questions(id) NOT NULL,
  subject TEXT NOT NULL CHECK (subject IN ('sql', 'python')),
  chosen_option TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  answered_at TIMESTAMPTZ DEFAULT now()
);

-- 3. 用户刷题画像表
CREATE TABLE IF NOT EXISTS quiz_user_profile (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  subject TEXT NOT NULL CHECK (subject IN ('sql', 'python')),
  level INTEGER NOT NULL DEFAULT 1 CHECK (level BETWEEN 1 AND 5),
  level_name TEXT NOT NULL DEFAULT '小白一枚',
  assessment_done BOOLEAN DEFAULT false,
  assessment_score INTEGER,
  assessment_answers JSONB DEFAULT '[]',
  board_weights JSONB NOT NULL DEFAULT '{}',
  promotion JSONB DEFAULT '{}',
  done_question_ids INTEGER[] DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, subject)
);

-- 4. 错题本表
CREATE TABLE IF NOT EXISTS quiz_wrong_book (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  question_id INTEGER REFERENCES quiz_questions(id) NOT NULL,
  subject TEXT NOT NULL CHECK (subject IN ('sql', 'python')),
  wrong_count INTEGER NOT NULL DEFAULT 1,
  last_wrong_at TIMESTAMPTZ DEFAULT now(),
  reviewed BOOLEAN DEFAULT false,
  UNIQUE(user_id, question_id, subject)
);

-- ========================================
-- RLS 策略
-- ========================================

-- 题库：所有人可读活跃题目
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read active questions" ON quiz_questions
  FOR SELECT USING (is_active = true);

-- 答题记录：用户只能插入和读取自己的
ALTER TABLE quiz_answer_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own records" ON quiz_answer_records
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own records" ON quiz_answer_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 用户画像：用户只能操作自己的
ALTER TABLE quiz_user_profile ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own profile" ON quiz_user_profile
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own profile" ON quiz_user_profile
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own profile" ON quiz_user_profile
  FOR UPDATE USING (auth.uid() = user_id);

-- 错题本：用户拥有完整 CRUD 权限（自己的）
ALTER TABLE quiz_wrong_book ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own wrong book" ON quiz_wrong_book
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own wrong book" ON quiz_wrong_book
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own wrong book" ON quiz_wrong_book
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own wrong book" ON quiz_wrong_book
  FOR DELETE USING (auth.uid() = user_id);

-- ========================================
-- 索引
-- ========================================

-- 题库索引
CREATE INDEX IF NOT EXISTS idx_questions_subject_category
  ON quiz_questions(subject, category);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty
  ON quiz_questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_questions_active
  ON quiz_questions(is_active) WHERE is_active = true;

-- 答题记录索引
CREATE INDEX IF NOT EXISTS idx_records_user_subject
  ON quiz_answer_records(user_id, subject);
CREATE INDEX IF NOT EXISTS idx_records_user_question
  ON quiz_answer_records(user_id, question_id);
CREATE INDEX IF NOT EXISTS idx_records_answered_at
  ON quiz_answer_records(user_id, answered_at DESC);

-- 错题本索引
CREATE INDEX IF NOT EXISTS idx_wrong_book_user
  ON quiz_wrong_book(user_id, subject);
CREATE INDEX IF NOT EXISTS idx_wrong_book_reviewed
  ON quiz_wrong_book(user_id, reviewed) WHERE reviewed = false;

-- 画像索引
CREATE INDEX IF NOT EXISTS idx_profile_user
  ON quiz_user_profile(user_id, subject);
```

---

## 附录：前端 localStorage 键映射

| localStorage Key | 对应数据表 | Hook |
|-----------------|-----------|------|
| `datapath_sql_profile` | `quiz_user_profile` (subject='sql') | `useSmartQuiz` |
| `datapath_py_profile` | `quiz_user_profile` (subject='python') | `useSmartQuiz` |
| `datapath_sql_done` | `quiz_user_profile.done_question_ids` | `useSmartQuiz` |
| `datapath_py_done` | `quiz_user_profile.done_question_ids` | `useSmartQuiz` |
| `datapath_quiz_records` | `quiz_answer_records` | `useQuiz` |
| `datapath_wrong_book` | `quiz_wrong_book` | `useWrongBook` |
| `datapath_progress` | `user_progress.progress_data` | `useProgress` |
