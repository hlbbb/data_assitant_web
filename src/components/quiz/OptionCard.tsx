import type { QuizOption } from '../../data/sqlQuestions'
import { formatContent } from '../../utils/formatContent'
import './Quiz.css'

interface OptionCardProps {
  option: QuizOption
  selected: boolean
  revealed: boolean
  isCorrectOption: boolean
  onClick: () => void
  subject?: 'sql' | 'python'
}

const OptionCard: React.FC<OptionCardProps> = ({ option, selected, revealed, isCorrectOption, onClick, subject = 'sql' }) => {
  let className = 'option-card'
  if (revealed) {
    if (isCorrectOption) className += ' option-card--correct'
    else if (selected && !isCorrectOption) className += ' option-card--wrong'
    else className += ' option-card--dimmed'
  } else if (selected) {
    className += ' option-card--selected'
  }

  return (
    <button className={className} onClick={onClick} disabled={revealed}>
      <span className="option-card__label">{option.label}</span>
      <span
        className="option-card__text"
        dangerouslySetInnerHTML={{ __html: formatContent(option.text, subject) }}
      />
      {revealed && isCorrectOption && <span className="option-card__icon">&#10003;</span>}
      {revealed && selected && !isCorrectOption && <span className="option-card__icon">&#10007;</span>}
    </button>
  )
}

export default OptionCard
