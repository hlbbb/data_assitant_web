import { useState, useCallback, useEffect, useRef } from 'react'
import {
  getStageStatus,
  markStage,
  getContinueTo,
  getOverallProgress,
  resetProgress as resetProgressUtil,
  recordVisit,
  loadStore,
} from '../utils/progress'
import type { StageProgress } from '../utils/progress'
import { useAuth } from '../contexts/AuthContext'
import { syncProgressFromCloud, saveProgressToCloud } from '../utils/supabaseData'

// 全局缓存,避免重复同步
let globalSynced = false
let syncPromise: Promise<void> | null = null

export function useProgress() {
  const [, forceUpdate] = useState(0)
  const refresh = useCallback(() => forceUpdate((n) => n + 1), [])
  const { user } = useAuth()
  const mountedRef = useRef(false)

  // Sync from cloud on mount when logged in (只执行一次)
  useEffect(() => {
    if (!user || globalSynced) return

    // 避免多个组件同时触发同步
    if (!syncPromise) {
      syncPromise = syncProgressFromCloud(user.id).then(cloudData => {
        if (cloudData) {
          localStorage.setItem('datapath_progress', JSON.stringify(cloudData))
        }
        globalSynced = true
        syncPromise = null
      }).catch(() => {
        globalSynced = true
        syncPromise = null
      })
    }

    syncPromise.then(() => {
      if (mountedRef.current) {
        refresh()
      }
    })

    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [user, refresh])

  const cloudSave = useCallback(() => {
    if (user?.id) {
      saveProgressToCloud(user.id, loadStore())
    }
  }, [user?.id])

  return {
    getStageStatus: useCallback(
      (subject: 'sql' | 'python' | 'thinking', stageId: string): StageProgress =>
        getStageStatus(subject, stageId),
      []
    ),
    markStage: useCallback(
      (subject: 'sql' | 'python' | 'thinking', stageId: string, status: 'in_progress' | 'completed') => {
        markStage(subject, stageId, status)
        cloudSave()
        refresh()
      },
      [refresh, cloudSave]
    ),
    getContinueTo: useCallback(() => getContinueTo(), []),
    getOverallProgress: useCallback(() => getOverallProgress(), []),
    resetProgress: useCallback(() => { resetProgressUtil(); cloudSave(); refresh() }, [refresh, cloudSave]),
    recordVisit: useCallback(
      (subject: 'sql' | 'python' | 'thinking', stageId: string) => {
        recordVisit(subject, stageId)
        cloudSave()
        refresh()
      },
      [refresh, cloudSave]
    ),
  }
}
