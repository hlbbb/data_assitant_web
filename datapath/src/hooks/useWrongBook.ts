import { useState, useCallback } from 'react'
import type { QuizQuestion } from '../data/sqlQuestions'

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

function loadLocalWrongBook(): WrongBookEntry[] {
  try {
    const raw = localStorage.getItem(WRONG_BOOK_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useWrongBook() {
  const [entries, setEntries] = useState<WrongBookEntry[]>(() => loadLocalWrongBook())

  const addWrongAnswer = useCallback((questionId: number, subject: 'sql' | 'python') => {
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
      saveLocalWrongBook(newEntries)
      return newEntries
    })
  }, [])

  const markReviewed = useCallback((questionId: number, subject: 'sql' | 'python') => {
    setEntries(prev => {
      const newEntries = prev.map(e =>
        e.questionId === questionId && e.subject === subject
          ? { ...e, reviewed: true }
          : e
      )
      saveLocalWrongBook(newEntries)
      return newEntries
    })
  }, [])

  const removeEntry = useCallback((questionId: number, subject: 'sql' | 'python') => {
    setEntries(prev => {
      const newEntries = prev.filter(e => !(e.questionId === questionId && e.subject === subject))
      saveLocalWrongBook(newEntries)
      return newEntries
    })
  }, [])

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
    isLoading: false,
    addWrongAnswer,
    markReviewed,
    removeEntry,
    getWrongQuestions,
    getWrongCount,
  }
}
