import { useState, useCallback, useEffect, useRef } from 'react'
import type { QuizQuestion } from '../data/sqlQuestions'
import { useAuth } from '../contexts/AuthContext'
import { syncQuizRecordsFromCloud, insertQuizRecordToCloud } from '../utils/supabaseData'

export type QuizMode = 'sequential' | 'random' | 'category' | 'wrong-book'

export interface QuizRecord {
  questionId: number
  chosenOption: string
  isCorrect: boolean
  timestamp: number
}

export interface QuizState {
  questions: QuizQuestion[]
  currentIndex: number
  answers: Map<number, string>
  records: QuizRecord[]
  isFinished: boolean
  startTime: number
}

const STORAGE_KEY = 'datapath_quiz_records'

function loadLocalRecords(): QuizRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveLocalRecords(records: QuizRecord[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

export function useQuiz() {
  const [state, setState] = useState<QuizState>({
    questions: [],
    currentIndex: 0,
    answers: new Map(),
    records: [],
    isFinished: false,
    startTime: Date.now(),
  })
  const [cloudRecords, setCloudRecords] = useState<QuizRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const subjectRef = useRef<'sql' | 'python' | null>(null)

  // Sync from cloud on mount when logged in
  useEffect(() => {
    if (user) {
      setIsLoading(true)
      console.log('[useQuiz] Syncing records for user:', user.id)
      syncQuizRecordsFromCloud(user.id).then(records => {
        console.log('[useQuiz] Synced records:', records.length)
        setCloudRecords(records)
        setIsLoading(false)
      })
    } else {
      // 未登录时使用本地记录
      setCloudRecords([])
      setIsLoading(false)
    }
  }, [user])

  // Save to localStorage on change (for non-logged in users)
  useEffect(() => {
    if (!user) {
      saveLocalRecords(state.records)
    }
  }, [state.records, user])

  const startQuiz = useCallback((questions: QuizQuestion[], subject?: 'sql' | 'python') => {
    subjectRef.current = subject ?? null
    setState({
      questions: [...questions],
      currentIndex: 0,
      answers: new Map(),
      records: [],
      isFinished: false,
      startTime: Date.now(),
    })
  }, [])

  const currentQuestion = state.questions[state.currentIndex] ?? null

  const answerQuestion = useCallback((optionLabel: string) => {
    setState(prev => {
      if (!prev.questions[prev.currentIndex]) return prev
      const q = prev.questions[prev.currentIndex]
      const chosen = q.options.find(o => o.label === optionLabel)
      const isCorrect = chosen?.correct ?? false

      const newAnswers = new Map(prev.answers)
      newAnswers.set(q.id, optionLabel)

      const record: QuizRecord = {
        questionId: q.id,
        chosenOption: optionLabel,
        isCorrect,
        timestamp: Date.now(),
      }

      // 保存到云端
      if (user?.id && subjectRef.current) {
        insertQuizRecordToCloud(user.id, record, subjectRef.current)
        // 更新云端记录状态
        setCloudRecords(prev => [...prev, record])
      }

      return {
        ...prev,
        answers: newAnswers,
        records: [...prev.records, record],
      }
    })
  }, [user?.id])

  const goNext = useCallback(() => {
    setState(prev => {
      const nextIndex = prev.currentIndex + 1
      if (nextIndex >= prev.questions.length) {
        return { ...prev, isFinished: true }
      }
      return { ...prev, currentIndex: nextIndex }
    })
  }, [])

  const goPrevious = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentIndex: Math.max(0, prev.currentIndex - 1),
    }))
  }, [])

  const resetQuiz = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentIndex: 0,
      answers: new Map(),
      isFinished: false,
      startTime: Date.now(),
    }))
  }, [])

  // 计算统计数据：登录用户用云端数据，未登录用户用本地数据
  const allRecords = user ? cloudRecords : loadLocalRecords()

  const correctCount = allRecords.filter(r => r.isCorrect).length
  const totalCount = allRecords.length
  const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0

  const todayRecords = allRecords.filter(r => {
    const d = new Date(r.timestamp)
    const today = new Date()
    return d.toDateString() === today.toDateString()
  })

  const stats = {
    totalAnswered: totalCount,
    totalCorrect: correctCount,
    accuracy: accuracy,
    todayCount: todayRecords.length,
    sessionCorrect: state.records.filter(r => r.isCorrect).length,
    sessionTotal: state.records.length,
    sessionAccuracy: state.records.length > 0
      ? Math.round((state.records.filter(r => r.isCorrect).length / state.records.length) * 100)
      : 0,
  }

  return {
    currentQuestion,
    currentIndex: state.currentIndex,
    totalQuestions: state.questions.length,
    answers: state.answers,
    isFinished: state.isFinished,
    startQuiz,
    answerQuestion,
    goNext,
    goPrevious,
    resetQuiz,
    stats,
    isLoading,
  }
}
