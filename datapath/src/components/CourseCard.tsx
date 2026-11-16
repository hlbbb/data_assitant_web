import { Link } from 'react-router-dom';
import { getIcon } from '../utils/iconMap';
import './CourseCard.css';

interface CourseCardProps {
  title: string;
  description?: string;
  color: 'sql' | 'python' | 'thinking';
  tag?: 'sql' | 'python' | 'thinking';
  topicCount?: number;
  to: string;
  stageId?: string;
  featured?: boolean; // 是否为大卡片
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  color,
  tag,
  topicCount,
  to,
  stageId,
  featured = false,
}) => {
  const colorKey = tag || color;
  const isSql = colorKey === 'sql';
  const isThinking = colorKey === 'thinking';
  const gradient = isSql
    ? 'linear-gradient(90deg, #ff6b6b, #ee5a24)'
    : isThinking
    ? 'linear-gradient(90deg, #f59e0b, #d97706)'
    : 'linear-gradient(90deg, #4ecdc4, #26d0ce)';

  // 获取对应的 SVG 图标组件
  const IconComponent = getIcon(tag || color, stageId);

  return (
    <Link
      to={to}
      className={`course-card ${featured ? 'course-card--featured' : ''}`}
      style={{ '--gradient': gradient } as React.CSSProperties}
    >
      <div className="course-card__body">
        <div className="course-card__header">
          <div className="course-card__icon-wrapper">
            <IconComponent size={featured ? 40 : 32} />
          </div>
          <h3 className="course-card__title">{title}</h3>
        </div>
        {description && <p className="course-card__desc">{description}</p>}
      </div>
      {(tag || topicCount) && (
        <div className="course-card__footer">
          <span
            className={`course-card__tag ${isSql ? 'course-card__tag--sql' : isThinking ? 'course-card__tag--thinking' : 'course-card__tag--python'}`}
          >
            {isSql ? 'SQL' : isThinking ? '思维模型' : 'Python'}
          </span>
          {topicCount != null && (
            <span className="course-card__count">{topicCount} 知识点</span>
          )}
        </div>
      )}
    </Link>
  );
};

export default CourseCard;
