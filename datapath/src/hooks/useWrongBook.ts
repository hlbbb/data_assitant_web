import { useState, useCallback, useEffect, useRef } from 'react'
import type { QuizQuestion } from '../data/sqlQuestions'
import { useAuth } from '../contexts/AuthContext'
import { syncWrongBookFromCloud, upsertWrongEntry, deleteWrongEntryFromCloud } from '../utils/supabaseData'

const WRONG_BOOK_KEY = 'datapath_wrong_book'

export interface WrongBookEntry {
  questionId: number
  subject: 'sql' | 'python'
  count: number
  lastTimestamp: number
  reviewed: boolean
}

function saveLocalWrongBook(entries: WrongBookEntry[]): void {
  localStorage.setItem(WRONG_BOOK_KEY, JSON.stringify(entries))
}

function clearLocalWrongBook(): void {
  localStorage.removeItem(WRONG_BOOK_KEY)
}

export function useWrongBook() {
  const [entries, setEntries] = useState<WrongBookEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const syncedRef = useRef(false)

  // 初始化：登录用户从云端加载，未登录用户清空本地数据
  useEffect(() => {
    if (user) {
      // 登录用户：从云端同步
      if (!syncedRef.current) {
        syncedRef.current = true
        setIsLoading(true)
        syncWrongBookFromCloud(user.id).then(cloudEntries => {
          setEntries(cloudEntries)
          // 同时保存到本地作为缓存
          saveLocalWrongBook(cloudEntries)
          setIsLoading(false)
        })
      }
    } else {
      // 未登录用户：清空本地和内存数据
      clearLocalWrongBook()
      setEntries([])
      syncedRef.current = false
      setIsLoading(false)
    }
  }, [user])

  const addWrongAnswer = useCallback((questionId: number, subject: 'sql' | 'python') => {
    // 未登录用户不记录错题
    if (!user) return

    setEntries(prev => {
      const existing = prev.find(e => e.questionId === questionId && e.subject === subject)
      let newEntries: WrongBookEntry[]
      if (existing) {
        newEntries = prev.map(e =>
          e.questionId === questionId && e.subject === subject
            ? { ...e, count: e.count + 1, lastTimestamp: Date.now(), reviewed: false }
            : e
        )
      } else {
        newEntries = [...prev, { questionId, subject, count: 1, lastTimestamp: Date.now(), reviewed: false }]
      }
      // 保存到云端
      if (user?.id) {
        const entry = newEntries.find(e => e.questionId === questionId && e.subject === subject)!
        upsertWrongEntry(user.id, questionId, subject, entry.count, entry.reviewed)
        // 同时保存到本地缓存
        saveLocalWrongBook(newEntries)
      }
      return newEntries
    })
  }, [user])

  const markReviewed = useCallback((questionId: number, subject: 'sql' | 'python') => {
    if (!user) return

    setEntries(prev => {
      const newEntries = prev.map(e =>
        e.questionId === questionId && e.subject === subject
          ? { ...e, reviewed: true }
          : e
      )
      if (user?.id) {
        const entry = newEntries.find(e => e.questionId === questionId && e.subject === subject)
        if (entry) {
          upsertWrongEntry(user.id, questionId, subject, entry.count, true)
          saveLocalWrongBook(newEntries)
        }
      }
      return newEntries
    })
  }, [user])

  const removeEntry = useCallback((questionId: number, subject: 'sql' | 'python') => {
    if (!user) return

    if (user?.id) {
      deleteWrongEntryFromCloud(user.id, questionId, subject)
    }
    setEntries(prev => {
      const newEntries = prev.filter(e => !(e.questionId === questionId && e.subject === subject))
      saveLocalWrongBook(newEntries)
      return newEntries
    })
  }, [user])

  const getWrongQuestions = useCallback((subject: 'sql' | 'python', allQuestions: QuizQuestion[]) => {
    const subjectEntries = entries.filter(e => e.subject === subject)
    return subjectEntries
      .map(e => allQuestions.find(q => q.id === e.questionId))
      .filter((q): q is QuizQuestion => q !== undefined)
  }, [entries])

  const getWrongCount = useCallback((subject?: 'sql' | 'python') => {
    if (subject) {
      return entries.filter(e => e.subject === subject).length
    }
    return entries.length
  }, [entries])

  return {
    entries,
    isLoading,
    addWrongAnswer,
    markReviewed,
    removeEntry,
    getWrongQuestions,
    getWrongCount,
  }
}
