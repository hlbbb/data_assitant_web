import { useState, useCallback } from 'react'
import {
  getStageStatus,
  markStage,
  getContinueTo,
  getOverallProgress,
  resetProgress as resetProgressUtil,
  recordVisit,
} from '../utils/progress'
import type { StageProgress } from '../utils/progress'

export function useProgress() {
  const [, forceUpdate] = useState(0)
  const refresh = useCallback(() => forceUpdate((n) => n + 1), [])

  return {
    getStageStatus: useCallback(
      (subject: 'sql' | 'python' | 'thinking', stageId: string): StageProgress =>
        getStageStatus(subject, stageId),
      []
    ),
    markStage: useCallback(
      (subject: 'sql' | 'python' | 'thinking', stageId: string, status: 'in_progress' | 'completed') => {
        markStage(subject, stageId, status)
        refresh()
      },
      [refresh]
    ),
    getContinueTo: useCallback(() => getContinueTo(), []),
    getOverallProgress: useCallback(() => getOverallProgress(), []),
    resetProgress: useCallback(() => { resetProgressUtil(); refresh() }, [refresh]),
    recordVisit: useCallback(
      (subject: 'sql' | 'python' | 'thinking', stageId: string) => {
        recordVisit(subject, stageId)
        refresh()
      },
      [refresh]
    ),
  }
}
