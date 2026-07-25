import { Link } from 'react-router-dom'
import { sqlQuestions, CATEGORY_MAP } from '../../data/sqlQuestions'
import { pythonQuestions, PYTHON_CATEGORY_MAP } from '../../data/pythonQuestions'
import { useQuiz } from '../../hooks/useQuiz'
import QuizStats from '../../components/quiz/QuizStats'
import './Quiz.css'

const sqlCategoryCount = Object.keys(CATEGORY_MAP).length
const pyCategoryCount = Object.keys(PYTHON_CATEGORY_MAP).length

const QuizHomePage: React.FC = () => {
  const { stats, isLoading } = useQuiz()

  if (isLoading) {
    return (
      <div className="quiz-home">
        <div className="quiz-home__header">
          <h1 className="quiz-home__title">刷题练习</h1>
          <p className="quiz-home__desc">巩固知识，提升实战能力</p>
        </div>
        <div className="quiz-home__stats-wrap">
          <div className="quiz-stats-loading">加载统计数据...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-home">
      <div className="quiz-home__header">
        <h1 className="quiz-home__title">刷题练习</h1>
        <p className="quiz-home__desc">巩固知识，提升实战能力</p>
      </div>

      <div className="quiz-home__stats-wrap">
        <QuizStats
          totalAnswered={stats.totalAnswered}
          totalCorrect={stats.totalCorrect}
          accuracy={stats.accuracy}
          todayCount={stats.todayCount}
        />
      </div>

      <div className="quiz-home__cards">
        <Link to="/quiz/sql" className="quiz-home__entry quiz-home__entry--sql">
          <div className="quiz-home__entry-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <ellipse cx="12" cy="6" rx="9" ry="3" />
              <path d="M3 6v6c0 1.66 4.03 3 9 3s9-1.34 9-3V6" />
              <path d="M3 12v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
            </svg>
          </div>
          <div className="quiz-home__entry-info">
            <h2>SQL 刷题</h2>
            <p>{sqlQuestions.length} 道题 · {sqlCategoryCount} 个分类</p>
          </div>
          <span className="quiz-home__entry-arrow">&rarr;</span>
        </Link>

        <Link to="/quiz/python" className="quiz-home__entry quiz-home__entry--python">
          <div className="quiz-home__entry-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="quiz-home__entry-info">
            <h2>Python 刷题</h2>
            <p>{pythonQuestions.length} 道题 · {pyCategoryCount} 个分类</p>
          </div>
          <span className="quiz-home__entry-arrow">&rarr;</span>
        </Link>

        <Link to="/quiz/wrong" className="quiz-home__entry quiz-home__entry--wrong">
          <div className="quiz-home__entry-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
              <path d="M15 9l-6 6M9 9l6 6" />
            </svg>
          </div>
          <div className="quiz-home__entry-info">
            <h2>错题本</h2>
            <p>复习薄弱知识点</p>
          </div>
          <span className="quiz-home__entry-arrow">&rarr;</span>
        </Link>
      </div>
    </div>
  )
}

export default QuizHomePage
