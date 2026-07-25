import './Quiz.css'

interface QuizProgressProps {
  current: number
  total: number
  correctCount: number
}

const QuizProgress: React.FC<QuizProgressProps> = ({ current, total, correctCount }) => {
  const percent = total > 0 ? Math.round(((current) / total) * 100) : 0

  return (
    <div className="quiz-progress">
      <div className="quiz-progress__bar-wrap">
        <div className="quiz-progress__bar" style={{ width: `${percent}%` }} />
      </div>
      <div className="quiz-progress__info">
        <span className="quiz-progress__text">{current} / {total}</span>
        <span className="quiz-progress__score">正确 {correctCount}</span>
      </div>
    </div>
  )
}

export default QuizProgress
