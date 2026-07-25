import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import type { QuizQuestion } from '../../data/sqlQuestions'
import { CATEGORY_MAP, DIFFICULTY_MAP } from '../../data/sqlQuestions'
import { sqlQuestions } from '../../data/sqlQuestions'
import {
  useSmartQuiz,
  createAssessment,
  pickAssessmentQuestion,
  processAssessmentAnswer,
  checkAssessmentEnd,
  finishAssessment,
  getLevelColor,
  SQL_LEVELS,
  SQL_BOARD_ORDER,
} from '../../hooks/useSmartQuiz'
import { formatContent } from '../../utils/formatContent'
import OptionCard from '../../components/quiz/OptionCard'
import './Quiz.css'

type AssessmentPhase = 'intro' | 'testing' | 'result'

const SqlAssessmentPage: React.FC = () => {
  const { refreshProfile } = useSmartQuiz('sql')

  const [phase, setPhase] = useState<AssessmentPhase>('intro')
  const [assessmentState, setAssessmentState] = useState(() => createAssessment())
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [finalLevel, setFinalLevel] = useState(1)

  const loadNextQuestion = useCallback((state: typeof assessmentState) => {
    const q = pickAssessmentQuestion(state, sqlQuestions, SQL_BOARD_ORDER)
    setCurrentQuestion(q)
    if (!q) {
      const result = finishAssessment(state, 'sql', SQL_BOARD_ORDER, SQL_LEVELS)
      setFinalLevel(result.level)
      refreshProfile()
      setPhase('result')
    }
  }, [refreshProfile])

  const handleStart = () => {
    const state = createAssessment()
    setAssessmentState(state)
    setPhase('testing')
    loadNextQuestion(state)
  }

  const handleSelectOption = (label: string) => {
    if (revealed || !currentQuestion) return
    setSelectedAnswer(label)
    setRevealed(true)

    const isCorrect = currentQuestion.options.find(o => o.label === label)?.correct ?? false
    const newState = processAssessmentAnswer(assessmentState, currentQuestion.id, isCorrect, sqlQuestions)
    setAssessmentState(newState)
  }

  const handleNext = () => {
    if (checkAssessmentEnd(assessmentState)) {
      const result = finishAssessment(assessmentState, 'sql', SQL_BOARD_ORDER, SQL_LEVELS)
      setFinalLevel(result.level)
      refreshProfile()
      setPhase('result')
      return
    }
    setSelectedAnswer(null)
    setRevealed(false)
    loadNextQuestion(assessmentState)
  }

  useEffect(() => {
    if (phase === 'testing' && !currentQuestion) {
      loadNextQuestion(assessmentState)
    }
  }, [phase, currentQuestion, assessmentState, loadNextQuestion])

  if (phase === 'intro') {
    return (
      <div className="assessment-page">
        <div className="practice-page__nav">
          <Link to="/quiz/sql" className="quiz-btn quiz-btn--ghost">&larr; 返回</Link>
          <span className="practice-page__title">SQL 水平测评</span>
          <span />
        </div>
        <div className="assessment-page__intro">
          <h2>SQL 水平测评</h2>
          <p>通过自适应测评，精准定位你的 SQL 等级</p>
          <p>共 5-12 题，难度会根据你的答题情况自动调整</p>
          <div className="assessment-page__badges">
            {SQL_LEVELS.map(l => (
              <span key={l.level} className="assessment-page__badge" style={{ background: getLevelColor(l.level) + '20', color: getLevelColor(l.level) }}>
                Lv.{l.level} {l.name}
              </span>
            ))}
          </div>
          <button className="quiz-btn quiz-btn--smart" onClick={handleStart}>
            开始测评
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'result') {
    const levelDef = SQL_LEVELS.find(l => l.level === finalLevel) ?? SQL_LEVELS[0]
    return (
      <div className="assessment-page">
        <div className="practice-result">
          <div className="practice-result__card">
            <div className="level-up-result">
              <span className="level-up-result__icon">🏆</span>
              <div className="level-up-result__title">测评完成</div>
              <div className="level-up-result__level" style={{ color: getLevelColor(finalLevel) }}>
                Lv.{finalLevel} {levelDef.name}
              </div>
              <div className="level-up-result__desc">{levelDef.desc}</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                共答 {assessmentState.totalQuestions} 题，答对 {assessmentState.totalCorrect} 题
              </p>
            </div>
            <div className="practice-result__actions" style={{ marginTop: 20 }}>
              <Link to="/quiz/sql" className="quiz-btn quiz-btn--primary" style={{ textDecoration: 'none' }}>
                进入智能刷题
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!currentQuestion) return null

  return (
    <div className="practice-page">
      <div className="practice-page__nav">
        <Link to="/quiz/sql" className="quiz-btn quiz-btn--ghost">&larr; 返回</Link>
        <span className="practice-page__title">水平测评</span>
        <span className="practice-page__counter">{assessmentState.totalQuestions + 1}</span>
      </div>

      <div className="practice-page__meta">
        <span className={`quiz-card__diff quiz-card__diff--${currentQuestion.difficulty}`}>
          {DIFFICULTY_MAP[currentQuestion.difficulty]}
        </span>
        <span className="quiz-card__cat">{CATEGORY_MAP[currentQuestion.category]}</span>
      </div>

      <div className="practice-page__stem">
        <h3 dangerouslySetInnerHTML={{ __html: formatContent(currentQuestion.stem, 'sql') }} />
      </div>

      <div className="practice-page__options">
        {currentQuestion.options.map(opt => (
          <OptionCard
            key={opt.label}
            option={opt}
            selected={selectedAnswer === opt.label}
            revealed={revealed}
            isCorrectOption={opt.correct}
            onClick={() => handleSelectOption(opt.label)}
            subject="sql"
          />
        ))}
      </div>

      {revealed && (
        <div className="practice-page__next">
          <button className="quiz-btn quiz-btn--primary" onClick={handleNext}>
            {checkAssessmentEnd(assessmentState) ? '查看结果' : '下一题 →'}
          </button>
        </div>
      )}
    </div>
  )
}

export default SqlAssessmentPage
