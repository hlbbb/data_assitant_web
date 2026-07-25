import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { useProgress } from '../hooks/useProgress';
import { courses } from '../data/courses';
import { isStageAccessible } from '../utils/access';
import { getIcon } from '../utils/iconMap';
import './PythonOverviewPage.css';

const PYTHON_STAGES = courses[1].stages;

const PythonOverviewPage: React.FC = () => {
  const progress = useProgress();
  const completed = PYTHON_STAGES.filter(
    (s) => progress.getStageStatus('python', s.id).status === 'completed'
  ).length;
  const percent = Math.round((completed / PYTHON_STAGES.length) * 100);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="python-overview">
      {/* 面包屑 */}
      <div className="python-overview__breadcrumb fade-in">
        <Link to="/">首页</Link>
        <span className="python-overview__breadcrumb-sep">/</span>
        <span>Python</span>
      </div>

      {/* 总进度 */}
      <div className="python-overview__progress fade-in">
        <h2 className="python-overview__title">Python 学习路线</h2>
        <ProgressBar percent={percent} label="总进度" />
      </div>

      {/* 阶段列表 */}
      <div className="python-overview__list">
        {PYTHON_STAGES.map((stage, idx) => {
          const sp = progress.getStageStatus('python', stage.id);
          const IconComponent = getIcon('python', stage.id);
          const isLocked = !isStageAccessible('python', stage.id);
          return (
            <Link
              key={stage.id}
              to={`/python/${stage.id}`}
              className={`python-overview__card fade-in python-overview__card--${sp.status}`}
            >
              <span className="python-overview__card-num">{idx + 1}</span>
              <span className="python-overview__card-icon">
                {isLocked ? (
                  <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
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
                  <IconComponent size={24} />
                )}
              </span>
              <div className="python-overview__card-info">
                <h3 className="python-overview__card-title">{stage.title}</h3>
                <span className="python-overview__card-points">
                  {stage.topicCount} 个知识点
                </span>
              </div>
              <span className={`python-overview__card-badge python-overview__card-badge--${sp.status}`}>
                {isLocked ? '🔒' : sp.status === 'completed' ? '✓' : sp.status === 'in_progress' ? '···' : ''}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PythonOverviewPage;
