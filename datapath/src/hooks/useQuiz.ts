import { useState, useCallback } from 'react'
import type { QuizQuestion } from '../data/sqlQuestions'

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
  const [history, setHistory] = useState<QuizRecord[]>(() => loadLocalRecords())

  const startQuiz = useCallback((questions: QuizQuestion[], _subject?: 'sql' | 'python') => {
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
    if (!currentQuestion) return
    const chosen = currentQuestion.options.find(o => o.label === optionLabel)
    const record: QuizRecord = {
      questionId: currentQuestion.id,
      chosenOption: optionLabel,
      isCorrect: chosen?.correct ?? false,
      timestamp: Date.now(),
    }

    setState(prev => {
      const newAnswers = new Map(prev.answers)
      newAnswers.set(currentQuestion.id, optionLabel)
      return {
        ...prev,
        answers: newAnswers,
        records: [...prev.records, record],
      }
    })

    setHistory(prev => {
      const next = [...prev, record]
      saveLocalRecords(next)
      return next
    })
  }, [currentQuestion])

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

  const correctCount = history.filter(r => r.isCorrect).length
  const totalCount = history.length
  const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0

  const todayRecords = history.filter(r => {
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
    isLoading: false,
  }
}
