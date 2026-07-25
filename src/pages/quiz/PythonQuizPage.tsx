import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { pythonQuestions, PYTHON_CATEGORY_MAP } from '../../data/pythonQuestions'
import { DIFFICULTY_MAP } from '../../data/sqlQuestions'
import { useSmartQuiz, smartPickQuestions, getLevelColor, getLevelDef, PYTHON_LEVELS, PYTHON_BOARD_ORDER } from '../../hooks/useSmartQuiz'
import { isQuizAccessible, FREE_QUIZ_COUNT } from '../../utils/access'
import QuizFilter from '../../components/quiz/QuizFilter'
import './Quiz.css'

const PythonQuizPage: React.FC = () => {
  const navigate = useNavigate()
  const { profile, initProfile, refreshProfile, levels } = useSmartQuiz('python')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const levelColor = profile ? getLevelColor(profile.level) : '#0d9488'
  const levelDef = profile ? getLevelDef(profile.level, levels) : levels[0]

  const unlocked = isQuizAccessible()

  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {}
    Object.keys(PYTHON_CATEGORY_MAP).forEach(cat => {
      stats[cat] = pythonQuestions.filter(q => q.category === cat).length
    })
    return stats
  }, [])

  const filteredQuestions = useMemo(() => {
    return pythonQuestions.filter(q => {
      if (selectedCategory && q.category !== selectedCategory) return false
      if (selectedDifficulty && q.difficulty !== selectedDifficulty) return false
      if (searchQuery) {
        const lower = searchQuery.toLowerCase()
        return q.stem.toLowerCase().includes(lower) || q.tags.some(t => t.toLowerCase().includes(lower))
      }
      return true
    })
  }, [selectedCategory, selectedDifficulty, searchQuery])

  // 智能刷题
  const handleSmartPractice = () => {
    const questions = smartPickQuestions('python', pythonQuestions, PYTHON_BOARD_ORDER, PYTHON_LEVELS, 20)
    navigate('/quiz/python/practice', { state: { questions, mode: 'smart' } })
  }

  // 水平测评
  const handleAssessment = () => {
    navigate('/quiz/python/assessment')
  }

  // 全部/分类刷题
  const handleStartPractice = (mode: 'all' | 'category' | 'random') => {
    let questions = filteredQuestions
    if (mode === 'random') {
      questions = [...filteredQuestions].sort(() => Math.random() - 0.5)
    }
    if (!unlocked) {
      questions = questions.slice(0, FREE_QUIZ_COUNT)
    }
    navigate('/quiz/python/practice', { state: { questions, trial: !unlocked } })
  }

  // 跳过测评
  const handleSkipAssessment = () => {
    if (!profile?.assessmentDone) {
      initProfile()
    }
    refreshProfile()
  }

  const displayQuestions = unlocked ? filteredQuestions : filteredQuestions.slice(0, FREE_QUIZ_COUNT)

  return (
    <div className="python-quiz">
      <div className="sql-quiz__breadcrumb">
        <Link to="/quiz">刷题</Link>
        <span className="sql-quiz__sep">/</span>
        <span>Python 刷题</span>
      </div>

      <div className="quiz-hero" style={{ '--level-color': levelColor } as React.CSSProperties}>
        <div className="quiz-hero__level">
          <div className="quiz-hero__badge">Lv.{profile?.level ?? 1}</div>
          <div className="quiz-hero__info">
            <h2 className="quiz-hero__name">{levelDef.name}</h2>
            <p className="quiz-hero__desc">{levelDef.desc}</p>
          </div>
        </div>

        {!profile?.assessmentDone ? (
          <div className="quiz-hero__actions">
            <button className="quiz-btn quiz-btn--smart" onClick={handleAssessment}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M9 18l6-6-6-6" />
              </svg>
              开始测评
            </button>
            <button className="quiz-btn quiz-btn--ghost" onClick={handleSkipAssessment}>
              跳过，自由刷题
            </button>
          </div>
        ) : (
          <div className="quiz-hero__actions">
            <button className="quiz-btn quiz-btn--smart" onClick={handleSmartPractice}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
              智能刷题
            </button>
            <Link to="/quiz/wrong" className="quiz-btn quiz-btn--ghost">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
                <path d="M15 9l-6 6M9 9l6 6" />
              </svg>
              错题本
            </Link>
          </div>
        )}
      </div>

      {/* 题库浏览 */}
      <div className="quiz-section">
        <h3 className="sql-quiz__section-title">题库浏览</h3>
        {!unlocked && (
          <div className="quiz-trial-hint">
            免费体验 {FREE_QUIZ_COUNT} 题，解锁后可使用全部题库与智能刷题
          </div>
        )}
        <QuizFilter
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          onCategoryChange={setSelectedCategory}
          onDifficultyChange={setSelectedDifficulty}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {selectedCategory === '' && selectedDifficulty === '' && searchQuery === '' ? (
          <div className="sql-quiz__cat-grid">
            {Object.entries(PYTHON_CATEGORY_MAP).map(([key, label]) => (
              <button
                key={key}
                className="sql-quiz__cat-card"
                onClick={() => setSelectedCategory(key)}
              >
                <span className="sql-quiz__cat-name">{label}</span>
                <span className="sql-quiz__cat-count">{categoryStats[key]} 题</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="sql-quiz__list">
            {displayQuestions.map((q, idx) => (
              <div key={q.id} onClick={() => handleStartPractice('all')} style={{ marginBottom: '10px' }}>
                <div className="quiz-card">
                  <div className="quiz-card__header">
                    <span className="quiz-card__index">#{idx + 1}</span>
                    <span className={`quiz-card__diff quiz-card__diff--${q.difficulty}`}>
                      {DIFFICULTY_MAP[q.difficulty]}
                    </span>
                    <span className="quiz-card__cat">{PYTHON_CATEGORY_MAP[q.category]}</span>
                  </div>
                  <p className="quiz-card__stem">{q.stem}</p>
                </div>
              </div>
            ))}
            {displayQuestions.length === 0 && (
              <div className="sql-quiz__empty">没有找到匹配的题目</div>
            )}
            {!unlocked && filteredQuestions.length > FREE_QUIZ_COUNT && (
              <div className="quiz-trial-lock">
                还有 {filteredQuestions.length - FREE_QUIZ_COUNT} 道题，解锁后可查看全部
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PythonQuizPage
