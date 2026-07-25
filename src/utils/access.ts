import type { Subject } from './progress'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export interface AccessStore {
  unlocked: boolean
  activatedAt?: number
  code?: string
}

const STORAGE_KEY = 'datapath_access'
const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const SECRET = 7
const CODE_PATTERN = /^DP-([A-Z0-9]{4})-([A-Z0-9]{4})-([A-Z0-9]{2})$/
const FREE_SQL_IDS = ['1', '2', '3']
const FREE_PYTHON_IDS = ['1', '2', '3', '4', '5']
const LOCKED_SQL_IDS = ['4', '5', '6', '7', '8']
const LOCKED_PYTHON_IDS = ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18']
const FREE_THINKING_IDS = ['1.1', '1.2', '1.3', '1.4', '2']
const LOCKED_THINKING_IDS = ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

export function loadStore(): AccessStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as AccessStore
  } catch { /* ignore */ }
  return { unlocked: false }
}

function saveStore(store: AccessStore): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(store)) }
  catch { /* storage full */ }
}

function charToVal(c: string): number { return CHARSET.indexOf(c) }
function valToChar(v: number): string {
  return CHARSET[((v % CHARSET.length) + CHARSET.length) % CHARSET.length]
}

function computeChecksum(body: string): string {
  let sum = 0
  for (let i = 0; i < body.length; i++) sum += charToVal(body[i]) * (i + SECRET)
  return valToChar(Math.floor(sum / 3)) + valToChar(sum)
}

export function generateCode(): string {
  let body = ''
  for (let i = 0; i < 8; i++) body += CHARSET[Math.floor(Math.random() * CHARSET.length)]
  const check = computeChecksum(body)
  return `DP-${body.slice(0, 4)}-${body.slice(4)}-${check}`
}

export function validateCode(code: string): boolean {
  const match = code.match(CODE_PATTERN)
  if (!match) return false
  return computeChecksum(match[1] + match[2]) === match[3]
}

export async function activateCodeCloud(
  code: string, userId: string
): Promise<{ success: boolean; message: string }> {
  if (!isSupabaseConfigured) return { success: false, message: '登录服务未配置，请先配置 Supabase' }
  const normalized = code.trim().toUpperCase().replace(/\s+/g, '')
  if (!validateCode(normalized)) return { success: false, message: '激活码无效' }
  try {
    const { data: rows, error } = await supabase
      .from('activation_codes').select('code').eq('code', normalized).is('user_id', null)
    if (error || !rows?.length) return { success: false, message: '激活码无效或已被使用' }
    await supabase.from('activation_codes')
      .update({ user_id: userId, activated_at: new Date().toISOString() }).eq('code', normalized)
    await supabase.from('user_access')
      .upsert({ user_id: userId, unlocked: true, activation_code: normalized })
    // Sync to localStorage immediately
    saveStore({ unlocked: true, activatedAt: Date.now(), code: normalized })
    return { success: true, message: '激活成功' }
  } catch {
    return { success: false, message: '激活失败，请稍后重试' }
  }
}

export async function checkCloudAccess(userId: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false
  try {
    const { data, error } = await supabase
      .from('user_access').select('unlocked').eq('user_id', userId).single()
    return !error && !!data && data.unlocked === true
  } catch { return false }
}

export async function syncAccessFromCloud(userId: string): Promise<void> {
  if (!isSupabaseConfigured) return
  try {
    const unlocked = await checkCloudAccess(userId)
    if (unlocked && !loadStore().unlocked) saveStore({ unlocked: true, activatedAt: Date.now() })
  } catch { /* ignore */ }
}

export async function activateCode(
  code: string, userId?: string
): Promise<{ success: boolean; message: string }> {
  // 必须登录才能激活
  if (!userId) {
    return { success: false, message: '请先登录或注册账号后再激活' }
  }
  return activateCodeCloud(code, userId)
}

export function isUnlocked(): boolean { return loadStore().unlocked }

export function isQuizAccessible(): boolean { return loadStore().unlocked }

export const FREE_QUIZ_COUNT = 5

// 检查用户是否可以继续刷题（未解锁时只能刷5题）
export function canContinueQuiz(answeredCount: number): boolean {
  if (loadStore().unlocked) return true
  return answeredCount < FREE_QUIZ_COUNT
}

// 检查是否需要显示解锁提示
export function shouldShowQuizPaywall(answeredCount: number): boolean {
  return !loadStore().unlocked && answeredCount >= FREE_QUIZ_COUNT
}

export function isStageAccessible(subject: Subject, stageId: string): boolean {
  if (loadStore().unlocked) return true
  if (subject === 'sql') return FREE_SQL_IDS.includes(stageId)
  if (subject === 'python') return FREE_PYTHON_IDS.includes(stageId)
  if (subject === 'thinking') return FREE_THINKING_IDS.includes(stageId)
  return false
}

export function getLockedStages(subject: 'sql' | 'python' | 'thinking'): string[] {
  if (subject === 'sql') return [...LOCKED_SQL_IDS]
  if (subject === 'python') return [...LOCKED_PYTHON_IDS]
  if (subject === 'thinking') return [...LOCKED_THINKING_IDS]
  return []
}

export function resetAccess(): void { localStorage.removeItem(STORAGE_KEY) }
