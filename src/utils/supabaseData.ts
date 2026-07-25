import { supabase, isSupabaseConfigured } from '../lib/supabase'

// ========== Cloud Data Interfaces ==========

export interface CloudWrongBookEntry {
  questionId: number
  subject: 'sql' | 'python'
  count: number
  lastTimestamp: number
  reviewed: boolean
}

export interface CloudQuizRecord {
  questionId: number
  chosenOption: string
  isCorrect: boolean
  timestamp: number
}

export interface CloudUserProfile {
  level: number
  levelName: string
  assessmentDone: boolean
  boardWeights: Record<string, { weight: number; correct: number; wrong: number; mastered: boolean }>
  promotion: {
    eligible: boolean
    lastChallengeTime: string | null
    challengeCount: number
    cooldownUntil: string | null
  }
  assessmentScore?: number
  assessmentAnswers?: { questionId: number; board: string; difficulty: string; correct: boolean }[]
}

// ========== Wrong Book ==========

export async function syncWrongBookFromCloud(userId: string): Promise<CloudWrongBookEntry[]> {
  if (!isSupabaseConfigured) return []
  try {
    const { data, error } = await supabase
      .from('wrong_book')
      .select('*')
      .eq('user_id', userId)
    if (error || !data) return []
    return data.map(row => ({
      questionId: row.question_id as number,
      subject: row.subject as 'sql' | 'python',
      count: row.count as number,
      lastTimestamp: new Date(row.last_timestamp as string).getTime(),
      reviewed: row.reviewed as boolean,
    }))
  } catch {
    return []
  }
}

export async function upsertWrongEntry(
  userId: string, questionId: number, subject: 'sql' | 'python', count: number, reviewed: boolean
): Promise<void> {
  if (!isSupabaseConfigured) return
  try {
    await supabase.from('wrong_book').upsert({
      user_id: userId,
      question_id: questionId,
      subject,
      count,
      reviewed,
      last_timestamp: new Date().toISOString(),
    }, { onConflict: 'user_id,question_id,subject' })
  } catch { /* ignore */ }
}

export async function deleteWrongEntryFromCloud(
  userId: string, questionId: number, subject: 'sql' | 'python'
): Promise<void> {
  if (!isSupabaseConfigured) return
  try {
    await supabase.from('wrong_book').delete()
      .eq('user_id', userId)
      .eq('question_id', questionId)
      .eq('subject', subject)
  } catch { /* ignore */ }
}

// ========== Quiz Records ==========

export async function syncQuizRecordsFromCloud(userId: string): Promise<CloudQuizRecord[]> {
  if (!isSupabaseConfigured) return []
  try {
    const { data, error } = await supabase
      .from('quiz_records')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: true })
    if (error) {
      console.error('[syncQuizRecordsFromCloud] Error:', error)
      return []
    }
    if (!data) return []
    return data.map(row => ({
      questionId: row.question_id as number,
      chosenOption: row.chosen_option as string,
      isCorrect: row.is_correct as boolean,
      timestamp: new Date(row.timestamp as string).getTime(),
    }))
  } catch (e) {
    console.error('[syncQuizRecordsFromCloud] Exception:', e)
    return []
  }
}

export async function insertQuizRecordToCloud(
  userId: string, record: CloudQuizRecord, subject: 'sql' | 'python'
): Promise<void> {
  if (!isSupabaseConfigured) return
  try {
    const { error } = await supabase.from('quiz_records').insert({
      user_id: userId,
      question_id: record.questionId,
      chosen_option: record.chosenOption,
      is_correct: record.isCorrect,
      subject,
      timestamp: new Date(record.timestamp).toISOString(),
    })
    if (error) {
      console.error('[insertQuizRecordToCloud] Error:', error)
    }
  } catch (e) {
    console.error('[insertQuizRecordToCloud] Exception:', e)
  }
}

// ========== User Profile ==========

export async function syncProfileFromCloud(
  userId: string, subject: 'sql' | 'python'
): Promise<{ profile: CloudUserProfile | null; doneQuestions: number[] }> {
  if (!isSupabaseConfigured) return { profile: null, doneQuestions: [] }
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .eq('subject', subject)
      .single()
    if (error || !data) return { profile: null, doneQuestions: [] }
    return {
      profile: {
        level: data.level as number,
        levelName: data.level_name as string,
        assessmentDone: data.assessment_done as boolean,
        boardWeights: data.board_weights as CloudUserProfile['boardWeights'],
        promotion: data.promotion as CloudUserProfile['promotion'],
        assessmentScore: (data.assessment_score as number) ?? undefined,
        assessmentAnswers: (data.assessment_answers as CloudUserProfile['assessmentAnswers']) ?? undefined,
      },
      doneQuestions: (data.done_questions as number[]) ?? [],
    }
  } catch {
    return { profile: null, doneQuestions: [] }
  }
}

export async function saveProfileToCloud(
  userId: string,
  subject: 'sql' | 'python',
  profile: CloudUserProfile,
  doneQuestions: number[]
): Promise<void> {
  if (!isSupabaseConfigured) return
  try {
    await supabase.from('user_profiles').upsert({
      user_id: userId,
      subject,
      level: profile.level,
      level_name: profile.levelName,
      assessment_done: profile.assessmentDone,
      board_weights: profile.boardWeights,
      promotion: profile.promotion,
      assessment_score: profile.assessmentScore ?? null,
      assessment_answers: profile.assessmentAnswers ?? [],
      done_questions: doneQuestions,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,subject' })
  } catch { /* ignore */ }
}

// ========== Progress ==========

export async function syncProgressFromCloud(userId: string): Promise<Record<string, unknown> | null> {
  if (!isSupabaseConfigured) return null
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('progress_data')
      .eq('user_id', userId)
      .single()
    if (error || !data) return null
    return data.progress_data as Record<string, unknown>
  } catch {
    return null
  }
}

export async function saveProgressToCloud(
  userId: string, progressData: unknown
): Promise<void> {
  if (!isSupabaseConfigured) return
  try {
    await supabase.from('user_progress').upsert({
      user_id: userId,
      progress_data: progressData,
    }, { onConflict: 'user_id' })
  } catch { /* ignore */ }
}
