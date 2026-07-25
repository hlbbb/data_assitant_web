/**
 * 学习进度管理 - localStorage 持久化
 */
import { courses } from '../data/courses'

export type StageStatus = 'not_started' | 'in_progress' | 'completed'

export interface StageProgress {
  status: StageStatus
  lastVisitAt: number
  completedAt?: number
}

export type Subject = 'sql' | 'python' | 'thinking'

export interface ProgressStore {
  version: number
  sql: Record<string, StageProgress>
  python: Record<string, StageProgress>
  thinking: Record<string, StageProgress>
  firstVisitAt: number
  lastVisitAt: number
  totalDays: number
  continueTo: { subject: Subject; stageId: string } | null
}

const STORAGE_KEY = 'datapath_progress'
const CURRENT_VERSION = 2

export function loadStore(): ProgressStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as ProgressStore
      if (parsed.version < CURRENT_VERSION) {
        return migrateStore(parsed)
      }
      return parsed
    }
  } catch {
    // ignore
  }
  return createNewStore()
}

function migrateStore(old: ProgressStore): ProgressStore {
  return {
    ...old,
    version: CURRENT_VERSION,
    thinking: old.thinking ?? {},
  }
}

function createNewStore(): ProgressStore {
  return {
    version: CURRENT_VERSION,
    sql: {},
    python: {},
    thinking: {},
    firstVisitAt: Date.now(),
    lastVisitAt: Date.now(),
    totalDays: 1,
    continueTo: null,
  }
}

function saveStore(store: ProgressStore): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

function calcTotalDays(store: ProgressStore): number {
  const first = new Date(store.firstVisitAt)
  const now = new Date()
  const diffMs = now.getTime() - first.getTime()
  return Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
}

export function getStageStatus(
  subject: Subject,
  stageId: string
): StageProgress {
  const store = loadStore()
  const progress = store[subject][stageId]
  return progress ?? { status: 'not_started', lastVisitAt: 0 }
}

export function markStage(
  subject: Subject,
  stageId: string,
  status: 'in_progress' | 'completed'
): void {
  const store = loadStore()
  if (!store[subject][stageId]) {
    store[subject][stageId] = { status: 'not_started', lastVisitAt: 0 }
  }
  const stage = store[subject][stageId]
  stage.status = status
  stage.lastVisitAt = Date.now()
  if (status === 'completed') {
    stage.completedAt = Date.now()
  }
  store.lastVisitAt = Date.now()
  store.totalDays = calcTotalDays(store)
  if (status === 'completed') {
    store.continueTo = findNextIncomplete(subject, store)
  }
  saveStore(store)
}

function findNextIncomplete(
  subject: Subject,
  store: ProgressStore
): { subject: Subject; stageId: string } | null {
  const stages = store[subject]
  for (const [stageId, progress] of Object.entries(stages)) {
    if (progress.status !== 'completed') {
      return { subject, stageId }
    }
  }
  return null
}

export function getContinueTo(): { subject: Subject; stageId: string } | null {
  return loadStore().continueTo
}

export function getOverallProgress(): {
  sqlCompleted: number
  sqlTotal: number
  pythonCompleted: number
  pythonTotal: number
  thinkingCompleted: number
  thinkingTotal: number
  totalDays: number
} {
  const store = loadStore()
  const sqlCourse = courses.find((c) => c.id === 'sql')
  const pythonCourse = courses.find((c) => c.id === 'python')
  const thinkingCourse = courses.find((c) => c.id === 'thinking')
  return {
    sqlCompleted: Object.values(store.sql).filter((s) => s.status === 'completed').length,
    sqlTotal: sqlCourse?.stages.length ?? 0,
    pythonCompleted: Object.values(store.python).filter((s) => s.status === 'completed').length,
    pythonTotal: pythonCourse?.stages.length ?? 0,
    thinkingCompleted: Object.values(store.thinking).filter((s) => s.status === 'completed').length,
    thinkingTotal: thinkingCourse?.stages.length ?? 0,
    totalDays: store.totalDays,
  }
}

export function resetProgress(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function recordVisit(subject: Subject, stageId: string): void {
  const store = loadStore()
  if (!store[subject][stageId]) {
    store[subject][stageId] = { status: 'not_started', lastVisitAt: 0 }
  }
  store[subject][stageId].lastVisitAt = Date.now()
  store[subject][stageId].status = 'in_progress'
  store.lastVisitAt = Date.now()
  saveStore(store)
}
