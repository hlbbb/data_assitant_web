-- 激活码表：存储已生成的激活码，绑定到使用它的用户
CREATE TABLE IF NOT EXISTS activation_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,           -- 激活码 DP-XXXX-XXXX-XX
  user_id UUID REFERENCES auth.users(id), -- 绑定的用户（NULL=未使用）
  created_at TIMESTAMPTZ DEFAULT now(),
  activated_at TIMESTAMPTZ,            -- 用户激活时间
  created_by TEXT DEFAULT 'system'     -- 谁生成的
);

-- 用户解锁状态表：记录用户是否已解锁
CREATE TABLE IF NOT EXISTS user_access (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) UNIQUE NOT NULL,
  unlocked BOOLEAN DEFAULT false,
  activated_at TIMESTAMPTZ,
  activation_code TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 用户学习进度表：云端同步
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) UNIQUE NOT NULL,
  progress_data JSONB DEFAULT '{}',     -- 存储 ProgressStore 的 JSON
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS 策略：用户只能读写自己的数据
ALTER TABLE activation_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- 激活码：任何人可查看（用于验证），但只有系统可写入
CREATE POLICY "Anyone can read activation codes" ON activation_codes FOR SELECT USING (true);

-- 用户解锁：用户只能读自己的
CREATE POLICY "Users can read own access" ON user_access FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own access" ON user_access FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own access" ON user_access FOR UPDATE USING (auth.uid() = user_id);

-- 用户进度：用户只能操作自己的
CREATE POLICY "Users can read own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress FOR UPDATE USING (auth.uid() = user_id);

-- 索引
CREATE INDEX IF NOT EXISTS idx_activation_codes_code ON activation_codes(code);
CREATE INDEX IF NOT EXISTS idx_activation_codes_user ON activation_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_user_access_user ON user_access(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);
