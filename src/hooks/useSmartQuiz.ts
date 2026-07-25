import { useState, useCallback, useEffect, useRef } from 'react'
import type { QuizQuestion } from '../data/sqlQuestions'
import { useAuth } from '../contexts/AuthContext'
import { syncProfileFromCloud, saveProfileToCloud } from '../utils/supabaseData'

// ========== 等级定义 ==========
export interface LevelDef {
  level: number
  name: string
  icon: string
  desc: string
  difficulty: { easy: number; medium: number; hard: number }
}

export const SQL_LEVELS: LevelDef[] = [
  { level: 1, name: '小白一枚', icon: 'seedling', desc: 'SELECT 是啥？一切从零开始', difficulty: { easy: 0.70, medium: 0.25, hard: 0.05 } },
  { level: 2, name: '上道儿了', icon: 'fire', desc: 'WHERE GROUP BY 拿来吧你', difficulty: { easy: 0.60, medium: 0.30, hard: 0.10 } },
  { level: 3, name: '拿捏了', icon: 'star', desc: '多表 JOIN 也不在话下', difficulty: { easy: 0.30, medium: 0.50, hard: 0.20 } },
  { level: 4, name: '稳如老狗', icon: 'target', desc: '子查询窗口函数？基操勿6', difficulty: { easy: 0.10, medium: 0.40, hard: 0.50 } },
  { level: 5, name: 'SQL老炮', icon: 'rocket', desc: '没有我写不出的SQL', difficulty: { easy: 0.00, medium: 0.20, hard: 0.80 } },
]

export const PYTHON_LEVELS: LevelDef[] = [
  { level: 1, name: '小白一枚', icon: 'seedling', desc: 'print() 能干嘛？一切从零开始', difficulty: { easy: 0.70, medium: 0.25, hard: 0.05 } },
  { level: 2, name: '上道儿了', icon: 'fire', desc: 'if for while 拿来吧你', difficulty: { easy: 0.60, medium: 0.30, hard: 0.10 } },
  { level: 3, name: '拿捏了', icon: 'star', desc: 'NumPy Pandas 也不在话下', difficulty: { easy: 0.30, medium: 0.50, hard: 0.20 } },
  { level: 4, name: '稳如老狗', icon: 'target', desc: '数据清洗可视化？基操勿6', difficulty: { easy: 0.10, medium: 0.40, hard: 0.50 } },
  { level: 5, name: '分析老炮', icon: 'rocket', desc: '没有我分析不了的数据', difficulty: { easy: 0.00, medium: 0.20, hard: 0.80 } },
]

export const SQL_BOARD_ORDER = [
  'basic', 'condition_date', 'aggregate', 'string_cast', 'result_set',
  'join', 'subquery', 'window', 'dml', 'analytics',
]

export const PYTHON_BOARD_ORDER = [
  'basic', 'condition_loop', 'function', 'data_structure', 'file_io',
  'numpy', 'pandas', 'matplotlib', 'seaborn',
]

// ========== 类型 ==========
export interface BoardWeight {
  weight: number
  correct: number
  wrong: number
  mastered: boolean
}

export interface PromotionData {
  eligible: boolean
  lastChallengeTime: string | null
  challengeCount: number
  cooldownUntil: string | null
}

export interface UserProfile {
  level: number
  levelName: string
  assessmentDone: boolean
  boardWeights: Record<string, BoardWeight>
  promotion: PromotionData
  assessmentScore?: number
  assessmentAnswers?: { questionId: number; board: string; difficulty: string; correct: boolean }[]
}

// ========== 等级颜色/图标 ==========
export const LEVEL_COLORS: Record<number, string> = {
  1: '#8BC34A',
  2: '#FF9800',
  3: '#FFD700',
  4: '#E91E63',
  5: '#9C27B0',
}

export function getLevelDef(level: number, levels: LevelDef[]): LevelDef {
  return levels.find(l => l.level === level) ?? levels[0]
}

export function getLevelColor(level: number): string {
  return LEVEL_COLORS[level] ?? '#8BC34A'
}

// ========== 存储 = */
function makeProfileKey(subject: 'sql' | 'python') {
  return subject === 'sql' ? 'datapath_sql_profile' : 'datapath_py_profile'
}
function makeDoneKey(subject: 'sql' | 'python') {
  return subject === 'sql' ? 'datapath_sql_done' : 'datapath_py_done'
}

function getDefaultProfile(boardOrder: string[]): UserProfile {
  const weights: Record<string, BoardWeight> = {}
  boardOrder.forEach(cat => {
    weights[cat] = { weight: 1.0, correct: 0, wrong: 0, mastered: false }
  })
  return {
    level: 1,
    levelName: '小白一枚',
    assessmentDone: false,
    boardWeights: weights,
    promotion: { eligible: false, lastChallengeTime: null, challengeCount: 0, cooldownUntil: null },
  }
}

function loadProfile(subject: 'sql' | 'python', boardOrder: string[]): UserProfile | null {
  try {
    const raw = localStorage.getItem(makeProfileKey(subject))
    if (!raw) return null
    const profile: UserProfile = JSON.parse(raw)
    boardOrder.forEach(cat => {
      if (!profile.boardWeights[cat]) {
        profile.boardWeights[cat] = { weight: 1.0, correct: 0, wrong: 0, mastered: false }
      }
    })
    if (!profile.promotion) {
      profile.promotion = { eligible: false, lastChallengeTime: null, challengeCount: 0, cooldownUntil: null }
    }
    return profile
  } catch {
    return null
  }
}

function saveProfile(subject: 'sql' | 'python', profile: UserProfile): void {
  localStorage.setItem(makeProfileKey(subject), JSON.stringify(profile))
}

function loadDoneQuestions(subject: 'sql' | 'python'): number[] {
  try {
    return JSON.parse(localStorage.getItem(makeDoneKey(subject)) ?? '[]')
  } catch {
    return []
  }
}

function saveDoneQuestions(subject: 'sql' | 'python', ids: number[]): void {
  localStorage.setItem(makeDoneKey(subject), JSON.stringify(ids))
}

// ========== 权重计算 ==========
function calculateWeight(entry: BoardWeight): number {
  const baseWeight = 1.0
  const wrongBonus = Math.min(entry.wrong * 0.15, 2.0)
  const masterDecay = Math.min(entry.correct * 0.05, 1.5)
  return Math.max(0.2, baseWeight + wrongBonus - masterDecay)
}

function checkMastery(boardWeights: Record<string, BoardWeight>): Record<string, BoardWeight> {
  const result: Record<string, BoardWeight> = {}
  Object.entries(boardWeights).forEach(([cat, entry]) => {
    const total = entry.correct + entry.wrong
    const acc = total > 0 ? entry.correct / total : 0
    result[cat] = { ...entry, mastered: total >= 30 && acc > 0.8 }
  })
  return result
}

function recalculateWeights(boardWeights: Record<string, BoardWeight>): Record<string, BoardWeight> {
  const mastered = checkMastery(boardWeights)
  const result: Record<string, BoardWeight> = {}
  Object.entries(mastered).forEach(([cat, entry]) => {
    result[cat] = { ...entry, weight: entry.mastered ? 0.1 : calculateWeight(entry) }
  })
  return result
}

// ========== 智能选题 ==========
function pickDifficulty(level: number, levels: LevelDef[]): string {
  const def = getLevelDef(level, levels)
  const r = Math.random()
  const { easy, medium } = def.difficulty
  if (r < easy) return 'easy'
  if (r < easy + medium) return 'medium'
  return 'hard'
}

function pickBoard(boardWeights: Record<string, BoardWeight>, boardOrder: string[]): string {
  const entries = boardOrder.filter(cat => !boardWeights[cat].mastered)
  if (entries.length === 0) return boardOrder[Math.floor(Math.random() * boardOrder.length)]

  const totalWeight = entries.reduce((sum, cat) => sum + boardWeights[cat].weight, 0)
  let r = Math.random() * totalWeight
  for (const cat of entries) {
    r -= boardWeights[cat].weight
    if (r <= 0) return cat
  }
  return entries[entries.length - 1]
}

export function smartPickQuestions(
  subject: 'sql' | 'python',
  allQuestions: QuizQuestion[],
  boardOrder: string[],
  levels: LevelDef[],
  count: number,
): QuizQuestion[] {
  const profile = loadProfile(subject, boardOrder)
  if (!profile || !profile.assessmentDone) {
    // 未测评时用随机题
    return [...allQuestions].sort(() => Math.random() - 0.5).slice(0, count)
  }

  let doneIds = loadDoneQuestions(subject)
  let available = allQuestions.filter(q => !doneIds.includes(q.id))

  if (available.length < count) {
    doneIds = []
    saveDoneQuestions(subject, [])
    available = [...allQuestions]
  }

  const selected: QuizQuestion[] = []
  const usedIds = new Set<number>()

  for (let i = 0; i < count; i++) {
    const remaining = available.filter(q => !usedIds.has(q.id))
    if (remaining.length === 0) break

    const board = pickBoard(profile.boardWeights, boardOrder)
    const difficulty = pickDifficulty(profile.level, levels)

    let candidates = remaining.filter(q => q.category === board && q.difficulty === difficulty)
    if (candidates.length === 0) candidates = remaining.filter(q => q.category === board)
    if (candidates.length === 0) candidates = remaining.filter(q => q.difficulty === difficulty)
    if (candidates.length === 0) candidates = remaining

    const pick = candidates[Math.floor(Math.random() * candidates.length)]
    selected.push(pick)
    usedIds.add(pick.id)
  }

  // 保存已做
  saveDoneQuestions(subject, [...doneIds, ...selected.map(q => q.id)])

  return selected
}

// ========== 答题后更新权重 ==========
export function updateSmartWeights(
  subject: 'sql' | 'python',
  questionId: number,
  isCorrect: boolean,
  allQuestions: QuizQuestion[],
  boardOrder: string[],
): void {
  const profile = loadProfile(subject, boardOrder)
  if (!profile) return

  const q = allQuestions.find(qq => qq.id === questionId)
  if (!q) return

  const entry = profile.boardWeights[q.category]
  if (!entry) return

  if (isCorrect) {
    entry.correct += 1
  } else {
    entry.wrong += 1
  }

  profile.boardWeights = recalculateWeights(profile.boardWeights)
  saveProfile(subject, profile)
}

// ========== 晋阶条件配置 ==========
export interface PromotionReq {
  totalDone: number
  accuracy: number
  boardAccuracy: number
  wrongClearRate: number
  recentCorrect: number
  recentTotal: number
  boards: string[]
}

export const SQL_PROMOTION_REQS: (PromotionReq | null)[] = [
  null,
  { totalDone: 50, accuracy: 60, boardAccuracy: 70, wrongClearRate: 80, recentCorrect: 14, recentTotal: 20, boards: ['basic', 'condition_date'] },
  { totalDone: 120, accuracy: 65, boardAccuracy: 70, wrongClearRate: 80, recentCorrect: 14, recentTotal: 20, boards: ['aggregate', 'string_cast', 'result_set'] },
  { totalDone: 200, accuracy: 70, boardAccuracy: 70, wrongClearRate: 80, recentCorrect: 15, recentTotal: 20, boards: ['join', 'subquery'] },
  { totalDone: 350, accuracy: 75, boardAccuracy: 70, wrongClearRate: 90, recentCorrect: 16, recentTotal: 20, boards: ['window', 'dml', 'analytics'] },
]

export const PYTHON_PROMOTION_REQS: (PromotionReq | null)[] = [
  null,
  { totalDone: 50, accuracy: 60, boardAccuracy: 70, wrongClearRate: 80, recentCorrect: 14, recentTotal: 20, boards: ['basic', 'condition_loop'] },
  { totalDone: 120, accuracy: 65, boardAccuracy: 70, wrongClearRate: 80, recentCorrect: 14, recentTotal: 20, boards: ['function', 'data_structure', 'file_io'] },
  { totalDone: 200, accuracy: 70, boardAccuracy: 70, wrongClearRate: 80, recentCorrect: 15, recentTotal: 20, boards: ['numpy', 'pandas'] },
  { totalDone: 350, accuracy: 75, boardAccuracy: 70, wrongClearRate: 90, recentCorrect: 16, recentTotal: 20, boards: ['matplotlib', 'seaborn'] },
]

export interface PromotionCheckResult {
  eligible: boolean
  reasons: { text: string; met: boolean; detail: string }[]
  nextLevel?: number
  maxLevel?: boolean
}

export function checkPromotionEligibility(
  subject: 'sql' | 'python',
  records: { questionId: number; isCorrect: boolean }[],
  wrongBookEntries: { reviewed: boolean }[],
  promotionReqs: (PromotionReq | null)[],
  allQuestions: QuizQuestion[],
  boardOrder: string[],
): PromotionCheckResult {
  const profile = loadProfile(subject, boardOrder)
  if (!profile || !profile.assessmentDone) return { eligible: false, reasons: [] }
  if (profile.level >= 5) return { eligible: false, reasons: [], maxLevel: true }

  const req = promotionReqs[profile.level]
  if (!req) return { eligible: false, reasons: [] }

  const reasons: { text: string; met: boolean; detail: string }[] = []
  let allMet = true

  // 1. 累计做题数
  const totalDone = records.length
  if (totalDone < req.totalDone) {
    allMet = false
    reasons.push({ text: `再做 ${req.totalDone - totalDone} 题`, met: false, detail: `已做 ${totalDone}/${req.totalDone} 题` })
  } else {
    reasons.push({ text: '做题数达标', met: true, detail: `已做 ${totalDone}/${req.totalDone} 题` })
  }

  // 2. 总正确率
  const totalCorrect = records.filter(r => r.isCorrect).length
  const accuracy = totalDone > 0 ? Math.round((totalCorrect / totalDone) * 100) : 0
  if (accuracy < req.accuracy) {
    allMet = false
    reasons.push({ text: `正确率还需提升 ${req.accuracy - accuracy}%`, met: false, detail: `当前 ${accuracy}%/${req.accuracy}%` })
  } else {
    reasons.push({ text: '正确率达标', met: true, detail: `当前 ${accuracy}%/${req.accuracy}%` })
  }

  // 3. 板块正确率
  const boardRecords = records.filter(r => {
    const q = allQuestions.find(qq => qq.id === r.questionId)
    return q && req.boards.includes(q.category)
  })
  const boardTotal = boardRecords.length
  const boardCorrect = boardRecords.filter(r => r.isCorrect).length
  const boardAcc = boardTotal > 0 ? Math.round((boardCorrect / boardTotal) * 100) : 0
  if (boardAcc < req.boardAccuracy) {
    allMet = false
    reasons.push({ text: `板块正确率需达 ${req.boardAccuracy}%`, met: false, detail: `当前 ${boardAcc}%` })
  } else {
    reasons.push({ text: '板块正确率达标', met: true, detail: `当前 ${boardAcc}%` })
  }

  // 4. 错题清空率
  const wrongTotal = wrongBookEntries.length
  const reviewedCount = wrongBookEntries.filter(w => w.reviewed).length
  const clearRate = wrongTotal > 0 ? Math.round((reviewedCount / wrongTotal) * 100) : 100
  if (clearRate < req.wrongClearRate) {
    allMet = false
    reasons.push({ text: `错题还需清空 ${req.wrongClearRate - clearRate}%`, met: false, detail: `已清 ${clearRate}%/${req.wrongClearRate}%` })
  } else {
    reasons.push({ text: '错题清空达标', met: true, detail: `已清 ${clearRate}%/${req.wrongClearRate}%` })
  }

  // 5. 最近N题
  const recent = records.slice(-req.recentTotal)
  const recentCorrect = recent.filter(r => r.isCorrect).length
  if (recentCorrect < req.recentCorrect) {
    allMet = false
    reasons.push({ text: `最近${req.recentTotal}题还需对${req.recentCorrect - recentCorrect}题`, met: false, detail: `已对 ${recentCorrect}/${req.recentCorrect}` })
  } else {
    reasons.push({ text: '近期表现达标', met: true, detail: `已对 ${recentCorrect}/${req.recentCorrect}` })
  }

  // 6. 冷却
  if (profile.promotion.cooldownUntil && new Date(profile.promotion.cooldownUntil) > new Date()) {
    allMet = false
    const remain = new Date(profile.promotion.cooldownUntil).getTime() - Date.now()
    const hours = Math.ceil(remain / 3600000)
    reasons.push({ text: `冷却中，还需${hours}小时`, met: false, detail: '挑战失败后需等待24小时' })
  }

  return { eligible: allMet, reasons, nextLevel: profile.level + 1 }
}

// ========== 挑战选题配置 ==========
export interface ChallengeConfig {
  boards: string[]
  difficulty: { easy: number; medium: number; hard: number }
}

export const SQL_CHALLENGE_CONFIG: Record<number, ChallengeConfig> = {
  1: { boards: ['condition_date', 'aggregate'], difficulty: { easy: 0.50, medium: 0.40, hard: 0.10 } },
  2: { boards: ['join', 'subquery'], difficulty: { easy: 0.20, medium: 0.50, hard: 0.30 } },
  3: { boards: ['window', 'analytics'], difficulty: { easy: 0.10, medium: 0.40, hard: 0.50 } },
  4: { boards: SQL_BOARD_ORDER, difficulty: { easy: 0.00, medium: 0.30, hard: 0.70 } },
}

export const PYTHON_CHALLENGE_CONFIG: Record<number, ChallengeConfig> = {
  1: { boards: ['condition_loop', 'function'], difficulty: { easy: 0.50, medium: 0.40, hard: 0.10 } },
  2: { boards: ['data_structure', 'file_io'], difficulty: { easy: 0.20, medium: 0.50, hard: 0.30 } },
  3: { boards: ['numpy', 'pandas'], difficulty: { easy: 0.10, medium: 0.40, hard: 0.50 } },
  4: { boards: PYTHON_BOARD_ORDER, difficulty: { easy: 0.00, medium: 0.30, hard: 0.70 } },
}

export function pickChallengeQuestions(
  pool: QuizQuestion[],
  difficultyRatio: { easy: number; medium: number; hard: number },
  count: number,
): QuizQuestion[] {
  const result: QuizQuestion[] = []
  const remaining = [...pool]

  const counts = {
    easy: Math.round(count * difficultyRatio.easy),
    medium: Math.round(count * difficultyRatio.medium),
    hard: 0,
  }
  counts.hard = count - counts.easy - counts.medium

  for (const [diff, num] of Object.entries(counts)) {
    const candidates = remaining.filter(q => q.difficulty === diff)
    const picked = [...candidates].sort(() => Math.random() - 0.5).slice(0, num)
    picked.forEach(q => {
      result.push(q)
      const idx = remaining.indexOf(q)
      if (idx > -1) remaining.splice(idx, 1)
    })
  }

  while (result.length < count && remaining.length > 0) {
    const idx = Math.floor(Math.random() * remaining.length)
    result.push(remaining[idx])
    remaining.splice(idx, 1)
  }

  return [...result].sort(() => Math.random() - 0.5).slice(0, count)
}

// ========== 自适应测评 ==========
export interface AssessmentState {
  currentDifficulty: string
  currentBoardIndex: number
  consecutiveCorrect: number
  consecutiveWrong: number
  totalCorrect: number
  totalWrong: number
  totalQuestions: number
  hardStreak: number
  easyFailStreak: number
  answers: { questionId: number; board: string; difficulty: string; correct: boolean }[]
  boardResults: Record<string, { correct: number; wrong: number }>
  finished: boolean
  questions: number[]
}

export function createAssessment(): AssessmentState {
  return {
    currentDifficulty: 'easy',
    currentBoardIndex: 0,
    consecutiveCorrect: 0,
    consecutiveWrong: 0,
    totalCorrect: 0,
    totalWrong: 0,
    totalQuestions: 0,
    hardStreak: 0,
    easyFailStreak: 0,
    answers: [],
    boardResults: {},
    finished: false,
    questions: [],
  }
}

export function pickAssessmentQuestion(
  state: AssessmentState,
  allQuestions: QuizQuestion[],
  boardOrder: string[],
): QuizQuestion | null {
  const board = boardOrder[state.currentBoardIndex % boardOrder.length]

  let candidates = allQuestions.filter(
    q => q.category === board && q.difficulty === state.currentDifficulty && !state.questions.includes(q.id),
  )

  if (candidates.length === 0) {
    candidates = allQuestions.filter(q => q.category === board && !state.questions.includes(q.id))
  }

  if (candidates.length === 0) {
    const tried = new Set(state.questions)
    candidates = allQuestions.filter(q => q.difficulty === state.currentDifficulty && !tried.has(q.id))
  }

  if (candidates.length === 0) {
    candidates = allQuestions.filter(q => !state.questions.includes(q.id))
  }

  if (candidates.length === 0) return null
  return candidates[Math.floor(Math.random() * candidates.length)]
}

function upgradeDifficulty(d: string): string {
  if (d === 'easy') return 'medium'
  if (d === 'medium') return 'hard'
  return 'hard'
}

function downgradeDifficulty(d: string): string {
  if (d === 'hard') return 'medium'
  if (d === 'medium') return 'easy'
  return 'easy'
}

export function processAssessmentAnswer(
  state: AssessmentState,
  questionId: number,
  isCorrect: boolean,
  allQuestions: QuizQuestion[],
): AssessmentState {
  const q = allQuestions.find(qq => qq.id === questionId)
  if (!q) return state

  const board = q.category
  const newState = {
    ...state,
    totalQuestions: state.totalQuestions + 1,
    questions: [...state.questions, questionId],
    answers: [...state.answers, { questionId, board, difficulty: q.difficulty, correct: isCorrect }],
  }

  const boardResults = { ...newState.boardResults }
  if (!boardResults[board]) boardResults[board] = { correct: 0, wrong: 0 }

  if (isCorrect) {
    boardResults[board] = { ...boardResults[board], correct: boardResults[board].correct + 1 }
    const consecutiveCorrect = newState.consecutiveCorrect + 1
    const newDifficulty = consecutiveCorrect >= 2 ? upgradeDifficulty(newState.currentDifficulty) : newState.currentDifficulty
    return {
      ...newState,
      boardResults,
      totalCorrect: newState.totalCorrect + 1,
      consecutiveCorrect,
      consecutiveWrong: 0,
      currentDifficulty: newDifficulty,
      currentBoardIndex: newState.currentBoardIndex + 1,
      hardStreak: q.difficulty === 'hard' ? newState.hardStreak + 1 : 0,
      easyFailStreak: q.difficulty === 'hard' ? 0 : newState.easyFailStreak,
    }
  } else {
    boardResults[board] = { ...boardResults[board], wrong: boardResults[board].wrong + 1 }
    const consecutiveWrong = newState.consecutiveWrong + 1
    const newDifficulty = consecutiveWrong >= 2 ? downgradeDifficulty(newState.currentDifficulty) : newState.currentDifficulty
    let hardStreak = newState.hardStreak
    let easyFailStreak = newState.easyFailStreak
    if (q.difficulty === 'easy') {
      easyFailStreak += 1
      hardStreak = 0
    } else if (q.difficulty === 'hard') {
      easyFailStreak = 0
    } else {
      hardStreak = 0
      easyFailStreak = 0
    }
    return {
      ...newState,
      boardResults,
      totalWrong: newState.totalWrong + 1,
      consecutiveCorrect: 0,
      consecutiveWrong,
      currentDifficulty: newDifficulty,
      currentBoardIndex: newState.currentBoardIndex + 1,
      hardStreak,
      easyFailStreak,
    }
  }
}

export function checkAssessmentEnd(state: AssessmentState): boolean {
  if (state.hardStreak >= 3) return true
  if (state.easyFailStreak >= 3) return true
  if (state.totalQuestions >= 12) return true
  return false
}

function scoreToLevel(score: number): number {
  if (score <= 30) return 1
  if (score <= 50) return 2
  if (score <= 70) return 3
  if (score <= 90) return 4
  return 5
}

export function finishAssessment(
  state: AssessmentState,
  subject: 'sql' | 'python',
  boardOrder: string[],
  levels: LevelDef[],
): UserProfile {
  const score = state.totalQuestions > 0 ? Math.round((state.totalCorrect / state.totalQuestions) * 100) : 0

  let level: number
  if (state.hardStreak >= 3) {
    level = 5
  } else if (state.easyFailStreak >= 3) {
    level = 1
  } else {
    level = scoreToLevel(score)
  }

  const weights: Record<string, BoardWeight> = {}
  boardOrder.forEach(cat => {
    const result = state.boardResults[cat]
    if (result && result.correct > 0) {
      weights[cat] = { weight: 0.6, correct: 0, wrong: 0, mastered: false }
    } else if (result && result.wrong > 0) {
      weights[cat] = { weight: 1.5, correct: 0, wrong: 0, mastered: false }
    } else {
      weights[cat] = { weight: 1.0, correct: 0, wrong: 0, mastered: false }
    }
  })

  const levelDef = getLevelDef(level, levels)
  const profile: UserProfile = {
    level,
    levelName: levelDef.name,
    assessmentDone: true,
    boardWeights: weights,
    promotion: { eligible: false, lastChallengeTime: null, challengeCount: 0, cooldownUntil: null },
    assessmentScore: score,
    assessmentAnswers: state.answers,
  }

  saveProfile(subject, profile)
  saveDoneQuestions(subject, state.questions)

  return profile
}

// ========== React Hook ==========
export function useSmartQuiz(subject: 'sql' | 'python') {
  const boardOrder = subject === 'sql' ? SQL_BOARD_ORDER : PYTHON_BOARD_ORDER
  const levels = subject === 'sql' ? SQL_LEVELS : PYTHON_LEVELS

  const [profile, setProfile] = useState<UserProfile | null>(() => loadProfile(subject, boardOrder))
  const { user } = useAuth()
  const syncedRef = useRef(false)
  const doneQuestionsRef = useRef<number[]>([])

  // Sync from cloud on mount when logged in
  useEffect(() => {
    if (!user || syncedRef.current) return
    syncedRef.current = true
    syncProfileFromCloud(user.id, subject).then(result => {
      if (result.profile) {
        setProfile(result.profile)
        saveProfile(subject, result.profile)
        doneQuestionsRef.current = result.doneQuestions
      }
    })
  }, [user, subject])

  // Save to localStorage + cloud on change
  useEffect(() => {
    if (profile) {
      saveProfile(subject, profile)
      if (user?.id) {
        saveProfileToCloud(user.id, subject, profile, doneQuestionsRef.current)
      }
    }
  }, [profile, subject, user?.id])

  const refreshProfile = useCallback(() => {
    setProfile(loadProfile(subject, boardOrder))
  }, [subject, boardOrder])

  const initProfile = useCallback(() => {
    const p = getDefaultProfile(boardOrder)
    setProfile(p)
    saveProfile(subject, p)
    return p
  }, [subject, boardOrder])

  const updateProfile = useCallback((updater: (p: UserProfile) => UserProfile) => {
    setProfile(prev => {
      if (!prev) return prev
      const next = updater(prev)
      saveProfile(subject, next)
      return next
    })
  }, [subject])

  // Expose done questions management for smartPickQuestions compatibility
  const getDoneQuestions = useCallback((): number[] => doneQuestionsRef.current, [])
  const setDoneQuestions = useCallback((ids: number[]) => {
    doneQuestionsRef.current = ids
    if (user?.id && profile) {
      saveProfileToCloud(user.id, subject, profile, ids)
    }
  }, [user?.id, subject, profile])

  return {
    profile,
    boardOrder,
    levels,
    refreshProfile,
    initProfile,
    updateProfile,
    getDoneQuestions,
    setDoneQuestions,
  }
}
