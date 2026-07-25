import { CATEGORY_MAP, DIFFICULTY_MAP } from '../../data/sqlQuestions'
import './Quiz.css'

interface QuizFilterProps {
  selectedCategory: string
  selectedDifficulty: string
  onCategoryChange: (cat: string) => void
  onDifficultyChange: (diff: string) => void
  searchQuery: string
  onSearchChange: (q: string) => void
}

const CATEGORIES = [
  { value: '', label: '全部' },
  ...Object.entries(CATEGORY_MAP).map(([value, label]) => ({ value, label })),
]

const DIFFICULTIES = [
  { value: '', label: '全部' },
  ...Object.entries(DIFFICULTY_MAP).map(([value, label]) => ({ value, label })),
]

const QuizFilter: React.FC<QuizFilterProps> = ({
  selectedCategory,
  selectedDifficulty,
  onCategoryChange,
  onDifficultyChange,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="quiz-filter">
      <div className="quiz-filter__search">
        <svg className="quiz-filter__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="5" />
          <path d="M15 15l4 4" />
        </svg>
        <input
          className="quiz-filter__search-input"
          placeholder="搜索题目..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>
      <div className="quiz-filter__row">
        {DIFFICULTIES.map(d => (
          <button
            key={d.value}
            className={`quiz-filter__chip ${selectedDifficulty === d.value ? 'quiz-filter__chip--active' : ''}`}
            onClick={() => onDifficultyChange(d.value)}
          >
            {d.label}
          </button>
        ))}
      </div>
      <div className="quiz-filter__row quiz-filter__row--wrap">
        {CATEGORIES.map(c => (
          <button
            key={c.value}
            className={`quiz-filter__chip quiz-filter__chip--cat ${selectedCategory === c.value ? 'quiz-filter__chip--active' : ''}`}
            onClick={() => onCategoryChange(c.value)}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuizFilter
