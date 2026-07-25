-- 错题本表
CREATE TABLE IF NOT EXISTS wrong_book (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  question_id INTEGER NOT NULL,
  subject TEXT NOT NULL CHECK (subject IN ('sql', 'python')),
  count INTEGER DEFAULT 1,
  last_timestamp TIMESTAMPTZ DEFAULT now(),
  reviewed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, question_id, subject)
);

-- 做题记录表
CREATE TABLE IF NOT EXISTS quiz_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  question_id INTEGER NOT NULL,
  chosen_option TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  subject TEXT NOT NULL CHECK (subject IN ('sql', 'python')),
  timestamp TIMESTAMPTZ DEFAULT now()
);

-- 智能题库用户画像表
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  subject TEXT NOT NULL CHECK (subject IN ('sql', 'python')),
  level INTEGER DEFAULT 1,
  level_name TEXT DEFAULT '小白一枚',
  assessment_done BOOLEAN DEFAULT false,
  board_weights JSONB DEFAULT '{}',
  promotion JSONB DEFAULT '{}',
  assessment_score INTEGER,
  assessment_answers JSONB DEFAULT '[]',
  done_questions INTEGER[] DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, subject)
);

-- RLS 策略
ALTER TABLE wrong_book ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- wrong_book RLS
CREATE POLICY "Users can read own wrong book" ON wrong_book FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own wrong book" ON wrong_book FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own wrong book" ON wrong_book FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own wrong book" ON wrong_book FOR DELETE USING (auth.uid() = user_id);

-- quiz_records RLS
CREATE POLICY "Users can read own quiz records" ON quiz_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own quiz records" ON quiz_records FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own quiz records" ON quiz_records FOR DELETE USING (auth.uid() = user_id);

-- user_profiles RLS
CREATE POLICY "Users can read own profiles" ON user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profiles" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profiles" ON user_profiles FOR UPDATE USING (auth.uid() = user_id);

-- 索引
CREATE INDEX IF NOT EXISTS idx_wrong_book_user ON wrong_book(user_id);
CREATE INDEX IF NOT EXISTS idx_wrong_book_subject ON wrong_book(user_id, subject);
CREATE INDEX IF NOT EXISTS idx_quiz_records_user ON quiz_records(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_records_subject ON quiz_records(user_id, subject);
CREATE INDEX IF NOT EXISTS idx_quiz_records_timestamp ON quiz_records(user_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_subject ON user_profiles(user_id, subject);
