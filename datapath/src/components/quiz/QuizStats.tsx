import './Quiz.css'

interface QuizStatsProps {
  totalAnswered: number
  totalCorrect: number
  accuracy: number
  todayCount: number
}

const QuizStats: React.FC<QuizStatsProps> = ({ totalAnswered, totalCorrect, accuracy, todayCount }) => {
  const wrongCount = totalAnswered - totalCorrect

  return (
    <div className="quiz-stats">
      <div className="quiz-stats__item">
        <span className="quiz-stats__num quiz-stats__num--primary">{totalAnswered}</span>
        <span className="quiz-stats__label">总答题</span>
      </div>
      <div className="quiz-stats__item">
        <span className="quiz-stats__num quiz-stats__num--success">{totalCorrect}</span>
        <span className="quiz-stats__label">答对</span>
      </div>
      <div className="quiz-stats__item">
        <span className="quiz-stats__num quiz-stats__num--accent">{accuracy}%</span>
        <span className="quiz-stats__label">正确率</span>
      </div>
      <div className="quiz-stats__item">
        <span className="quiz-stats__num quiz-stats__num--danger">{wrongCount}</span>
        <span className="quiz-stats__label">错题</span>
      </div>
      <div className="quiz-stats__item">
        <span className="quiz-stats__num quiz-stats__num--primary">{todayCount}</span>
        <span className="quiz-stats__label">今日</span>
      </div>
    </div>
  )
}

export default QuizStats
