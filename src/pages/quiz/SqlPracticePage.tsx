import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import type { QuizQuestion } from '../../data/sqlQuestions'
import { CATEGORY_MAP, DIFFICULTY_MAP, TYPE_MAP, sqlQuestions } from '../../data/sqlQuestions'
import { updateSmartWeights, SQL_BOARD_ORDER } from '../../hooks/useSmartQuiz'
import { useQuiz } from '../../hooks/useQuiz'
import { formatContent } from '../../utils/formatContent'
import OptionCard from '../../components/quiz/OptionCard'
import QuizProgress from '../../components/quiz/QuizProgress'
import { useWrongBook } from '../../hooks/useWrongBook'
import { FREE_QUIZ_COUNT } from '../../utils/access'
import { loadStore } from '../../utils/access'
import PaywallOverlay from '../../components/PaywallOverlay'
import './Quiz.css'

interface LocationState {
  questions: QuizQuestion[]
  mode?: string
  trial?: boolean
}

const SqlPracticePage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as LocationState | null
  const questions = state?.questions ?? []
  const isTrial = state?.trial ?? false

  const { startQuiz, answerQuestion } = useQuiz()
  const { addWrongAnswer } = useWrongBook()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)
  const [answeredInSession, setAnsweredInSession] = useState(0)

  // 检查是否需要显示付费墙（未解锁用户答完5题后）
  // 只有本次会话答题达到5题才触发
  useEffect(() => {
    if (!loadStore().unlocked && answeredInSession >= FREE_QUIZ_COUNT) {
      setShowPaywall(true)
    }
  }, [answeredInSession])

  // 开始刷题时初始化
  useEffect(() => {
    if (state?.questions?.length) {
      startQuiz(state.questions, 'sql')
    } else {
      navigate('/quiz/sql')
    }
  }, [state, navigate, startQuiz])

  if (!questions.length) return null

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1

  const handleSelectOption = (label: string) => {
    if (revealed) return
    setSelectedAnswer(label)
    setRevealed(true)

    const isCorrect = currentQuestion.options.find(o => o.label === label)?.correct ?? false
    if (isCorrect) {
      setCorrectCount(prev => prev + 1)
    } else {
      addWrongAnswer(currentQuestion.id, 'sql')
    }

    // 保存答题记录到云端
    answerQuestion(label)
    updateSmartWeights('sql', currentQuestion.id, isCorrect, sqlQuestions, SQL_BOARD_ORDER)

    // 记录本次会话答题数
    setAnsweredInSession(prev => prev + 1)
  }

  const handleNext = () => {
    if (isLastQuestion) {
      setFinished(true)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
      return
    }
    setCurrentIndex(prev => prev + 1)
    setSelectedAnswer(null)
    setRevealed(false)
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setRevealed(false)
    setCorrectCount(0)
    setFinished(false)
  }

  if (finished) {
    const accuracy = Math.round((correctCount / questions.length) * 100)
    return (
      <div className="practice-result">
        {showConfetti && <div className="practice-result__confetti">🎉</div>}
        <div className="practice-result__card">
          <h2 className="practice-result__title">练习完成!</h2>
          <div className="practice-result__score">
            <div className="practice-result__circle">
              <span className="practice-result__percent">{accuracy}%</span>
              <span className="practice-result__fraction">{correctCount}/{questions.length}</span>
            </div>
          </div>
          <div className="practice-result__stats">
            <div className="practice-result__stat">
              <span className="practice-result__stat-num" style={{ color: '#43a047' }}>{correctCount}</span>
              <span className="practice-result__stat-label">答对</span>
            </div>
            <div className="practice-result__stat">
              <span className="practice-result__stat-num" style={{ color: '#e53935' }}>{questions.length - correctCount}</span>
              <span className="practice-result__stat-label">答错</span>
            </div>
          </div>
          <div className="practice-result__actions">
            <button className="quiz-btn quiz-btn--primary" onClick={handleRestart}>
              再来一次
            </button>
            <Link to="/quiz/sql" className="quiz-btn quiz-btn--secondary" style={{ textDecoration: 'none' }}>
              返回题库
            </Link>
          </div>
          {isTrial && (
            <div className="practice-result__upsell">
              <p>解锁后可使用全部题库与智能刷题功能</p>
              <Link to="/quiz/sql" className="practice-result__upsell-btn">立即解锁</Link>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="practice-page">
      <div className="practice-page__nav">
        <Link to="/quiz/sql" className="quiz-btn quiz-btn--ghost">
          &larr; 返回
        </Link>
        <span className="practice-page__title">答题中</span>
        <span className="practice-page__counter">
          {isTrial && <span className="practice-page__trial-badge">体验</span>}
          {' '}{currentIndex + 1} / {questions.length}
        </span>
      </div>

      <QuizProgress
        current={currentIndex}
        total={questions.length}
        correctCount={correctCount}
      />

      <div className="practice-page__meta">
        <span className={`quiz-card__diff quiz-card__diff--${currentQuestion.difficulty}`}>
          {DIFFICULTY_MAP[currentQuestion.difficulty]}
        </span>
        <span className="quiz-card__cat">{CATEGORY_MAP[currentQuestion.category]}</span>
        <span className="practice-page__type">{TYPE_MAP[currentQuestion.type]}</span>
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
        <>
          <div className="quiz-explanation">
            <div className="quiz-explanation__title">解析</div>
            <div
              className="quiz-explanation__text"
              dangerouslySetInnerHTML={{ __html: formatContent(currentQuestion.explanation, 'sql') }}
            />
          </div>
          <div className="practice-page__next">
            <button className="quiz-btn quiz-btn--primary" onClick={handleNext}>
              {isLastQuestion ? '查看结果' : '下一题 →'}
            </button>
          </div>
        </>
      )}

      <PaywallOverlay
        visible={showPaywall}
        stageTitle="继续刷题"
        onClose={() => navigate('/quiz/sql')}
        onPurchase={() => navigate('/purchase')}
        onActivate={() => navigate('/purchase')}
      />
    </div>
  )
}

export default SqlPracticePage
