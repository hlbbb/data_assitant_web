import type { QuizQuestion } from '../../data/sqlQuestions'
import { CATEGORY_MAP, DIFFICULTY_MAP } from '../../data/sqlQuestions'
import './Quiz.css'

interface QuizCardProps {
  question: QuizQuestion
  answered?: string | null
  onClick: () => void
  index: number
}

const QuizCard: React.FC<QuizCardProps> = ({ question, answered, onClick, index }) => {
  const isCorrect = answered
    ? question.options.find(o => o.label === answered)?.correct ?? false
    : null

  return (
    <div className={`quiz-card ${answered ? (isCorrect ? 'quiz-card--correct' : 'quiz-card--wrong') : ''}`} onClick={onClick}>
      <div className="quiz-card__header">
        <span className="quiz-card__index">#{index + 1}</span>
        <span className={`quiz-card__diff quiz-card__diff--${question.difficulty}`}>
          {DIFFICULTY_MAP[question.difficulty]}
        </span>
        <span className="quiz-card__cat">{CATEGORY_MAP[question.category] || question.category}</span>
      </div>
      <p className="quiz-card__stem">{question.stem}</p>
      {answered && (
        <div className={`quiz-card__status ${isCorrect ? 'quiz-card__status--correct' : 'quiz-card__status--wrong'}`}>
          {isCorrect ? '回答正确' : `答错了 (选了${answered})`}
        </div>
      )}
    </div>
  )
}

export default QuizCard
