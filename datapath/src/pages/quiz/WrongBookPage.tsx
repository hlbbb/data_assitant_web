import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { sqlQuestions, CATEGORY_MAP as SQL_CATEGORY_MAP, DIFFICULTY_MAP } from '../../data/sqlQuestions'
import { pythonQuestions, PYTHON_CATEGORY_MAP } from '../../data/pythonQuestions'
import { useWrongBook } from '../../hooks/useWrongBook'
import './Quiz.css'

const ALL_CATEGORY_MAP: Record<string, string> = { ...SQL_CATEGORY_MAP, ...PYTHON_CATEGORY_MAP }

const WrongBookPage: React.FC = () => {
  const navigate = useNavigate()
  const { entries, removeEntry, getWrongQuestions } = useWrongBook()
  const [selectedSubject, setSelectedSubject] = useState<'all' | 'sql' | 'python'>('all')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDifficulty] = useState('')
  const [searchQuery] = useState('')

  const allWrongQuestions = useMemo(() => {
    const sqlWrong = getWrongQuestions('sql', sqlQuestions)
    const pyWrong = getWrongQuestions('python', pythonQuestions)
    return [...sqlWrong, ...pyWrong]
  }, [entries, getWrongQuestions])

  const wrongQuestions = useMemo(() => {
    if (selectedSubject === 'sql') return getWrongQuestions('sql', sqlQuestions)
    if (selectedSubject === 'python') return getWrongQuestions('python', pythonQuestions)
    return allWrongQuestions
  }, [selectedSubject, entries, getWrongQuestions, allWrongQuestions])

  const filteredWrong = useMemo(() => {
    return wrongQuestions.filter(q => {
      if (selectedCategory && q.category !== selectedCategory) return false
      if (selectedDifficulty && q.difficulty !== selectedDifficulty) return false
      if (searchQuery) {
        const lower = searchQuery.toLowerCase()
        return q.stem.toLowerCase().includes(lower) || q.tags.some(t => t.toLowerCase().includes(lower))
      }
      return true
    })
  }, [wrongQuestions, selectedCategory, selectedDifficulty, searchQuery])

  const handleRetry = () => {
    if (filteredWrong.length === 0) return
    const subject = filteredWrong[0]
    const isSql = sqlQuestions.some(q => q.id === subject.id)
    navigate(isSql ? '/quiz/sql/practice' : '/quiz/python/practice', { state: { questions: filteredWrong } })
  }

  const subjectEntries = useMemo(() => {
    if (selectedSubject === 'all') return entries
    return entries.filter(e => e.subject === selectedSubject)
  }, [entries, selectedSubject])

  return (
    <div className="wrong-book">
      <div className="wrong-book__breadcrumb">
        <Link to="/quiz">刷题</Link>
        <span className="sql-quiz__sep">/</span>
        <span>错题本</span>
      </div>

      <div className="wrong-book__header">
        <h1 className="wrong-book__title">错题本</h1>
        <p className="wrong-book__desc">共 {allWrongQuestions.length} 道错题</p>
      </div>

      <div className="wrong-book__subject-tabs">
        {(['all', 'sql', 'python'] as const).map(s => (
          <button
            key={s}
            className={`quiz-filter__chip ${selectedSubject === s ? 'quiz-filter__chip--active' : ''}`}
            onClick={() => { setSelectedSubject(s); setSelectedCategory('') }}
          >
            {s === 'all' ? '全部' : s === 'sql' ? 'SQL' : 'Python'} ({s === 'all' ? entries.length : subjectEntries.length})
          </button>
        ))}
      </div>

      {wrongQuestions.length > 0 && (
        <>
          <div className="wrong-book__actions">
            <button className="quiz-btn quiz-btn--primary" onClick={handleRetry}>
              重做错题 ({filteredWrong.length}题)
            </button>
          </div>
        </>
      )}

      <div className="wrong-book__list">
        {filteredWrong.map((q, idx) => {
          const isSql = sqlQuestions.some(sq => sq.id === q.id)
          const entry = entries.find(e => e.questionId === q.id && e.subject === (isSql ? 'sql' : 'python'))
          const catLabel = ALL_CATEGORY_MAP[q.category] || q.category
          return (
            <div key={`${isSql ? 'sql' : 'py'}-${q.id}`} className="wrong-book__item">
              <div className="wrong-book__item-header">
                <span className="wrong-book__item-index">#{idx + 1}</span>
                <span className={`quiz-card__diff quiz-card__diff--${q.difficulty}`}>
                  {DIFFICULTY_MAP[q.difficulty]}
                </span>
                <span className="quiz-card__cat">{catLabel}</span>
                <span className="wrong-book__item-subject">{isSql ? 'SQL' : 'Python'}</span>
                {entry && <span className="wrong-book__item-count">错 {entry.count} 次</span>}
                <button
                  className="wrong-book__remove"
                  onClick={() => removeEntry(q.id, isSql ? 'sql' : 'python')}
                  title="移除"
                >
                  &times;
                </button>
              </div>
              <p className="wrong-book__item-stem">{q.stem}</p>
              <div className="wrong-book__item-answer">
                <strong>正确答案：</strong>
                {q.options.find(o => o.correct)?.label}. {q.options.find(o => o.correct)?.text}
              </div>
              <div className="wrong-book__item-explanation">
                {q.explanation}
              </div>
            </div>
          )
        })}
        {filteredWrong.length === 0 && (
          <div className="wrong-book__empty">
            {allWrongQuestions.length === 0 ? (
              <>
                <span className="wrong-book__empty-icon">🎯</span>
                <p>还没有错题，继续保持！</p>
              </>
            ) : (
              <p>没有匹配的错题</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default WrongBookPage
