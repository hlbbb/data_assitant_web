import { Link } from 'react-router-dom';
import { isStageAccessible } from '../utils/access';
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

  const isLocked = stageId && tag ? !isStageAccessible(tag, stageId) : false;

  // 获取对应的 SVG 图标组件
  const IconComponent = getIcon(tag || color, stageId);

  return (
    <Link
      to={to}
      className={`course-card ${isLocked ? 'course-card--locked' : ''} ${featured ? 'course-card--featured' : ''}`}
      style={{ '--gradient': gradient } as React.CSSProperties}
    >
      <div className="course-card__body">
        <div className="course-card__header">
          <div className="course-card__icon-wrapper">
            {isLocked ? (
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                <defs>
                  <linearGradient id="lock-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#ff6b6b' }} />
                    <stop offset="100%" style={{ stopColor: '#ee5a24' }} />
                  </linearGradient>
                </defs>
                <rect x="12" y="24" width="24" height="16" rx="3" stroke="url(#lock-grad)" strokeWidth="2.5" fill="none" />
                <path d="M16 24 L16 16 C16 10 20 6 24 6 C28 6 32 10 32 16 L32 24" stroke="url(#lock-grad)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <circle cx="24" cy="32" r="3" fill="url(#lock-grad)" />
              </svg>
            ) : (
              <IconComponent size={featured ? 40 : 32} />
            )}
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
          {isLocked ? (
            <span className="course-card__lock-badge">付费</span>
          ) : (
            topicCount != null && (
              <span className="course-card__count">{topicCount} 知识点</span>
            )
          )}
        </div>
      )}
    </Link>
  );
};

export default CourseCard;
